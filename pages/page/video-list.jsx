import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const VedioList = () => {
    const { t } = useTranslation('video-list');
    const videos = t('content.videos', { returnObjects: true });
    
    const data = [
        {
            id: 1,
            title: videos[0].title,
            vedioUrl: 'KQq9wKKJkFs',
        },
        {
            id: 2,
            title: videos[1].title,
            vedioUrl: 'l0nDo1mbhf8',
        },
        {
            id: 3,
            title: videos[2].title,
            vedioUrl: 'H6REqhC_NYM',
        },
        {
            id: 4,
            title: videos[3].title,
            vedioUrl: '_c9CB7Hs50E',
        },
        {
            id: 5,
            title: videos[0].title,
            vedioUrl: 'KQq9wKKJkFs',
        },
        {
            id: 6,
            title: videos[1].title,
            vedioUrl: 'l0nDo1mbhf8',
        },
        {
            id: 7,
            title: videos[2].title,
            vedioUrl: 'H6REqhC_NYM',
        },
        {
            id: 8,
            title: videos[3].title,
            vedioUrl: '_c9CB7Hs50E',
        },
    ];

    return (
        <div>
            <PageContainer>
                <Meta
                    title={t('meta.title')}
                    description={t('meta.description')}
                    keywords={[
                        { name: t('meta.keywords.videoGuide') },
                        { name: t('meta.keywords.userGuide') },
                        { name: t('meta.keywords.productSelling') },
                        { name: t('meta.keywords.serviceProvision') },
                        { name: t('meta.keywords.platformUsage') },
                        { name: t('meta.keywords.soffUzTutorial') },
                        { name: t('meta.keywords.readyMaterials') },
                        { name: t('meta.keywords.onlineServices') },
                        { name: t('meta.keywords.digitalProducts') },
                    ]}
                    author={t('meta.author')}
                />
                <div className="ps-page--singlee">
                    <div className="container">
                        <h3 className="mb-2 mt-5">
                            {t('content.sectionTitle')}
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

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'video-list',
                'modals',
            ])),
        },
    };
}

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
