import { Modal } from 'antd';
import Router from 'next/router';
import React, { useState } from 'react';
import { BeatLoader } from 'react-spinners';
import PageContainer from '~/components/layouts/PageContainer';
import useAuth from '~/hooks/useAuth';

export default function NewPassword() {
    const [parol1, setParol1] = useState('');
    const [parol2, setParol2] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [report, setReport] = useState(true);

    const QaytaParolJonatish = async (e) => {
        setReport(false);
        e.preventDefault();
        const data = {
            password: parol1,
            password2: parol2,
        };
        const { qaytaParolYuborishAuth } = useAuth();
        const user = await qaytaParolYuborishAuth(data);
        if (user.status === 200 || user.status === 201) {
            

            if (user?.data?.role === 'seller' || user?.data?.role === 'admin') {
                Router.push('/account/dashbord');
            } else if (user?.data?.role === 'customer') {
                Router.push('/account/myproducts');
            }
            setParol1('');
            setParol2('');
            setReport(true);
        } else {
           
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: user?.data?.msg,
            });
            modal.update;
            setReport(true);
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            passwordInput.focus();
        }
    };

    return (
        <PageContainer>
            <div className="ps-checkout ps-section--shopping">
                <div className="container">
                    <form
                        className="ps-form--account forma-raqam position-relative"
                        onSubmit={(e) => QaytaParolJonatish(e)}>
                        <div>
                            {' '}
                            <label style={{ fontSize: '17px' }}>
                                {' '}
                                Parolni kiriting{' '}
                            </label>
                            <input
                                required
                                type="text"
                                className="raqam-input-parol"
                                onChange={(e) => setParol1(e.target.value)}
                                onKeyDown={handleEnterKeyPress}
                            />
                        </div>
                        <div>
                            {' '}
                            <label style={{ fontSize: '17px' }}>
                                {' '}
                                Parolni qayta kiriting{' '}
                            </label>
                            <input
                                required
                                type="text"
                                className="raqam-input-parol"
                                onChange={(e) => setParol2(e.target.value)}
                                ref={(input) => setPasswordInput(input)}
                            />
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
                                    type="submit"
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
