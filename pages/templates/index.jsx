import Link from 'next/link';
import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

export default function TemplatesPage() {
    return (
        <PageContainer>
            <Meta
                title="Turli sohalar uchun shablonlar"
                image="https://soff.uz/static/img/shablonlar-3.png"
                description="Bu sahifa har qanday soha vakillari uchun. Bu yerda dizayn, biznes, ta’lim, IT va boshqa yo‘nalishlar uchun turli tayyor shablonlarni topish mumkin."
                keywords={[
                    { name: 'dizayn' },
                    { name: 'biznes' },
                    { name: 'ta’lim' },
                    { name: 'tayyor shablonlar' },
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
                        <h3>
                            Turli sohalar uchun shablonlar – Yangilanmoqda 🚧
                        </h3>
                        <p>
                            Bu sahifa har qanday soha vakillari uchun. Bu yerda
                            dizayn, biznes, ta’lim, IT va boshqa yo‘nalishlar
                            uchun turli tayyor shablonlarni topish mumkin.
                            Hozircha ushbu kategoriyaga oid mahsulotlarni{' '}
                            <Link href="/scientific-resources/template?parentCategory=template">
                                <strong>
                                    "Ilmiy ishlar" bo‘limining "Tayyor
                                    shablonlar" bo‘limida
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
            destination: `/templates/all${
                ctx.resolvedUrl.includes('?')
                    ? ctx.resolvedUrl.substring(ctx.resolvedUrl.indexOf('?'))
                    : ''
            }`,
            permanent: false, // Use 302 redirect (temporary)
        },
    };
}
