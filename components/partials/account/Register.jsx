import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isLoginning, login } from '../../../store/auth/action';

import { Form, Input, Modal } from 'antd';
import { connect, useDispatch } from 'react-redux';
import useAuth from '~/hooks/useAuth';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    // defaultRoutePage = async () => {
    //     await this.props.dispatch(isLoginning());
    // }

    handleSubmit = async (e) => {
        // e.preventDefault();
        const url = this.props.url;
        localStorage.setItem('data', JSON.stringify(e));
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
                // this.props.dispatch(login({ user: user.data }));
                localStorage.setItem('token', user.data.access);
                Router.push('/account/xabar');
            }
        }
    };

    // componentDidMount() {
    //     this.defaultRoutePage()
    // }

    render() {
        console.log(this.props.url);
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
                                            type="text"
                                            placeholder="Telefon number"
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
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Ro'yxatdan o'tish
                                    </button>
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
