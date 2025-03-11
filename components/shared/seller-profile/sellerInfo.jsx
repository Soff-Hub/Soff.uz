import React from 'react';

export default function SellerInfo () {
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
                    <p className='SellerInfoCardCount'>1 548 ta </p>
                </div>
                <div className='SellerInfoCard'>
                    <div className='SellerInfoCardBody'>
                        <img
                            className='SellerInfoCardImg'
                            src='/static/img/Sotilgan_mahsulotlar.png'
                            alt=''
                        />
                        <p className='SellerInfoCardTitle'>
                            Sotilgan mahsulotlar{' '}
                        </p>
                    </div>
                    <p className='SellerInfoCardCount'>15 048 ta </p>
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
                    <p className='SellerInfoCardCount'>5 ta</p>
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
                    <p className='SellerInfoCardCount'>17 ta</p>
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
                    <p className='SellerInfoCardCount'>254 ta</p>
                </div>
            </div>
            <p className='SellerInfoSecondTitle'>Muallif Haqida</p>
            <p className='SellerInfoDescription'>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum. It has survived not only five centuries, but also
                the leap into electronic typesetting.
                <span className='SellerInfoDescriptionForMore'>
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
                    <a className='SellerInfoSecondCardBtnTitle' href=''>Buyurtma berish</a>
                    <img src='/static/img/RocketLaunch.svg' alt='' />
                </div>
            </div>
        </div>
    );
}
