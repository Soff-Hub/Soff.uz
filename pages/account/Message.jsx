import React, { useEffect, useState } from 'react';
import { Form, Input, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import PageContainer from '~/components/layouts/PageContainer';
import { useDispatch, useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import { BeatLoader } from 'react-spinners';
import { login } from '~/store/auth/action';

const Xabar = (e) => {
    const tokenn = useSelector((state) => state.auth);
    const [nomer, setNomer] = useState('');
    const [report, setReport] = useState(true);
    const [loader, setLoader] = useState(false);
    const [firstSendCode, setFirstSendCode] = useState(true);
    const [countdown, setCoutdown] = useState(120);
    const [kod, setKod] = useState(null);
    const Router = useRouter();
    const { query } = Router;
    const dispatch = useDispatch()

    const handleSubmitKod = async () => {
        setLoader(true);

        let data = {
            code: `${kod}`,
        };

        const { verifyCode } = useAuth();
        const user = await verifyCode(data);
        if (user.status === 200 || user.status === 201) {
            setLoader(false);
            Router.push('/');
            dispatch(login({ user: user.data, data: e }));
        } else {
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
        setCoutdown(120)
        setLoader(true);
        const data = {
            phone_or_email: JSON.parse(localStorage.getItem('data'))
                .phone_or_email,
        };
        const { qaytaKodYuborish } = useAuth();
        const qaytaUser = await qaytaKodYuborish(data);
        if (qaytaUser?.status === 200 || qaytaUser?.status === 201) {
            const modal = Modal.success({
                centered: true,
                title: 'Ijobiy',
                content: qaytaUser?.data?.msg,
            });
            modal.update;
            setLoader(false);
        } else {
            setReport(true)
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik',
                content:  qaytaUser?.data?.msg
            });
            modal.update;
            setLoader(false);
        }

        setKod('');
    };

    useEffect(() => {

        const interval = setInterval(() => {
            setCoutdown((prevCountdown) => {
              if (prevCountdown === 0) {
                clearInterval(interval); 
                return 0;
              } else {
                return prevCountdown - 1;
              }
            });
          }, 1000);


        if (countdown <= 0) {
            setFirstSendCode(false);
            setReport(true);
        } else {
            setReport(false);
        }
        
        return () => {
            clearInterval(interval); 
          };

      
    }, [countdown]);

    useEffect(() => {
        if (localStorage.getItem('data')) {
            setNomer(JSON.parse(localStorage.getItem('data')).phone_or_email);
        }
        setCoutdown(120);
    }, [tokenn]);

    return (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <Form className="ps-form--account">
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>
                                    Tasdiqlash SMS - kodi quyidagiga
                                    yuborildi:
                                </h5>
                                <h4 style={{ marginBottom: '20px' }}>
                                    {nomer}
                                </h4>
                                <div className="kod-input">
                                    <Input
                                        className="form-control mb-4 "
                                        type="number"
                                        placeholder="Kodni kiriting..."
                                        onChange={(e) => setKod(e.target.value)}
                                        min="0"
                                        maxLength="4"
                                    />
                                    <h4>{` 0 ${Math.floor(countdown / 60 ) } : ${countdown >=  10 ?  countdown % 60 : "0 " + countdown}`}</h4>
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
