import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Home from '~/widgets/home';
import Meta from '~/components/shared/headers/Meta';

export default function NewHomePage({ meta }) {
    return (
        <PageLayout>
            <Meta {...meta} />
            <Home />
        </PageLayout>
    );
}

export async function getStaticProps() {
    const type = 'website';
    const url = 'https://soff.uz';

    const title = 'Raqamli mahsulotlar va onlayn xizmatlar bozori – Soff.uz';
    const description =
        'Soff.uz - tayyor materiallar, ilmiy ishlar, 3D dizaynlar, veb saytlar, dizayn shablonlari va turli xizmatlar bozori. Hozir xarid qiling yoki soting!';
    const keywords = [
        { name: 'raqamli mahsulotlar' },
        { name: 'onlayn xizmatlar' },
        { name: 'tayyor materiallar' },
        { name: 'ilmiy ishlar' },
        { name: '3D dizayn' },
        { name: 'dizayn shablonlari' },
        { name: 'veb saytlar' },
        { name: 'grafik dizayn' },
        { name: 'akademik xizmatlar' },
        { name: 'Soff.uz' },
    ];
    const author = 'Soff.uz';
    const image = 'https://soff.uz/static/img/soff/logo-dark.png';
    return {
        props: {
            meta: {
                title,
                description,
                image,
                type,
                keywords,
                author,
                url,
            },
        },
    };
}
