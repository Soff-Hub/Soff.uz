import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Modal, Segmented, Tooltip } from 'antd';
import { connect } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import ModalTanishuv from './modules/Modal-tanishuv';
import { withRouter } from 'next/router';
import { begin } from '~/store/auth/action';
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';


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
            role: 'seller',
            segmentValue: 'phone',
            phone: ''
        };
    }

    handleChange = (e) => {
        const value = e.target.value;

        this.setState({ phone: value });
    };

    handleGoogleClick = async (e) => {
        this.setState({ reportGoogle: false });
        const { registerGoogleUser } = useAuth();
        const url = this.props.url;
        if (this.props.url === 'auth/register/') {
            window.location = 'http://api.soff.uz/auth/social/login/customer';
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
        const data = {
            phone_or_email: e.phone ? '+998' + e.phone : e.email,
            password: e.password,
            password2: e.password2,
            role: this.state.role
        }


        this.setState({ report: false });
        const url = 'auth/new-seller-register/';
        const { registerUser } = useAuth();

        if (this.props.router.query.pid || localStorage.getItem('referal')) {
            const user = await registerUser(`auth/new-seller-register/${this.props.router.query.pid ? this.props.router.query.pid : localStorage.getItem('referal')}/`, data);
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
                    this.props.dispatch(begin({ id: user.data.first }));
                    localStorage.setItem('verify_user', user.data.user);
                    localStorage.setItem('tour', true);
                    localStorage.setItem('via_', user?.data?.via_);
                    localStorage.setItem('data', JSON.stringify(data));
                    localStorage.removeItem("referal")
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
        } else {
            const user = await registerUser(url, data);
            if (user) {
                if (user.status >= 400 && user.status !== 500) {
                    this.setState({ report: true });
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xatolik',
                        content: user?.data?.msg?.[0] || "Nimadir xato ketdi qaytadan urinib ko'ring",
                    });
                    modal.update;
                } else if (user.status == 200 || user.status == 201) {
                    this.props.dispatch(begin({ id: user.data.first }));
                    localStorage.setItem('verify_user', user.data.user);
                    localStorage.setItem('tour', true);
                    localStorage.setItem('via_', user?.data?.via_);
                    localStorage.setItem('data', JSON.stringify(data));
                    if (this.props.router.query.id) {
                        Router.push(
                            `/account/Message?id=${this.props.router.query.id}`
                        );
                    } else if (this.props.router.query.deal) {
                        `/account/Message?deal=${this.props.router.query.deal}`
                    }
                    else {
                        Router.push(`/account/Message?via=${user.data.via_}`);
                    }
                    this.setState({ report: true });
                }
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


    componentDidMount() {

        if (this.props.router.query.pid) {
            localStorage.setItem('referal', this.props.router.query.pid)
        }

        if (this.props.url === 'auth/seller-register/') {
            this.setState({ role: 'seller' });
        } else if (this.props.url === 'auth/register/') {
            this.setState({ role: 'customer' });
        }
    }

    componentDidUpdate() {
        if (this.props.router.query.pid) {
            localStorage.setItem('referal', this.props.router.query.pid)
        }

    }


    render() {
        const { router } = this.props;
        const { deal, id } = this.props?.router?.query;
        // referal
        const { pid } = router.query;



        return (
            <>
                <Form onFinish={this.handleSubmit}>
                    <div className="d-flex justify-content-center flex-column mb-4">
                        <Link href={'#'}>
                            <a style={{ fontSize: "32px", fontWeight: 700 }}>Ro'yxatdan o'tish</a>
                        </Link>

                        {/* <div className='d-flex gap-3'>
                            <span className='register_title' style={{ fontSize: "16px", fontWeight: 500 }}>Hisobingiz bormi?</span>

                            <Link style={{ fontSize: "12px" }} href={
                                (id) ? `/account/login?id=${id}` :
                                    (deal) ? `/account/login?deal=${deal}` :
                                        "/account/login"
                            }
                            >


                                <a className='register_title' style={{ fontSize: "16px", fontWeight: 500, color: "#00A44F" }}>Kirish</a>
                            </Link>
                        </div> */}


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
                        className='mb-4'
                        rules={[
                            {
                                required: true,
                                message:
                                    'Parolni kiriting!',
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
                            onKeyDown={
                                this.handleEnterKeyPress2
                            }
                        />
                    </Form.Item>

                    <Form.Item
                        dependencies={['password']}
                        hasFeedback
                        name="password2"
                        className='mb-4'
                        rules={[
                            {
                                required: true,
                                message: 'Iltimos, parolingizni tasdiqlang!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Siz kiritgan yangi parol mos emas!'));
                                },
                            }),
                        ]}

                    >
                        <Input.Password
                            style={{ height: "50px", fontSize: "16px" }}
                            prefix={<LockOutlined style={{ fontSize: "20px", padding: "0 10px" }} />}
                            type="password"
                            placeholder="Parolni takrorlash"
                            ref={(input) =>
                            (this.password2Input =
                                input)
                            }
                        />
                    </Form.Item>

                    <div className="tanishuv-chekbox d-flex align-items-center mb-4">
                        <label className="chekboxx m-0 ">
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
                                className=" p-0 ms-lg-2 m-0 fs-4 mb-2 tanishuv-sharti-title">
                                Tanishib chiqdim,
                                shartlariga roziman!
                            </a>
                        </Link>
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
                                <Tooltip
                                    className="ps-btn ps-btn--fullwidth"
                                    title="Ro'yxatdan o'tishingiz uchun tanishuv shartlariga rozilik bildirishingiz zarur">
                                    <button
                                        disabled={true}
                                        style={{
                                            cursor: 'not-allowed',
                                            color: '#fff',
                                            backgroundColor: "#00a44f",
                                            border: "none"
                                        }}
                                        className="ps-btn ps-btn--fullwidth"

                                    >
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
                    {pid ? (
                        ''
                    ) : (
                        <div className="or_google">
                            <span></span>
                            <span>yoki</span>
                            <span></span>
                        </div>
                    )}

                </Form>

                {pid ? (
                    ''
                ) : (
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
                                    oogle account
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
                                        oogle account
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
                )}

                <ModalTanishuv
                    dataBsTarget="exampleModalToggleEditCategory2"
                    formID={'modal-tanishuv'}>
                    <div className="modal-dating">
                        <h3>
                            Soff.uz platformasidan foydalanish
                            qonun-qoidalari
                        </h3>
                        <h4>1. Umumiy qoidalar</h4>
                        <p>
                            1.1. Siz Soff.uz platformasiga tashrif buyurar
                            ekansiz quyida belgilangan qonun-qoidalar va
                            shartlarga o’z roziligingizni bildirgan
                            hisoblanasiz.
                        </p>
                        <p>
                            1.2. Soff.uz platformasida (keyingi o’rinlarda
                            «Platforma» deb yuritiladi) taqdim etilayotgan
                            xizmatlar, biznes rejalar, ma’lumotlar,
                            qo’llanmalar, referatlar, prezentatsiyalar va
                            boshqalar shartli ravishda{' '}
                            <strong>mahsulot</strong> deb nomlanadi. Ular
                            faqatgina ma’lumotlar hisoblanib,
                            o’qib-o’rganish uchun mo’ljallangan. Biznes
                            rejalar esa tavsiyaviy harakterga ega bo’lib,
                            undagi hisob-kitoblar tahminiy olingan.
                        </p>
                        <p>
                            1.3. Platformaning «Biznes xizmatlar» bo’limida
                            keltirilgan xizmatlar tomonlar o’rtasida
                            tuzilgan, o’zaro tasdiqlangan shartnomalar
                            asosida tartibga solinadi.
                        </p>
                        <h4>2. Foydalanuvchi bo’lib ro’yxatdan o’tish</h4>
                        <p>
                            Platformada mavjud mahsulotlarni xarid qilish,
                            foydalanish va boshqalarni amalga oshirish uchun
                            Platformadan «Foydalanuvchi» bo’lib ro’yxatdan
                            o’tish lozim. Ro’yxatdan o’tish davomida
                            foydalanuvchi barcha ma’lumotlar haqqoniy va
                            to’g’ri to’ldirilishiga javobgar hisoblanadi.
                        </p>
                        <h4>3. Sotuvchi bo’lib ro’yxatdan o’tish</h4>
                        <p>
                            Platformada o’z mahsulotlarini sotish orqali
                            daromad qilish va boshqalarni amalga oshirish
                            uchun Platformadan «Sotuvchi» bo’lib ro’yxatdan
                            o’tish lozim. Ro’yxatdan o’tish davomida
                            sotuvchi barcha ma’lumotlar haqqoniy va to’g’ri
                            to’ldirilishiga javobgar hisoblanadi.
                        </p>
                        <h4>
                            4. Foydalanuvchilarning huquq va majburiyatlari
                        </h4>
                        <h5>
                            4.1. Foydalanuvchilar quyidagi huquqlarga ega:
                        </h5>
                        <p>
                            4.1.1. Platforma tizimida erkin ro’yxatdan
                            o’tish;
                        </p>
                        <p>
                            4.1.2. Platforma tomonidan taqdim etilayotgan
                            xizmatlardan foydalanish;
                        </p>
                        <p>
                            4.1.3. Xarid qilingan mahsulotlardan erkin
                            foydalanish (mahsulotlardan tijorat hamda foyda
                            olish maqsadida foydalanish taqiqlanadi);
                        </p>
                        <p>
                            4.1.4. Xarid qilingan mahsulot bo’yicha
                            xabarnomalarni ro’yxatdan o’tish davomida
                            foydalanuvchi tomonidan kiritilgan elektron
                            pochta (e-mail) orqali qabul qilib olish (4.2.4.
                            shart bajarilgan taqdirda) yoki o’zining shaxsiy
                            profilidagi «Sotib olinganlar» sahifasiga kirish
                            orqali qabul qilib olish;
                        </p>
                        <p>
                            4.1.5. Foydalanuvchi xarid qilingan mahsulotni
                            yuklab olinish jarayonida muammo yuzaga kelgan
                            holatda platforma ma’muriyatiga amalga
                            oshirilgan to’lovni qaytarib berish bo’yicha
                            murjaat qilgan taqdirdagini pulini qaytarib
                            olish;
                        </p>
                        <p>
                            4.1.6. Platforma ma’muriyatiga murojaat qilish
                            huquqlariga ega.
                        </p>
                        <h5>
                            4.2. Foydalanuchilar quyidagi majburiyatlarni
                            bajarishlari shart:
                        </h5>
                        <p>
                            4.2.1. Foydalanuvchi Platforma tizimida
                            ro’yxatdan o’tish davmida so’ralgan
                            ma’lumotlarni to’g’ri kiritishi shart;
                        </p>
                        <p>
                            4.2.2. Platforma foydalanuvchilari o’zaro
                            aloqalar davomida beadab, haqoratli va behurmat
                            qiladigan jumlalardan foydalanish hamda
                            O’zbekiston Respublikasining amaldagi
                            qonunchiligida taqiqlangan boshqa ma’lumotlarni
                            o’z ichiga oluvchi xabarlarni jo’natish
                            taqiqlanadi.
                        </p>
                        <p>
                            4.2.4. Ro’yxatdan o’tish jarayonida amalda
                            mavjud bo’lgan, ishlaydigan elektron manzil
                            (e-mail) kiritish shart;
                        </p>
                        <p>
                            4.2.5. Foydalanuvchi Platformaning foydalanish
                            qonun-qoidalarida belgilangan talablarni to’liq
                            bajarishi shart.
                        </p>
                        <h4>5. Sotuvchining huquq va majburiyatlari</h4>
                        <h5>5.1. Sotuvchilar quyidagi huquqlarga ega:</h5>
                        <p>
                            5.1.1. Platforma tizimida erkin ro’yxatdan
                            o’tish;
                        </p>
                        <p>
                            5.1.2. Platforma tomonidan taqdim etilayotgan
                            xizmatlarga o’z mahsulotlarini qo’shish;
                        </p>
                        <p>
                            5.1.3. Mahsulotlaridan bepulga yoki tijorat
                            hamda foyda olish maqsadida platformada
                            ulashishlariga ruxsat etiladi (5.1.7. shart
                            bajarilgan taqdirda);
                        </p>
                        <p>
                            5.1.4. Sotuvchinig sotilgan har bir mahsulotlari
                            bo’yicha xabarnomalarni ro’yxatdan o’tish
                            davomida foydalanuvchi tomonidan kiritilgan
                            elektron pochta (e-mail) orqali qabul qilib
                            olish (4.2.4. shart bajarilgan taqdirda) yoki
                            o’zining shaxsiy profilidagi «Buyurtmalar»
                            sahifasiga kirish orqali qabul qilib olish;
                        </p>
                        <p>
                            5.1.5. Sotuvchining sotilgan mahsulotlari
                            yig’indisidan platforma ulishining (sotilgan
                            mahsulotning 10% i) qiymatini ayirgan holatda
                            hosil bo’lgan summani o’z kartalariga tashlab
                            olish (5.2.5. shart bajarilgan taqdirda);
                        </p>
                        <p>5.1.6.</p>
                        <p>
                            5.1.7. Sotuvchi mahsulotlarining muallifi o’zi
                            yoki boshqa bir inson muallifidagi mahsulot
                            bo’lsa uning roziligi bilan olingan mahsulot
                            bo’lishi shart;
                        </p>
                        <p>
                            5.1.7. Platforma ma’muriyatiga murojaat qilish
                            huquqlariga ega
                        </p>
                        <h5>
                            5.2. Foydalanuchilar quyidagi majburiyatlarni
                            bajarishlari shart:
                        </h5>
                        <p>
                            5.2.1. Foydalanuvchi Platforma tizimida
                            ro’yxatdan o’tish davmida so’ralgan
                            ma’lumotlarni to’g’ri kiritishi shart;
                        </p>
                        <p>
                            5.2.2. Platforma sotuvchilari o’zaro aloqalar
                            davomida beadab, haqoratli va behurmat qiladigan
                            jumlalardan foydalanish hamda O’zbekiston
                            Respublikasining amaldagi qonunchiligida
                            taqiqlangan boshqa ma’lumotlarni o’z ichiga
                            oluvchi xabarlarni jo’natish taqiqlanadi.
                        </p>
                        <p>
                            5.2.4. Ro’yxatdan o’tish jarayonida amalda
                            mavjud bo’lgan, ishlaydigan elektron manzil
                            (e-mail) kiritish shart;
                        </p>
                        <p>
                            5.2.5. Sotuvchining yig’ilgan summasini
                            kartasiga tashlab olish jarayonidan uning
                            miqdori 10 ming so’mdan kam bo’lmasligi shart.
                        </p>
                        <p>
                            5.2.5. Sotuvchi Platformaning foydalanish
                            qonun-qoidalarida belgilangan talablarni to’liq
                            bajarishi shart
                        </p>
                        <p>
                            5.2.6. Sotuvchi platformada sotilgan har bir
                            mahsulotining 10% ini platforma ma’muriyati olib
                            qolishi shart.
                        </p>
                        <h4>6. Javobgarlik</h4>
                        <p>
                            6.1. Platforma ma’muriyati Foydalanuvchining
                            noto’g’ri ma’lumot kiritishi va amallarni
                            bajarishi sababli xarid qilishi jarayonida
                            yuzaga kelgan zarar, ziyon yoki xarajatlar uchun
                            javobgar emas.
                        </p>
                        <p>
                            6.2. Foydalanuvchi tomonidan xarid qilingan
                            mahsulot foydalanuvchining Platformadagi o’z
                            shaxsiy kabinetiga joylashtiriladi hamda
                            elektron manziliga xabarnoma yuboriladi. Taqdim
                            etilgan mahsulot foydalanuvchi tomonidan yuklab
                            olinish yoki olinmasligidan qat’iy nazar,
                            mahsulot foydalanuvchi tomonidan xarid qilingan
                            va Platforma tizimida yetkazib berildi deya
                            belgilanadi hamda amalga oshirilgan summa
                            qaytarilmaydi. Shu sababli ro’yxatdan o’tish
                            davomi amalda mavjud bo’lgan, ishlaydigan
                            elektron manzil (Email) kiriting hamda to’lovni
                            muvaffaqiyatli amalga oshirib bo’lganingizdan
                            so’ng e-mailingizni ham tekshirib turing.
                        </p>
                        <p>
                            6.3. Platformada ro’yxatdan o’tish davomida
                            kiritilgan ma’lumotlar haqqoniyligi uchun butun
                            javobgarlik foydalanuvch hamda sotuvchining o’z
                            bo’ynida bo’ladi.
                        </p>
                        <p>
                            6.4. Platforma ma’muriyati to’lovni amalga
                            oshirish jarayonida yuzaga kelgan zarar uchun
                            javobgar emas.
                        </p>
                        <h4>
                            7. Foydalanuvchining shaxsiy ma’lumotlar
                            daxlsizligi
                        </h4>
                        <p>
                            Foydalanuvchilarning shaxsiy ma’lumotlarining
                            daxlsizligi biz uchun juda muhim.
                        </p>
                        <p>
                            Biz quyidagi ma’lumotlarni statistik
                            ko’rsatgichlarni aniqlash maqsadida to’playmiz
                            va saqlaymiz:
                        </p>
                        <p>
                            – foydalanuvchilar Saytga kirish uchun
                            foydalangan IP-manzili;
                        </p>
                        <p>
                            – Platformaga kirish uchun foydalanuvchi
                            tomonidan ishlatilgan brauzer va operatsion
                            tizim turi;
                        </p>
                        <p>– Platformaga kirish muddatlari;</p>
                        <p>
                            – foydalanuvchi ko’rib chiqqan sahifalar va
                            havolalar;
                        </p>
                        <p>
                            Biz ushbu manzillardan foydalanuvchining
                            shaxsini aniqlash maqsadida foydalanmaymiz,
                            Saytga qilingan hurujlar bundan mustasno.
                        </p>
                        <h4>
                            8. Sotuvchining shaxsiy ma’lumotlar daxlsizligi
                        </h4>
                        <p>
                            Sotuvchining shaxsiy ma’lumotlarining
                            daxlsizligi biz uchun juda muhim.
                        </p>
                        <p>
                            Biz quyidagi ma’lumotlarni statistik
                            ko’rsatgichlarni aniqlash maqsadida to’playmiz
                            va saqlaymiz:
                        </p>
                        <p>
                            – sotuvchining Platformaga kirish uchun
                            foydalangan IP-manzili;
                        </p>
                        <p>
                            – Platformaga kirish uchun sotuvchi tomonidan
                            ishlatilgan brauzer va operatsion tizim turi;
                        </p>
                        <p>– Platformaga kirish muddatlari;</p>
                        <p>
                            – sotuvchi ko’rib chiqqan sahifalar va
                            havolalar;
                        </p>
                        <p>
                            Biz ushbu manzillardan foydalanuvchining
                            shaxsini aniqlash maqsadida foydalanmaymiz,
                            Saytga qilingan hurujlar bundan mustasno.
                        </p>
                    </div>
                </ModalTanishuv>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return state.auth;
};
export default connect(mapStateToProps)(withRouter(Register));
