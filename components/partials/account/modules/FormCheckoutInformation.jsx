import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreditCard2 from '../CreditCard2';

function FormCheckoutInformation() {
    const select = useSelector((state) => state.auth.user?.access);
    const cartData = useSelector((state) => state.ecomerce.cartDataItems);
    const [data, setData] = useState([])


    useEffect(() => {
        select && 
        setData(cartData);
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
        <div className="tolov-usullari">
            <h3 className='tolov-usullari-h3' style={{ fontWeight: '600', margin: '0', padding:'0 15px' }}>To'lov ma'lumotlari</h3>
            <div className="d-flex aligin-content-center  rounded-5 px-3">
                <CreditCard2 document={ids} />
            </div>
        </div>
    );
}

export default FormCheckoutInformation;
