import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ClickRepository from '~/repositories/ClickRepository';
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import CreditCard2 from '../CreditCard2';

function FormCheckoutInformationOne() {
    const select = useSelector((state) => state.auth.user?.access);
    const [message, setMessage] = useState(true);
    const Router = useRouter();
    const { id } = Router.query;

    console.log('log', id);

    const state = useSelector((state) => state?.auth?.shop);
    let arr = [];
    arr.push(id);

    const ProductToApi = async () => {
        setMessage(false);
        const data = {
            documents: arr,
        };
        const token = {
            headers: {
                Authorization: `Bearer ${select} `,
            },
        };
        const respons = await ClickRepository.postClick(data, token);
        if (respons) {
            const a = document.createElement('a');
            a.href = `${respons?.data?.url}`;
            a.rel = 'noopener noreferrer';
            a.target = '_blank';
            a.click();
            a.remove();
            setMessage(true);
        }
    };

    return (
        <div className="tolov-usullari">
            <div className="d-flex aligin-content-center  rounded-5 p-3">
                <CreditCard2/>
            </div>
           
        </div>
    );
}

export default FormCheckoutInformationOne;
