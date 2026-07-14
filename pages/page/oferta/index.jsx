import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Meta from '~/shared/ui/meta';

const meta = {
    title: 'Foydalanish qonun-qoidalari - Soff.uz',
    description:
        "Soff.uz platformasining foydalanish qonun-qoidalari. Raqamli mahsulotlar va onlayn xizmatlardan foydalanish, sotish va sotib olish bo'yicha barcha muhim ma'lumotlar.",
    keywords: [
        { name: 'Foydalanish qonun-qoidalari' },
        { name: 'Soff.uz shartlari' },
        { name: 'foydalanuvchi shartlari' },
        { name: 'platforma shartlari' },
        { name: 'raqamli mahsulotlar' },
        { name: 'onlayn xizmatlar' },
        { name: 'raqamli kontent' },
        { name: 'sotish va sotib olish' },
    ],
    author: 'Soff.uz jamoasi',
};

export default function Oferta() {
    return (
        <PageLayout>
            <Meta {...meta} />

            <div className="container my-5">
                <h3>Soff.uz platformasidan foydalanish qonun-qoidalari</h3>
                <h4>1. Umumiy qoidalar</h4>
                <p>
                    1.1. Siz Soff.uz platformasiga tashrif buyurar ekansiz
                    quyida belgilangan qonun-qoidalar va shartlarga o’z
                    roziligingizni bildirgan hisoblanasiz.
                </p>
                <p>
                    1.2. Soff.uz platformasida (keyingi o’rinlarda «Platforma»
                    deb yuritiladi) taqdim etilayotgan xizmatlar, biznes
                    rejalar, ma’lumotlar, qo’llanmalar, referatlar,
                    prezentatsiyalar va boshqalar shartli ravishda{' '}
                    <strong>mahsulot</strong> deb nomlanadi. Ular faqatgina
                    ma’lumotlar hisoblanib, foydalanish, o’qib-o’rganish uchun
                    mo’ljallangan.
                </p>
                <p>
                    1.3. Platformaning «Biznes xizmatlar» bo’limida keltirilgan
                    xizmatlar tomonlar o’rtasida tuzilgan, o’zaro tasdiqlangan
                    shartnomalar asosida tartibga solinadi.
                </p>
                <h4>2. Foydalanuvchi bo’lib ro’yxatdan o’tish</h4>
                <p>
                    Platformada mavjud mahsulotlarni xarid qilish, foydalanish
                    va boshqalarni amalga oshirish uchun Platformadan
                    «Foydalanuvchi» bo’lib ro’yxatdan o’tish lozim. Ro’yxatdan
                    o’tish davomida foydalanuvchi barcha ma’lumotlar haqqoniy va
                    to’g’ri to’ldirilishiga javobgar hisoblanadi.
                </p>
                <h4>3. Sotuvchi bo’lib ro’yxatdan o’tish</h4>
                <p>
                    Platformada o’z mahsulotlarini sotish orqali daromad qilish
                    va boshqalarni amalga oshirish uchun Platformadan «Sotuvchi»
                    bo’lib ro’yxatdan o’tish lozim. Ro’yxatdan o’tish davomida
                    sotuvchi barcha ma’lumotlar haqqoniy va to’g’ri
                    to’ldirilishiga javobgar hisoblanadi.
                </p>
                <h4>4. Foydalanuvchilarning huquq va majburiyatlari</h4>
                <h5>4.1. Foydalanuvchilar quyidagi huquqlarga ega:</h5>
                <p>4.1.1. Platforma tizimida erkin ro’yxatdan o’tish;</p>
                <p>
                    4.1.2. Platforma tomonidan taqdim etilayotgan xizmatlardan
                    foydalanish;
                </p>
                <p>
                    4.1.3. Xarid qilingan mahsulotlardan erkin foydalanish
                    (mahsulotlardan tijorat hamda foyda olish maqsadida
                    foydalanish taqiqlanadi);
                </p>
                <p>
                    4.1.4. Xarid qilingan mahsulot bo’yicha xabarnomalarni
                    ro’yxatdan o’tish davomida foydalanuvchi tomonidan
                    kiritilgan elektron pochta (e-mail) yoki telefon raqam
                    orqali qabul qilib olish (4.2.4. shart bajarilgan taqdirda)
                    yoki o’zining shaxsiy profilidagi «Sotib olinganlar»
                    sahifasiga kirish orqali qabul qilib olish;
                </p>
                <p>
                    4.1.5. Foydalanuvchi xarid qilingan mahsulotni yuklab
                    olinish jarayonida muammo yuzaga kelgan holatda platforma
                    ma’muriyatiga amalga oshirilgan to’lovni qaytarib berish
                    bo’yicha murjaat qilgan taqdirdagini pulini qaytarib olish;
                </p>
                <p>
                    4.1.6. Platforma ma’muriyatiga murojaat qilish huquqlariga
                    ega.
                </p>
                <h5>
                    4.2. Foydalanuchilar quyidagi majburiyatlarni bajarishlari
                    shart:
                </h5>
                <p>
                    4.2.1. Foydalanuvchi Platforma tizimida ro’yxatdan o’tish
                    davmida so’ralgan ma’lumotlarni to’g’ri kiritishi shart;
                </p>
                <p>
                    4.2.2. Platforma foydalanuvchilari o’zaro aloqalar davomida
                    beadab, haqoratli va behurmat qiladigan jumlalardan
                    foydalanish hamda O’zbekiston Respublikasining amaldagi
                    qonunchiligida taqiqlangan boshqa ma’lumotlarni o’z ichiga
                    oluvchi xabarlarni jo’natish taqiqlanadi.
                </p>
                <p>
                    4.2.4. Ro’yxatdan o’tish jarayonida amalda mavjud bo’lgan,
                    ishlaydigan elektron manzil (e-mail) yoki telefon raqam
                    kiritish shart;
                </p>
                <p>
                    4.2.5. Foydalanuvchi Platformaning foydalanish
                    qonun-qoidalarida belgilangan talablarni to’liq bajarishi
                    shart.
                </p>
                <h4>5. Sotuvchining huquq va majburiyatlari</h4>
                <h5>5.1. Sotuvchilar quyidagi huquqlarga ega:</h5>
                <p>5.1.1. Platforma tizimida erkin ro’yxatdan o’tish;</p>
                <p>
                    5.1.2. Platforma tomonidan taqdim etilayotgan xizmatlarga
                    o’z mahsulotlarini qo’shish;
                </p>
                <p>
                    5.1.3. Mahsulotlaridan bepulga yoki tijorat hamda foyda
                    olish maqsadida platformada ulashishlariga ruxsat etiladi
                    (5.1.6. shart bajarilgan taqdirda);
                </p>
                <p>
                    5.1.4. Sotuvchinig sotilgan har bir mahsulotlari bo’yicha
                    xabarnomalarni ro’yxatdan o’tish davomida foydalanuvchi
                    tomonidan kiritilgan elektron pochta (e-mail) orqali qabul
                    qilib olish (4.2.4. shart bajarilgan taqdirda) yoki o’zining
                    shaxsiy profilidagi «Buyurtmalar» sahifasiga kirish orqali
                    qabul qilib olish;
                </p>
                <p>
                    5.1.5. Sotuvchining sotilgan mahsulotlari yig’indisidan
                    platforma ulishining (sotilgan mahsulotning 23% i) qiymatini
                    ayirgan holatda hosil bo’lgan summani o’z kartalariga
                    tashlab olish (5.2.5. shart bajarilgan taqdirda), shu bilan
                    birga platforma o'z xizmat narxlarini yoki komissiya foizini
                    vaqt o'tishi bilan o'z ehtiyojlariga qarab oshirish huquqini
                    o'zida saqlab qoladi.
                </p>
                <p>
                    5.1.6. Sotuvchi faqat o‘ziga tegishli yoki muallifning
                    ruxsati bilan joylashtirilgan mahsulotlarni sotishi mumkin.
                </p>
                <p>
                    5.1.7. Platforma ma’muriyatiga murojaat qilish huquqlariga
                    ega
                </p>
                <p>
                    5.1.8. Sotuvchi referal havola orqali do'stlarini taklif
                    qilish va do'stlarining har bir daromadidan 5% miqdorda
                    bonus olish.
                </p>
                <p>
                    5.1.9. Sotuvchi tomonidan soff.uz platformasiga
                    joylashtirilgan mahsulotlar SOFF'ga tegishli yoki hamkor
                    platformalarda (ilmiyish.uz, diplomishlari.uz va
                    boshqalarda) ham avtomatik tarzda joylashtiriladi va
                    sotiladi hamda ushbu platformalardagi barcha savdolar
                    Sotuvchining seller.soff.uz dagi profili orqali yagona
                    hisobda birlashtirilgan holda aks ettiriladi.
                </p>
                <h5>
                    5.2. Foydalanuchilar quyidagi majburiyatlarni bajarishlari
                    shart:
                </h5>
                <p>
                    5.2.1. Foydalanuvchi Platforma tizimida ro’yxatdan o’tish
                    davmida so’ralgan ma’lumotlarni to’g’ri kiritishi shart;
                </p>
                <p>
                    5.2.2. Platforma sotuvchilari o’zaro aloqalar davomida
                    beadab, haqoratli va behurmat qiladigan jumlalardan
                    foydalanish hamda O’zbekiston Respublikasining amaldagi
                    qonunchiligida taqiqlangan boshqa ma’lumotlarni o’z ichiga
                    oluvchi xabarlarni jo’natish taqiqlanadi.
                </p>
                <p>
                    5.2.3. Ro’yxatdan o’tish jarayonida amalda mavjud bo’lgan,
                    ishlaydigan elektron manzil (e-mail) yoki telefon raqam
                    kiritish shart;
                </p>
                <p>
                    5.2.4. Sotuvchining yig’ilgan summasini kartasiga tashlab
                    olish jarayonidan uning miqdori 35 ming so’mdan kam
                    bo’lmasligi shart.
                </p>
                <p>
                    5.2.5. Sotuvchi Platformaning foydalanish qonun-qoidalarida
                    belgilangan talablarni to’liq bajarishi shart
                </p>
                <p>
                    5.2.6. Sotuvchi yuklagan har bir mahsulotning sifatli,
                    yaroqli va o'z ijodiy ishi ekanligiga javobgar. Xaridor yoki
                    boshqa shaxslar norozilik bildirsa yoki mualliflik huquqi
                    buzilsa, barcha javobgarlik Sotuvchida qoladi. Platforma
                    mahsulotlarni moderatsiyadan o'tkazgan taqdirda ham xato
                    yoki e'tibordan chetda qolgan holatlar uchun javobgar emas.
                </p>
                <p>
                    5.2.7. Sotuvchi platformada sotilgan har bir mahsulotining
                    23% ini platforma ma’muriyati olib qolishi shart.
                </p>
                <p>
                    5.2.8. Sotuvchi referal havola orqali o’zini-o’zi taklif
                    qilgan holatlar aniqlansa, platforma ma’muriyati tomonidan
                    ogohlantirish beriladi va ushbu taklif havolasi ro’yxatdan
                    olib tashlanadi.
                </p>
                <p>
                    5.2.9. Sotuvchi o‘z ijtimoiy tarmoqlari, messenjerlari yoki
                    boshqa tashqi platformalar orqali mijozlarni Soff.uz ga jalb
                    qilishi va u yerda savdo qilish huquqiga ega. Bu yaxshi va
                    qo‘llab-quvvatlanadi. Biroq sotuvchi platformaning chat
                    tizimi yoki boshqa xizmatlari orqali mijozlarni tashqi
                    platformalarga (Telegram, WhatsApp, Instagram va boshqalar)
                    yo‘naltirish, shuningdek, savdoni Soff.uz tashqarisida davom
                    ettirish taqiqlanadi. Bu qoidani buzgan sotuvchilar
                    platformadan chetlashtirilishi mumkin.
                </p>
                <p>
                    5.2.10. Sotuvchi Platformada ishtirok etib, yuzaga kelgan
                    soliq va byudjet to'lovlari bo'yicha javobgarligi yuzasidan
                    O'zbekiston Respublikasining Soliq kodeksining 352, 386,
                    387, 393, 395, 396 va 397-moddalarining talablariga asosan
                    mas'ul hisoblanadi.
                </p>
                <p>
                    5.2.11. Sotuvchi mahsulot yoki xizmat qo'shish hamda pul
                    mablag'larini yechib olish uchun identifikatsiya jarayonidan
                    o'tishi shart. Identifikatsiya uchun quyidagi ma'lumotlarni
                    taqdim etish majburiy: pasport seriyasi va raqami, JShShIR,
                    tug'ilgan sana, qo'shimcha telefon raqam, pasport nusxasi
                    rasmi va o'zini o'zi band qiluvchi shaxs guvohnomasi.
                    Ma'lumotlar platforma ma'muriyati tomonidan ko'rib chiqiladi
                    va tasdiqlanganidan so'ng sotuvchiga mahsulot va xizmat
                    qo'shish hamda daromadni kartaga yechib olish imkoniyati
                    ochiladi.
                </p>
                {/* <p>
                    5.2.12. Sotuvchi o'zining JShShIR (Jismoniy Shaxsning Shaxsiy Identifikatsiya Raqami) ma'lumotini platforma tizimiga kiritishi majburiy. JShShIR kiritilmagan taqdirda, sotuvchining har bir sotuvidan olinadigan daromaddan <strong>12% QQS (Qo'shimcha qiymat solig'i)</strong> ushlab qolinadi. JShShIR kiritilgan sotuvchilar uchun ushbu qo'shimcha soliq tatbiq etilmaydi.
                </p> */}
                <h4>6. Javobgarlik</h4>
                <p>
                    6.1. Platforma ma’muriyati Foydalanuvchining noto’g’ri
                    ma’lumot kiritishi va amallarni bajarishi sababli xarid
                    qilishi jarayonida yuzaga kelgan zarar, ziyon yoki
                    xarajatlar uchun javobgar emas.
                </p>
                <p>
                    6.2. Foydalanuvchi tomonidan xarid qilingan mahsulot
                    foydalanuvchining Platformadagi o’z shaxsiy kabinetiga
                    joylashtiriladi hamda elektron manziliga xabarnoma
                    yuboriladi. Taqdim etilgan mahsulot foydalanuvchi tomonidan
                    yuklab olinish yoki olinmasligidan qat’iy nazar, mahsulot
                    foydalanuvchi tomonidan xarid qilingan va Platforma tizimida
                    yetkazib berildi deya belgilanadi hamda amalga oshirilgan
                    summa qaytarilmaydi. Shu sababli ro’yxatdan o’tish davomi
                    amalda mavjud bo’lgan, ishlaydigan elektron manzil (Email)
                    kiriting hamda to’lovni muvaffaqiyatli amalga oshirib
                    bo’lganingizdan so’ng e-mailingizni ham tekshirib turing.
                </p>
                <p>
                    6.3. Platformada ro’yxatdan o’tish davomida kiritilgan
                    ma’lumotlar haqqoniyligi uchun butun javobgarlik
                    foydalanuvch hamda sotuvchining o’z bo’ynida bo’ladi.
                </p>
                <p>
                    6.4. Platforma ma’muriyati to’lovni amalga oshirish
                    jarayonida yuzaga kelgan zarar uchun javobgar emas.
                </p>
                <h4>7. Foydalanuvchining shaxsiy ma’lumotlar daxlsizligi</h4>
                <p>
                    Foydalanuvchilarning shaxsiy ma’lumotlarining daxlsizligi
                    biz uchun juda muhim.
                </p>
                <p>
                    Biz quyidagi ma’lumotlarni statistik ko’rsatgichlarni
                    aniqlash maqsadida to’playmiz va saqlaymiz:
                </p>
                <p>
                    – foydalanuvchilar Saytga kirish uchun foydalangan
                    IP-manzili;
                </p>
                <p>
                    – Platformaga kirish uchun foydalanuvchi tomonidan
                    ishlatilgan brauzer va operatsion tizim turi;
                </p>
                <p>– Platformaga kirish muddatlari;</p>
                <p>– foydalanuvchi ko’rib chiqqan sahifalar va havolalar;</p>
                <p>
                    Biz ushbu manzillardan foydalanuvchining shaxsini aniqlash
                    maqsadida foydalanmaymiz, Saytga qilingan hurujlar bundan
                    mustasno.
                </p>
                <h4>8. Sotuvchining shaxsiy ma’lumotlar daxlsizligi</h4>
                <p>
                    Sotuvchining shaxsiy ma’lumotlarining daxlsizligi biz uchun
                    juda muhim.
                </p>
                <p>
                    Biz quyidagi ma’lumotlarni statistik ko’rsatgichlarni
                    aniqlash maqsadida to’playmiz va saqlaymiz:
                </p>
                <p>
                    – sotuvchining Platformaga kirish uchun foydalangan
                    IP-manzili;
                </p>
                <p>
                    – Platformaga kirish uchun sotuvchi tomonidan ishlatilgan
                    brauzer va operatsion tizim turi;
                </p>
                <p>– Platformaga kirish muddatlari;</p>
                <p>– sotuvchi ko’rib chiqqan sahifalar va havolalar;</p>
                <p>
                    Biz ushbu manzillardan foydalanuvchining shaxsini aniqlash
                    maqsadida foydalanmaymiz, Saytga qilingan hurujlar bundan
                    mustasno.
                </p>
                <h4>9. Mualliflik huquqlari va intellektual mulk himoyasi</h4>
                <h5>Mahsulot muallifligi:</h5>
                <p>
                    - Sotuvchi faqat o‘ziga tegishli yoki muallifning ruxsati
                    bilan joylashtirilgan mahsulotlarni sotishi mumkin.
                </p>
                <p>
                    - Plagiat yoki ruxsatsiz foydalanish aniqlansa, mahsulot
                    platformadan o‘chiriladi(yoki haqiqiy muallifning xohishiga
                    ko'ra uning Soff.uz'dagi profiliga o'tkazib berilishi
                    mumkin), takroriy holatda sotuvchining akkaunti bloklanishi
                    mumkin.
                </p>
                <h5>Mualliflik huquqlarini buzish bo‘yicha shikoyat tizimi:</h5>
                <p>
                    - Agar biror shaxs o‘ziga tegishli mahsulot boshqa sotuvchi
                    tomonidan joylashtirilganini aniqlasa, shikoyat yuborish
                    imkoniyati ega. Shikoyat bo'limi mahsulot batafsil
                    sahifasida mavjud.
                </p>
                <p>- Shikoyatlar ko‘rib chiqilishi muddati – 3 ish kuni.</p>
                <h4>10. Xaridorlarni himoya qilish (Refund Policy)</h4>
                <h5>Mahsulotga nisbatan shikoyat</h5>
                <p>
                    - Mahsulot xaridor hohlagani kabi bo'lmasa, xaridor o'z
                    fikrlarini mahsulotning izohlar bo'limida qoldirishi yoki
                    jiddiy holatlarda platforma ma’muriyatiga shikoyat qilish
                    huquqiga ega. Shikoyat bo'limi mahsulot batafsil sahifasida
                    mavjud.
                </p>
                <p>
                    - Sotuvchi mahsulotni noto‘g‘ri joylashtirgan yoki sifatli
                    yetkazmagan bo‘lsa ya'ni foydalanishga yaroqsiz deb topilsa,
                    platforma mamuriyati ushbu mahsulotni o'chirib tashlashi
                    huquqiga ega.
                </p>
                <h4>10. Xaridor va sotuvchilar o‘rtasidagi baholash tizimi</h4>
                <h5>Baholash va sharhlar:</h5>
                <p>
                    - Xaridor xarid qilgan mahsulotiga yulduzli baho (⭐️) va
                    fikr-mulohaza qoldirish imkoniyatiga ega. Baholar
                    sotuvchilarning ishonchliligini aniqlashda yordam beradi.
                </p>
                <h5>Sotuvchilarning reytingi:</h5>
                <p>
                    - Past baholarga ega sotuvchilar kuzatib boriladi, kerak
                    bo‘lsa, platformadan chetlatiladi.
                </p>
                <h4>11. Platforma va sotuvchi o‘rtasidagi shartlar</h4>
                <h5>Mahsulotni o‘chirish huquqi:</h5>
                <p>
                    - Soff.uz shubhali yoki qonunga zid mahsulotlarni istalgan
                    vaqtda o‘chirish huquqiga ega.
                </p>
                <p>
                    - Agar sotuvchi ko‘p marotaba qoidalarni buzsa, u
                    platformadan chetlatiladi.
                </p>
                <h5>To‘lov tizimlari bo‘yicha aniq qoidalar:</h5>
                <p>
                    - Platforma faqat rasmiy to‘lov tizimlari orqali
                    ishlaydi(masalan, Click, PayMe va boshqalar).
                </p>
                <p>
                    - Qo‘lda yoki boshqa norasmiy usullarda pul olish qat’iyan
                    taqiqlanadi.
                </p>
                <h4>12. Soff.uz'ning qonuniy himoyasi</h4>
                <h5>Qonuniy javobgarlik:</h5>
                <p>
                    - Platforma sotuvchi va xaridor o‘rtasidagi
                    kelishmovchiliklarga to‘g‘ridan-to‘g‘ri javobgar emas, lekin
                    shikoyatlarni ko‘rib chiqish huquqiga ega.
                </p>
                <p>
                    - O‘zbekiston Respublikasi qonunchiligiga muvofiq ravishda
                    xizmat ko‘rsatilishi kafolatlanadi.
                </p>
                <h4>13. Qoidalar va shartlarni yangilash</h4>
                <p>
                    - Soff.uz platformadagi qoidalarni istalgan vaqtda
                    o‘zgartirish yoki yangilash huquqiga ega.
                </p>
                <p>
                    - Rasmiy Telegram kanalida (telegram.me/soff_uz) e’lon qilingan har
                    qanday yangilik yoki o‘zgarish rasmiy hisoblanadi.
                </p>
                <p>
                    - Foydalanuvchilarga shaxsiy profil orqali yetkazilgan
                    bildirishnomalar rasmiy kuchga ega.
                </p>
            </div>
        </PageLayout>
    );
}
