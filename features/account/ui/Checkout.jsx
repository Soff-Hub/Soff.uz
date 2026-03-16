import React from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import RedesignModulePaymentOrderSummary from './modules/RedesignModulePaymentOrderSummary';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaBoxOpen } from 'react-icons/fa';
import { Button } from 'antd';

const Checkout = () => {
    const router = useRouter();
    const { cartDataItems, playlistCartDataItems, status } = useSelector(
        (state) => state.ecomerce
    );
    if (!router.isReady) return null;

    const allItems = [
        ...(cartDataItems || []),
        ...(playlistCartDataItems || []),
    ];

    const isCartEmpty = allItems.length === 0;
    let checkoutContent = null;

    if (isCartEmpty && status !== 'loading') {
        // ... existing empty cart UI ...
        checkoutContent = (
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
        );
    } else {
        const { type: queryType, id } = router.query;
        
        // If type is not in URL, try to infer it from cart content
        // If even one item in cart is a playlist, use 'playlist'
        const inferredType = queryType || 
            (playlistCartDataItems?.length > 0 ? 'playlist' : 'document');

        checkoutContent = (
            <div className="ps-form__content">
                <div className="row d-flex justify-content-between my-5">
                    <div className="col-xl-7 col-lg-8 col-md-12 col-12">
                        <RedesignModulePaymentOrderSummary
                            items={allItems}
                            type={inferredType}
                            id={id}
                        />
                    </div>
                    <div className="col-xl-5 col-lg-4 col-md-12 col-12">
                        <FormCheckoutInformation
                            items={allItems}
                            type={inferredType}
                            id={id}
                        />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-checkout ps-section--shopping p-0">
            <div className="container p-lg-0">{checkoutContent}</div>
        </div>
    );
};

export default Checkout;
