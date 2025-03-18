import React, { use, useEffect } from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import { useSelector } from 'react-redux';
import useCart from '~/hooks/useCart';
import RedesignModulePaymentOrderSummary from './modules/RedesignModulePaymentOrderSummary';
import { useRouter } from 'next/router';
import { useGet } from '~/repositories/https';
const Checkout = () => {
    const router = useRouter();
    if (!router.isReady) return null;
    const ecomerce = useSelector(state => state.ecomerce.cartDataItems);
    const { data, isLoading, isError } = useGet('hh', 'hh');
    const { setAllCartItem } = useCart();

    useEffect(() => {
        if (ecomerce.length !== JSON.parse(localStorage.getItem('cart'))) {
            setAllCartItem();
        }
    }, []);

    return (
        <div className='container p-xl-0 mt-5'>
            <div className='CheckoutStyle'>
                <div className='RedesignModulePaymentOrderSummary'>
                    <RedesignModulePaymentOrderSummary ecomerce={ecomerce} />
                </div>
                <div className=' FormCheckoutInformation'>
                    <FormCheckoutInformation />
                </div>
            </div>
        </div>
    );
};

export default Checkout;
