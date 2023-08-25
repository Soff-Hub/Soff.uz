import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Form, Input, Modal } from 'antd';
import useAuth from '~/hooks/useAuth';
import PageContainer from '~/components/layouts/PageContainer';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const Xabar = (e) => {
    // e.preventDefault();
    const tokenn = useSelector((state) => state.auth);
    const [countdown, setCoutdown] = useState(60);
    const [nomer, setNomer] = useState('');
    const [report, setReport] = useState(true)

    const [kod, setKod] = useState(null);

    // if (tokenn.user) {
    //     console.log('redux', tokenn.user);
    // }

    const handleSubmitKod = async () => {
        let data = {
            code: `${kod}`,
        };
       
            const { verifyCode } = useAuth();
            const user = await verifyCode(data);
            console.log('verfy respons', user);
            if (user.status === 200 || user.status === 201) {
                Router.push('/account/login');
            }
    };

    
  const handleInputChange = (event) => {
    const newValue = event.target.value.slice(0, 4);
    setKod(newValue);
    console.log( event.target.value.slice(0, 4));
  };

    const qaytaKodOlish = async () => {
        const { qaytaKodYuborish } = useAuth();
        const qaytaUser = await qaytaKodYuborish();
        console.log('qayta', qaytaUser);
        if (qaytaUser.status === 200 || qaytaUser.status === 201) {
            setReport(true)
        }else{
            let message = '';
            const modal = Modal.error({
                centered: true,
                title: 'Nimadir xato bor!',
                content: message,
            });
            modal.update;
        }
    };

    useEffect(() => {
        if (countdown > 0) {
            setReport(true)
        }else(
            setReport(false)
        )
        if (localStorage.getItem('data')) {
            setNomer(JSON.parse(localStorage.getItem('data')).phone);
        }
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
                        onFinish={(e) => handleSubmitKod(e)}>
                        <div className="ps-tab active" id="register">
                            <div className="ps-form__content">
                                <h5>Kodni kiriting</h5>
                                <div className='kod-input'>
                                    <Input
                                        required
                                        className="form-control mb-4 "
                                        type="number"
                                        placeholder="Kodni kiriting..."
                                        onChange={handleInputChange}
                                        maxLength={"4"}
                                    />
                                    {/* </Form.Item> */}
                                    <p> {nomer} nomerga sms boradi</p>

                                    <p>
                                        Kod kelishiga qolgan vaqt: {countdown}{' '}
                                        soniya
                                    </p>
                                </div>
                                <div className="form-group submit">
                                    {report  ? (
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
