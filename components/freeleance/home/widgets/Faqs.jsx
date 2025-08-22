import React, { useState } from 'react'
import styles from "../styles/Faqs.module.scss"

const Faqs = ({ faq = [] }) => {
    const [acc, setAcc] = useState(null)

    return (
        <div className={styles.faq}>
            <div className="container">
                <div className={styles.faqInner}>
                    <h3 className={styles.faqTitle}>
                        Soff dan sotuvchi bo'lib foydalanish bo'yicha eng ko'p beriladigan savollar
                    </h3>

                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(0)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    Soff.uz nima?
                                </h4>
                                <i className={`fa-solid fa-${acc === 0 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 0 ? styles.faqContentActive : ''}`}>
                                <p>Soff.uz - bu mustaqil ishlashni xohlagan mutaxassislar uchun maxsus yaratilgan onlayn platformadir. </p>
                                <p>Freelancerlar o‘z malakalari va xizmatlarini taqdim etib, mijozlar bilan bevosita bog‘lanib ishlashlari mumkin.</p>
                                <p>Endilikda siz Soff Seller orqali o'z intellektual mulklaringizni joylab daromad topishingiz mumkin.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(1)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    Soff.uz’da qanday ishlashni boshlayman?
                                </h4>
                                <i className={`fa-solid fa-${acc === 1 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 1 ? styles.faqContentActive : ''}`}>
                                <p>Soff.uz’da ishlashni boshlash uchun Soff-seller.uz platformasida ro‘yxatdan o‘tishingiz kerak. Ro‘yxatdan o‘tganingizdan so‘ng, profil yaratishingiz va o‘z xizmatlaringizni qo‘shishingiz mumkin. Shundan so‘ng, siz mijozlardan ish buyurtmalarini qabul qila boshlaysiz va o‘z xizmatlaringizni onlayn tarzda sotishingiz mumkin.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(2)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    Soff.uz’da qanday qilib yaxshi natijalarga erishishim mumkin?
                                </h4>
                                <i className={`fa-solid fa-${acc === 2 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 2 ? styles.faqContentActive : ''}`}>
                                <p>Soff.uz’da muvaffaqiyatli bo‘lish uchun quyidagi tavsiyalarga amal qilishingiz mumkin: Kengaytirilgan portfel: O‘z xizmatlaringizni to‘liq va aniq taqdim eting. Oldingi ishlangan loyihalarni qo‘shing. O‘zgaruvchan narx siyosati: Mijozlar uchun turli narx variantlari taklif qilish va ularning ehtiyojlariga moslashish. Yaxshi muloqot: Mijozlar bilan muntazam aloqada bo‘ling va so‘rovlarini tezkor hal qilishga harakat qiling. Reyting va sharhlar: Ijobiy sharhlar va reytinglar olishga intiling, bu sizning ishonchliligingizni oshiradi.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(3)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    Mijozlar Soff.uz’da qanday xizmatlar taklif etishadi?
                                </h4>
                                <i className={`fa-solid fa-${acc === 3 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 3 ? styles.faqContentActive : ''}`}>
                                <p>Soff.uz platformasida mijozlar turli sohalarda xizmatlar taklif qilishlari mumkin. Bu sohalar quyidagilarni o‘z ichiga oladi: Dizayn va grafika, Veb sayt ishlab chiqish, Kontent yaratish, Tarjima va transkripsiya, Videolarni tahrirlash, Marketing va SEO xizmatlari, Ma’lumotlarni tahlil qilish. Siz har bir soha bo‘yicha o‘z xizmatlaringizni taqdim etishingiz mumkin.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(4)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    To‘lovlar qanday amalga oshiriladi?
                                </h4>
                                <i className={`fa-solid fa-${acc === 4 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 4 ? styles.faqContentActive : ''}`}>
                                <p>Soff.uz platformasida to‘lovlar qulay va xavfsiz tarzda amalga oshiriladi. Freelancerlar xizmatlaridan foydalanib, mijozdan to‘lovni olishadi. To‘lovlar Soff.uz tizimi orqali xavfsiz tarzda amalga oshiriladi va siz o‘z xohishingizga ko‘ra balansingizdagi pulni kartangizga o'tkazib olishingiz mumkin bo'ladi.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(5)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    Soff.uz’da qanday qilib o‘z xizmatlarimni ko‘rsatishim mumkin?
                                </h4>
                                <i className={`fa-solid fa-${acc === 5 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 5 ? styles.faqContentActive : ''}`}>
                                <p>Soff.uz’da o‘z xizmatlaringizni ko‘rsatish uchun profil yaratish va xizmatlar ro‘yxatini qo‘shish kerak. Shuningdek, xizmatlaringizni to‘liq tavsiflab, oldingi ishlagan loyihalaringizni qo‘shing. Har bir xizmat uchun narx belgilashingiz mumkin va mijozlar sizning xizmatlaringizni ko‘rib, siz bilan bog‘lanishlari mumkin.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(6)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    Soff.uz platformasidan foydalanish bepulmi?
                                </h4>
                                <i className={`fa-solid fa-${acc === 6 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 6 ? styles.faqContentActive : ''}`}>
                                <p>Ha, Soff.uz platformasidan foydalanish bepul. Siz ro‘yxatdan o‘tganingizdan so‘ng, o‘z xizmatlaringizni taqdim etishingiz mumkin. Platforma sizning yutug‘ingizdan komissiya olish orqali daromad qiladi.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(7)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    Platforma qanday xavfsizlikni ta’minlaydi?
                                </h4>
                                <i className={`fa-solid fa-${acc === 7 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 7 ? styles.faqContentActive : ''}`}>
                                <p>Soff.uz mijozlar va freelancerlar uchun xavfsiz ish olib borishni ta’minlashga katta e’tibor qaratadi. To‘lovlar tizimi himoyalangan va foydalanuvchilarning shaxsiy ma’lumotlari himoya qilinadi. Shuningdek, platformada fraud detection tizimi mavjud bo‘lib, soxta akkauntlar aniqlanadi.</p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.faqList}>
                        <div className={styles.faqItem} onClick={() => setAcc(8)}>
                            <div className={styles.faqAccordionHeader}>
                                <h4 className={`${styles.faqAccordionTitle} m-0`} aria-label='Soff.uz nima?'>
                                    Soff.uz’da qanday yordam olishim mumkin
                                </h4>
                                <i className={`fa-solid fa-${acc === 8 ? 'minus' : 'plus'}`} />
                            </div>

                            <div className={`${styles.faqContent} ${acc === 8 ? styles.faqContentActive : ''}`}>
                                <p>Agar sizda Soff.uz platformasidan foydalanish bo‘yicha savollar yoki muammolar bo‘lsa, bizning yordam markazimizga murojaat qilishingiz mumkin. Shuningdek, platformada mavjud FAQ sahifasida ko‘plab umumiy savollarga javoblar mavjud. Boshqa yordam uchun biz bilan Telegram orqali bog‘lanishingiz mumkin.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Faqs
