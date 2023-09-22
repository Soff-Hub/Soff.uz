import { Modal } from 'antd';
import Router from 'next/router';
import React, { useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import useAuth from '~/hooks/useAuth';
import { BeatLoader } from 'react-spinners'

export default function QaytaNomerKiritish() {
    const [report, setReport] = useState(true)
    const [number, setNumber] = useState('');

    const counter = (count) => {
        const interval = setInterval(() => {
            setCoutdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(interval)
        }, count * 1000);
    }

    const QaytaRaqamJonatish = async (e) => {
        localStorage.setItem('qayta_', number)
        e.preventDefault();
        const data = {
            phone_or_email: number,
        };
        const { qaytaRaqamYuborishAuth } = useAuth();
        const response = await qaytaRaqamYuborishAuth(data);
        console.log(response)
        if (response.status === 200 || response.status === 201) {
            const { access } = response.data;
            console.log('qayta access', access);
            setReport(false)
            // const modal = Modal.success({
            //     centered: true,
            //     title: response.data.msg,
            //     content: '',
            // });
            // modal.update;
            localStorage.setItem('qayta_token', access);
            Router.push(`/account/parolni-almashtirish?via=${response.data.via_}`);
        } else {
            let message = '';
            const modal = Modal.error({
                centered: true,
                title: response.data.msg,
                content: message,
            });
            modal.update;
        }
    };
    return (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <form
                        className="ps-form--account forma-raqam position-relative"
                        onSubmit={(e) => QaytaRaqamJonatish(e)}>
                        <label className="fw-1"> Raqam yoki emailingizni kiriting </label>
                        <input
                            type="text"
                            placeholder='Raqam yoki email'
                            className="raqam-input"
                            onChange={(e) => setNumber(e.target.value)}
                        />

                        <div className="form-group submit">
                            {report ? (
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth">
                                    Yuborish
                                </button>
                            ) : (
                                <button className="ps-btn ps-btn--fullwidth mb-5">
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
