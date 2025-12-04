import React from 'react';
import Link from 'next/link';

export default function HeaderTitle() {
    return (
        <div className="w-md-50 text-center py-4 mt-0 headerTitle">
            <h2 className="mx-auto fw-normal">
                Mahsulotlarni Filtrlar yordamida Tez va Qulay Qidirish
            </h2>
            <p className="mx-auto py-3">
                Har bir materialni o‘rganish, tahlil qilish yoki ilmiy
                ishlaringizda qo‘llash uchun sotib olishingiz mumkin. Bepul
                materiallar ham mavjud bo‘lib, ular darhol yuklab olinishi
                mumkin. Ushbu resurslar mahalliy mutaxassislar tomonidan
                tayyorlangan va sizga yuqori sifatli, ishonchli materiallarni
                taqdim etadi. I
            </p>
            <Link href="/order/create">
                <a className="px-5 py-4 bg-success btn btn-success rounded-5 text-white font-weight-bold fs-4 text-xl hover-overlay ">
                    Buyurtma bering
                </a>
            </Link>
        </div>
    );
}
