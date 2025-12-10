import Link from 'next/link';
import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

export default function DesignDevelopmentsPage() {
    return (
        <PageContainer>
            <Meta
                title="Grafik Dizayn Shablonlari"
                image="https://soff.uz/static/img/dizayn-shablonlari-2.png"
                description="Bu sahifa grafik dizaynerlar va kreativ mutaxassislar uchun. Bu yerda dizayn shablonlari, bannerlar, logotiplar va boshqa grafik materiallarni topish mumkin."
                keywords={[
                    { name: 'grafik dizaynerlar' },
                    { name: 'kreativ mutaxassislar' },
                    { name: 'dizayn shablonlari' },
                    { name: 'bannerlar' },
                    { name: 'logotiplar' },
                    { name: 'grafik materiallar' },
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
                        <h3>Grafik Dizayn Shablonlari – Yangilanmoqda 🚧</h3>
                        <p>
                            Bu sahifa grafik dizaynerlar va kreativ
                            mutaxassislar uchun. Bu yerda dizayn shablonlari,
                            bannerlar, logotiplar va boshqa grafik materiallarni
                            topish mumkin. Hozircha ushbu kategoriyaga oid
                            mahsulotlarni{' '}
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
            destination: `/design-developments/all${
                ctx.resolvedUrl.includes('?')
                    ? ctx.resolvedUrl.substring(ctx.resolvedUrl.indexOf('?'))
                    : ''
            }`,
            permanent: false, // Use 302 redirect (temporary)
        },
    };
}
