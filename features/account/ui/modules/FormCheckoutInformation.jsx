import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CreditCard2 from '../CreditCard2';
import { useTranslation } from 'next-i18next';

function FormCheckoutInformation({ ecomerce }) {
    const { t } = useTranslation('account');
    const select = useSelector((state) => state.auth.user?.access);
    const cartData = useSelector((state) => state.ecomerce.cartDataItems);
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
        <div className="type_payment p-lg-5 p-md-5 p-4">
            <h3 className="type_payment_h3">
                {t('checkout.selectPaymentType')}
            </h3>
            <div className="bg-white">
                <CreditCard2 document={ids} ecomerce={ecomerce} />
            </div>
        </div>
    );
}

export default FormCheckoutInformation;
