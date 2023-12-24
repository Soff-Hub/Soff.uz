import React, { Component } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { Form, Input, Modal, Tooltip } from 'antd';
import { connect } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import ModalTanishuv from './modules/Modal-tanishuv';
import { withRouter } from 'next/router';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: true,
            reportGoogle: true,
            chekked: false,
            passwordFocused: false,
            inputType: 'text',
            inputLength: '',
            role: '',
        };
    }

    handleGoogleClick = async (e) => {
        this.setState({ reportGoogle: false });
        const { registerGoogleUser } = useAuth();
        const url = this.props.url;
        if (this.props.url === 'auth/register/') {
            window.location = 'http://api.soff.uz/auth/social/login/customer';
            const user = await registerGoogleUser(url, 'customer');
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
                    localStorage.setItem('token', user.data.access);
                    localStorage.setItem('via_', user?.data?.via_);
                    localStorage.setItem('data', JSON.stringify(e));
                    if (this.props.router.query.id) {
                        Router.push(
                            `/account/Message?id=${this.props.router.query.id}`
                        );
                    } else {
                        Router.push(`/account/Message?via=${user.data.via_}`);
                    }
                    this.setState({ reportGoogle: true });
                }
            }
        } else if (this.props.url === 'auth/seller-register/') {
            window.location = 'http://api.soff.uz/auth/social/login/seller';
            const user = await registerGoogleUser(url, 'seller');
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
                    localStorage.setItem('token', user.data.access);
                    localStorage.setItem('via_', user?.data?.via_);
                    localStorage.setItem('data', JSON.stringify(e));
                    if (this.props.router.query.id) {
                        Router.push(
                            `/account/Message?id=${this.props.router.query.id}`
                        );
                    } else {
                        Router.push(`/account/Message?via=${user.data.via_}`);
                    }
                    this.setState({ reportGoogle: true });
                }
            }
        }
    };
    handleSubmit = async (e) => {
        this.setState({ report: false });
        const url = this.props.url;
        const { registerUser } = useAuth();
        const user = await registerUser(url, e);
        if (user) {
            if (user.status >= 400 && user.status !== 500) {
                this.setState({ report: true });
                const modal = Modal.error({
                    centered: true,
                    title: 'Xatolik',
                    content: user?.data?.msg[0],
                });
                modal.update;
            } else if (user.status == 200 || user.status == 201) {
                localStorage.setItem('token', user.data.access);
                localStorage.setItem('via_', user?.data?.via_);
                localStorage.setItem('data', JSON.stringify(e));
                if (this.props.router.query.id) {
                    Router.push(
                        `/account/Message?id=${this.props.router.query.id}`
                    );
                } else {
                    Router.push(`/account/Message?via=${user.data.via_}`);
                }
                this.setState({ report: true });
            }
        }
    };

    handleChekked = () => {
        this.setState({ chekked: !this.state.chekked });
    };

    handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.passwordInput.focus();
        }
    };

    handleChangeType = (e) => {
        if (e.target.value === '') {
            this.setState({ inputType: 'text' });
            this.setState({ inputLength: '' });
            return;
        }
        const value = e.target.value.split('');
        if (value[0] === '+') {
            this.setState({ inputType: 'tel' });
            this.setState({ inputLength: '13' });
        } else {
            this.setState({ inputType: 'text' });
            this.setState({ inputLength: '' });
        }
    };

    handleEnterKeyPress2 = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.password2Input.focus();
        }
    };

    componentDidMount() {
        if (this.props.url === 'auth/seller-register/') {
            this.setState({ role: 'seller' });
        }else if (this.props.url === 'auth/register/') {
            this.setState({ role: 'customer' });
        }
    }

    render() {
        console.log(this.props.url);
        const { router } = this.props;
        const { id } = router.query;

        return (
            <div className="ps-my-account">
                <div className="container">
                    <div className="ps-form--account">
                        <Form onFinish={this.handleSubmit}>
                            <ul className="ps-tab-list">
                                <li>
                                    {id ? (
                                        <Link href={`/account/login?id=${id}`}>
                                            <a>Kirish</a>
                                        </Link>
                                    ) : (
                                        <Link
                                            href={`/account/login?role=${this.state.role}`}>
                                            <a>Kirish</a>
                                        </Link>
                                    )}
                                </li>
                                <li className="active">
                                    <Link href="/account/register">
                                        <a>Ro'yxatdan o'tish</a>
                                    </Link>
                                </li>
                            </ul>
                            <div className="ps-tab active" id="register">
                                <div className="ps-form__content">
                                    <h5>Ro'yxatdan o'tish</h5>
                                    <div className="form-group">
                                        <p>Telefon raqam yoki email</p>
                                        <Form.Item
                                            name="phone_or_email"
                                            rules={[
                                                {
                                                    required: 'true',
                                                    message:
                                                        'Iltimos telefon raqam yoki emailingizni  kiriting!',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type={this.state.inputType}
                                                placeholder="Telefon raqam yoki email"
                                                onKeyDown={
                                                    this.handleEnterKeyPress
                                                }
                                                onChange={this.handleChangeType}
                                                maxLength={
                                                    this.state.inputLength
                                                }
                                            />
                                        </Form.Item>
                                    </div>
                                    <div className="form-group form-forgot">
                                        <p>Parol</p>
                                        <Form.Item
                                            name="password"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Parolni kiriting!',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="password"
                                                placeholder="Parol"
                                                ref={(input) =>
                                                    (this.passwordInput = input)
                                                }
                                                onKeyDown={
                                                    this.handleEnterKeyPress2
                                                }
                                            />
                                        </Form.Item>
                                    </div>

                                    <div className="form-group form-forgot">
                                        <p>Parolni takrorlash</p>
                                        <Form.Item
                                            name="password2"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Parolni qayta kiriting!',
                                                },
                                            ]}>
                                            <Input
                                                className="form-control"
                                                type="password"
                                                placeholder="Parolni takrorlash"
                                                ref={(input) =>
                                                    (this.password2Input =
                                                        input)
                                                }
                                            />
                                        </Form.Item>

                                        <div className="tanishuv-chekbox">
                                            <label className="chekboxx">
                                                <input
                                                    required
                                                    type="checkbox"
                                                    onChange={
                                                        this.handleChekked
                                                    }
                                                />
                                            </label>
                                            <Link href="#">
                                                <a
                                                    data-bs-target="#exampleModalToggleEditCategory2"
                                                    data-bs-toggle="modal"
                                                    className=" p-0 ms-lg-2 m-0 tanishuv-sharti-title">
                                                    Tanishib chiqdim,
                                                    shartlariga roziman!
                                                </a>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="form-group submit">
                                        {this.state.report ? (
                                            this.state.chekked ? (
                                                <button
                                                    type="submit"
                                                    className="ps-btn ps-btn--fullwidth">
                                                    Ro'yxatdan o'tish
                                                </button>
                                            ) : (
                                                <Tooltip title="Ro'yxatdan o'tishingiz uchun tanishuv shartlariga rozilik bildirishingiz zarur">
                                                    <button
                                                        disabled={true}
                                                        style={{
                                                            cursor: 'not-allowed',
                                                        }}
                                                        className="ps-btn ps-btn--fullwidth">
                                                        Ro'yxatdan o'tish
                                                    </button>
                                                </Tooltip>
                                            )
                                        ) : (
                                            <button
                                                disabled={true}
                                                type="submit"
                                                className="ps-btn ps-btn--fullwidth">
                                                <BeatLoader color="#fff" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className="or_google">
                                    <span></span>
                                    <span>yoki</span>
                                    <span></span>
                                </div>
                            </div>
                        </Form>

                        <div className="google_account">
                            {this.state.reportGoogle ? (
                                this.state.chekked ? (
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
                                        Google account
                                    </div>
                                ) : (
                                    <Tooltip title="Ro'yxatdan o'tishingiz uchun tanishuv shartlariga rozilik bildirishingiz zarur">
                                        <div
                                            disabled={true}
                                            style={{
                                                cursor: 'not-allowed',
                                            }}
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
                                            Google account
                                        </div>
                                    </Tooltip>
                                )
                            ) : (
                                <button
                                    disabled={true}
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    <BeatLoader color="#fff" />
                                </button>
                            )}
                        </div>
                    </div>
                    <ModalTanishuv
                        dataBsTarget="exampleModalToggleEditCategory2"
                        formID={'modal-tanishuv'}>
                        <div className="container">
                            Tanishuv shartlari...
                            <br /> <br />
                            Biz bilan o'z biznesingizni boshlang!!!
                        </div>
                    </ModalTanishuv>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(withRouter(Register));
