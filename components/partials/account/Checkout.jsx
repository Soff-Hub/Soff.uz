import React, { useEffect } from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { useSelector } from 'react-redux';
import useCart from '~/hooks/useCart';
import { useRouter } from 'next/router';
const Checkout = () => {
    const router = useRouter();
    if (!router.isReady) return null;
    const ecomerce = useSelector((state) => state.ecomerce.cartDataItems);
    const { setAllCartItem } = useCart()

    

    useEffect(() => {
        if (ecomerce.length !== JSON.parse(localStorage.getItem('cart'))) {
            setAllCartItem();
        }
    }, []);




    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <h2 className='checkOut_header' >Xarid savati</h2>
                <hr className='pb-3' />
                <div className="ps-section__content">
                    <div className="ps-form--checkout">
                        <div className="ps-form__content">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6  col-md-6  col-12  ">
                                    <ModulePaymentOrderSummary ecomerce={ecomerce} />
                                </div>
                                <div className="col-xl-6 col-lg-6  col-md-6 col-12">
                                    <FormCheckoutInformation />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
