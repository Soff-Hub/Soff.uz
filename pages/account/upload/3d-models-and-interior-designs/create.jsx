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
import { useLazyFetchCreateTagsQuery, useLazyFetchTemplateCategoriesQuery, useUploadTemplateMutation, useUploadThreeDProducts, useUploadThreeDProductsMutation } from '~/rtk-store/upload/api';
import { baseDomain } from '~/repositories/NewRepository';
import { useDispatch, useSelector } from 'react-redux';
import { updateUploadingFile } from '~/rtk-store/upload/slice';
import { useRouter } from 'next/router';
import TemplateProductDetail from '~/components/elements/detail/TemplateProductDetail';



export default function ThreeDmodelsAndInteriorDesignsCreate() {
    const [form] = Form.useForm();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [description, setDescription] = useState('')

    const { user } = useSelector(state => state.auth)
    const { uploading } = useSelector(state => state.uploads)
    const dispatch = useDispatch()
    const { reload, push } = useRouter()

    const [fetchCategories, { data: categories }] = useLazyFetchTemplateCategoriesQuery()
    const myCategories = [{ value: 20, label: 'Jack' },]
    const [fetchTags, { data: tags }] = useLazyFetchCreateTagsQuery()
    const [uploadSubmit, { isLoading }] = useUploadThreeDProductsMutation()
    const [product, setProduct] = useState({})
    const objectUrls = React.useRef([]);

    const handleSubmit = async (values) => {
        const formData = new FormData()
        let obj = { ...values, description }

        for (const [key, value] of Object.entries(obj)) {
            if (key === 'images') {
                for (const img of value) {
                    formData.append('images', img?.originFileObj)
                }
            } else if (key === 'document') {
                formData.append('document', values?.document?.file?.response?.id)
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
        const resp = await uploadSubmit(formData)
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
            // push('/account/myproducts')
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
        if (uploading) {
            form.setFieldValue('document', {
                file: uploading,
                fileList: [uploading]
            })
        }
    }, [])

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
    const [open, setOpen] = useState(false)

    const clickView = () => {
        const values = form.getFieldsValue()
        const category = categories?.find(el => el.id === values?.category)?.name
        setProduct({ ...values, description, category })
        setOpen(true)
    }

    const getPreviewFile = async (file) => {
        const url = await Promise.resolve(URL.createObjectURL(file))
        objectUrls.current.push(url);
        return url
    };

    useEffect(() => {
        return () => {
            objectUrls.current.forEach((url) => URL.revokeObjectURL(url));
            objectUrls.current = [];
        };
    }, []);



    return (
        <PageContainer>
            <div className="bg-white">
                <div className="container pt-5" style={{ maxWidth: '1400px' }}>
                    <div className="d-flex justify-content-end">
                        <Button onClick={clickView} className='d-flex align-items-center'>
                            <i class="fa-regular fa-eye"></i>
                            Sotuvdagi holatini ko'rish
                        </Button>
                    </div>

                    <Form
                        form={form}
                        variant={'outlined'}
                        onFinish={handleSubmit}
                        onFinishFailed={handleFailedSubmit}
                        initialValues={{
                            variant: 'filled',
                        }}
                        layout='vertical'
                        autoComplete='off'
                        className='row'
                    >
                        <Form.Item
                            label="Shablon nomi"
                            name="title"
                            rules={[
                                {
                                    required: true,
                                    message: 'Kiritish majburiy',
                                },
                            ]}
                            className='smmb-1  col-md-6 col-12'
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
                            className='smmb-1  col-md-6 col-12'
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
                            className='smmb-1  col-md-6 col-12'
                        >
                            <Select
                                onSearch={(e) => debounceFunction(e, (v) => fetchCategories(v))}
                                showSearch
                                optionFilterProp="label"
                                onFocus={() => fetchCategories()}
                                size='large'
                                options={myCategories?.map(el => ({ label: el?.label, value: el?.value }))}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Teglar"
                            name="tags"
                            className='smmb-1  col-md-6 col-12'
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
                            className='smmb-1  col-md-6 col-12'

                        >
                            <Upload
                                defaultFileList={uploading ? [uploading] : null}
                                accept='.zip'
                                maxCount={1} {...props}
                                lassName='main-file-upload'
                                style={{ width: '100%' }}

                            >
                                <Button size='large' className='w-100' icon={<i class="fa-solid fa-plus"></i>}>Yuklash uchun bosing</Button>
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label=""
                            name={'images'}
                            valuePropName="images"
                            getValueFromEvent={normFile}
                            required
                            className='smmb-1  col-md-6 col-12'
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
                                {...posterProps}
                                previewFile={getPreviewFile}
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
                                    onChange={(data) => {
                                        setDescription(data)
                                    }}
                                    editorLoaded={editorLoaded}
                                    placeholder={"Shablonning to’liq tavsifini yozing"}
                                />
                            </div>
                        </div>

                        <Form.Item
                            className='col-12 d-flex justify-content-end'
                        >
                            <Button loading={isLoading} type="primary" htmlType="submit" style={{ flex: 1 }}>
                                Yuborish
                            </Button>
                        </Form.Item>
                    </Form>


                    <Modal
                        okText="Yuklashda davom etish"
                        cancelText="Yopish"
                        centered
                        open={open}
                        onOk={() => setOpen(false)}
                        onCancel={() => setOpen(false)}
                        width={'1200px'}
                    >
                        <TemplateProductDetail product={product} />
                    </Modal>
                </div>
            </div>
        </PageContainer>
    )
}
