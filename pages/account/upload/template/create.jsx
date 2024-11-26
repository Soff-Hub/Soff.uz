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
import { useLazyFetchCreateTagsQuery, useLazyFetchTemplateCategoriesQuery, useUploadTemplateMutation } from '~/rtk-store/upload/api';
import { baseDomain } from '~/repositories/NewRepository';
import { useDispatch, useSelector } from 'react-redux';
import { updateUploadingFile } from '~/rtk-store/upload/slice';
import { useRouter } from 'next/router';
import TemplateProductDetail from '~/components/elements/detail/TemplateProductDetail';

export const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

export const technologies = [
    'Photoshop',
    'Figma',
    'Adobe Illustrator',
    'Adobe XD',
    'Canva',
    'Sketch',
    'CorelDRAW',
    "Suniy Intellekt",
    'HTML',
    'CSS',
    'JavaScript',
    'TypeScript',
    'React',
    'Angular',
    'Vue.js',
    'Svelte',
    'Node.js',
    'Express.js',
    'Next.js',
    'Nuxt.js',
    'Python',
    'Django',
    'Flask',
    'Ruby on Rails',
    'PHP',
    'Laravel',
    'MySQL',
    'PostgreSQL',
    'MongoDB',
    'Firebase',
    'AWS',
    'Google Cloud',
    'Azure',
    'AI',
    'Machine Learning',
    'TensorFlow',
    'Keras',
    'PyTorch',
    'Bootstrap',
    'Tailwind CSS',
    'Sass',
    'LESS',
    'Webpack',
    'Babel',
    'Git',
    'GitHub',
    'Docker',
    'Kubernetes',
    'Microsoft Word',
    'Microsoft Excel',
    'Microsoft PowerPoint',
    'Microsoft Outlook',
    'Microsoft Access',
    'Google Docs',
    'Google Sheets',
    'Google Slides',
    'LibreOffice Writer',
    'LibreOffice Calc',
    'LibreOffice Impress',
    'Zoho Docs',
    'Notion',
    'Evernote',
    'Trello',
    'Slack',
    'Asana'
];

export default function Step1() {
    const [form] = Form.useForm();
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [description, setDescription] = useState('')

    const { user } = useSelector(state => state.auth)
    const { uploading } = useSelector(state => state.uploads)
    const dispatch = useDispatch()
    const { reload, push } = useRouter()

    const [fetchCategories, { data: categories }] = useLazyFetchTemplateCategoriesQuery()
    const [fetchTags, { data: tags }] = useLazyFetchCreateTagsQuery()
    const [uploadSubmit, { isLoading }] = useUploadTemplateMutation()
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
                        {...formItemLayout}
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
                                    defaultFileList={uploading ? [uploading] : null}
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
                                    onChange={(data) => {
                                        setDescription(data)
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
