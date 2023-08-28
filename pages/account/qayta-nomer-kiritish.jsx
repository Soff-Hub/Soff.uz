import { Modal } from 'antd';
import Router from 'next/router';
import React, { useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import useAuth from '~/hooks/useAuth';
import {BeatLoader} from 'react-spinners'

export default function QaytaNomerKiritish() {
    const [report, setReport] = useState(true)
    const [number, setNumber] = useState('');

    const QaytaRaqamJonatish = async (e) => {
        e.preventDefault();
        const data = {
            phone: `+998` + number.toString(),
        };
        const { qaytaRaqamYuborishAuth } = useAuth();
        const response = await qaytaRaqamYuborishAuth(data);
        if (response.status === 200 || response.status === 201) {
            Router.push('/account/parolni-almashtirish');
            const { access } = response.data;
            console.log('qayta access', access);
            setReport(false)
            localStorage.setItem('qayta_token', access);
        } else {
            let message = '';
            const modal = Modal.error({
                centered: true,
                title: 'Nimadir xato bor!',
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
                        <label className="label-before"> Raqam kiriting </label>
                        <input
                            type="number"
                            className="raqam-input"
                            onChange={(e) => setNumber(e.target.value)}
                            maxLength="13"
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
