import { Modal } from 'antd';
import Router from 'next/router';
import React, { useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import useAuth from '~/hooks/useAuth';

export default function NewPassword() {
    const [parol1, setParol1] = useState('')
    const [parol2, setParol2] = useState('')

    const QaytaParolJonatish = async (e) => {
        e.preventDefault()
        const data = {
            "password" : parol1,
            "password2" : parol2
        }
        const { qaytaParolYuborishAuth} = useAuth()
        const user = await qaytaParolYuborishAuth(data)
        if (user.status === 200 || user.status === 201) {
            Router.push('/account/login')
        }else{
            let message = '';
            const modal = Modal.error({
                centered: true,
                title: user.data.msg,
                content: message,
            });
            modal.update;
        }
    }
    return (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <form
                        className="ps-form--account forma-raqam position-relative"
                        onSubmit={(e) => QaytaParolJonatish(e)}>
                       <div> <label style={{fontSize:'17px'}}> Parolni kiriting </label>
                        <input
                            type="number"
                            className="raqam-input-parol"
                            onChange={(e) => setParol1(e.target.value)}
                        /></div>
                       <div> <label style={{fontSize:'17px'}}> Parolni qayta kiriting </label>
                        <input
                            type="number"
                            className="raqam-input-parol"
                            onChange={(e) => setParol2(e.target.value)}
                        /></div>

                        <div className="form-group submit">
                            <button
                                type="submit"
                                className="ps-btn ps-btn--fullwidth">
                                Yuborish
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </PageContainer>
    );
}
