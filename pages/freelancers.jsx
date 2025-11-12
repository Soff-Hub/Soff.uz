import React from 'react';
import Freelancers from '~/components/freelancers';
import Meta from '~/components/shared/headers/Meta';
import fetchJson from '~/shared/api/fetch-json';
import PageLayout from '~/widgets/layouts/PageLayout';

const meta = {
    title: 'Frilanserslar - Soff.uz',
    author: 'Soff.uz',
    description:
        'Soff.uz platformasidagi eng yaxshi frilanserslarni kashf eting va ularning xizmatlaridan foydalaning.',
    image: 'https://soff.uz/static/img/soff/logo-dark.png',
    type: 'website',
    url: 'https://soff.uz/freelancers',
    keywords: [
        { name: 'frilanserslar' },
        { name: 'frilanser xizmatlari' },
        { name: 'onlayn ishchilar' },
        { name: 'mustaqil ishchilar' },
        { name: 'Soff.uz' },
    ],
};

function Leaderboard({ data }) {
    return (
        <PageLayout>
            <Meta {...meta} />
            <Freelancers data={data} />
        </PageLayout>
    );
}

export async function getServerSideProps(context) {
    const {
        keyword = '',
        position = '',
        sort_by = '',
        direction = '',
        category = '',
        limit = 20,
        offset = 0,
    } = context.query;

    const servicesQuery = new URLSearchParams({
        ...(direction && { direction }),
        ...(position && { position }),
        ...(sort_by && { sort_by }),
        ...(category && { category }),
        search: keyword,
        limit,
        offset,
    });

    const sellersUrl = `${
        process.env.NEXT_PUBLIC_FREELEANCE_URL
    }/api/v1/users/sellers?${servicesQuery.toString()}`;
    const sellersData = await fetchJson(sellersUrl);
    console.log('Freelancers data:', sellersData, sellersUrl);
    return {
        props: {
            data: sellersData,
        },
    };
}

export default Leaderboard;
