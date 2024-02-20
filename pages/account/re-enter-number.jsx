import { Modal } from 'antd';
import Router from 'next/router';
import React, { useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';

export default function QaytaNomerKiritish() {
    const [report, setReport] = useState(true);
    const [number, setNumber] = useState('');
    // const [telLenght, setTelLenght] = useState('');
    const { user } = useSelector((state) => state.auth);

    const counter = (count) => {
        const interval = setInterval(() => {
            setCoutdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
        }, count * 1000);
    };

    const QaytaRaqamJonatish = async (e) => {
        setReport(false);
        localStorage.setItem('qayta_', number, e);
        e.preventDefault();
        const data = {
            phone_or_email: number,
        };
        const { qaytaRaqamYuborishAuth } = useAuth();
        const response = await qaytaRaqamYuborishAuth(data);
        if (response.status === 200 || response.status === 201) {
            const { access } = response.data;
            localStorage.setItem('qayta_token', access);
            Router.push(`/account/change-password?via=${response.data.via_}`);
        } else {
            setReport(true);
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik',
                content: response.data.msg,
            });
            modal.update;
        }
    };

    const handleChange = (e) => {
        setNumber(e);
        // if (e[0] == '+') {
        //     setTelLenght('13');
        // } else {
        //     setTelLenght('');
        // }
    };

    return user?.access ? (
        <Page404 />
    ) : (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <form
                        className="ps-form--account forma-raqam position-relative"
                        onSubmit={(e) => QaytaRaqamJonatish(e)}>
                        <label className="fw-1">
                            {' '}
                            Raqam yoki emailingizni kiriting{' '}
                        </label>
                        <input
                            type="text"
                            placeholder="Raqam yoki email"
                            className="raqam-input"
                            onChange={(e) => handleChange(e.target.value)}
                            // defaultValue={'+998'}
                            // maxLength={telLenght}
                        />

                        <div className="form-group submit">
                            {report ? (
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Yuborish
                                </button>
                            ) : (
                                <button
                                    disabled={true}
                                    className="ps-btn ps-btn--fullwidth mb-5">
                                    <BeatLoader color="#fff" />
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </PageContainer>
    );
}
