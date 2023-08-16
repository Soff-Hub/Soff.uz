import React from 'react';

const FooterCopyright = () => (
    <div className="ps-footer__copyright">
        <p>&copy;  2021 alldata. Barcha huquqlar himoyalangan</p>
        <p>
            <span>Biz xavfsiz to'lovdan foydalanamiz:</span>
            <a href="#">
                <img src="/static/img/payment-method/click_logo.png" style={{height:'35px'}} alt="alldata click" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/payme_logo.png"  style={{height:'25px'}} alt="alldata payme" />
            </a>
            {/* <a href="#">
                <img src="/static/img/payment-method/3.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/4.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/5.jpg" alt="Martfury" />
            </a> */}
        </p>
    </div>
);

export default FooterCopyright;
