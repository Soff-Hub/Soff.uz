import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';
import Page404 from '../page/page-404';
import Meta from '~/components/shared/headers/Meta';

const Xabar = (e) => {
    const tokenn = useSelector((state) => state.auth);
    const [countdown, setCoutdown] = useState(120);
    const [nomer, setNomer] = useState('');
    const [report, setReport] = useState(false);
    const [buttonTrue, setButtonTrue] = useState(true);
    const [loader, setLoader] = useState(false);
    const [kod, setKod] = useState(null);
    const Router = useRouter();
    const { query } = Router;
    const { user } = useSelector((state) => state.auth);

    const handleSubmitKod = async () => {
        setLoader(true);
        let data = {
            code: `${kod}`,
        };
        const { NewVerifyCode } = useAuth();
        const user = await NewVerifyCode(data);
        if (user.status === 200 || user.status === 201) {
            setLoader(false);
            Router.push('/account/new-password');
        } else {
            setLoader(false);
            let message = 'Xatolik';
            const modal = Modal.error({
                centered: true,
                title: message,
                content: user.data.msg,
            });
            modal.update;
        }
    };

    const qaytaKodOlish = async () => {
        setLoader(true);
        setCoutdown(120);
        setButtonTrue(true);
        const data = {
            phone_or_email: localStorage.getItem('qayta_'),
        };
        const { qaytaKodYuborishParol } = useAuth();
        const qaytaUser = await qaytaKodYuborishParol(data);
        if (qaytaUser.status === 200 || qaytaUser.status === 201) {
            setReport(true);
            setLoader(false);
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: qaytaUser.data.msg,
            });
            modal.update;
        } else {
            setLoader(false);
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: qaytaUser.data.msg,
            });
            modal.update;
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCoutdown((prevCountdown) => {
                if (prevCountdown === 0) {
                    clearInterval(interval); // Stop the countdown when it reaches 0
                    return 0;
                } else {
                    return prevCountdown - 1;
                }
            });
        }, 1000);

        if (countdown <= 0) {
            setButtonTrue(false);
            setReport(true);
        } else {
            setReport(false);
        }

        return () => {
            clearInterval(interval); // Clean up the interval when the component unmounts
        };
    }, [countdown]);

    useEffect(() => {
        if (localStorage.getItem('qayta_')) {
            setNomer(localStorage.getItem('qayta_'));
            setCoutdown(120);
        }
    }, [tokenn]);

    return user?.access ? (
        <Page404 />
    ) : (
        <PageContainer>
            <Meta
                title={"Parolni o'zgartirish"}
            />
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={(e) => handleSubmitKod(e)}>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>
                                    Tasdiqlash SMS - kodi quyidagiga yuborildi:
                                </h5>
                                <h4 style={{ marginBottom: '20px' }}>
                                    {nomer}
                                </h4>
                                <div className="form-group form-forgot">
                                    <Input
                                        required
                                        className="form-control mb-4"
                                        type="number"
                                        placeholder="Kodni kiriting..."
                                        maxLength="4"
                                        min="0"
                                        onChange={(e) => setKod(e.target.value)}
                                    />
                                    <h4>{` 0 ${Math.floor(countdown / 60)} : ${countdown >= 10
                                            ? countdown % 60
                                            : '0 ' + countdown
                                        }`}</h4>
                                </div>
                                <div className="form-group submit">
                                    {buttonTrue ? (
                                        loader ? (
                                            <button
                                                disabled={true}
                                                type="submit"
                                                className="ps-btn ps-btn--fullwidth mb-5">
                                                <BeatLoader color="#fff" />
                                            </button>
                                        ) : (
                                            <button
                                                type="submit"
                                                className="ps-btn ps-btn--fullwidth">
                                                Yuborish
                                            </button>
                                        )
                                    ) : report ? (
                                        loader ? (
                                            <button
                                                disabled={true}
                                                type="submit"
                                                className="ps-btn ps-btn--fullwidth mb-5">
                                                <BeatLoader color="#fff" />
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => qaytaKodOlish()}
                                                className="ps-btn ps-btn--fullwidth bg-danger">
                                                Qayta kod olish
                                            </button>
                                        )
                                    ) : (
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth">
                                            Yuborish
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </PageContainer>
    );
};

export default Xabar;
