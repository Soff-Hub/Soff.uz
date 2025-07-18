// import { Modal } from 'antd';
// import React, { useState } from 'react';
// import CalculateTimeDifference from '~/components/partials/account/DateFormatter';

// export default function SellerShortInfo ({ sellerInfo }) {
//     const [nameModal, setNameModal] = useState(false);
//     const [fullName, setFullName] = useState(false);
//     const [surName, setSurname] = useState(false);

//     function handleChange (params) {
//         setFullName(params);
//         setSurname(!countTogle);
//     }

//     return (
//         <div className='sellerInfo'>
//             <div className='aboutSeller'>
//                 <img
//                     className='sellerAvatar'
//                     src={
//                         sellerInfo?.seller?.image
//                             ? sellerInfo?.seller?.image
//                             : '/static/img/user_without_img.png'
//                     }
//                     alt=''
//                 />
//                 <div className=' sellerNameContainer '>
//                     <img src='/static/img/Vector.png' alt='' />
//                     <p className='sellerName m-0'>
//                         {sellerInfo?.seller?.full_name}
//                     </p>
//                     <i
//                         onClick={() => setNameModal(true)}
//                         class='fa-solid fa-pen fs-4 mx-3 text-primary'></i>
//                 </div>
//                 <div className='sellerStatusContainer'>
//                     <img src='/static/img/Ritsar.png' alt='' />
//                     <p className='sellerStatus m-0'>
//                         {' '}
//                         {sellerInfo?.seller?.freelance_degree}
//                     </p>
//                 </div>
//             </div>
//             <ul className='p-0 rowgap_16'>
//                 <li className=' between mt-3 '>
//                     <p className='titleInfo'>Ro'yhatdan o'tgan</p>
//                     <p className='sellerName m-0'>{sellerInfo?.created_at}</p>
//                 </li>
//                 <li className=' between mt-3'>
//                     <p className='titleInfo'>Manzil</p>
//                     <p className='innerInfo'> {sellerInfo?.seller?.address}</p>
//                 </li>
//                 <li className=' between mt-3'>
//                     <p className='titleInfo'>Oxirgi faollik</p>
//                     <p className='innerInfo'>
//                         <CalculateTimeDifference
//                             targetDate={sellerInfo?.seller?.last_login}
//                         />
//                     </p>
//                 </li>
//             </ul>
//             <div className='VerifiedInformation'>
//                 <p className='VerifiedInformationTitle'>
//                     Malumotlar tasdiqlangan
//                 </p>
//                 <ul className='VerifiedInformationInfoWrap'>
//                     <li className='VerifiedInformationInfo between  '>
//                         <p className='titleInfo m-0 p-0'>Telefon raqami</p>
//                         <img
//                             src={
//                                 !!sellerInfo?.seller?.has_phone === true
//                                     ? '/static/img/checked.png'
//                                     : '/static/img/unchecked.png'
//                             }
//                             alt=''
//                         />
//                     </li>
//                     <li className='VerifiedInformationInfo between'>
//                         <p className='titleInfo m-0 p-0'>Email manzil</p>
//                         <img
//                             src={
//                                 !!sellerInfo?.seller?.has_email === true
//                                     ? '/static/img/checked.png'
//                                     : '/static/img/unchecked.png'
//                             }
//                             alt=''
//                         />
//                     </li>
//                 </ul>
//             </div>
//             <Modal
//                 title={"Profil ma'lumotlarni tahrirlash"}
//                 open={nameModal}
//                 onCancel={() => setNameModal(false)}
//                 footer={null}
//                 className={'mobile'}>
//                 <form>
//                     <div class='form-group'>
//                         <input
//                             type='text'
//                             placeholder='Ismingiz'
//                             class='form-control'
//                             aria-describedby='emailHelp'
//                         />
//                     </div>
//                     <div class='form-group'>
//                         <input
//                             type='text'
//                             placeholder='Familiyangiz'
//                             class='form-control'
//                         />
//                     </div>
//                     <div className='d-flex gap-3 justify-content-end'>
//                         {' '}
//                         <button
//                             className='btn p-2 fs-5 btn-danger'
//                             onClick={() => setNameModal(false)}>
//                             Yopish
//                         </button>
//                         <button className='btn p-2 fs-5 btn-success'>
//                             Saqlash
//                         </button>
//                     </div>
//                 </form>
//             </Modal>
//         </div>
//     );
// }
import { Modal } from 'antd';
import React, { useState } from 'react';
import SellerDonateForm from '~/components/partials/seller/SellerDonateForm';

export default function SellerInfo ({ sellerInfo }) {
    const [openDonateModal, setOpenDonateModal] = useState(false);
    return (
        <div>
            <div className='SellerInfo'>
                <p className='SellerInfoTitle'>Statistikalar</p>
                <div className='SellerInfoCardWrap'>
                    <div className='SellerInfoCard'>
                        <div className='SellerInfoCardBody'>
                            <img
                                className='SellerInfoCardImg'
                                src='/static/img/Mahsulotlari_soni.png'
                                alt=''
                            />
                            <p className='SellerInfoCardTitle'>
                                Mahsulotlari soni
                            </p>
                        </div>
                        <p className='SellerInfoCardCount'>
                            {sellerInfo?.total_approved_documents
                                ? sellerInfo.total_approved_documents + ' ta'
                                : '0 ta'}
                        </p>
                    </div>
                    <div className='SellerInfoCard'>
                        <div className='SellerInfoCardBody'>
                            <img
                                className='SellerInfoCardImg'
                                src='/static/img/Sotilgan_mahsulotlar.png'
                                alt=''
                            />
                            <p className='SellerInfoCardTitle'>
                                Sotilgan mahsulotlar
                            </p>
                        </div>
                        <p className='SellerInfoCardCount'>
                            {sellerInfo?.total_sold_documents
                                ? sellerInfo.total_sold_documents + ' ta'
                                : '0 ta'}
                        </p>
                    </div>
                    <div className='SellerInfoCard'>
                        <div className='SellerInfoCardBody'>
                            <img
                                className='SellerInfoCardImg'
                                src='/static/img/Jarayondagi_ishlar.png'
                                alt=''
                            />
                            <p className='SellerInfoCardTitle'>
                                Jarayondagi ishlar{' '}
                            </p>
                        </div>
                        <p className='SellerInfoCardCount'>
                            {sellerInfo?.seller?.in_progress_orders
                                ? sellerInfo?.seller?.in_progress_orders + ' ta'
                                : '0 ta'}
                        </p>
                    </div>
                    <div className='SellerInfoCard'>
                        <div className='SellerInfoCardBody'>
                            <img
                                className='SellerInfoCardImg'
                                src='/static/img/Muvaffaqiyatsiz_tugatilgan.png'
                                alt=''
                            />
                            <p className='SellerInfoCardTitle'>
                                Muvaffaqiyatsiz tugatilgan{' '}
                            </p>
                        </div>
                        <p className='SellerInfoCardCount'>
                            {' '}
                            {sellerInfo?.seller?.unsuccessful_orders
                                ? sellerInfo?.seller?.unsuccessful_orders +
                                  ' ta'
                                : '0 ta'}
                        </p>
                    </div>
                    <div className='SellerInfoCard'>
                        <div className='SellerInfoCardBody'>
                            <img
                                className='SellerInfoCardImg'
                                src='/static/img/Muvaffaqiyatli_Tugatilgan.png'
                                alt=''
                            />
                            <p className='SellerInfoCardTitle'>
                                Muvaffaqiyatli Tugatilgan{' '}
                            </p>
                        </div>
                        <p className='SellerInfoCardCount'>
                            {' '}
                            {sellerInfo?.seller?.successful_orders
                                ? sellerInfo?.seller?.successful_orders + ' ta'
                                : '0 ta'}
                        </p>
                    </div>
                </div>
                <p className='SellerInfoSecondTitle'>Muallif Haqida</p>
                <p className='SellerInfoDescription'>
                    {sellerInfo?.seller?.bio}
                    <span
                        className='SellerInfoDescriptionForMore pointer'
                        onClick={() => {
                            console.log('clicked');
                            setOpenDonateModal(true);
                        }}>
                        Qo’llab quvvatlash
                    </span>
                </p>
                <div className='SellerInfoEnd'>
                    <div className='SellerInfoSecondCardWrap'>
                        <div className='SellerInfoSecondCard'>
                            <img
                                src='/static/img/Buyurtma_bering.svg '
                                alt=''
                            />
                            <p className='SellerInfoSecondCardTitle'>
                                Buyurtma bering
                            </p>
                            <p className='SellerInfoSecondCardDescription'>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                        <img src='/static/img/ArrowRight.svg' alt='' />
                        <div className='SellerInfoSecondCard'>
                            <img src='/static/img/To’lov_qiling.svg ' alt='' />
                            <p className='SellerInfoSecondCardTitle'>
                                To’lov qiling
                            </p>
                            <p className='SellerInfoSecondCardDescription'>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                        <img src='/static/img/ArrowRight.svg' alt='' />
                        <div className='SellerInfoSecondCard'>
                            <img src='/static/img/Yuklab_oling.svg  ' alt='' />
                            <p className='SellerInfoSecondCardTitle'>
                                {' '}
                                Yuklab oling
                            </p>
                            <p className='SellerInfoSecondCardDescription'>
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry.
                            </p>
                        </div>
                    </div>
                    <div className='SellerInfoSecondCardBtn'>
                        <p className='SellerInfoSecondCardBtnTitle'>
                            Buyurtma berish
                        </p>
                        <img src='/static/img/RocketLaunch.svg' alt='' />
                    </div>
                </div>
            </div>

            {openDonateModal && (
                <div className='SellerDonateModal'>
                    <div className='SellerDonateModal_wrap'>
                        <SellerDonateForm />
                        <div
                            className='closeICon'
                            onClick={() => setOpenDonateModal(false)}>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                x='0px'
                                y='0px'
                                width='25'
                                height='25'
                                viewBox='0 0 48 48'>
                                <path
                                    fill='#F44336'
                                    d='M21.5 4.5H26.501V43.5H21.5z'
                                    transform='rotate(45.001 24 24)'></path>
                                <path
                                    fill='#F44336'
                                    d='M21.5 4.5H26.5V43.501H21.5z'
                                    transform='rotate(135.008 24 24)'></path>
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}