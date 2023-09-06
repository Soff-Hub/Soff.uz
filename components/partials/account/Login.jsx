import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';

import { isLoginning, login, loginGetData } from '../../../store/auth/action';

import { Form, Input, notification, Modal } from 'antd';
import { connect } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
// import Modal from 'antd/lib/modal/Modal';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: true,
            value: ''
        };
    }
    modalSuccess = (type) => {
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
        await this.props.dispatch(isLoginning());
    };

    handleLoginSubmit = async (e) => {
        const { loginUser } = useAuth();

        const user = await loginUser(e);

        if (user) {
            if (user.status >= 400) {
                notification.open({
                    message: "Nimadir noto'g'ri bajarildi",
                    description:
                        "Parol yoki raqam xato kiritilgan bo'lshi mumkin!",
                    duration: 500,
                });
            } else {
                this.setState({ report: !this.state.report });
                notification.open({
                    message: 'Xush kelibsiz saytimizga!',
                    description: 'Siz muvaffaqqiyatli kirdingiz!',
                    type: 'success',
                });
                this.props.dispatch(login({ user: user.data, data: e }));

                Router.push('/');
            }
        }
    };

    componentDidMount() {
        this.defaultRoutePage();
        this.setState({value: JSON.parse(localStorage.getItem('data'))?.phone})

    }

    render() {
        console.log('vvvvv', this.state.value);
        return (
            <div className="ps-my-account">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={this.handleLoginSubmit.bind(this)}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <Link href="/account/login">
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
                                        // defaultValue={this.state.value}
                                        defaultValue ={JSON.parse(localStorage.getItem('data'))?.phone ? JSON.parse(localStorage.getItem('data')).phone : ''}
                                            className="form-control"
                                            type="text"
                                            placeholder="Telefon raqam"
                                            maxLength="13"
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
                                {/* <div className="form-group">
                                    <div className="ps-checkbox">
                                        <input
                                            className="form-control"
                                            type="checkbox"
                                            id="remember-me"
                                            name="remember-me"
                                        />
                                    </div>
                                </div> */}
                                <div className="form-group submit">
                                    {this.state.report ? (
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth">
                                            Kirish
                                        </button>
                                    ) : (
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth mb-5">
                                            <BeatLoader color="#fff" />
                                        </button>
                                    )}
                                </div>

                                <p
                                    style={{ paddingBottom: '15px' }}
                                    className="mb-4">
                                    Parolni{' '}
                                    <Link href="/account/qayta-nomer-kiritish">
                                        unutdingizmi?
                                    </Link>{' '}
                                </p>
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
