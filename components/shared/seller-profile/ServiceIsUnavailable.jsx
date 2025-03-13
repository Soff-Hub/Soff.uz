import React from 'react';

export default function ServiceIsUnavailable () {
    return (
        <div className='ServiceIsUnavailable'>
            <div className='ServiceIsUnavailableImg'>
                <img src='/static/img/change-setting.png' alt='' />
            </div>
            <div className='ServiceIsUnavailableBody'>
                <p className='ServiceIsUnavailableTitle'>Xizmat mavjud emas</p>
                <p className='ServiceIsUnavailableDescription'>
                    Bu sotuvchi hali xizmatlarini ishga tushirmagan. Boshqa
                    sotuvchilarni ko‘rib chiqing!
                </p>
                <img src='/static/img/feedbacks.png' alt='' />
                <p className='ServiceIsUnavailableBtn'>Boshqa sotuvchilar</p>
            </div>
        </div>
    );
}
