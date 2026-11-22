import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreditCard2 from '../CreditCard2';
import styles from '../checkout.module.scss';

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
        <div className={styles.paymentMethods}>
            <div className={styles.paymentHeader}>
                <h3>To'lov usulini tanlang</h3>
                <p>O'zingizga qulay bo'lgan to'lov tizimidan foydalaning</p>
            </div>
            <div className="bg-white">
                <CreditCard2 document={ids} type={type} />
            </div>
        </div>
    );
}

export default FormCheckoutInformation;
