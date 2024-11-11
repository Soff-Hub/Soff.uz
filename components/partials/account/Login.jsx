import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Modal, notification, Segmented } from 'antd';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { begin, checkAuthorization, login } from '~/rtk-store/auth';

const Login = (props) => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { loginUser, registerGoogleUser } = useAuth();
    const [report, setReport] = useState(true);
    const [reportGoogle, setReportGoogle] = useState(true);
    const [segmentValue, setSegmentValue] = useState('email');
    const [phone, setPhone] = useState('');
    const [value, setValue] = useState('');
    const passwordInput = useRef();

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
                setReport(true);
                notification.open({
                    message: `${user?.data?.msg}`,
                    description: 'Siz saytga muvaffaqqiyatli kirdingiz!',
                    type: 'success',
                });

                if (props.router.query.id) {
                    Router.push(`/account/checkout-one?id=${props.router.query.id}`);
                } else if (props.router.query.deal) {
                    Router.push('/account/all-orders');
                } else {
                    if (user?.data?.role === 'seller' || user?.data?.role === 'admin') {
                        Router.push('/account/dashbord');
                    } else if (user?.data?.role === 'customer') {
                        Router.push('/account/sellerproducts');
                    }
                }
            }
        }
    };

    const handleGoogleClick = async () => {
        setReportGoogle(false);
        const url = props.url;
        window.location = 'http://api.soff.uz/auth/social/login/seller?seller_page=true';
        const user = await registerGoogleUser(url, 'seller');
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

    const { deal, id } = props?.router?.query;

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
                    <div onClick={handleGoogleClick} className="ps-btn ps-btn--fullwidth">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="50" viewBox="0 0 48 48">
                            {/* SVG paths */}
                        </svg>
                        Google account
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

export default withRouter(Login);
