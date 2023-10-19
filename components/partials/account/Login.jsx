import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { isLoginning, login } from '../../../store/auth/action';
import { Form, Input, notification } from 'antd';
import { connect } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import { withRouter } from 'next/router';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: true,
            value: '',
        };
    }
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
        await this.props.dispatch(isLoginning());
    };

    handleLoginSubmit = async (e) => {
        this.setState({ report: false });
        const { loginUser } = useAuth();
        const user = await loginUser(e);
        console.log(user);
        if (user) {
            if (user.status >= 400) {
                this.setState({ report: true });
                notification.open({
                    message: `${user?.data?.msg}`,
                    duration: 500,
                    type: 'error',
                });
            } else {
                this.props.dispatch(login({ user: user.data, data: e }));
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
                } else {
                    if (
                        user?.data?.role === 'seller' ||
                        user?.data?.role === 'admin'
                    ) {
                        Router.push('/account/dashbord');
                    } else if (user?.data?.role === 'customer') {
                        Router.push('/account/myproducts');
                    }
                }
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

    render() {
        const { router } = this.props;
        const { id } = router.query;
        return (
            <div className=" pb-5 " style={{backgroundColor:"#f1f1f1"}}>
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
                                <Link href="/account/selection">
                                    <a>Ro'yxatdan o'tish</a>
                                </Link>
                            </li>
                        </ul>
                        <div className="ps-tab active" id="sign-in">
                            <div className="ps-form__content">
                                <h5>Profilga kirish</h5>
                                <div className="form-group">
                                    <Form.Item
                                        name="phone_or_email"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Telefon raqam yoki email',
                                            },
                                        ]}>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            placeholder="Telefon raqam yoki email"
                                            onKeyDown={this.handleEnterKeyPress}
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
                                            placeholder="Parol"
                                            ref={(input) =>
                                                (this.passwordInput = input)
                                            }
                                        />
                                    </Form.Item>
                                </div>

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
                                    <Link href="/account/re-enter-number">
                                        <a>Parolni unutdingizmi?</a>
                                    </Link>
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
export default connect(mapStateToProps)(withRouter(Login));
