import React from 'react';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import RedesignModulePaymentOrderSummary from './modules/RedesignModulePaymentOrderSummary';

const Checkout = () => {
    const router = useRouter();
    if (!router.isReady) return null;
    const ecomerce = useSelector((state) => state.ecomerce.cartDataItems);

    return (
        <div className='ps-checkout ps-section--shopping p-0'>
            <div className='container p-lg-0'>
                <div className=''>
                    <div className=''>
                        <div className='ps-form__content'>
                            <div className='row d-flex justify-content-between'>
                                <div className='col-xl-7 col-lg-8 col-md-12 col-12'>
                                    <RedesignModulePaymentOrderSummary
                                        ecomerce={ecomerce}
                                    />

                                </div>
                                <div className='col-xl-5 col-lg-4 col-md-12 col-12 mt-3'>
                                    <FormCheckoutInformation ecomerce={ecomerce}/>
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
