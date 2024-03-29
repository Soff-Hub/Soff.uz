import React from 'react';
import { useRouter } from 'next/router';
import CreditCard2 from '../CreditCard2';

function FormCheckoutInformationOne() {
    const Router = useRouter();
    const { id } = Router.query;

    let arr = [];
    arr.push(id);

    return (
        <div className="tolov-usullari">
            <h3 className='tolov-usullari-h3' style={{ fontWeight: '600', margin: '0' , padding: '0 15px' }}>To'lov turini tanlang</h3>
            <div className="d-flex aligin-content-center  rounded-5 px-3">
                <CreditCard2 document={arr} />
            </div>
        </div>
    );
}

export default FormCheckoutInformationOne;
