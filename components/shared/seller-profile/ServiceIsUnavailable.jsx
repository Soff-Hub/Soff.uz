import React from 'react';

export default function ServiceIsUnavailable ({type = "product"}) {
    return (
        <div className='ServiceIsUnavailable'>
            <div className='ServiceIsUnavailableImg'>
                <img src='/static/img/change-setting.png' alt='' />
            </div>
            <div className='ServiceIsUnavailableBody'>
                <p className='ServiceIsUnavailableTitle'>{type == "service" && "Xizmat mavjud emas"}{type == "portfolio" && "Portfolio mavjud emas"}{type == "product" && "Mahsulot mavjud emas"}</p>
                <p className='ServiceIsUnavailableDescription'>
                    Bu sotuvchi hali {type == "service" && "xizmatlarini ishga tushirmagan."} {type == "product" && "mahsulot yuklamagan."} {type == "portfolio" && "portfolio yuklamagan."} 
                </p>
            </div>
        </div>
    );
}
