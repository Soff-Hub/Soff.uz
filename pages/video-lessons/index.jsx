import Link from 'next/link';
import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

export default function VideoLessonsPage() {
    return (
        <PageContainer>
            <Meta
                title="Video Darsliklar"
                image="https://soff.uz/static/img/video-darsliklar-2.png"
                description="Bu sahifa har qanday sohada bilim olishni istaganlar uchun. Bu yerda zamonaviy kasblar, an’anaviy fanlar, shaxsiy rivojlanish va ta’limga oid turli video darsliklarni topish mumkin."
                keywords={[
                    { name: 'veb zamonaviy kasblar' },
                    { name: 'an’anaviy fanlar' },
                    { name: 'shaxsiy rivojlanish' },
                    { name: 'video darsliklarni' },
                ]}
                author="Soff.uz"
            />
            <div className="ps-page-status">
                <div className="container">
                    <div className="ps-section__content">
                        <img
                            src="/static/img/building-features.svg"
                            alt="Tamirlash olib borilmoqda"
                        />
                        <h3>Video Darsliklar – Yangilanmoqda 🚧</h3>
                        <p>
                            Bu sahifa har qanday sohada bilim olishni istaganlar
                            uchun. Bu yerda zamonaviy kasblar, an’anaviy fanlar,
                            shaxsiy rivojlanish va ta’limga oid turli video
                            darsliklarni topish mumkin. Hozircha ushbu
                            kategoriyaga oid mahsulotlarni{' '}
                            <Link href="/scientific-resources/video?parentCategory=video">
                                <strong>
                                    "Ilmiy ishlar" bo‘limining "Video
                                    materiallar" bo‘limida
                                </strong>
                            </Link>{' '}
                            topishingiz mumkin. Tez orada ular tartibga solinib,
                            ushbu bo‘limga joylashtiriladi. Yangi tuzilma yanada
                            qulay va tushunarli bo‘ladi! 🚀
                        </p>
                        <p>
                            <Link href="/">
                                <a> Bosh sahifa</a>
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps(ctx) {
    return {
        redirect: {
            destination: `/video-lessons/all${
                ctx.resolvedUrl.includes('?')
                    ? ctx.resolvedUrl.substring(ctx.resolvedUrl.indexOf('?'))
                    : ''
            }`,
            permanent: false, // Use 302 redirect (temporary)
        },
    };
}
