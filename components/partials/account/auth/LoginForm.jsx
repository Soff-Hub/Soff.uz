import React, { useState } from 'react';
import { Form, Input, Modal, Segmented } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';
import GoogleBox from './GoogleBox';
import { BeatLoader } from 'react-spinners';
import Axios from 'axios';
import { useRouter } from 'next/router';
import { baseUrlAuth } from '~/repositories/Repository';

export default function LoginForm() {
    const [type, setType] = useState('t'); // t, e
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async ({ phone, email }) => {
        setLoading(true);

        const data = {
            phone_or_email: type === 't' ? '+998' + phone : email,
            role: 'customer',
        };

        try {
            const resp = await Axios.post(baseUrlAuth + 'auth/register/', data);
            localStorage.setItem('via_', resp?.data?.via_);
            localStorage.setItem('msg', resp?.data?.msg);
            localStorage.setItem('data', JSON.stringify(data));
            router.push({
                query: { ...router.query, user: resp.data?.user },
                pathname: '/auth/code-verify',
            });
        } catch (err) {
            setLoading(false);
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik',
                content:
                    err?.response?.data?.msg || JSON.stringify(err?.response),
            });
            modal.update;
        }
    };

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
                        <Segmented
                            onChange={(value) => setType(value)}
                            options={[
                                {
                                    label: 'Telefon raqam',
                                    value: 't',
                                    icon: <PhoneOutlined />,
                                },
                                {
                                    label: 'Elektron pochta',
                                    value: 'e',
                                    icon: <MailOutlined />,
                                },
                            ]}
                            block
                            className="mb-5"
                            size="small"
                            style={{ height: '38px' }}
                            value={type}
                        />

                        {type === 'e' ? (
                            <Form.Item
                                name="email"
                                className="mb-4"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Elektron pochta kiritish majburiy',
                                    },
                                    {
                                        type: 'email',
                                        message:
                                            'Iltimos, haqiqiy elektron pochta kiriting',
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
                        ) : (
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Telefon raqam kiritish majburiy',
                                    },
                                    {
                                        pattern: /^\d{9}$/,
                                        message:
                                            'Iltimos, haqiqiy telefon raqam kiriting',
                                    },
                                ]}
                                normalize={(value) => value.replace(/\D/g, "").slice(0, 9)}
                                >
                                <Input
                                    autoComplete="off"
                                    style={{ height: '50px', fontSize: '16px' }}
                                    type="text"
                                    placeholder="Telefon raqam"
                                    addonBefore="+998"
                                />
                            </Form.Item>
                        )}

                        <div className="form-group submit mt-5">
                            {loading ? (
                                <button
                                    disabled={true}
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    <BeatLoader color="#fff" />
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Davom etish
                                </button>
                            )}
                        </div>

                        {/* <div className="or_google mt-2 mb-3">
                            <span></span>
                            <span>YOKI</span>
                            <span></span>
                        </div> */}

                        <GoogleBox
                            params={
                                router.query?.id ? `?id=${router.query.id}` : ''
                            }
                        />
                    </Form>
                </div>
            </div>
        </div>
    );
}
