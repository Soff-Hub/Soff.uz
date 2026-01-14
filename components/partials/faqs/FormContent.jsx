import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import useAuth from '~/shared/hooks/useAuth';
import { useTranslation } from 'next-i18next';
// import CaptchaForm from '~/components/captcha/CaptchaForm';
const App = () => {
    const { t } = useTranslation('form');
    const [form] = Form.useForm();
    const { feedbackPost } = useAuth();
    const onFinish = async values => {
        const respons = await feedbackPost(values);
        if (respons.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: t('content.modals.success.title'),
                content: `${
                    respons?.data?.msg
                        ? respons?.data?.msg
                        : t('content.modals.success.defaultMessage')
                }`,
            });
            modal.update;
        } else if (respons.status === 404) {
            const modal = Modal.error({
                centered: true,
                title: t('content.modals.error.title'),
                content: `${
                    respons?.data?.msg
                        ? respons?.data?.msg
                        : t('content.modals.error.defaultMessage')
                }`,
            });
            modal.update;
        }
        form.resetFields();
    };

    return (
        <>
            <div className='mt-4'>
                <h3>{t('content.title')}</h3>
                <p>
                    {t('content.contactInfo')}{' '}
                    <a
                        href='tell:+998910086789'
                        className='text-success text-decoration-underline'>
                        {t('content.phoneNumber')}
                    </a>{' '}
                    {t('content.phoneNote')}
                </p>
                <p>
                    {t('content.emailInfo')}{' '}
                    <a
                        href='mailto:support@soff.uz'
                        className='text-success text-decoration-underline'>
                        {t('content.emailAddress')}
                    </a>{' '}
                    {t('content.emailNote')}
                </p>
            </div>
            <Form
                className='ps-form--contact-us '
                form={form}
                onFinish={onFinish}
                style={{
                    maxWidth: 800,
                    minHeight: '52px',
                }}
                scrollToFirstError>
                <h3 className='mt-xl-5'>{t('content.formTitle')}</h3>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 '>
                        <div className='form-group'>
                            <Form.Item
                                name='name'
                                rules={[
                                    {
                                        required: true,
                                        message: t('content.fields.name.error'),
                                    },
                                ]}
                                hasFeedback>
                                <Input
                                    className='inputt'
                                    placeholder={t('content.fields.name.placeholder')}
                                />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 '>
                        <div className='form-group'>
                            <Form.Item
                                name='email_or_phone'
                                rules={[
                                    {
                                        type: 'text',
                                        message: t('content.fields.emailOrPhone.error'),
                                    },
                                    {
                                        required: true,
                                        message: t('content.fields.emailOrPhone.error'),
                                    },
                                ]}>
                                <Input placeholder={t('content.fields.emailOrPhone.placeholder')} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 '>
                        <div className='form-group'>
                            <Form.Item
                                name='subject'
                                tooltip={t('content.fields.subject.tooltip')}
                                rules={[
                                    {
                                        required: true,
                                        message: t('content.fields.subject.error'),
                                        whitespace: true,
                                    },
                                ]}>
                                <Input placeholder={t('content.fields.subject.placeholder')} />
                            </Form.Item>
                        </div>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 '>
                        <div className='form-group'>
                            <Form.Item
                                name='description'
                                rules={[
                                    {
                                        required: true,
                                        message: t('content.fields.description.error'),
                                    },
                                ]}>
                                <Input.TextArea
                                    showCount
                                    maxLength={100}
                                    placeholder={t('content.fields.description.placeholder')}
                                />
                            </Form.Item>
                        </div>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <div className='form-group submit'>
                            ˝
                            <Button
                                htmlType='submit'
                                className='ps-btn  yuborish'>
                                {t('content.submit')}
                            </Button>
                        </div>
                    </div>
                </div>
            </Form>
        </>
    );
};
export default App;
