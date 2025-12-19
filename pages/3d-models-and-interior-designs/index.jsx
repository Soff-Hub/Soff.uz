import Link from 'next/link';
import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';

export default function ThreeDModelsAndInteriorDesigns() {
    return (
        <PageContainer>
            <Meta
                title="3D Modellar va Interyer Dizaynlari"
                image="https://soff.uz/static/img/3D-moddellar-va-Interier-dizaynlar-2.png"
                description="Bu sahifa dizaynerlar, arxitektorlar va 3D model mutaxassislari uchun. Bu yerda 3D modellar, interyer dizaynlari va vizualizatsiyalarni topish mumkin."
                keywords={[
                    { name: '3D' },
                    { name: '3D modellar' },
                    { name: 'Interyer dizaynlari' },
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
                            3D Modellar va Interyer Dizaynlari – Yangilanmoqda
                            🚧
                        </h3>
                        <p>
                            Bu sahifa dizaynerlar, arxitektorlar va 3D model
                            mutaxassislari uchun. Bu yerda 3D modellar, interyer
                            dizaynlari va vizualizatsiyalarni topish mumkin.
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
            destination: `/3d-models-and-interior-designs/all${
                ctx.resolvedUrl.includes('?')
                    ? ctx.resolvedUrl.substring(ctx.resolvedUrl.indexOf('?'))
                    : ''
            }`,
            permanent: false, // Use 302 redirect (temporary)
        },
    };
}
