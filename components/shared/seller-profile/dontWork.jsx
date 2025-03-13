import React from 'react';

export default function DontWork () {
    return (
        <div className='dontWork'>
            <div className='dontWorkImg'>
                <img src='/static/img/change-setting.png' alt='' />
            </div>
            <div className='dontWorkBody'>
                <p className='dontWorkTitle'>
                    Xizmatlar bo‘limi hozircha mavjud emas, lekin tez orada
                    ishga tushiriladi. Kutilmagan yangiliklarga tayyor turing!
                </p>
            </div>
            <div className='dontWorkCardWrap'>
                <div className='dontWorkCard'>
                    <img
                        src='/static/img/Buyurtma_bering.svg '
                        alt=''
                        className='dontWorkCardImg'
                    />
                    <p className='dontWorkCardTitle'>Buyurtma bering</p>
                    <p className='dontWorkCardDescription'>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </p>
                </div>
                <img src='/static/img/ArrowRight.svg' alt='' />
                <div className='dontWorkCard'>
                    <img
                        src='/static/img/To’lov_qiling.svg '
                        alt=''
                        className='dontWorkCardImg'
                    />
                    <p className='dontWorkCardTitle'>To’lov qiling</p>
                    <p className='dontWorkCardDescription'>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </p>
                </div>
                <img src='/static/img/ArrowRight.svg' alt='' />
                <div className='dontWorkCard'>
                    <img
                        src='/static/img/Yuklab_oling.svg  '
                        alt=''
                        className='dontWorkCardImg'
                    />
                    <p className='dontWorkCardTitle'> Yuklab oling</p>
                    <p className='dontWorkCardDescription'>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                    </p>
                </div>
            </div>
        </div>
    );
}
