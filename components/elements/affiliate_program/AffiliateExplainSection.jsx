import React from 'react'
import { CheckCircleOutlined } from '@ant-design/icons'

const points = [
    "Havolangiz orqali foydalanuvchilar Soff.uz saytiga kiradi",
    "Ular mahsulot xarid qilsa — siz daromad olasiz",
    "Daromadingiz avtomatik tarzda hisobingizga tushadi"
]

const AffiliateExplainSection = () => {
    return (
        <div className="affiliate_explain_wrapper py-5">
            <div className="container affiliate_explain d-flex flex-column flex-lg-row align-items-center justify-content-between gap-5">
                <div className="explain_text col-lg-6">
                    <h2 className="" >
                        Soff.uz yangi foydalanuvchilarga tushuntirish
                    </h2>
                    <p className="mb-4 text-muted">
                        Hech kim vaqtni behuda sarflashni yoqtirmaydi. Shuning uchun Soff.uz tadbirkorlarga qisqa vaqt ichida ko'proq yutuqlarga erishishda yordam beradigan professionallar bilan bog'lanish imkoniyatini beradi. Freelance xizmatlar samaradorlikni qanday oshirishi mumkinligini allaqachon bilib oldingiz. Hamkorlik dasturimiz orqali endi siz o'z bilimlaringizni baham ko'rishingiz va ro'yxatdan o'tgan va buyurtma bergan har bir referal uchun daromad olishingiz mumkin.
                    </p>
                </div>
                <div className="explain_image col-lg-5">
                    <img
                        src="/static/img/affiliate_program/main.png"
                        alt="Affiliate qanday ishlaydi"
                        className="img-fluid rounded-4 shadow"
                    />
                </div>
            </div>
        </div>
    )
}

export default AffiliateExplainSection
