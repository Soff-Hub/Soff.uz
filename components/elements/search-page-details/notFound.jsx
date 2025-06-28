import React from 'react';

export default function Search_Results_NotFound () {
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
                <p className='Search_Results_not_found_btn'>Asosiy sahifaga</p>
            </div>
        </div>
    );
}
