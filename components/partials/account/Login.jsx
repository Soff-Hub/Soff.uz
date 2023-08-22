import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { isLoginning, login } from '../../../store/auth/action';

import { Form, Input, notification, Modal } from 'antd';
import { connect } from 'react-redux';
import useAuth from '~/hooks/useAuth';
// import Modal from 'antd/lib/modal/Modal';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static getDerivedStateFromProps(props) {
        if (props.isLoggedIn === true) {

            // Router.push('/');
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
        await this.props.dispatch(isLoginning());
    }

    handleLoginSubmit = async (e) => {
        console.log('test', e);
        const { loginUser } = useAuth();

        const user = await loginUser(e);
        console.log('loginUser', user.data, user.statusCode);
        // this.props.dispatch(login());
        // Router.push('/');

        if (user) {
            if (user.status >= 400) {
                const modal = Modal.error({
                    centered: true,
                    title: 'Nimadir xato bor!',
                    content: user.data.message,
                });
                modal.update;
            } else {
                this.props.dispatch(login({ user: user.data }));
                Router.push('/');
            }
        }
    };

    componentDidMount() {
        this.defaultRoutePage()
    }

    render() {
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleLoginSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
                                    <a>Login</a>
                                    <a>Kirish</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/account/register">

                                    <a>Ro'yxatdan o'tish</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">

                                <h5>Profilga kirish</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="phone"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Telefon raqam',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Telefon raqam"
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group form-forgot">
                                    <Form.Item
                                        name="password"
                                        rules={[
                                            {
                                                required: true,

                                                message: 'Parolni kiriting',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="password"
                                            placeholder="Parol..."
                                        />
                                    </Form.Item>
                                </div>
                                <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="remember-me"
                                            name="remember-me"
                                        />
                                        {/* <label htmlFor="remember-me">
                                            Rememeber me
                                        </label> */}
                                    </div>
                                </div>
                                <div className="form-group submit">
                                    <button
                                        type="submit"
                                        className="ps-btn ps-btn--fullwidth">
                                        Login
                                    </button>
                                </div>

                                <p style={{paddingBottom:'15px'}} className='mb-4'>Parolni <Link href='/account/qayta-nomer-kiritish'>unutdingizmi?</Link>  </p>
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
export default connect(mapStateToProps)(Login);
