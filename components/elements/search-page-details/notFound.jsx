import React, { useState } from 'react';
import CreateOrderModal from '~/shared/components/modals/CreateOrderModal';

export default function Search_Results_NotFound() {
    const [ open, setOpen ] = useState()

    const handleRedirect = () => {
        setOpen(true)
    };

    return (
        <>
            <div className='Search_Results_not_found'>
                <img
                    src='/static/img/searchNotFound.png'
                    alt=''
                    className='Search_Results_not_found_img'
                />
                <p className='Search_Results_not_found_title'>
                    Izlagan mahsulotingiz yo‘qmi?
                </p>
                <p className='Search_Results_not_found_subtitle'>
                    <span
                        className='Search_Results_not_found_btn'
                        onClick={handleRedirect}
                    >
                        Buyurtma bering
                    </span>
                </p>
            </div>

            <CreateOrderModal
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}
