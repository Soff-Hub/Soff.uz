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
            <div style={{ padding: "0 15px" }}>
                <h3 className='tolov-usullari-h3' style={{ fontWeight: '600', margin: '0', padding: '0' }}>To'lov turini tanlang</h3>
                <p>Mahsulotni sotib olganingizdan so'ng   <a href="/account/sellerproducts" ><strong className='text-success'>Sotib olingan</strong></a> lar <br /> sahifasidan  yokida o'sha mahsulot ichida yuklab olish  <br /> knobkasi  chiqadi shu  orqali yuklab olishingiz mumkin!</p>
            </div>
            <div className="d-flex aligin-content-center  rounded-5 px-3">
                <CreditCard2 document={arr} />
            </div>
        </div>
    );
}

export default FormCheckoutInformationOne;
