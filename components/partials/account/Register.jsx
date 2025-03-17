import React, { Component } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { Form, Input, Modal, Segmented, Tooltip } from 'antd';
import { connect } from 'react-redux';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import ModalTanishuv from './modules/Modal-tanishuv';
import { withRouter } from 'next/router';
import { LockOutlined, MailOutlined, PhoneOutlined } from '@ant-design/icons';
import { begin } from '~/rtk-store/auth';


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
            segmentValue: 'email',
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
            window.location = 'http://api.soff.uz/auth/social/login/seller?seller_page=true';
            const user = await registerGoogleUser(url, 'seller');
            if (user) {
                if (user.status >= 400 && user.status !== 500) {
                    this.setState({ reportGoogle: true });
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xatolik',
                        content: user?.data?.msg,
                    });
                    modal.update;
                } else if (user.status == 200 || user.status == 201) {
                    localStorage.setItem('token', user.data.access);
                    localStorage.setItem('via_', user?.data?.via_);
                    localStorage.setItem('data', JSON.stringify({ ...e, password: null }));
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
            window.location = 'http://api.soff.uz/auth/social/login/seller?seller_page=true';
            const user = await registerGoogleUser(url, 'seller');
            if (user) {
                if (user.status >= 400 && user.status !== 500) {
                    this.setState({ reportGoogle: true });
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xatolik',
                        content: user?.data?.msg,
                    });
                    modal.update;
                } else if (user.status == 200 || user.status == 201) {
                    localStorage.setItem('token', user.data.access);
                    localStorage.setItem('via_', user?.data?.via_);
                    localStorage.setItem('data', JSON.stringify({ ...e, password: null }));
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
                        content: user?.data?.msg,
                    });
                    modal.update;
                } else if (user.status == 200 || user.status == 201) {
                    this.props.dispatch(begin({ id: user.data.first }));
                    localStorage.setItem('verify_user', user.data.user);
                    localStorage.setItem('tour', true);
                    localStorage.setItem('via_', user?.data?.via_);
                    localStorage.setItem('data', JSON.stringify({ ...data, password: null }));
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
                        content: user?.data?.msg || "Nimadir xato ketdi qaytadan urinib ko'ring",
                    });
                    modal.update;
                } else if (user.status == 200 || user.status == 201) {
                    this.props.dispatch(begin({ id: user.data.first }));
                    localStorage.setItem('verify_user', user.data.user);
                    localStorage.setItem('tour', true);
                    localStorage.setItem('via_', user?.data?.via_);
                    localStorage.setItem('data', JSON.stringify({ ...data, password: null }));
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
                            label: 'Elektron pochta',
                            value: 'email',
                            icon: <MailOutlined />,
                        }, {
                            label: 'Telefon raqam',
                            value: 'phone',
                            icon: <PhoneOutlined />,
                        }]}
                        block className='mb-5 ' style={{ height: "50px" }} />


                    {this.state.segmentValue === "email" ?
                        <Form.Item
                            name="email"
                            // className="mb-4"
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
                                addonBefore={<MailOutlined style={{ fontSize: '20px', padding: '0 10px' }} />}
                                type="email"
                                placeholder="Elektron pochta"
                                onKeyDown={this.handleEnterKeyPress}
                                autoComplete='email'
                                name='email'
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
                                style={{ height: "50px", fontSize: "16px" }}
                                type='tel'
                                value={this.state.phone}
                                onChange={this.handleChange}
                                placeholder="Telefon raqam"
                                maxLength={9} // 9 belgidan ortiq kiritishni cheklash
                                onKeyDown={this.handleKeyDown}
                                addonBefore="+998" // Prefiksni qo'shish
                                autoComplete="phone"
                                name='phone'
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
                                Tanishib chiqdim, shartlariga roziman!
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
                                    <span className='me-2'>Google bilan kirish</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 48 48"
                                        width="24"
                                        height="24"
                                        className="LgbsSe-Bz112c"
                                    >
                                        <g>
                                            <path
                                                fill="#EA4335"
                                                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                            />
                                            <path
                                                fill="#4285F4"
                                                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                            />
                                            <path
                                                fill="#FBBC05"
                                                d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                            />
                                            <path
                                                fill="#34A853"
                                                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                            />
                                            <path fill="none" d="M0 0h48v48H0z" />
                                        </g>
                                    </svg>
                                </div>
                            ) : (
                                <Tooltip title="Ro'yxatdan o'tishingiz uchun tanishuv shartlariga rozilik bildirishingiz zarur">
                                    <div
                                        disabled={true}
                                        style={{
                                            cursor: 'not-allowed',
                                        }}
                                        className="ps-btn ps-btn--fullwidth">
                                        <span className='me-2'>Google bilan kirish</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 48 48"
                                            width="24"
                                            height="24"
                                            className="LgbsSe-Bz112c"
                                        >
                                            <g>
                                                <path
                                                    fill="#EA4335"
                                                    d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                                                />
                                                <path
                                                    fill="#4285F4"
                                                    d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                                                />
                                                <path
                                                    fill="#FBBC05"
                                                    d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                                                />
                                                <path
                                                    fill="#34A853"
                                                    d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                                                />
                                                <path fill="none" d="M0 0h48v48H0z" />
                                            </g>
                                        </svg>
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
                            foydalanish, o’qib-o’rganish uchun mo’ljallangan.
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
                            pochta (e-mail) yoki telefon raqam orqali qabul qilib olish (4.2.4.
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
                            (e-mail) yoki telefon raqam kiritish shart;
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
                            ulashishlariga ruxsat etiladi (5.1.6. shart
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
                            mahsulotning 18% i) qiymatini ayirgan holatda
                            hosil bo’lgan summani o’z kartalariga tashlab
                            olish (5.2.5. shart bajarilgan taqdirda),
                            shu bilan birga platforma o'z xizmat narxlarini
                            yoki komissiya foizini vaqt o'tishi bilan o'z
                            ehtiyojlariga qarab oshirish huquqini o'zida saqlab qoladi.
                        </p>
                        <p>                    
                            5.1.6. Sotuvchi faqat o‘ziga tegishli yoki muallifning ruxsati bilan joylashtirilgan mahsulotlarni sotishi mumkin.
                        </p>
                        <p>
                            5.1.7. Platforma ma’muriyatiga murojaat qilish
                            huquqlariga ega
                        </p>
                        <p>
                            5.1.8. Sotuvchi referal havola orqali do’stlarini
                            taklif qilish va do’stlarining har bir daromadidan
                            5% miqdorda bonus olish.
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
                            5.2.3. Ro’yxatdan o’tish jarayonida amalda
                            mavjud bo’lgan, ishlaydigan elektron manzil
                            (e-mail) yoki telefon raqam kiritish shart;
                        </p>
                        <p>
                            5.2.4. Sotuvchining yig’ilgan summasini
                            kartasiga tashlab olish jarayonidan uning
                            miqdori 35 ming so’mdan kam bo’lmasligi shart.
                        </p>
                        <p>
                            5.2.5. Sotuvchi Platformaning foydalanish
                            qonun-qoidalarida belgilangan talablarni to’liq
                            bajarishi shart
                        </p>
                        <p>
                            5.2.6.  Sotuvchi yuklagan har bir mahsulotning
                            sifatli, yaroqli va o'z ijodiy ishi ekanligiga
                            javobgar. Xaridor yoki boshqa shaxslar norozilik
                            bildirsa yoki mualliflik huquqi buzilsa, barcha
                            javobgarlik Sotuvchida qoladi. Platforma mahsulotlarni
                            moderatsiyadan o'tkazgan taqdirda ham xato yoki
                            e'tibordan chetda qolgan holatlar uchun javobgar emas.
                        </p>
                        <p>
                            5.2.7. Sotuvchi platformada sotilgan har bir
                            mahsulotining 18% ini platforma ma’muriyati olib
                            qolishi shart.
                        </p>
                        <p>
                            5.2.8. Sotuvchi referal havola orqali o’zini-o’zi
                            taklif qilgan holatlar aniqlansa, platforma ma’muriyati
                            tomonidan ogohlantirish beriladi va ushbu taklif havolasi
                            ro’yxatdan olib tashlanadi.
                        </p>
                        <p>
                            5.2.9. Sotuvchi o‘z ijtimoiy tarmoqlari, messenjerlari yoki boshqa tashqi platformalar orqali mijozlarni Soff.uz ga jalb qilishi va u yerda savdo qilish huquqiga ega. Bu yaxshi va qo‘llab-quvvatlanadi. Biroq sotuvchi platformaning chat tizimi yoki boshqa xizmatlari orqali mijozlarni tashqi platformalarga (Telegram, WhatsApp, Instagram va boshqalar) yo‘naltirish, shuningdek, savdoni Soff.uz tashqarisida davom ettirish taqiqlanadi. Bu qoidani buzgan sotuvchilar platformadan chetlashtirilishi mumkin.
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
                        <h4>
                            9. Mualliflik huquqlari va intellektual mulk himoyasi
                        </h4>
                        <h5>
                            Mahsulot muallifligi:
                        </h5>
                        <p>
                            - Sotuvchi faqat o‘ziga tegishli yoki muallifning ruxsati bilan joylashtirilgan mahsulotlarni sotishi mumkin.
                        </p>
                        <p>
                            - Plagiat yoki ruxsatsiz foydalanish aniqlansa, mahsulot platformadan o‘chiriladi(yoki haqiqiy muallifning xohishiga ko'ra uning Soff.uz'dagi profiliga o'tkazib berilishi mumkin), takroriy holatda sotuvchining akkaunti bloklanishi mumkin.
                        </p>
                        <h5>
                            Mualliflik huquqlarini buzish bo‘yicha shikoyat tizimi:
                        </h5>
                        <p>
                            - Agar biror shaxs o‘ziga tegishli mahsulot boshqa sotuvchi tomonidan joylashtirilganini aniqlasa, shikoyat yuborish imkoniyati ega. Shikoyat bo'limi mahsulot batafsil sahifasida mavjud.
                        </p>
                        <p>
                            - Shikoyatlar ko‘rib chiqilishi muddati – 3 ish kuni.
                        </p>
                        <h4>
                            10. Xaridorlarni himoya qilish (Refund Policy)
                        </h4>
                        <h5>
                            Mahsulotga nisbatan shikoyat
                        </h5>
                        <p>
                            - Mahsulot xaridor hohlagani kabi bo'lmasa, xaridor o'z fikrlarini mahsulotning izohlar bo'limida qoldirishi yoki jiddiy holatlarda platforma ma’muriyatiga shikoyat qilish huquqiga ega. Shikoyat bo'limi mahsulot batafsil sahifasida mavjud.
                        </p>
                        <p>
                            - Sotuvchi mahsulotni noto‘g‘ri joylashtirgan yoki sifatli yetkazmagan bo‘lsa ya'ni foydalanishga yaroqsiz deb topilsa, platforma mamuriyati ushbu mahsulotni o'chirib tashlashi huquqiga ega.
                        </p>
                        <h4>
                            10. Xaridor va sotuvchilar o‘rtasidagi baholash tizimi
                        </h4>
                        <h5>
                            Baholash va sharhlar:
                        </h5>
                        <p>
                            - Xaridor xarid qilgan mahsulotiga yulduzli baho (⭐) va fikr-mulohaza qoldirish imkoniyatiga ega. Baholar sotuvchilarning ishonchliligini aniqlashda yordam beradi.
                        </p>
                        <h5>
                            Sotuvchilarning reytingi:
                        </h5>
                        <p>
                            - Past baholarga ega sotuvchilar kuzatib boriladi, kerak bo‘lsa, platformadan chetlatiladi.
                        </p>
                        <h4>
                            11. Platforma va sotuvchi o‘rtasidagi shartlar
                        </h4>
                        <h5>
                            Mahsulotni o‘chirish huquqi:
                        </h5>
                        <p>
                            - Soff.uz shubhali yoki qonunga zid mahsulotlarni istalgan vaqtda o‘chirish huquqiga ega.
                        </p>
                        <p>
                            - Agar sotuvchi ko‘p marotaba qoidalarni buzsa, u platformadan chetlatiladi.
                        </p>
                        <h5>
                            To‘lov tizimlari bo‘yicha aniq qoidalar:
                        </h5>
                        <p>
                            - Platforma faqat rasmiy to‘lov tizimlari orqali ishlaydi(masalan, Click, PayMe va boshqalar).
                        </p>
                        <p>
                            - Qo‘lda yoki boshqa norasmiy usullarda pul olish qat’iyan taqiqlanadi.
                        </p>
                        <h4>
                            12. Soff.uz'ning qonuniy himoyasi
                        </h4>
                        <h5>
                            Qonuniy javobgarlik:
                        </h5>
                        <p>
                            - Platforma sotuvchi va xaridor o‘rtasidagi kelishmovchiliklarga to‘g‘ridan-to‘g‘ri javobgar emas, lekin shikoyatlarni ko‘rib chiqish huquqiga ega.
                        </p>
                        <p>
                            - O‘zbekiston Respublikasi qonunchiligiga muvofiq ravishda xizmat ko‘rsatilishi kafolatlanadi.
                        </p>
                        <h4>
                            13. Qoidalar va shartlarni yangilash
                        </h4>
                        <p>
                            - Soff.uz platformadagi qoidalarni istalgan vaqtda o‘zgartirish yoki yangilash huquqiga ega.
                        </p>
                        <p>
                            - Rasmiy Telegram kanalida (t.me/soff_uz) e’lon qilingan har qanday yangilik yoki o‘zgarish rasmiy hisoblanadi.
                        </p>
                        <p>
                            - Foydalanuvchilarga shaxsiy profil orqali yetkazilgan bildirishnomalar rasmiy kuchga ega.
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
