import React from 'react';
import { useRouter } from 'next/router';
import CreditCard2 from '../CreditCard2';

function FormCheckoutInformationOne() {
    const router = useRouter();

    const { id, type } = router.query;

    if (!router.isReady) return null;

    let arr = [];
    if(id){
        arr.push(id);
    }

    return (
        <div className="tolov-usullari">
            <div style={{ padding: "0 15px" }}>
                <h3 className='tolov-usullari-h3' style={{ fontWeight: '600', margin: '0', padding: '0' }}>To'lov turini tanlang</h3>
                <p>Mahsulotni sotib olganingizdan so'ng, shaxsiy kabinetingizdagi <br /> <a href="/account/sellerproducts" ><strong className='text-success'>Sotib olingan</strong></a> lar sahifasidan yoki mahsulot to'liq sahifasiga <br /> qayta kirib yuklab olishingiz mumkin bo'ladi   !</p>
            </div>
            <div className="d-flex aligin-content-center  rounded-5 px-3">
                <CreditCard2 document={arr} type={type} />
            </div>
        </div>
    );
}


export default FormCheckoutInformationOne;
