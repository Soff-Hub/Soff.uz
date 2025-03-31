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
    const ecomerce = useSelector((state) => state.ecomerce.cartDataItems);
    console.log("ecomerce -> ", ecomerce);
    

    return (
        <div className='ps-checkout ps-section--shopping p-0'>
            <div className='container p-lg-0'>
                {/* <h2 className='checkOut_header'>Xarid savati</h2> */}
                {/* <hr className='pb-3' /> */}
                <div className=''>
                    <div className=''>
                        <div className='ps-form__content'>
                            <div className='row d-flex justify-content-between'>
                                <div className='col-xl-7 col-lg-8 col-md-12 col-12'>
                                    {/* <ModulePaymentOrderSummary ecomerce={ecomerce} /> ` */}
                                    <RedesignModulePaymentOrderSummary
                                        ecomerce={ecomerce}
                                    />

                                </div>
                                <div className='col-xl-5 col-lg-4 col-md-12 col-12 mt-3'>
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
