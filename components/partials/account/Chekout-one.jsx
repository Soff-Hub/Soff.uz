import React, { useEffect, useState } from 'react';
import FormCheckoutInformationOne from './modules/FormCheckoutInformationOne';
import ModulePaymentOrderSummaryOne from './modules/ModulePaymentOrderSummaryOne';
import Joyride from 'react-joyride';
import { useRouter } from 'next/router';


const CheckoutOne = () => {
    const [run, setRun] = useState(false);
    const router = useRouter();

    if (!router.isReady) return null;

    const steps = [
        {
            target: '.checkoutstep-0',
            content: "Sotib olayotgan mahsulotingiz to'g'riligini tekshiring",
            locale: {
                close: "Yopish",
                next: "Hammasi joyida",
                open: "5",
            },
            placement: 'top'
        },
        {
            target: '.checkoutstep-1',
            content: "Ixtiyoriy sizga maqul bo'lga to'lov turini tanlang! va mahsulot uchun to'lov qiling",
        }
    ]



    const callbackSingle = (data) => {
        if (data.action === 'reset' || data.action === "close") {
            const doc = document.querySelector('.headerSticky')
            doc.id = "headerSticky"
            setRun(false)
        }
    };



    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">

                {run && <Joyride
                    steps={steps}
                    run={true}
                    continuous
                    floaterProps={{
                        autoOpen: true,
                        placement: 'right-start',
                        offset: 0
                    }}
                    styles={{
                        options: {
                            arrowColor: '#e3ffeb',
                            primaryColor: '#00A44F',
                            textColor: '#004a14',
                            padding: '0 !important',
                            width: 300,
                        },

                    }}
                    // disableOverlayClose
                    // hideCloseButton
                    callback={callbackSingle}
                    // disableCloseOnEsc
                    locale={{
                        back: "Oldingisi",
                        last: "Tushundim",
                        close: "Yopish",
                        next: "Tushundim",
                        open: "Ochish",
                    }}
                />}



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
