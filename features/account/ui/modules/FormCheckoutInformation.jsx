import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreditCard2 from '../CreditCard2';

function FormCheckoutInformation({ items, type, id: queryId }) {
    const select = useSelector((state) => state.auth.user?.access);
    const [data, setData] = useState([]);

    useEffect(() => {
        if (select && items) {
            setData(items);
        }
    }, [items, select]);

    function extractIds(data) {
        return data.map((item) => Number(item.id));
    }
    const ids = extractIds(data);

    return (
        <div className="type_payment p-lg-5 p-md-5 p-4">
            <h3 className="type_payment_h3">To'lov turini tanlang:</h3>
            <div className="bg-white">
                <CreditCard2 document={ids} type={type} />
            </div>
        </div>
    );
}

export default FormCheckoutInformation;
