import React, { useEffect, useState } from 'react'

import PageContainer from '~/components/layouts/PageContainer'
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Tooltip,
    Upload,
    message
} from 'antd';
import Editor from '~/components/partials/template/Editor';
import { useFetchProductDetailQuery, useLazyFetchCreateTagsQuery, useLazyFetchTemplateCategoriesQuery, useUpdateTemplateMutation } from '~/rtk-store/upload/api';
import { baseDomain } from '~/repositories/NewRepository';
import { useDispatch, useSelector } from 'react-redux';
import { updateUploadingFile } from '~/rtk-store/upload/slice';
import { useRouter } from 'next/router';
import { formItemLayout, technologies } from './create';

function Step1({ id }) {
    const { data, isLoading: detailLoading } = useFetchProductDetailQuery(id)
    const [fetchCategories, { data: categories }] = useLazyFetchTemplateCategoriesQuery()
    const [fetchTags, { data: tags }] = useLazyFetchCreateTagsQuery()
    const [uploadSubmit, { isLoading }] = useUpdateTemplateMutation()
    const [fileList, setFileList] = useState([]);
    const [poster, setPoster] = useState([]);

    const [form] = Form.useForm();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [description, setDescription] = useState('')
    const [newValues, setNewValues] = useState({})

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { reload, push } = useRouter()

    const handleSubmit = async (values) => {
        const formData = new FormData()
        for (const [key, value] of Object.entries(newValues)) {
            if (key === 'images') {
                for (const img of value) {
                    formData.append('images', img?.originFileObj)
                }
            } else if (key === 'document') {
                formData.append('document', values?.document?.id)
            } else if (key === 'tags') {
                formData.append('tags', value.join(','))
            } else if (key === 'technologies') {
                formData.append('technologies', value.join(','))
            } else if (key === 'poster') {
                for (const img of value) {
                    formData.append('poster', img?.originFileObj)
                }
            } else formData.append(key, value)
        }
        const resp = await uploadSubmit({ id: data?.id, data: formData })
        if (resp.error) {
            const errors = resp.error.data
            for (const [key, value] of Object.entries(errors)) {
                form.setFields([
                    {
                        name: key,
                        errors: value,
                    },
                ])
            }
        } else {
            await dispatch(updateUploadingFile(null));
            Modal.success({
                title: "Muvaffaqiyatli",
                content: "Sizning mahsulotingiz muvaffaqqiyatli yuborildi! 10 soat ichida adminlar tomonidan  mahsulotingiz 'Tasdiqlangan' dan so'ng  sotuvda ko'rishingiz mumkin yoki 'Bekor' qilishinishi ham mumkin"
            })
            push('/account/myproducts')
        }
    };
    let timeoutId;

    const debounceFunction = (search, clbckSearch) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            clbckSearch?.(search)
        }, 800);
    }

    // Function to handle submission failure
    const handleFailedSubmit = (errorInfo) => {
        console.log('Form Submission Failed:', errorInfo);
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    useEffect(() => {
        setEditorLoaded(true)
    }, [])

    useEffect(() => {
        if (data) {
            form.setFieldValue('title', data?.title)
            form.setFieldValue('price', data?.price)
            setDescription(data?.description)
            form.setFieldValue('demo_link', data?.demo_link)
            form.setFieldValue('category', data?.category?.name)
            form.setFieldValue('tags', data?.tag?.map(el => el.name))
            form.setFieldValue('technologies', data?.technologies_data)
            form.setFieldValue('document', {
                file: {
                    uid: '-1',
                    name: 'document',
                    status: 'done',
                    url: data?.document?.file_url,
                    originFileObj: null
                }
            })
            form.setFieldValue('images', [
                {
                    file: {
                        uid: '-1',
                        name: 'poster.webp',
                        status: 'done',
                        url: data?.document?.file_url,
                        originFileObj: null
                    },
                }
            ])
            form.setFieldValue('poster', [{
                file: {
                    uid: '-1',
                    name: 'poster.webp',
                    status: 'done',
                    url: data?.poster_url,
                    originFileObj: null
                }
            }])

            setPoster([{
                uid: '-1',
                name: 'poster.png',
                status: 'done',
                url: data?.poster_url,
            }])

            setFileList(data?.document?.images?.map((el, i) => ({
                uid: -1 * (i + 1),
                name: 'image.png',
                status: 'done',
                url: el?.image_url,
            })))
        }
    }, [data])

    const props = {
        name: 'file',
        action: baseDomain + 'seller/product-create-first/',
        headers: {
            Authorization: 'Bearer ' + user?.access,
        },
        data: {
            content_type: 'template', // Qo'shimcha ma'lumot
        },
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file);
            }
            if (info.file.status === 'done') {
                dispatch(updateUploadingFile(info?.file))
                message.success(`${info.file.name} fayl yuklandi, ma'lumotlarni to'ldirishda davom eting`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} fayl yuklash amalga oshmadi.`);
            }
        },
        async onRemove(file) {
            console.log(`${file.name} has been removed`);
            await dispatch(updateUploadingFile(null));
            reload()
        },
    };


    const posterProps = {
        name: 'file',
        action: '/api/upload',
    };

    return (
        <PageContainer>
            <div className="bg-white">
                <div className="container pt-5" style={{ maxWidth: '1400px' }}>
                    {detailLoading ? (
                        <div
                            className="ps-product--detail ps-product--fullwidth"
                            style={{
                                height: '690px',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border "
                                role="status"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    ) : <Form
                        {...formItemLayout}
                        onValuesChange={(c) => setNewValues(d => ({ ...d, ...c }))}
                        form={form}
                        variant={'outlined'}
                        onFinish={handleSubmit}
                        onFinishFailed={handleFailedSubmit}
                        initialValues={{
                            variant: 'filled',
                        }}
                        autoComplete='off'
                        className='row m-0'
                    >
                        <div className="pt-5 col-12 col-md-6 col-lg-6 col-xl-6">
                            <Form.Item
                                label="Shablon nomi"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kiritish majburiy',
                                    },
                                ]}
                                className='smmb-1'
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Shablon narxi"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: "To'g'ri narx kiriting",
                                    },
                                ]}
                                className='smmb-1'
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Kategoriya"
                                name="category"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Kiritish majburiy',
                                    },
                                ]}
                                className='smmb-1'
                            >
                                <Select
                                    onSearch={(e) => debounceFunction(e, (v) => fetchCategories(v))}
                                    showSearch
                                    optionFilterProp="label"
                                    onFocus={() => fetchCategories()}
                                    size='large'
                                    options={categories?.map(el => ({ label: el?.name, value: el?.id }))}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Demo link (ixtiyoriy)"
                                name="demo_link"
                                rules={[
                                    {
                                        type: "url",
                                        message: "Iltimos to'g'ri url kiriting"
                                    },
                                ]}
                                className='smmb-1'
                            >
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="pt-5 col-12 col-md-6 col-lg-6 col-xl-6" style={{ width: '100%' }}>
                            <Form.Item
                                label="Texnologiyalar"
                                name="technologies"
                                className='smmb-1'
                            >
                                <Select
                                    onFocus={() => tags ? undefined : fetchTags()}
                                    mode="tags"
                                >
                                    {
                                        technologies?.map(el => (
                                            <Select.Option key={el} value={el} >{el}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Teglar"
                                name="tags"
                                className='smmb-1'
                            >
                                <Select
                                    onSearch={(e) => debounceFunction(e, (v) => fetchTags(v))}
                                    onFocus={() => fetchTags()}
                                    mode="tags"
                                >
                                    {
                                        tags?.map(el => (
                                            <Select.Option key={el?.id} value={el.name} >{el.name}</Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Asosiy fayl (.zip)"
                                name="document"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Yuklash majburiy',
                                    },
                                ]}
                                className='smmb-1'
                            >
                                <Upload
                                    defaultFileList={[
                                        {
                                            uid: '-1',
                                            name: 'file.zip',
                                            status: 'done',
                                            url: data?.document?.file_url,
                                            originFileObj: null
                                        }
                                    ]}
                                    accept='.zip'
                                    maxCount={1} {...props}
                                    lassName='main-file-upload'
                                >
                                    <Button size='large' className='w-100' icon={<i class="fa-solid fa-plus"></i>}>Yuklash uchun bosing</Button>
                                </Upload>
                            </Form.Item>
                            {/* 
                            <Form.Item
                                label="Qo'shimcha fayllar"
                                name="addintional_files"
                                className='smmb-1'
                            >
                                <Upload accept='.zip' {...props} className='main-file-upload'>
                                    <Button size='large' className='w-100' icon={<i class="fa-solid fa-plus"></i>}>Yuklash uchun bosing</Button>
                                </Upload>
                            </Form.Item> */}
                        </div>

                        <div className="col-12 col-md-3 mb-3 mt-3">
                            <div className="d-flex p-0">
                                <p className='ant-form-item-required'>Asosiy poster: </p>{' '}
                                <Tooltip title="Mahsulotingizning saytda birinchi ko'rinadigan asosiy rasm">
                                    <i
                                        style={{ cursor: 'pointer' }}
                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                </Tooltip>
                            </div>
                            <Form.Item
                                label=""
                                name={'poster'}
                                valuePropName="poster"
                                getValueFromEvent={normFile}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Yuklash majburiy',
                                    },
                                ]}
                                className='smmb-1 main-poster'
                            >
                                <Upload
                                    listType='picture-card'
                                    className='upload-btn'
                                    accept='image/*'
                                    maxCount={1}
                                    rootClassName='dsawed'
                                    fileList={poster}
                                    onChange={(e) => setPoster(e.fileList)}
                                    {...posterProps}
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                        className='upload-btn-btn'
                                    >
                                        <i class="fa-solid fa-plus"></i>
                                        <div
                                            style={{
                                                marginTop: 8,
                                                height: '200px !important'
                                            }}
                                        >
                                            Yuklash
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </div>

                        <div className="col-12 col-md-9 mb-3 mt-3">
                            <div className="d-flex p-0">
                                <p className='ant-form-item-required'>Qo'shimcha rasmlar: </p>{' '}
                                <Tooltip title="Mijozlarga mahsulotingiz haqida ko'proq ma'lumot yetkazish uchun shablonning rasmlarini yuklang">
                                    <i
                                        style={{ cursor: 'pointer' }}
                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                </Tooltip>
                            </div>
                            <Form.Item
                                label=""
                                name={'images'}
                                valuePropName="images"
                                getValueFromEvent={normFile}
                                required
                                className='smmb-1'
                                rules={[
                                    {
                                        required: true,
                                        message: "Kamida 1ta rasm yuklashingiz kerak"
                                    }
                                ]}
                            >
                                <Upload
                                    listType='picture-card'
                                    className='upload-btn'
                                    accept='image/*'
                                    fileList={fileList}
                                    onChange={(e) => setFileList(e?.fileList)}
                                    {...posterProps}
                                >
                                    <button
                                        style={{
                                            border: 0,
                                            background: 'none',
                                        }}
                                        type="button"
                                        className='upload-btn-btn'
                                    >
                                        <i class="fa-solid fa-plus"></i>
                                        <div
                                            style={{
                                                marginTop: 8,
                                                height: '200px !important'
                                            }}
                                        >
                                            Yuklash
                                        </div>
                                    </button>
                                </Upload>
                            </Form.Item>
                        </div>

                        <div className='col-12 mx-auto'>
                            <div className="d-flex p-0">
                                <p>Shablon to’liq tavsifi: </p>{' '}
                                <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                    <i
                                        style={{ cursor: 'pointer' }}
                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                </Tooltip>
                            </div>
                            <div className="p-0 rounded-3 mb-3">
                                <Editor
                                    name="description"
                                    value={description}
                                    onChange={(data) => {
                                        setDescription(data);
                                    }}
                                    editorLoaded={editorLoaded}
                                    placeholder={"Shablonning to’liq tavsifini yozing"}
                                />
                            </div>
                        </div>

                        <div className='col-12'>
                            <Form.Item
                                className='d-flex justify-content-center'
                            >
                                <Button loading={isLoading} type="primary" htmlType="submit" style={{ flex: 1 }}>
                                    Yuborish
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>}
                </div>
            </div>
        </PageContainer>
    )
}

export async function getServerSideProps(context) {
    const { query } = context;

    return {
        props: {
            id: query?.id || null,
        },
    };
}
export default Step1