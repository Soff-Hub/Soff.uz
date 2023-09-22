import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import PageContainer from '~/components/layouts/PageContainer';
import { useSelector } from 'react-redux';
import Router from 'next/router';
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

    const qaytaKodOlish = async () => {
        setLoader(true);
        if (tek === 'via_phone') {
            setCoutdown(60);
        }else if(tek === 'via_email'){
            setCoutdown(120);
        }
        

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
            modal.update;
            setReport(true);
            setLoader(false);

        } else {
            let message = '';
            const modal = Modal.error({
                centered: true,
                title: 'Nimadir xato bor!',
                content: message,
            });
            modal.update;
            setLoader(false);
        }
        
        setKod('');
    };

    useEffect(() => {
       
        if (countdown > 0) {
            setReport(true);
        } else {
            setReport(false);
            setFirstSendCode(false);
        }


        if (localStorage.getItem('data')) {
            setNomer(JSON.parse(localStorage.getItem('data')).phone_or_email);
        }
        const tek = localStorage.getItem('via_')
        setCoutdown(tek === 'via_phone' ? 60 : tek === 'via_email' ?  120 : 60)
        
        const interval = setInterval(() => {
            if (countdown > 0) {
                setCoutdown((prevCountdown) => prevCountdown - 1);
            }
        }, 1000);
        


        return () => {
            clearInterval(interval);
        };


         
        

    }, [tokenn, countdown]);

    return (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <Form
                        className="ps-form--account"
                    >
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Kodni kiriting</h5>
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
                                    <p> {nomer}  ga sms boradi</p>

                                    <p>
                                        Kod kelishiga qolgan vaqt: {countdown}
                                        <span> soniya</span>
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
                                    ) : !report ? (
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
                                    ) : loader ? (

                                        <button
                                            type="submit"
                                            className="ps-btn ps-btn--fullwidth mb-5">
                                            <BeatLoader color="#fff" />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleSubmitKod()}
                                            type="button"
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
