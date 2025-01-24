import React from 'react';

export default function HeaderTitle () {
    return (
        <div className='text-center py-4 mt-0 headerTitle'>
            <h2 className='w-50 mx-auto fw-normal'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Molestias, amet?
            </h2>
            <p className='w-50 mx-auto py-3'>
                O‘zingizga kerakli materiallarni topish uchun filterlardan
                foydalaning. Har bir materialni o‘rganish, tahlil qilish yoki
                ilmiy ishlaringizda qo‘llash uchun sotib olishingiz mumkin.
                Bepul materiallar ham mavjud bo‘lib, ular darhol yuklab olinishi
                mumkin. Ushbu resurslar mahalliy mutaxassislar tomonidan
                tayyorlangan va sizga yuqori sifatli, ishonchli materiallarni
                taqdim etadi. Ilmiy va amaliy ehtiyojlaringizga mos
                materiallarni topish uchun filterlardan foydalaning va
                o‘zingizga kerakli resurslarni toping!
            </p>
            <a className='px-5 py-4 bg-success btn btn-success rounded-5 text-white font-weight-bold fs-4 text-xl hover-overlay '>
                Buyurma bering
            </a>
        </div>
    );
}
