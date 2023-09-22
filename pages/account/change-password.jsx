import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';

const Xabar = (e) => {
    const tokenn = useSelector((state) => state.auth);
    const [countdown, setCoutdown] = useState(0);
    const [nomer, setNomer] = useState('');
    const [report, setReport] = useState(true)
    const [kod, setKod] = useState(null);
    const Router = useRouter()
    const { query } = Router


    const counter = (count) => {
        const interval = setInterval(() => {
            setCoutdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval)
        }, count * 1000);
    }


    const handleSubmitKod = async () => {
        let data = {
            code: `${kod}`,
        };
        const { NewVerifyCode } = useAuth()
        const user = await NewVerifyCode(data)
        console.log(user);
        if (user.status === 200 || user.status === 201) {
            Router.push('/account/new-password');
        } else {
            let message = '';
            const modal = Modal.error({
                centered: true,
                title: user.data.msg,
                content: message,
            });
            modal.update;
        }
    };

    const qaytaKodOlish = async () => {
        const { qaytaKodYuborish } = useAuth();
        const qaytaUser = await qaytaKodYuborish();
        if (qaytaUser.status === 200 || qaytaUser.status === 201) {
            setCoutdown(query.via === 'via_phone' ? 60 : 120);
            setReport(true)
            counter(query.via === 'via_phone' ? 60 : 120)
        } else {
            let message = '';
            const modal = Modal.error({
                centered: true,
                title: qaytaUser.data.msg,
                content: message,
            });
            modal.update;
        }
    };

    useEffect(() => {
        if (countdown > 0) {
            setReport(true);
        } else {
            setReport(false);
        }
    }, [countdown])

    useEffect(() => {
        if (localStorage.getItem('qayta_')) {
            setNomer(localStorage.getItem('qayta_'));
            setCoutdown(query.via === 'via_phone' ? 60 : 120);
        }

        return () => counter(query.via === 'via_phone' ? 60 : 120)
    }, [tokenn]);



    return (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <Form
                        className="ps-form--account"
                        onFinish={(e) => handleSubmitKod(e)}>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Kodni kiriting</h5>
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
                                    <p> {nomer} ga sms boradi</p>

                                    <p>
                                        Kod kelishiga qolgan vaqt: {countdown}{' '}
                                        soniya
                                    </p>
                                </div>
                                <div className="form-group submit">
                                    {report ? (
                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth">
                                            Yuborish
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => qaytaKodOlish()}
                                            className="ps-btn ps-btn--fullwidth bg-danger">
                                            Qayta kod olish
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
