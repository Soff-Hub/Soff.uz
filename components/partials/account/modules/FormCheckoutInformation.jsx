import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreditCard2 from '../CreditCard2';

function FormCheckoutInformation() {
    const select = useSelector(state => state.auth.user?.access);
    const cartData = useSelector(state => state.ecomerce.cartDataItems);
    const [data, setData] = useState([]);

    useEffect(() => {
        select && setData(cartData);
    }, [cartData]);

    function extractIds(data) {
        const ids = [];
        for (const item of data) {
            ids.push(Number(item.id));
        }
        return ids;
    }
    const ids = extractIds(data);

    return (
        <div className='type_payment p-lg-5 p-md-5 p-4'>
            <h3 className='type_payment_h3'>To'lov turini tanlang:</h3>
            {/* <div className="type_payment_description">
                <p>
                    <i className="fa-solid fa-shield-halved text-success"></i>
                    <strong className='text-success'> 100% xavfsiz to‘lov: </strong>
                    Biz faqat sertifikatlangan va himoyalangan to‘lov tizimlaridan foydalanamiz.
                </p>
                <p>
                    <i className="fa-solid fa-lock text-primary"></i>
                    <strong className='text-primary'> Maxfiylik kafolatlangan: </strong>
                    Karta ma’lumotlaringiz shifrlangan holda saqlanadi va begonalarga uzatilmaydi.
                </p>
            </div> */}
            <div className='bg-white'>
                <CreditCard2 document={ids} />
            </div>
        </div>
    );
}

export default FormCheckoutInformation;
