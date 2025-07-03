import React from 'react';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';

export default function SellerShortInfo ({ sellerInfo }) {
    const isoDate = '2025-07-03T14:07:47.883770';
    const dateObj = new Date(isoDate);

    function formatDate (dateString) {
        if (!dateString) return '';
        const dateObj = new Date(dateString);
        return dateObj.toLocaleDateString('uz-UZ'); // "03.07.2025"
    }

    return (
        <div className='sellerInfo'>
            <div className='aboutSeller'>
                <img
                    className='sellerAvatar'
                    src={sellerInfo?.seller?.image}
                    alt=''
                />
                <div className=' sellerNameContainer '>
                    <img src='/static/img/Vector.png' alt='' />
                    <p className='sellerName m-0'>
                        {sellerInfo?.seller?.full_name}
                    </p>
                </div>
                <div className='sellerStatusContainer'>
                    <img src='/static/img/Ritsar.png' alt='' />
                    <p className='sellerStatus m-0'>Ritsar</p>
                </div>
            </div>
            <ul className='p-0 rowgap_16'>
                <li className=' between mt-3 '>
                    <p className='titleInfo'>Ro'yhatdan o'tgan</p>
                    <p className='sellerName m-0'>{sellerInfo?.created_at}</p>
                </li>
                <li className=' between mt-3'>
                    <p className='titleInfo'>Manzil</p>
                    <p className='innerInfo'>Toshkent Sh</p>
                </li>
                <li className=' between mt-3'>
                    <p className='titleInfo'>Oxirgi faollik</p>
                    <p className='innerInfo'>
                        <CalculateTimeDifference
                            targetDate={sellerInfo?.seller?.last_login}
                        />
                    </p>
                </li>
            </ul>
            <div className='VerifiedInformation'>
                <p className='VerifiedInformationTitle'>
                    Malumotlar tasdiqlangan
                </p>
                <ul className='VerifiedInformationInfoWrap'>
                    <li className='VerifiedInformationInfo between  '>
                        <p className='titleInfo m-0 p-0'>Telefon raqami</p>
                        <img src='/static/img/checked.png' alt='' />
                    </li>
                    <li className='VerifiedInformationInfo between'>
                        <p className='titleInfo m-0 p-0'>Email manzil</p>
                        <img src='/static/img/unchecked.png' alt='' />
                    </li>
                    <li className='VerifiedInformationInfo between'>
                        <p className='titleInfo m-0 p-0'>Telefon raqami</p>
                        <img src='/static/img/unchecked.png' alt='' />
                    </li>
                    <li className='VerifiedInformationInfo between'>
                        <p className='titleInfo m-0 p-0'>Email manzil</p>
                        <img src='/static/img/checked.png' alt='' />
                    </li>
                </ul>
            </div>
        </div>
    );
}
