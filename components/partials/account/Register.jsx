import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { isLoginning, login } from '../../../store/auth/action';

import { Form, Input, Modal } from 'antd';
import { connect, useDispatch } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: true,
        };
    }

 
    handleSubmit = async (e) => {
        const url = this.props.url;
        const { registerUser } = useAuth();
        const user = await registerUser(url, e);
            if (user.data) {
                if (user.status >= 400) {
                    let message = '';
                    const modal = Modal.error({
                        centered: true,
                        title: 'Nimadir xato bor!',
                        content: message,
                    });
                    modal.update;
                } else if (user.status == 200 || user.status == 201) {
                    this.setState({ report: !this.state.report });
                    localStorage.setItem('token', user.data.access);
                    localStorage.setItem('data', JSON.stringify(e));

                    Router.push('/account/xabar');
                }
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
                                    <p>Telefon</p>
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Iltimos telefon raqamingizni kiriting!',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            maxLength="13"
                                            type="text"
                                            placeholder="+998 00 000 00 00"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <p>Password</p>
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
                                            placeholder="Password..."
                                        />
                                    </Form.Item>
                                </div>

                                <div className="form-group form-forgot">
                                    <p>Password 2</p>
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
                                            placeholder="Password 2..."
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group submit">
                                    {this.state.report ? (
                                        <button
                                           
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth mb-5">
                                            Ro'yxatdan o'tish
                                        </button>
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
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(Register);
