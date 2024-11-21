import React, { useEffect, useState } from 'react'

import PageContainer from '~/components/layouts/PageContainer'
import {
    Button,
    Form,
    Input,
    Select,
    Tooltip,
    Upload,
    message
} from 'antd';
import Editor from '~/components/partials/template/Editor';

const formItemLayout = {
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

export default function Step1() {
    const [form] = Form.useForm();
    const [editorLoaded, setEditorLoaded] = useState(false);

    const handleSubmit = (values) => {
        console.log('Form Submitted Successfully:', values);
        // You can call an API or perform other actions here
    };

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

    const props = {
        name: 'file',
        onChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };



    return (
        <PageContainer>
            <div className="bg-white">
                <div className="container pt-5" style={{ maxWidth: '1400px' }}>
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
                                name="name"
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
                                    size='large'
                                    options={[
                                        { label: "Barchasi", value: "1" }
                                    ]}
                                />
                            </Form.Item>
                        </div>
                        <div className="pt-5 col-12 col-md-6 col-lg-6 col-xl-6" style={{ width: '100%' }}>
                            <Form.Item
                                label="Teglar"
                                name="tags"
                                className='smmb-1'
                            >
                                <Select
                                    mode="tags"
                                >
                                    <Select.Option value="1" >Tag 1</Select.Option>
                                    <Select.Option value="2" >Tag 2</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Asosiy fayl (.zip)"
                                name="main_file"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Yuklash majburiy',
                                    },
                                ]}
                                className='smmb-1'
                            >
                                <Upload accept='.zip' maxCount={1} {...props} className='main-file-upload'>
                                    <Button size='large' className='w-100' icon={<i class="fa-solid fa-plus"></i>}>Yuklash uchun bosing</Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item
                                label="Qo'shimcha fayllar"
                                name="addintional_files"
                                className='smmb-1'
                            >
                                <Upload accept='.zip' maxCount={1} {...props} className='main-file-upload'>
                                    <Button size='large' className='w-100' icon={<i class="fa-solid fa-plus"></i>}>Yuklash uchun bosing</Button>
                                </Upload>
                            </Form.Item>
                        </div>

                        <div className="col-12 mb-3 mt-3">
                            <div className="d-flex p-0">
                                <p className='ant-form-item-required'>Rasmlar: </p>{' '}
                                <Tooltip title="Mijozlarga mahsulotingiz haqidagi to’liq ma’lumotni bering. Bu mijozlaringiz mahsulotni sotib olishda ularning ishonchini yanada oshirish uchun xizmat qiladi.">
                                    <i
                                        style={{ cursor: 'pointer' }}
                                        className="fa-regular fa-circle-question px-4 mt-2"></i>
                                </Tooltip>
                            </div>
                            <Form.Item
                                label=""
                                valuePropName="images"
                                getValueFromEvent={normFile}
                                required
                                className='smmb-1'
                                rootClassName='asdasdssdad'
                            >
                                <Upload
                                    onChange={(e) => console.log(e)}
                                    listType='picture-card'
                                    className='upload-btn'
                                    accept='image/*'
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
                                        // setFullData(data);
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
                                <Button type="primary" htmlType="submit" style={{ flex: 1 }}>
                                    Yuborish
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </PageContainer>
    )
}
