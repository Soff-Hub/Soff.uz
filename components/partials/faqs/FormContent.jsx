import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import CaptchaForm from '~/components/captcha/CaptchaForm';
const App = () => {
    const [form] = Form.useForm();
    const { feedbackPost } = useAuth();
    const onFinish = async (values) => {
        console.log('Received values of form: ', values);
        const respons = await feedbackPost(values);
        console.log(respons);
        if (respons.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `${
                    respons?.data?.msg
                        ? respons?.data?.msg
                        : 'Xabaringiz muvaffaqqiyatli qabul qilindi'
                }`,
            });
            modal.update;
        } else if (respons.status === 404) {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `${
                    respons?.data?.msg
                        ? respons?.data?.msg
                        : 'Xabaringiz muvaffaqqiyatli qabul qilindi'
                }`,
            });
            modal.update;
        }
        form.resetFields();
    };

    return (
        <Form
            className="ps-form--contact-us "
            form={form}
            onFinish={onFinish}
            style={{
                maxWidth: 800,
                minHeight: '52px',
            }}
            scrollToFirstError>
            <h3 className="my-xl-5 text-center">Xabar jo'natish</h3>
            <div className="row">
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                    <div className="form-group">
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Ism familiyangizni kiriting',
                                },
                            ]}
                            hasFeedback>
                            <Input
                                className="inputt"
                                placeholder="Ism familiya"
                            />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 ">
                    <div className="form-group">
                        <Form.Item
                            name="email_or_phone"
                            rules={[
                                {
                                    type: 'text',
                                    message:
                                        'Email yoki telefon raqamingizni kiriting',
                                },
                                {
                                    required: true,
                                    message:
                                        'Email yoki telefon raqamingizni kiriting',
                                },
                            ]}>
                            <Input placeholder="Email yoki telefon raqam" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                    <div className="form-group">
                        <Form.Item
                            name="subject"
                            tooltip="What do you want others to call you?"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Yuborayotgan xabaringizga mavzu yozing',
                                    whitespace: true,
                                },
                            ]}>
                            <Input placeholder="Mavzu" />
                        </Form.Item>
                    </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                    <div className="form-group">
                        <Form.Item
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Xabar yozing',
                                },
                            ]}>
                            <Input.TextArea
                                showCount
                                maxLength={100}
                                placeholder="Xabar"
                            />
                        </Form.Item>
                    </div>
                </div>

                <div className="form-group submit">
                    <Form.Item>
                        <Button htmlType="submit" className="ps-btn">
                            Yuborish
                        </Button>
                    </Form.Item>
                    <CaptchaForm/>
                </div>
            </div>
        </Form>
    );
};
export default App;
