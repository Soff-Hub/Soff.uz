import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

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
]

const VedioList = () => {

    return (
        <div>
            <PageContainer footer={<FooterDefault />} title="FAQ page">
                <Meta
                    title={"Video qo'llanma"}
                    description="Saytdan qanday foydalanish haqida videolar orqali bizdan yordam olishingiz mumkin"
                />
                <div className="ps-page--singlee">
                    <div className="">
                        <h3 className='mb-2 mt-5'>Soff.uz sotuvchilari uchun video qo'llanma: </h3>
                        <div className="row">
                            {data?.map((el) => (
                                <div
                                    className="col-md-6 my-4"
                                    key={el.id}>
                                    <h4 className='my-5'>{el.title}</h4>

                                    <iframe
                                        height="300"
                                        src={`https://www.youtube.com/embed/${el.vedioUrl}`}
                                        title={el.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        style={{ width: "100%", border: "none" }}
                                    ></iframe>
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
