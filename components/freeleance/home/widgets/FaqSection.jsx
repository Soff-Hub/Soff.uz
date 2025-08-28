import React from 'react'
import styles from "../styles/FaqSection.module.scss"
import { Collapse } from 'antd'

const { Panel } = Collapse

const faqs = [
    {
        question: "Soff.uz nima?",
        answer: "Soff.uz - bu mustaqil ishlashni xohlagan mutaxassislar uchun maxsus yaratilgan onlayn platformadir. Freelancerlar o‘z malakalari va xizmatlarini taqdim etib, mijozlar bilan bevosita bog‘lanib ishlashlari mumkin. Soff.uz’da turli sohalarda ishlash uchun imkoniyatlar mavjud, masalan, dizayn, yozuvchilik, tarjima, webrazrabotka va boshqa ko‘plab xizmatlar. Endilikda siz Soff Seller orqali o'z intellektual mulklaringizni joylab daromad topishingiz mumkin."
    },
    {
        question: "Soff.uz’da qanday ishlashni boshlayman?",
        answer: "Soff.uz’da ishlashni boshlash uchun seller.soff.uz platformasida ro‘yxatdan o‘tishingiz kerak. Ro‘yxatdan o‘tganingizdan so‘ng, profil yaratishingiz va o‘z xizmatlaringizni qo‘shishingiz mumkin. Shundan so‘ng, siz mijozlardan ish buyurtmalarini qabul qila boshlaysiz va o‘z xizmatlaringizni onlayn tarzda sotishingiz mumkin."
    },
    {
        question: "Soff.uz’da qanday qilib yaxshi natijalarga erishishim mumkin?",
        answer: "Soff.uz’da muvaffaqiyatli bo‘lish uchun quyidagi tavsiyalarga amal qilishingiz mumkin: Kengaytirilgan portfel: O‘z xizmatlaringizni to‘liq va aniq taqdim eting. Oldingi ishlangan loyihalarni qo‘shing. O‘zgaruvchan narx siyosati: Mijozlar uchun turli narx variantlari taklif qilish va ularning ehtiyojlariga moslashish. Yaxshi muloqot: Mijozlar bilan muntazam aloqada bo‘ling va so‘rovlarini tezkor hal qilishga harakat qiling. Reyting va sharhlar: Ijobiy sharhlar va reytinglar olishga intiling, bu sizning ishonchliligingizni oshiradi."
    },
    {
        question: "Mijozlar Soff.uz’da qanday xizmatlar taklif etishadi?",
        answer: "Soff.uz platformasida mijozlar turli sohalarda xizmatlar taklif qilishlari mumkin. Bu sohalar quyidagilarni o‘z ichiga oladi: Dizayn va grafika, Veb sayt ishlab chiqish, Kontent yaratish, Tarjima va transkripsiya, Videolarni tahrirlash, Marketing va SEO xizmatlari, Ma’lumotlarni tahlil qilish. Siz har bir soha bo‘yicha o‘z xizmatlaringizni taqdim etishingiz mumkin."
    },
    {
        question: "Soff.uz platformasidan foydalanish bepulmi?",
        answer: "Ha, Soff.uz platformasidan foydalanish bepul. Siz ro‘yxatdan o‘tganingizdan so‘ng, o‘z xizmatlaringizni taqdim etishingiz mumkin. Platforma sizning yutug‘ingizdan komissiya olish orqali daromad qiladi."
    },
    {
        question: "Platforma qanday xavfsizlikni ta’minlaydi?",
        answer: "Soff.uz mijozlar va freelancerlar uchun xavfsiz ish olib borishni ta’minlashga katta e’tibor qaratadi. To‘lovlar tizimi himoyalangan va foydalanuvchilarning shaxsiy ma’lumotlari himoya qilinadi. Shuningdek, platformada fraud detection tizimi mavjud bo‘lib, soxta akkauntlar aniqlanadi."
    },
    {
        question: "Soff.uz’da qanday yordam olishim mumkin",
        answer: "Agar sizda Soff.uz platformasidan foydalanish bo‘yicha savollar yoki muammolar bo‘lsa, bizning yordam markazimizga murojaat qilishingiz mumkin. Shuningdek, platformada mavjud FAQ sahifasida ko‘plab umumiy savollarga javoblar mavjud. Boshqa yordam uchun biz bilan Telegram orqali bog‘lanishingiz mumkin."
    }
]

const FaqSection = () => {
    const panelStyle = {
        marginBottom: 24,
        background: "rgba(254, 254, 254, 1)",
        borderRadius: 10,
        border: 'none',
        boxShadow: '5px 10px 30px 0px rgba(0, 0, 0, 0.05)',
    }

    return (
        <div className={styles.faqWrapper}>
            <img src="/static/img/HomePage/icon.png" alt="icon" style={{ marginBottom: "48px" }} />
            <h3 className={styles.subtitle}>Ko‘p so‘raladigan savollar</h3>
            <h1 className={styles.title}>SAVOLLAR</h1>

            <Collapse
                accordion
                bordered={false}
                expandIcon={({ isActive }) => (
                    <img
                        src="/static/img/HomePage/icon.png"
                        alt="badge"
                        className={`${styles.custom_expand_icon} ${isActive ? styles.active : ""}`}
                    />
                )}
                style={{ background: "transparent" }}
            >
                {faqs.map((item, idx) => (
                    <Panel
                        className={styles.accordion}
                        header={<h1 className={styles.accordionTitle}>{item.question}</h1>}
                        key={idx}
                        style={panelStyle}
                    >
                        <p className={styles.accordionText}>{item.answer}</p>
                    </Panel>
                ))}
            </Collapse>
        </div>
    )
}

export default FaqSection
