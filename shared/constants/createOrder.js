export const createOrderInfo = {
    scientific_work: {
        category: {
            placeholder: 'Taqdimot, Kurs ishi, v.k',
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
    },
    dizayn: {
        category: {
            placeholder: 'Post, Logo, Banner, Vizitka, v.k',
            info: `Iltimos, buyurtmangizni to‘g‘ri yo‘naltirish uchun quyidagi kategoriyalardan birini tanlang. Har bir kategoriya ma’lum bir xizmat turiga mos keladi, shuning uchun tanlovingiz siz izlayotgan dizaynerni topishda muhim rol o‘ynaydi.`,
        },
        description: {
            placeholder: `- Dizayn turi (logo, banner, ijtimoiy tarmoq posti va h.k.)
- O‘lchami yoki formatlari (px, sm, A4 va h.k.)
- Asosiy talablar yoki g‘oyalar
- Ranglar, uslub yoki brend qo‘llanmasi (agar mavjud bo‘lsa)
- Qaysi formatda kerak (PNG, JPG, PDF, PSD va b.)
- h.k.     
      `,
            info: `Iltimos, buyurtmangizning tafsilotlarini aniq va tushunarli yozing. Bu dizayner ishni tez va to‘g‘ri bajarishiga yordam beradi.`,
        },
        lang: {
            placeholder: 'Matn qaysi tilda bo‘lishi kerak?',
        },
        price: {
            placeholder: '150 000',
            info: `Iltimos, ushbu dizayn uchun ajratmoqchi bo‘lgan byudjetni so‘mda yozing.`,
        },
    },
    web: {
        category: {
            placeholder: 'Bir sahifali sayt, Mobil ilova, Telegram-Bot v.k.',
            info: `Iltimos, buyurtmangizni to‘g‘ri yo‘naltirish uchun quyidagi kategoriyalardan birini tanlang. Har bir kategoriya ma’lum bir xizmat turiga mos keladi, shuning uchun tanlovingiz siz izlayotgan dasturchini topishda muhim rol o‘ynaydi.`,
        },
        description: {
            placeholder: `- Xizmat turi (veb-sayt, mobil ilova, bot, dasturiy yechim va h.k.)
- Texnik talablar yoki funksiyalar (masalan: login, to‘lov tizimi, API integratsiya)
- Platforma (Android, iOS, Web, Desktop va b.)
- Qaysi formatda kerak (kod fayllari, deploy qilingan holat, dokumentatsiya)
- h.k.   
      `,
            info: ` Iltimos, buyurtmangizning tafsilotlarini aniq va tushunarli yozing. Bu dasturchi ishni tez va to‘g‘ri bajarishiga yordam beradi.`,
        },
        lang: {
            placeholder:
                'Buyurtma interfeys matnini qaysi tilda bo‘lishi kerak?',
        },
        price: {
            placeholder: '1 500 000',
            info: `Iltimos, ushbu xizmat uchun ajratmoqchi bo‘lgan byudjetni so‘mda yozing.`,
        },
    },
    three_d: {
        category: {
            placeholder: '3D model, Animatsiya, AR/VR, Render, Texturing v.k.',
            info: `Iltimos, buyurtma turini tanlang. To‘g‘ri kategoriya ishchi spetsifikatsiyasini aniqlashga yordam beradi.`,
        },
        description: {
            placeholder: `- Xizmat turi (3D model, rigging, animatsiya, pbr texturing, render, AR/VR)
- Texnik talablar (polycount, format: .fbx/.obj/.glb/.gltf, PBR, rig/weighting)
- Platforma/engines (Web/Unity/Unreal/Blender)
- Qaysi formatda kerak (raw fayl, optimizatsiyalangan model, baked textures, turn-key)
- Timeline va referens (jpg/links)
      `,
            info: `Iltimos, detallarning eng muhimlarini yozing: maqsad (game/film/web/print), format, LOD kerakmi, animatsiya uzunligi va referens tasvirlar.`,
        },
        lang: {
            placeholder:
                'Buyurtma interfeysi va dokumentatsiya qaysi tilda bo‘lsin?',
        },
        price: {
            placeholder: '500 000',
            info: `Byudjetni so‘mda yozing. Narx modelning murakkabligi (polycount, rig, animatsiya) va yetkazib berish formatiga qarab o‘zgaradi.`,
        },
    },
};

export const options = {
    scientific_work: title => `${title} tayyorlash kerak.`,
    dizayn: title => `${title} tayyorlash kerak.`,
    web: title => `${title} uchun dastur tayyorlash kerak.`,
    three_d: title => `${title} uchun dizayn tayyorlash kerak.`,
    unknown: title => `${title} bo'yicha xizmat kerak.`,
};

export const priceOptions = [
    { title: '10 000', value: 10000 },
    { title: '20 000', value: 20000 },
    { title: '50 000', value: 50000 },
    { title: '100 000', value: 100000 },
    { title: '200 000', value: 200000 },
];
