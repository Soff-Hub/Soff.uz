import React from 'react';
import { useRouter } from 'next/router';
import CreditCard2 from '../CreditCard2';

function FormCheckoutInformationOne() {
    const Router = useRouter();
    const { id } = Router.query;

    console.log('log', id);

    let arr = [];
    arr.push(id);

    // const ProductToApi = async () => {
    //     setMessage(false);
    //     const data = {
    //         documents: arr,
    //     };
    //     const token = {
    //         headers: {
    //             Authorization: `Bearer ${select} `,
    //         },
    //     };
    //     const respons = await ClickRepository.postClick(data, token);
    //     if (respons) {
    //         const a = document.createElement('a');
    //         a.href = `${respons?.data?.url}`;
    //         a.rel = 'noopener noreferrer';
    //         a.target = '_blank';
    //         a.click();
    //         a.remove();
    //         setMessage(true);
    //     }
    // };

    return (
        <div className="tolov-usullari">
            <h3 style={{ fontWeight: '600', margin: '0' }}>To'lov qilish</h3>
            <div className="d-flex aligin-content-center  rounded-5 px-3">
                <CreditCard2 document={arr} />
            </div>
        </div>
    );
}

export default FormCheckoutInformationOne;
