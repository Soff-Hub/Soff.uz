import React from 'react';
import FormCheckoutInformationOne from './modules/FormCheckoutInformationOne';
import ModulePaymentOrderSummaryOne from './modules/ModulePaymentOrderSummaryOne';
const CheckoutOne = () => {
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
            <h2 className='checkOut_header' >Xarid savati</h2>
                    <hr className='pb-3' />
                <div className="ps-section__content">
                    <div className="ps-form--checkout">
                        <div className="ps-form__content">
                            <div className="row">
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 ">
                                    <ModulePaymentOrderSummaryOne />
                                </div>
                                <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                                    <FormCheckoutInformationOne />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutOne;
