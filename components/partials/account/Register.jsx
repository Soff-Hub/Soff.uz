import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import ModalTanishuv from './modules/Modal-tanishuv';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: true,
            chekked: false,
            passwordFocused: false,
            inputType: 'text',
            inputLength: ''
        };
    }

    handleSubmit = async (e) => {
        const url = this.props.url;
        const { registerUser } = useAuth();
        const user = await registerUser(url, e);
        if (user) {
            if (user.status >= 400) {
                let message = '';
                const modal = Modal.error({
                    centered: true,
                    title: "Xatolik",
                    content: user?.data?.msg[0],
                });
                modal.update;
            } else if (user.status == 200 || user.status == 201) {
                this.setState({ report: !this.state.report });
                localStorage.setItem('token', user.data.access);
                localStorage.setItem('via_', user?.data?.via_);
                localStorage.setItem('data', JSON.stringify(e));


                Router.push(`/account/Message?via=${user.data.via_}`);
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
        if (e.target.value === "") {
            this.setState({ inputType: 'text' })
            this.setState({ inputLength: '' })
            return;
        }
        const value = e.target.value.split('')
        if (value[0] === "+") {
            this.setState({ inputType: 'tel' })
            this.setState({ inputLength: '13'})
        }
        else {
            this.setState({ inputType: 'text' })
            this.setState({inputLength: ''})
        }
    }

    handleEnterKeyPress2 = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.password2Input.focus();
        }
    };

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleSubmit}>
                        <ul className="ps-tab-list">
                            <li>
                                <Link href="/account/login">
                                    <a>Kirish</a>
                                </Link>
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
                                                required:'true',
                                                message:
                                                    'Iltimos telefon raqam yoki emailingizni  kiriting!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type={this.state.inputType}
                                            placeholder="Telefon raqam yoki email"
                                            onKeyDown={this.handleEnterKeyPress}
                                            onChange={this.handleChangeType}
                                            maxLength={this.state.inputLength}
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
                                                message: 'Parolni kiriting!',
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
                                                (this.password2Input = input)
                                            }
                                        />
                                    </Form.Item>

                                    <div className="tanishuv-chekbox">
                                        <label className="chekboxx">
                                            <input
                                                required
                                                type="checkbox"
                                                onChange={this.handleChekked}
                                            />
                                        </label>
                                        <Link href="#">
                                            <a
                                                data-bs-target="#exampleModalToggleEditCategory2"
                                                data-bs-toggle="modal"
                                                className=" p-0 ms-lg-2 m-0 tanishuv-sharti-title">
                                                Tanishib chiqdim , shartlariga
                                                roziman!
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                                <div className="form-group submit">
                                    {this.state.report ? (
                                        this.state.chekked ? (
                                            <button
                                                type="submit"
                                                className="ps-btn ps-btn--fullwidth mb-5">
                                                Ro'yxatdan o'tish
                                            </button>
                                        ) : (
                                            <button
                                                disabled={true}
                                                style={{
                                                    cursor: 'not-allowed',
                                                }}
                                                type="submit"
                                                className="ps-btn ps-btn--fullwidth mb-5">
                                                Ro'yxatdan o'tish
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth mb-5">
                                            <BeatLoader color="#fff" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Form>

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
export default connect(mapStateToProps)(Register);
