import React, { useEffect } from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import { useSelector } from 'react-redux';
import useCart from '~/hooks/useCart';
import RedesignModulePaymentOrderSummary from './modules/RedesignModulePaymentOrderSummary';
const Checkout = () => {
    const ecomerce = useSelector(state => state.ecomerce.cartDataItems);

    const { setAllCartItem } = useCart();

    useEffect(() => {
        if (ecomerce.length !== JSON.parse(localStorage.getItem('cart'))) {
            setAllCartItem();
        }
    }, []);

    return (
        <div className='ps-checkout ps-section--shopping p-lg-0'>
            <div className='container p-lg-0'>
                {/* <h2 className='checkOut_header'>Xarid savati</h2> */}
                {/* <hr className='pb-3' /> */}
                <div className=''>
                    <div className=''>
                        <div className='ps-form__content'>
                            <div className='row d-flex justify-content-between'>
                                <div className='col-xl-7 col-lg-6 col-md-12 col-12'>
                                    <ModulePaymentOrderSummary ecomerce={ecomerce} /> 
                                    {/* <RedesignModulePaymentOrderSummary
                                        ecomerce={ecomerce}
                                    /> */}
                                </div>
                                <div className='col-xl-5 col-lg-6 col-md-12 col-12'>
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
