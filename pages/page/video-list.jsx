import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import VedioCart from '~/components/partials/faqs/Vedio-cart';
import { useState } from 'react';
import { useEffect } from 'react';
import { VideoLinks } from '~/utilities/vedio_link_api';
import Meta from '~/components/shared/headers/Meta';

const VedioList = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        setData(VideoLinks);
    }, []);


    return (
        <div>
            <PageContainer footer={<FooterDefault />} title="FAQ page">
                <Meta
                    title={"Video qo'llanma"}
                    description="Saytdan qanday foydalanish haqida videolar orqali bizdan yordam olishingiz mumkin"
                />
                <div className="ps-page--singlee">
                    <div className="container px-5">
                        <h3 className='my-2'>Soff.uz sotuvchilari uchun video qo'llanma: </h3>
                        <div className="row">
                            {data?.map((el) => (
                                <div
                                    className="col-md-6 mt-2"
                                    key={el.id}>
                                    <VedioCart
                                        title={el.title}
                                        url={el.image}
                                        vedioUrl={el.vedioUrl}
                                        id={el.id}
                                    />
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
