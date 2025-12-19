import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { begin, checkAuthorization, login } from '../../../store/auth/slice';
import { Form, Input, Modal, notification, Segmented } from 'antd';
import { connect } from 'react-redux';
import useAuth from '~/shared/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import { withRouter } from 'next/router';
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: true,
            reportGoogle: true,
            value: '',
            segmentValue: 'phone',
            phone: ''
        };
    }

    handleChange = (e) => {
        const value = e.target.value;
        this.setState({ phone: value });
    };




    modalSuccess = () => {
        notification.open({
            message: 'Xush kelibsiz saytimizga!',
            description: 'Siz muvaffaqqiyatli kirdingiz!',
        });
    };


    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {
        }
        return false;
    }

    handleFeatureWillUpdate(e) {
        e.preventDefault();
        notification.open({
            message: 'Opp! Something went wrong.',
            description: 'This feature has been updated later!',
            duration: 500,
        });
    }

    defaultRoutePage = async () => {
        await this.props.dispatch(checkAuthorization());
    };


    handleLoginSubmit = async (e) => {
        const data = {
            phone_or_email: e.phone ? '+998' + e.phone : e.email,
            password: e.password
        }

        this.setState({ report: false });
        const { loginUser } = useAuth();
        const user = await loginUser(data);
        if (user) {
            if (user.status >= 400) {
                this.setState({ report: true });
                notification.open({
                    message: `${user?.data?.msg}`,
                    duration: 500,
                    type: 'error',
                });
            } else {
                this.props.dispatch(login({ user: user.data, data: data }));
                this.props.dispatch(begin({ id: user.data.first }));
                this.setState({ report: true });
                notification.open({
                    message: `${user?.data?.msg}`,
                    description: 'Siz saytga muvaffaqqiyatli kirdingiz!',
                    type: 'success',
                });


                if (this.props.router.query.id) {
                    Router.push(
                        `/account/checkout-one?id=${this.props.router.query.id}`
                    );
                } else if (this.props.router.query.deal) {
                    Router.push(
                        `/account/all-orders`
                    );
                }
                else {
                    if (
                        user?.data?.role === 'seller' ||
                        user?.data?.role === 'admin'
                    ) {
                        Router.push('/account/dashbord');
                    } else if (user?.data?.role === 'customer') {
                        Router.push('/account/sellerproducts');
                    }
                }
            }
        }
    };

    handleGoogleClick = async (e) => {
        this.setState({ reportGoogle: false });
        const { registerGoogleUser } = useAuth();
        const url = this.props.url;
        window.location = 'https://api.soff.uz/auth/social/login/customer';
        const user = await registerGoogleUser(url, this.state.role);
        if (user) {
            if (user.status >= 400 && user.status !== 500) {
                this.setState({ reportGoogle: true });
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik',
                    content: user?.data?.msg[0],
                });
                modal.update;
            } else if (user.status == 200 || user.status == 201) {
                this.setState({ reportGoogle: true });
                // localStorage.setItem('token', user.data.access);
            }
        }
    };

    componentDidMount() {
        this.defaultRoutePage();
        this.setState({
            value: JSON.parse(localStorage.getItem('data'))?.phone_or_email,
        });
    }

    handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.passwordInput.focus();
        }
    };

    handleKeyDown = (e) => {
        // Block incorrect characters
        if (!/[0-9\s]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'Enter') {
            e.preventDefault();
        }

        // Handle Enter key
        if (e.key === 'Enter') {
            e.preventDefault();
            this.passwordInput.focus(); // Change `this.passwordInput` to the actual reference to your next input field
        }
    };



    render() {

        const { deal, id } = this.props?.router?.query;


        return (
            <div style={{ backgroundColor: '#f1f1f1', padding: "50px 20px" }}>

                <div className="container p-0">
                    <div className="ps-form--account">

                        <Form onFinish={this.handleLoginSubmit.bind(this)}>

                            <div className="d-flex justify-content-center align-items-center flex-column mb-4">
                                <Link href={
                                    (id) ? `/auth/login?id=${id}` :
                                        (deal) ? `/auth/login?deal=${deal}` :
                                            "/auth/login"
                                }>
                                    <a style={{ fontSize: "28px", fontWeight: 700 }}>Kirish</a>
                                </Link>
                                <div className='d-flex gap-3 align-items-center'>
                                    <span className='register_title' style={{ fontSize: "16px", fontWeight: 500 }}>Hisobingiz yo'qmi?</span>

                                    <Link style={{ fontSize: "12px" }} href={
                                        (id) ? `/auth/login?id=${id}` :
                                            (deal) ? `/auth/login?deal=${deal}` :
                                                "/auth/login"
                                    }
                                    >


                                        <a className='register_title' style={{ fontSize: "16px", fontWeight: 500, color: "#00A44F" }}>Ro'yxatdan o'tish</a>
                                    </Link>
                                </div>


                            </div>

                            <Segmented
                                onChange={(value) => this.setState({ segmentValue: value })}

                                options={[{
                                    label: 'Telefon raqam',
                                    value: 'phone',
                                    icon: <PhoneOutlined />,
                                },
                                {
                                    label: 'Elektron pochta',
                                    value: 'email',
                                    icon: <MailOutlined />,
                                },]}
                                block className='mb-5 ' style={{ height: "50px" }} />


                            {this.state.segmentValue === "email" ?

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
                                    ]}
                                >
                                    <Input
                                        style={{ height: '50px', fontSize: '16px' }}
                                        prefix={<MailOutlined style={{ fontSize: '20px', padding: '0 10px' }} />}
                                        type="email"
                                        placeholder="Elektron pochta"
                                        onKeyDown={this.handleEnterKeyPress}
                                    />
                                </Form.Item> :

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
                                            message: 'Iltimos, haqiqiy telefon raqam kiriting',
                                        },

                                    ]}>
                                    <Input
                                        autoComplete="off"
                                        style={{ height: "50px", fontSize: "16px" }}
                                        type='text'
                                        value={this.state.phone}
                                        onChange={this.handleChange}
                                        placeholder="Telefon raqam"
                                        maxLength={9} // 9 belgidan ortiq kiritishni cheklash
                                        onKeyDown={this.handleKeyDown}
                                        addonBefore="+998" // Prefiksni qo'shish


                                    />
                                </Form.Item>

                            }


                            <Form.Item
                                name="password"

                                rules={[
                                    {
                                        required: true,
                                        message: 'Parolni kiriting',
                                    },
                                ]}
                                hasFeedback
                            >
                                <Input.Password
                                    style={{ height: "50px", fontSize: "16px" }}
                                    prefix={<LockOutlined style={{ fontSize: "20px", padding: "0 10px" }} />}
                                    type="password"
                                    placeholder="Parol"
                                    ref={(input) =>
                                        (this.passwordInput = input)
                                    }
                                />
                            </Form.Item>




                            <div className="form-group submit">
                                {this.state.report ? (
                                    <button
                                        type="submit"
                                        style={{ color: '#fff' }}
                                        className="ps-btn ps-btn--fullwidth">
                                        Kirish
                                    </button>
                                ) : (
                                    <button
                                        disabled={true}
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth mb-5">
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
                            {this.state.reportGoogle ? (
                                <div
                                    onClick={this.handleGoogleClick}
                                    className="ps-btn ps-btn--fullwidth">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        x="0px"
                                        y="0px"
                                        width="30"
                                        height="50"
                                        viewBox="0 0 48 48">
                                        <path
                                            fill="#fbc02d"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                        <path
                                            fill="#e53935"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                        <path
                                            fill="#4caf50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                        <path
                                            fill="#1565c0"
                                            d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    </svg>
                                    oogle account
                                </div>
                            ) : (
                                <button
                                    disabled={true}
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    <BeatLoader color="#fff" />
                                </button>
                            )}
                            <p className="mb-3 mt-4">
                                <Link href="/account/re-enter-number">
                                    <a style={{ fontSize: "16px", fontWeight: 500, color: "#00A44F" }}>Parolni unutdingizmi?</a>
                                </Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(withRouter(Login));
