import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Router, { useRouter, withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, notification, Segmented } from 'antd';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { begin, checkAuthorization, login } from '~/rtk-store/auth';
import { setSavedPrfileData } from '~/rtk-store/ecomerce';
import GetRepository from '~/reositoriy-admin/GetRepository';

const Login = () => {
    const dispatch = useDispatch();
    const { loginUser, registerGoogleUser } = useAuth();
    const [report, setReport] = useState(true);
    const [reportGoogle, setReportGoogle] = useState(true);
    const [segmentValue, setSegmentValue] = useState('email');
    const [phone, setPhone] = useState('');
    const [value, setValue] = useState('');
    const passwordInput = useRef();

    const router = useRouter()

    useEffect(() => {
        dispatch(checkAuthorization());
        setValue(JSON.parse(localStorage.getItem('data'))?.phone_or_email);
    }, [dispatch]);

    const handleChange = (e) => {
        setPhone(e.target.value);
    };

    const handleLoginSubmit = async (e) => {
        const data = {
            phone_or_email: e.phone ? '+998' + e.phone : e.email,
            password: e.password,
        };

        setReport(false);
        const user = await loginUser(data);
        if (user) {
            if (user.status >= 400) {
                setReport(true);
                notification.open({
                    message: `${user?.data?.msg}`,
                    duration: 500,
                    type: 'error',
                });
            } else {
                dispatch(login({ user: user.data, data }));
                dispatch(begin({ id: user.data.first }));
                const profileData = await GetRepository.getProfile(user.data?.access);
                if (profileData) {
                    dispatch(setSavedPrfileData(profileData));
                }
                setReport(true);
                notification.open({
                    message: `${user?.data?.msg}`,
                    description: 'Siz saytga muvaffaqqiyatli kirdingiz!',
                    type: 'success',
                });

                if (router.query.id) {
                    Router.push(`/account/checkout-one?id=${router.query.id}`);
                } else if (router.query.deal) {
                    Router.push('/account/all-orders');
                } else {
                    if (user?.data?.role === 'seller' || user?.data?.role === 'admin') {
                        router.push('/account/dashbord');
                    } else if (user?.data?.role === 'customer') {
                        router.push('/account/sellerproducts');
                    }
                }
            }
        }
    };

    const handleGoogleClick = async () => {
        setReportGoogle(false);
        window.location = 'http://api.soff.uz/auth/social/login/seller?seller_page=true';
        const user = await registerGoogleUser('/auth/google-login', 'seller');
        if (user) {
            if (user.status >= 400 && user.status !== 500) {
                setReportGoogle(true);
                Modal.error({
                    centered: true,
                    title: 'Xatolik',
                    content: user?.data?.msg[0],
                });
            } else if (user.status === 200 || user.status === 201) {
                setReportGoogle(true);
            }
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (!/[0-9\s]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Enter') {
            e.preventDefault();
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.current.focus();
        }
    };

    const { deal, id } = router?.query;

    return (
        <>
            <Form onFinish={handleLoginSubmit}>
                <div className="d-flex flex-column mb-4">
                    <Link href={(id ? `/account/login?id=${id}` : deal ? `/account/login?deal=${deal}` : '/account/login')}>
                        <a style={{ fontSize: '32px', fontWeight: 700 }}>Kirish</a>
                    </Link>
                </div>

                <Segmented
                    onChange={(value) => setSegmentValue(value)}
                    options={[
                        { label: 'Elektron pochta', value: 'email', icon: <MailOutlined /> },
                        { label: 'Telefon raqam', value: 'phone', icon: <PhoneOutlined /> },
                    ]}
                    block
                    className="mb-5"
                    style={{ height: '50px' }}
                />

                {segmentValue === 'email' ? (
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Elektron pochta kiritish majburiy' },
                            { type: 'email', message: 'Iltimos, haqiqiy elektron pochta kiriting' },
                        ]}
                    >
                        <Input
                            style={{ fontSize: '16px' }}
                            addonBefore={<MailOutlined style={{ fontSize: '20px', padding: '0 10px' }} />}
                            type="email"
                            placeholder="Elektron pochta"
                            onKeyDown={handleEnterKeyPress}
                            autoComplete="email"
                            name="email"
                        />
                    </Form.Item>
                ) : (
                    <Form.Item
                        name="phone"
                        rules={[
                            { required: true, message: 'Telefon raqam kiritish majburiy' },
                            { pattern: /^\d{9}$/, message: 'Iltimos, haqiqiy telefon raqam kiriting' },
                        ]}
                    >
                        <Input
                            style={{ fontSize: '16px' }}
                            type="text"
                            value={phone}
                            onChange={handleChange}
                            placeholder="Telefon raqam"
                            maxLength={9}
                            onKeyDown={handleKeyDown}
                            addonBefore="+998"
                            autoComplete="phone"
                            name="phone"
                        />
                    </Form.Item>
                )}

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Parolni kiriting' }]}
                    hasFeedback
                >
                    <Input.Password
                        style={{ height: '50px', fontSize: '16px' }}
                        prefix={<LockOutlined style={{ fontSize: '20px', padding: '0 10px' }} />}
                        type="password"
                        placeholder="Parol"
                        ref={passwordInput}
                    />
                </Form.Item>

                <div className="form-group submit">
                    {report ? (
                        <button type="submit" style={{ color: '#fff' }} className="ps-btn ps-btn--fullwidth">
                            Kirish
                        </button>
                    ) : (
                        <button disabled type="submit" className="ps-btn ps-btn--fullwidth mb-5">
                            <BeatLoader color="#fff" />
                        </button>
                    )}
                </div>

                <div className="or_google">
                    <span></span>
                    <span>yoki </span>
                    <span></span>
                </div>
            </Form>

            <div className="google_account">
                {reportGoogle ? (
                    <div onClick={handleGoogleClick} className="ps-btn ps-btn--fullwidth d-flex justify-content-center gap-2">
                        <span>Google bilan kirish</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="24"
                            height="24"
                            className="LgbsSe-Bz112c"
                        >
                            <g>
                                <path
                                    fill="#EA4335"
                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                />
                                <path
                                    fill="#4285F4"
                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                />
                                <path
                                    fill="#FBBC05"
                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                />
                                <path
                                    fill="#34A853"
                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                />
                                <path fill="none" d="M0 0h48v48H0z" />
                            </g>
                        </svg>
                    </div>
                ) : (
                    <button disabled type="submit" className="ps-btn ps-btn--fullwidth">
                        <BeatLoader color="#fff" />
                    </button>
                )}
                <p className="mb-3 mt-4">
                    <Link href="/account/re-enter-number">
                        <a style={{ fontSize: '16px', fontWeight: 500, color: '#00A44F' }}>Parolni unutdingizmi?</a>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login
