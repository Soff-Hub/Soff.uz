import React from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import RedesignModulePaymentOrderSummary from './modules/RedesignModulePaymentOrderSummary';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaBoxOpen } from 'react-icons/fa';
import { Button } from 'antd';

const Checkout = () => {
    const router = useRouter();
    if (!router.isReady) return null;

    const cartItems = useSelector(state => state.ecomerce.cartDataItems);

    const isCartEmpty = !cartItems || cartItems.length === 0;

    return (
        <div className="ps-checkout ps-section--shopping p-0">
            <div className="container p-lg-0">
                {isCartEmpty ? (
                    <div
                        style={{ height: '80vh' }}
                        className="d-flex justify-content-center flex-column align-items-center">
                        <div
                            style={{
                                borderRadius: '50%',
                                background: '#7575751c',
                                width: '130px',
                                height: '130px',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: '20px',
                            }}>
                            <FaBoxOpen
                                style={{
                                    color: '#00a44f',
                                    fontSize: '70px',
                                }}
                            />
                        </div>
                        <h3
                            style={{ fontSize: '30px' }}
                            className="font-bold mb-2 text-gray-800">
                            Savat bo'sh
                        </h3>
                        <p className="mb-4 text-center text-muted">
                            To'lov qilish uchun biror mahsulot qo'shing.
                        </p>
                        <Button
                            type="primary"
                            size="large"
                            onClick={() => router.push('/')}>
                            <FaArrowLeft />
                            Xarid qilishni boshlash
                        </Button>
                    </div>
                ) : (
                    <div className="ps-form__content">
                        <div className="row d-flex justify-content-between my-5">
                            <div className="col-xl-7 col-lg-8 col-md-12 col-12">
                                <RedesignModulePaymentOrderSummary
                                    ecomerce={cartItems}
                                />
                            </div>
                            <div className="col-xl-5 col-lg-4 col-md-12 col-12 mt-3">
                                <FormCheckoutInformation ecomerce={cartItems} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
