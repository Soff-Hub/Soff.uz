// The SoffX AI marketing team, shown on the home page (widgets/home/agents-market) and on
// /agents/[id]. The agent itself runs at /agent (rewritten to the SoffX front, see next.config.js).
// Copy follows soffx-agent/ai-agent-front/src/lib/i18n/locales/uz.ts; images are copies of its
// public/agents/*.webp.

export const AGENT_APP_URL = '/agent';
export const AGENT_CHAT_URL = '/agent/chat';

export const agentPath = (id) => `/agents/${id}`;
export const agentImage = (id, variant = 'bust') => `/static/img/agents/${id}-${variant}.webp`;

// The studio backdrop the renders were shot on, so an image edge never shows
export const STUDIO_BG = '#d1c6c5';

export const AI_AGENTS = [
    {
        id: 'marketolog',
        name: 'Marketolog',
        role: 'Strategiya, budjet, raqiblar tahlili',
        category: 'Strategiya',
        about:
            'Jamoa rahbari. Siz u bilan gaplashasiz: biznesingizni o‘rganadi, maqsadni vazifalarga bo‘ladi, kerakli agentlarga taqsimlaydi va natijani yig‘ib beradi.',
        skills: ['Strategiya', 'Kontent-reja', 'Raqiblar tahlili'],
        abilities: [
            'Bir oylik marketing strategiyasi va haftalik reja',
            'Auditoriya va raqobatchilar tahlili',
            'Budjetni kanallar bo‘yicha taqsimlash',
            'Haftalik hisobot va keyingi qadamlar',
        ],
        steps: [
            'Biznesingiz haqidagi ma’lumotlarni ko‘rib chiqadi',
            'Auditoriyaga mos yondashuvni tanlaydi',
            'Fikrlarni tartibga soladi',
            'Javob va rejani tayyorlaydi',
        ],
        example: {
            prompt: 'Yangi guruh uchun bir oylik marketing strategiyasini tuz',
            result: 'Strategiya va 4 haftalik reja tayyor',
            eta: '~3 daq',
        },
    },
    {
        id: 'copywriter',
        name: 'Kopirayter',
        role: 'Post va reklama matnlari',
        category: 'Kontent',
        about:
            'Brendingiz ohangida sotadigan matn yozadi: Instagram va Telegram postlari, reklama matnlari, sarlavhalar. Har safar bir nechta variant beradi.',
        skills: ['Post matni', 'Reklama matni', '3 ta variant'],
        abilities: [
            'Instagram va Telegram uchun post matnlari',
            'Reklama va aksiya matnlari',
            'Sarlavha va chaqiriq (CTA) variantlari',
            'Matnni brend ohangiga moslash',
        ],
        steps: [
            'Sarlavha variantlarini yozadi',
            'Ohangni brendingizga moslaydi',
            'Chaqiriqni kuchliroq qiladi',
            'Matnni sayqallaydi',
        ],
        example: {
            prompt: 'Ingliz tili kursi uchun Instagram post yoz',
            result: 'Post matni: 3 ta variant tayyor',
            eta: '~1 daq',
        },
    },
    {
        id: 'smm',
        name: 'SMM menejer',
        role: 'Postlarni o‘z vaqtida chiqaradi',
        category: 'Kontent',
        about:
            'Kontent-rejani tuzadi va postlarni kunlarga taqsimlaydi. Telegram kanalingizga ulanib, tayyor postlarni o‘zi joylaydi.',
        skills: ['Kontent-reja', 'Post jadvali', 'Telegram · Instagram'],
        abilities: [
            'Haftalik va oylik kontent-reja',
            'Postlar jadvali: qaysi kun, qaysi format',
            'Telegram kanalga avtomatik joylash',
            'Post va Reels formatlarini moslash',
        ],
        steps: [
            'Mavzularni tanlaydi',
            'Postlarni kunlarga taqsimlaydi',
            'Formatlarni moslaydi',
            'Jadvalga qo‘yadi',
        ],
        example: {
            prompt: 'Keyingi haftaga postlar jadvalini tuz',
            result: 'Jadval: 5 post, 2 Reels',
            eta: '~2 daq',
        },
    },
    {
        id: 'designer',
        name: 'Dizayner',
        role: 'Rasm, banner, kreativ',
        category: 'Vizual',
        about:
            'Brend ranglari va uslubida post rasmlari, bannerlar va reklama kreativlarini yaratadi. Logotipingizni qo‘yadi va kerakli o‘lchamda beradi.',
        skills: ['Banner', 'Post rasmi', 'Brend uslubi'],
        abilities: [
            'Post va Stories uchun rasmlar',
            'Aksiya va reklama bannerlari',
            'Brend ranglari va logotip bilan ishlash',
            'Instagram, Telegram o‘lchamlari',
        ],
        steps: [
            'Kompozitsiyani tanlaydi',
            'Brend ranglari va uslubini qo‘llaydi',
            'Tasvirni chizadi',
            'Detallar va sifatni tekshiradi',
        ],
        example: {
            prompt: 'Chegirma aksiyasi uchun banner yarat',
            result: 'Banner 1080×1350 tayyor',
            eta: '~2 daq',
        },
    },
    {
        id: 'editor',
        name: 'Montajor',
        role: 'Kliplardan Reels, 5 daqiqagacha',
        category: 'Video',
        about:
            'Siz yuborgan kliplardan tayyor rolik yig‘adi: eng yaxshi lavhalarni tanlaydi, musiqa va subtitr qo‘shadi. 5 daqiqagacha video.',
        skills: ['Reels', 'Subtitr', 'Musiqa'],
        abilities: [
            'Kliplardan Reels va Shorts montaji',
            'Avtomatik subtitrlar',
            'Musiqa va ritmni moslash',
            '5 daqiqagacha bo‘lgan roliklar',
        ],
        steps: [
            'Kliplarni ko‘rib chiqadi',
            'Eng yaxshi lavhalarni tanlaydi',
            'Ritm va musiqani moslaydi',
            'Subtitrlarni qo‘shadi',
        ],
        example: {
            prompt: 'Darsdan olingan kliplardan Reels montaj qil',
            result: 'Reels 0:42, subtitr bilan tayyor',
            eta: '~5 daq',
        },
    },
    {
        id: 'targetolog',
        name: 'Targetolog',
        role: 'Meta Ads reklamasi',
        category: 'Reklama',
        about:
            'Facebook va Instagram reklamasini sozlaydi: auditoriyani tanlaydi, kunlik byudjetni taklif qiladi va reklama kabinetidagi natijalarni tahlil qiladi.',
        skills: ['Meta Ads', 'Auditoriya', 'Byudjet'],
        abilities: [
            'Reklama auditoriyasini tanlash',
            'Kunlik byudjet taklifi',
            'Reklama kabineti ko‘rsatkichlari tahlili',
            'Natijani yaxshilash bo‘yicha tavsiyalar',
        ],
        steps: [
            'Reklama kabinetini ko‘rib chiqadi',
            'Ko‘rsatkichlarni solishtiradi',
            'Auditoriyani tahlil qiladi',
            'Tavsiyalarni tayyorlaydi',
        ],
        example: {
            prompt: 'Toshkent bo‘yicha reklama auditoriyasini tayyorla',
            result: 'Auditoriya va kunlik byudjet tayyor',
            eta: '~3 daq',
        },
    },
];

export const getAgent = (id) => AI_AGENTS.find((agent) => agent.id === id) || null;
