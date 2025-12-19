import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';

const VedioList = () => {
    const data = [
        {
            id: 1,
            title: 'Soff uz’da qanday pul ishlash mumkin? To‘liq qo‘llanma!',
            vedioUrl: 'KQq9wKKJkFs',
        },
        {
            id: 2,
            title: 'Soff uz’da sotuvchi bo‘lish – qanday ro‘yxatdan o‘tish va savdo qilish?',
            vedioUrl: 'l0nDo1mbhf8',
        },
        {
            id: 3,
            title: 'Soff uz sotuvchi profili – barcha imkoniyatlar va funktsiyalar!',
            vedioUrl: 'H6REqhC_NYM',
        },
        {
            id: 4,
            title: 'Soff uz’da birinchi mahsulotingizni qanday yuklash va sotishni boshlash?',
            vedioUrl: '_c9CB7Hs50E',
        },
        {
            id: 1,
            title: 'Soff uz’da qanday pul ishlash mumkin? To‘liq qo‘llanma!',
            vedioUrl: 'KQq9wKKJkFs',
        },
        {
            id: 2,
            title: 'Soff uz’da sotuvchi bo‘lish – qanday ro‘yxatdan o‘tish va savdo qilish?',
            vedioUrl: 'l0nDo1mbhf8',
        },
        {
            id: 3,
            title: 'Soff uz sotuvchi profili – barcha imkoniyatlar va funktsiyalar!',
            vedioUrl: 'H6REqhC_NYM',
        },
        {
            id: 4,
            title: 'Soff uz’da birinchi mahsulotingizni qanday yuklash va sotishni boshlash?',
            vedioUrl: '_c9CB7Hs50E',
        },
    ];

    return (
        <div>
            <PageContainer>
                <Meta
                    title={
                        'Soff.uz platformasidan foydalanish bo‘yicha video qo‘llanma – Raqamli xizmatlar bozori'
                    }
                    description="Soff.uz platformasida mahsulot sotish, xarid qilish va xizmatlardan foydalanish bo‘yicha to‘liq video qo‘llanma. Bosqichma-bosqich tushuntiruvchi darsliklar yordamida siz Soff.uz'da bemalol faoliyat yuritishni o‘rganasiz."
                    keywords={[
                        { name: 'Soff.uz video qo‘llanma' },
                        { name: 'foydalanuvchi qo‘llanmasi' },
                        { name: 'mahsulot sotish' },
                        { name: 'xizmat ko‘rsatish' },
                        { name: 'platformadan foydalanish' },
                        { name: 'Soff.uz darslik' },
                        { name: 'tayyor materiallar' },
                        { name: 'onlayn xizmatlar' },
                        { name: 'raqamli mahsulotlar' },
                    ]}
                    author="Soff.uz jamoasi"
                />
                <div className="ps-page--singlee">
                    <div className="container">
                        <h3 className="mb-2 mt-5">
                            Soff.uz sotuvchilari uchun video qo'llanma:{' '}
                        </h3>
                        <div className="row">
                            {data?.map((el) => (
                                <div className="col-md-6 my-4" key={el.id}>
                                    <h4 className="my-5">{el.title}</h4>

                                    <iframe
                                        height="300"
                                        src={`https://www.youtube.com/embed/${el.vedioUrl}`}
                                        title={el.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{
                                            width: '100%',
                                            border: 'none',
                                        }}></iframe>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </PageContainer>
        </div>
    );
};

export default VedioList;

// pages/videos.jsx

// export async function getStaticProps() {
//     try {
//         const data = await fetch('http://localhost:3000/videos');
//         const data1 = JSON.stringify(data) // API dan ma'lumotlarni olish
//         return {
//             props: {
//                 data1,
//             },
//             revalidate: 60, // Statik sahifani har 60 sekundda yangilash
//         };
//     } catch (error) {
//         console.error("Ma'lumotlarni olishda xatolik:", error);
//         return {
//             props: {
//                 data: null,
//             },
//             revalidate: 60,
//         };
//     }
// }
