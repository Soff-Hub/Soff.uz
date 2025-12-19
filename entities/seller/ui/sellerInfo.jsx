import React, { useState } from 'react';
import SellerDonateForm from '~/components/partials/seller/SellerDonateForm';

export default function SellerInfo({ sellerInfo, onChange }) {
    const [openDonateModal, setOpenDonateModal] = useState(false);
    return (
        <div>
            <div className="SellerInfo">
                <p className="SellerInfoTitle">Statistikalar</p>
                <div className="SellerInfoCardWrap">
                    <div className="SellerInfoCard">
                        <div className="SellerInfoCardBody">
                            <img
                                className="SellerInfoCardImg"
                                src="/static/img/Mahsulotlari_soni.png"
                                alt=""
                            />
                            <p className="SellerInfoCardTitle">
                                Mahsulotlari soni
                            </p>
                        </div>
                        <p className="SellerInfoCardCount">
                            {sellerInfo?.total_products_count || 0} ta
                        </p>
                    </div>
                    <div className="SellerInfoCard">
                        <div className="SellerInfoCardBody">
                            <img
                                className="SellerInfoCardImg"
                                src="/static/img/Sotilgan_mahsulotlar.png"
                                alt=""
                            />
                            <p className="SellerInfoCardTitle">
                                Sotilgan mahsulotlar
                            </p>
                        </div>
                        <p className="SellerInfoCardCount">
                            {sellerInfo?.total_sold_documents || 0} ta
                        </p>
                    </div>
                    <div className="SellerInfoCard">
                        <div className="SellerInfoCardBody">
                            <img
                                className="SellerInfoCardImg"
                                src="/static/img/Jarayondagi_ishlar.png"
                                alt=""
                            />
                            <p className="SellerInfoCardTitle">
                                Jarayondagi ishlar{' '}
                            </p>
                        </div>
                        <p className="SellerInfoCardCount">
                            {sellerInfo?.progress_jobs_count || 0} ta
                        </p>
                    </div>
                    <div className="SellerInfoCard">
                        <div className="SellerInfoCardBody">
                            <img
                                className="SellerInfoCardImg"
                                src="/static/img/Muvaffaqiyatsiz_tugatilgan.png"
                                alt=""
                            />
                            <p className="SellerInfoCardTitle">
                                Muvaffaqiyatsiz tugatilgan{' '}
                            </p>
                        </div>
                        <p className="SellerInfoCardCount">
                            {' '}
                            {sellerInfo?.unsuccessful_jobs_count || 0} ta
                        </p>
                    </div>
                    <div className="SellerInfoCard">
                        <div className="SellerInfoCardBody">
                            <img
                                className="SellerInfoCardImg"
                                src="/static/img/Muvaffaqiyatli_Tugatilgan.png"
                                alt=""
                            />
                            <p className="SellerInfoCardTitle">
                                Muvaffaqiyatli Tugatilgan{' '}
                            </p>
                        </div>
                        <p className="SellerInfoCardCount">
                            {sellerInfo?.successful_jobs_count || 0} ta
                        </p>
                    </div>
                </div>
                {sellerInfo?.bio && (
                    <>
                        <p className="SellerInfoSecondTitle">Muallif Haqida</p>
                        <p
                            style={{
                                fontWeight: 300,
                                fontSize: '13px',
                                wordBreak: 'break-word', // yoki overflowWrap: "anywhere"
                                whiteSpace: 'pre-wrap', // agar yangi qatorlarni saqlash kerak bo‘lsa
                            }}
                            className="SellerInfoDescription">
                            {sellerInfo?.bio}
                            {/* <span
                                className="SellerInfoDescriptionForMore pointer"
                                onClick={() => {
                                    setOpenDonateModal(true);
                                }}>
                                Qo’llab quvvatlash
                            </span> */}
                        </p>
                    </>
                )}
                {/* Buyurtma berish */}
                <div className="SellerInfoEnd">
                    <div className="SellerInfoSecondCardWrap">
                        <div className="SellerInfoSecondCard">
                            <img
                                src="/static/img/Buyurtma_bering.svg "
                                alt=""
                            />
                            <p className="SellerInfoSecondCardTitle">
                                Buyurtma bering
                            </p>
                            <p className="SellerInfoSecondCardDescription"></p>
                        </div>
                        <img src="/static/img/ArrowRight.svg" alt="" />
                        <div className="SellerInfoSecondCard">
                            <img src="/static/img/Tolov_qiling.svg " alt="" />
                            <p className="SellerInfoSecondCardTitle">
                                To’lov qiling
                            </p>
                            <p className="SellerInfoSecondCardDescription"></p>
                        </div>
                        <img src="/static/img/ArrowRight.svg" alt="" />
                        <div className="SellerInfoSecondCard">
                            <img src="/static/img/Yuklab_oling.svg  " alt="" />
                            <p className="SellerInfoSecondCardTitle">
                                {' '}
                                Yuklab oling
                            </p>
                            <p className="SellerInfoSecondCardDescription"></p>
                        </div>
                    </div>
                    <div className="SellerInfoSecondCardBtn">
                        <p
                            onClick={onChange}
                            href={'/seller/services'}
                            className="SellerInfoSecondCardBtnTitle">
                            Buyurtma berish
                        </p>
                        <img src="/static/img/RocketLaunch.svg" alt="" />
                    </div>
                </div>
            </div>

            {openDonateModal && (
                <div className="SellerDonateModal">
                    <div className="SellerDonateModal_wrap">
                        <SellerDonateForm />
                        <div
                            className="closeICon"
                            onClick={() => setOpenDonateModal(false)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                x="0px"
                                y="0px"
                                width="25"
                                height="25"
                                viewBox="0 0 48 48">
                                <path
                                    fill="#F44336"
                                    d="M21.5 4.5H26.501V43.5H21.5z"
                                    transform="rotate(45.001 24 24)"></path>
                                <path
                                    fill="#F44336"
                                    d="M21.5 4.5H26.5V43.501H21.5z"
                                    transform="rotate(135.008 24 24)"></path>
                            </svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
