import React from 'react';

export default function SellerInfo ({ sellerInfo }) {
    console.log('sellerInfo', sellerInfo);

    return (
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
                        <p className='SellerInfoCardTitle'>Mahsulotlari soni</p>
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
                            ? sellerInfo?.seller?.unsuccessful_orders + ' ta'
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
                <span className='SellerInfoDescriptionForMore pointer'>
                    Qo’llab quvvatlash
                </span>
            </p>
            <div className='SellerInfoEnd'>
                <div className='SellerInfoSecondCardWrap'>
                    <div className='SellerInfoSecondCard'>
                        <img src='/static/img/Buyurtma_bering.svg ' alt='' />
                        <p className='SellerInfoSecondCardTitle'>
                            Buyurtma bering
                        </p>
                        <p className='SellerInfoSecondCardDescription'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                    <img src='/static/img/ArrowRight.svg' alt='' />
                    <div className='SellerInfoSecondCard'>
                        <img src='/static/img/To’lov_qiling.svg ' alt='' />
                        <p className='SellerInfoSecondCardTitle'>
                            To’lov qiling
                        </p>
                        <p className='SellerInfoSecondCardDescription'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
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
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </p>
                    </div>
                </div>
                <div className='SellerInfoSecondCardBtn'>
                    <a className='SellerInfoSecondCardBtnTitle' href=''>
                        Buyurtma berish
                    </a>
                    <img src='/static/img/RocketLaunch.svg' alt='' />
                </div>
            </div>
        </div>
    );
}
