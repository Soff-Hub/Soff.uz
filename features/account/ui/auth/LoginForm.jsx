import { useState } from 'react';
import { Divider, Form, Input, Modal, Segmented } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import GoogleBox from './GoogleBox';
import { BeatLoader } from 'react-spinners';
import axios from 'axios';
import { useRouter } from 'next/router';
import { baseUrlAuth } from '~/repositories/Repository';
import { useMutation } from '@tanstack/react-query';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

const formInputs = {
    phone: (
        <Form.Item
            name="phone"
            rules={[
                {
                    required: true,
                    message: 'Telefon raqam kiritish majburiy',
                },
                {
                    pattern: /^\d{9}$/,
                    message: 'Iltimos, haqiqiy telefon raqam kiriting',
                },
            ]}
            normalize={(value) => value.replace(/\D/g, '').slice(0, 9)}>
            <Input
                autoComplete="off"
                style={{ height: '50px', fontSize: '16px' }}
                type="text"
                placeholder="Telefon raqam"
                addonBefore="+998"
            />
        </Form.Item>
    ),
    email: (
        <Form.Item
            name="email"
            className="mb-4"
            rules={[
                {
                    required: true,
                    message: 'Elektron pochta kiritish majburiy',
                },
                {
                    type: 'email',
                    message: 'Iltimos, haqiqiy elektron pochta kiriting',
                },
            ]}>
            <Input
                style={{ height: '50px', fontSize: '16px' }}
                addonBefore={
                    <MailOutlined
                        style={{
                            fontSize: '16px',
                            padding: '0 8px',
                        }}
                    />
                }
                type="email"
                placeholder="Elektron pochta"
            />
        </Form.Item>
    ),
};

const segmentOptions = [
    {
        label: 'Telefon raqam',
        value: 'phone',
        icon: <PhoneOutlined />,
    },
    {
        label: 'Elektron pochta',
        value: 'email',
        icon: <MailOutlined />,
    },
];

export default function LoginForm({
    onSuccess,
    isModal,
    setCode,
    openTelegram,
    onGoogleSuccessNavigateTo,
}) {
    const [type, setType] = useState('phone'); // phone, email
    const router = useRouter();

    const {
        mutate: handleSubmit,
        isPending: loading,
        isSuccess,
    } = useMutation({
        mutationKey: ['auth-register'],
        mutationFn: async ({ phone, email }) => {
            const utm_source = safeLocalStorage.getItem('utm_source');
            const data = {
                phone_or_email: type === 'phone' ? '+998' + phone : email,
                role: 'customer',
            };
            const resp = await axios.post(
                baseUrlAuth +
                    `auth/register/${
                        utm_source ? `?utm_source=${utm_source}` : ''
                    }`,
                data
            );
            safeLocalStorage.setItem('via_', resp?.data?.via_);
            safeLocalStorage.setItem('msg', resp?.data?.msg);
            safeLocalStorage.setItem('data', JSON.stringify(data));
            return resp;
        },
        onSuccess: (resp) => {
            if (isModal) {
                onSuccess();
                setCode(resp.data?.user);
            } else {
                router.push({
                    query: {
                        ...router.query,
                        user: resp.data?.user,
                    },
                    pathname: '/auth/code-verify',
                });
            }
        },
        onError: (error) => {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik',
                content:
                    error?.response?.data?.msg ||
                    JSON.stringify(error?.response),
            });
            modal.update;
        },
    });

    const disableAllInputs = loading || isSuccess;

    const submitButtonContent = disableAllInputs ? (
        <BeatLoader color="#fff" />
    ) : (
        "Ko'dni olish"
    );

    return (
        <div style={{ backgroundColor: '#f1f1f1', padding: '50px 20px' }}>
            <div className="container p-0">
                <div className="ps-form--account">
                    <Form onFinish={handleSubmit}>
                        <div className="d-flex justify-content-center align-items-center flex-column mb-4">
                            <span style={{ fontSize: '28px', fontWeight: 700 }}>
                                Kirish
                            </span>
                        </div>
                        <GoogleBox
                            isModal={isModal}
                            onGoogleSuccessNavigateTo={
                                onGoogleSuccessNavigateTo
                            }
                            openTelegram={openTelegram}
                            setCode={setCode}
                            params={
                                router.query?.id ? `?id=${router.query.id}` : ''
                            }
                        />

                        <Divider
                            size="large"
                            style={{ borderColor: 'rgba(0,0,0,0.2)' }}>
                            Yoki
                        </Divider>
                        <Segmented
                            onChange={setType}
                            options={segmentOptions}
                            block
                            className="mb-5"
                            size="small"
                            style={{ height: '38px' }}
                            value={type}
                        />

                        {/* NOTE: Dynamic inputs based segment*/}
                        {formInputs[type]}

                        <div className="form-group submit mt-5">
                            <button
                                type="submit"
                                disabled={disableAllInputs}
                                className="ps-btn text-white fw-normal ps-btn--fullwidth">
                                {submitButtonContent}
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}
