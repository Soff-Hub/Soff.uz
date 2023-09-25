import React from 'react';

const FooterCopyright = () => {
    let vaqt = new Date();

    return (
        <div className="ps-footer__copyright">
            <p>
                &copy; {vaqt.getFullYear()} alldata. Barcha huquqlar
                himoyalangan
            </p>
            <p>
                <span>Biz xavfsiz to'lovdan foydalanamiz:</span>
                <a href="#">
                    <img
                        src="/static/img/payment-method/click_logo.png"
                        style={{ height: '35px' }}
                        alt="alldata click"
                    />
                </a>
                <a href="#">
                    <img
                        src="/static/img/payment-method/payme_logo.png"
                        style={{ height: '25px' }}
                        alt="alldata payme"
                    />
                </a>
            </p>
        </div>
    );
};

export default FooterCopyright;
