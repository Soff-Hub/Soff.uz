import React from 'react';

function MarketingMain() {

    return (
        <div style={{ padding: '100px 20px' }}>
            <p className='fs-3 text-center'>
                Marketing bo'limidan to'liq foydalanmoqchi
                bo'lsangiz avval bizning bir nechta savollarimizga
                javob berishinhgiz kerak bo'ladi
            </p>

            <div className='d-flex justify-content-center gap-3 py-3'>
                <button className='ps-btn bg-secondary btn-secondary py-2 text-white'>Orqaga</button>
                <button className='ps-btn text-white py-2'>Davom etish</button>
            </div>
        </div>
    );
}
export default MarketingMain;
