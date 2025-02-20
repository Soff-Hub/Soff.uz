import React from 'react';

export default function ResutsComponents () {
    return (
        <div className=''>
            <h2 className='product-list-title text-center'>Shu kunga qadar!</h2>
            <div className='d-flex justify-content-center align-items-center bg-success resultBox'>
                <div className='resultsItems'>
                    <p className='resultsItemsRate text-center'>5+</p>
                    <p className='resultsItemsTitle text-center'>
                        Yillik tajriba
                    </p>
                </div>
                <img src='/static/img/line.svg' alt='' />
                <div className='resultsItems'>
                    <p className='resultsItemsRate text-center'>864+</p>
                    <p className='resultsItemsTitle text-center'>
                        Tugatilgan ishlar
                    </p>
                </div>
                <img src='/static/img/line.svg' alt='' />
                <div className='resultsItems '>
                    <p className='resultsItemsRate text-center'>2500+</p>
                    <p className='resultsItemsTitle text-center'>
                        Faol foydalanuvchilar
                    </p>
                </div>
                <img src='/static/img/line.svg' alt='' />
                <div className='resultsItems'>
                    <p className='resultsItemsRate text-center'>235+</p>
                    <p className='resultsItemsTitle text-center'>
                        Mutaxassislar soni
                    </p>
                </div>
            </div>
        </div>
    );
}
