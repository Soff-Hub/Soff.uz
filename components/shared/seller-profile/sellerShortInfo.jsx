import React from 'react';

export default function SellerShortInfo () {
    return (
        <div className='sellerInfo'>
            <div className='aboutSeller'>
                <img
                    className='sellerAvatar'
                    src={'https://picsum.photos/id/237/200/300'}
                    alt=''
                />
                <div className=' sellerNameContainer '>
                    <img src='/static/img/Vector.png' alt='' />
                    <p className='sellerName m-0'>Mark Zuckerberg</p>
                </div>
                <div className='sellerStatusContainer'>
                    <img src='/static/img/Ritsar.png' alt='' />
                    <p className='sellerStatus m-0'>Ritsar</p>
                </div>
            </div>
            <ul className='p-0 rowgap_16'>
                <li className=' between mt-3 '>
                    <p className='titleInfo'>Ro'yhatdan o'tgan</p>
                    <p className='innerInfo'>01.01.2025</p>
                </li>
                <li className=' between mt-3'>
                    <p className='titleInfo'>Manzil</p>
                    <p className='innerInfo'>Toshkent Sh</p>
                </li>
                <li className=' between mt-3'>
                    <p className='titleInfo'>Oxirgi faollik</p>
                    <p className='innerInfo'>5 soat oldin</p>
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
