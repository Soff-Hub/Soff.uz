export const titleDescription = (direction) => {
    return `${direction} bo'yicha xizmat kerak.`;
};

export const inputInfoToCreateOrder = {
    category: {
        placeholder: (categories) =>
            Array.isArray(categories) && categories.length
                ? categories
                      .map((el) => el.label)
                      .slice(0, 2)
                      .join(', ') + ' v.k'
                : 'Taqdimot, Kurs ishi, v.k',
        info: `Iltimos, buyurtmangizni to‘g‘ri yo‘naltirish uchun quyidagi kategoriyalardan birini tanlang. Har bir kategoriya ma’lum bir xizmat turiga mos keladi, shuning uchun tanlovingiz siz izlayotgan mutaxassisni topishda muhim rol o‘ynaydi.`,
    },
    description: {
        placeholder: `- Buyurtma mavzusi yoki yo‘nalishi
- Kerakli hajmi (bet, so‘z, slayd va h.k.)
- Asosiy talablar yoki reja
- Qaysi formatda kerak (Word, PDF, PPT va b.)
- h.k.     
      `,
        info: `Iltimos, buyurtmangizning mavzusi va talablarini aniq va tushunarli tarzda yozing. Bu ijrochining ishni tez va to‘g‘ri bajarishiga yordam beradi.`,
    },
    lang: {
        placeholder: 'Qaysi tilda tayyorlanishini xohlaysiz?',
    },
    price: {
        placeholder: '50 000',
        info: `Iltimos, ushbu ish uchun ajratmoqchi bo‘lgan byudjetni so‘mda yozing.`,
    },
};
