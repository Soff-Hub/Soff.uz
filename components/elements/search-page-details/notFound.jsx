import React from 'react';
import { useRouter } from 'next/router';

export default function Search_Results_NotFound () {
    const router = useRouter();

    const handleRedirect = () => {
        router.push('/'); // bu yerda '/' asosiy sahifani bildiradi
    };

    return (
        <div>
            <div className='Search_Results_not_found'>
                <img
                    src='/static/img/searchNotFound.png'
                    alt=''
                    className='Search_Results_not_found_img'
                />
                <p className='Search_Results_not_found_title'>
                    Kechirasiz, natijalar topilmadi
                </p>
                <p
                    className='Search_Results_not_found_btn'
                    onClick={handleRedirect}
                    style={{ cursor: 'pointer' }}
                >
                    Asosiy sahifaga
                </p>
            </div>
        </div>
    );
}
