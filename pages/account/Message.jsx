import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';

const Xabar = (e) => {
    const tokenn = useSelector((state) => state.auth);
    const [nomer, setNomer] = useState('');
    const [report, setReport] = useState(true);
    const [loader, setLoader] = useState(false);
    const [countSekond, setCountSekond] = useState(true);
    const [firstSendCode, setFirstSendCode] = useState(true);
    const [countdown, setCoutdown] = useState(null);
    const [kod, setKod] = useState(null);
    const Router = useRouter()
    const { query } = Router


    const handleSubmitKod = async () => {
        setLoader(true);

        let data = {
            code: `${kod}`,
        };

        const { verifyCode } = useAuth();
        const user = await verifyCode(data);
        if (user.status === 200 || user.status === 201) {
            setLoader(false);
            Router.push('/account/login');
        } else {

            
            let message = '';
            setLoader(false);
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik',
                content: `${user?.data?.msg}`,
            });
            modal.update;
        }

        setKod('');
    };

    const counter = (count) => {
        const interval = setInterval(() => {
            setCoutdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval)
        }, count * 1000);
    }

    const qaytaKodOlish = async () => {
        setLoader(true);
        const { qaytaKodYuborish } = useAuth();
        const qaytaUser = await qaytaKodYuborish();
        setCountSekond(false);
        if (qaytaUser.status === 200 || qaytaUser.status === 201) {
            let message = '';
            const modal = Modal.success({
                centered: true,
                title: 'Ijobiy',
                content: qaytaUser?.data?.msg,
            });
            if (query.via === 'via_phone') {
                setCoutdown(60);
                counter(60)
            } else if (query.via === 'via_email') {
                setCoutdown(120);
                counter(120)
            }
            modal.update;
            setLoader(false);

        } else {
            let message = '';
            const modal = Modal.error({
                centered: true,
                title: qaytaUser.data.msg,
                content: message,
            });
            modal.update;
            setLoader(false);
        }

        setKod('');
    };

    useEffect(() => {
        if (countdown === 0) {
            setFirstSendCode(false);
            setReport(true);
        } else {
            setReport(false);
        }
    }, [countdown])

    useEffect(() => {
        if (localStorage.getItem('data')) {
            setNomer(JSON.parse(localStorage.getItem('data')).phone_or_email);
        }
        setCoutdown(query.via === 'via_phone' ? 60 : 120)
        return () => counter(query.via === 'via_phone' ? 60 : 120)

    }, [tokenn]);

    return (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <Form
                        className="ps-form--account"
                    >
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5> Tasdiqlash SMS - kodi quyidagi raqamga yuborildi: </h5>
                                <h4 style={{marginBottom:'20px'}}> {nomer} </h4>
                                <div className="kod-input">
                                    <Input
                                        required
                                        className="form-control mb-4 "
                                        type="number"
                                        placeholder="Kodni kiriting..."
                                        onChange={(e) => setKod(e.target.value)}
                                        min="0"
                                        maxLength={'4'}
                                    />
                                    <p>
                                       {countdown}
                                    </p>
                                </div>
                                <div className="form-group submit">
                                    {firstSendCode ? (
                                        loader ? (
                                            <button
                                                type="submit"
                                                className="ps-btn ps-btn--fullwidth mb-5">
                                                <BeatLoader color="#fff" />
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handleSubmitKod()
                                                }
                                                type="button"
                                                className="ps-btn ps-btn--fullwidth">
                                                Yuborish
                                            </button>
                                        )
                                    ) : report ? (
                                        loader ? (
                                            <button
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
                                    ) : <button
                                        onClick={() =>
                                            handleSubmitKod()
                                        }
                                        type="button"
                                        className="ps-btn ps-btn--fullwidth">
                                        Yuborish
                                    </button>
                                    }
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
