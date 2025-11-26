import React from 'react';
import Freelancers from '~/components/freelancers';
import Meta from '~/components/shared/headers/Meta';
import fetchJson from '~/shared/api/fetch-json';
import PageLayout from '~/widgets/layouts/PageLayout';

const baseKeywords = [
    'frilanserslar',
    'frilanser xizmatlari',
    'onlayn ishchilar',
    'mustaqil ishchilar',
    'Soff.uz',
];

const generateMetaTags = (query) => {
    const { directionValue = '', position = '', keyword = '' } = query;
    const parts = [directionValue, position, keyword]
        .filter(Boolean)
        .flat(Infinity);
    const titlePrefix = parts.length
        ? parts.join(' - ')
        : 'Eng yaxshi frilanserlar va mutaxassislar';
    const title = `${titlePrefix} | Soff.uz`;

    const description = `Soff.uz platformasidagi eng yaxshi frilanserlar va mutaxassislarni kashf eting, loyihangiz uchun mukammal mutaxassislarni toping. ${
        directionValue
            ? `${directionValue} sohasidagi eng tajribali frilanserlarni Soff.uz platformasida toping va ularning xizmatlaridan foydalaning.`
            : ''
    } ${
        position
            ? `${position} bo'yicha malakali frilanserlarni ishga oling.`
            : ''
    } ${keyword ? `Qidiruvingiz: "${keyword}" bo'yicha natijalar.` : ''}`;

    const dynamicKeywords = parts.flatMap((part) => [
        `${part} frilanserlar`,
        `${part} frilanser`,
        `${part} mutaxassisi`,
        `${part} xizmatlari`,
        `${part} ish`,
        `${part} topish`,
        `frilanser ${part}`,
    ]);

    const keywords = [...dynamicKeywords, ...baseKeywords];

    return {
        title,
        description,
        author: 'Soff.uz',
        image: 'https://soff.uz/static/img/soff/logo-dark.png',
        type: 'website',
        url: 'https://soff.uz/freelancers',
        canonicalUrl: `https://soff.uz/freelancers${
            directionValue ? `/${directionValue}` : ''
        }${position ? `/${position}` : ''}${
            keyword ? `?keyword=${keyword}` : ''
        }`,
        keywords: keywords.map((name) => ({ name })),
    };
};

function FreelancersPage({ data, metaTags }) {
    return (
        <PageLayout>
            <Meta {...metaTags} />
            <Freelancers data={data} />
        </PageLayout>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const {
        keyword = '',
        position = '',
        direction = '',
        sort_by = 'average_rating',
        limit = 20,
        offset = 0,
        order = '',
    } = query;

    const params = new URLSearchParams();

    const metaTags = generateMetaTags(query);

    if (keyword) params.append('search', keyword);

    if (Array.isArray(position)) {
        position.forEach((p) => params.append('position', p));
    } else if (position) {
        params.append('position', position);
    }

    if (Array.isArray(direction)) {
        direction.forEach((d) => params.append('direction', d));
    } else if (direction) {
        params.append('direction', direction);
    }

    if (sort_by && (sort_by !== 'average_rating' || order === 'asc'))
        params.append('sort_by', sort_by);
    params.append('limit', limit);
    if (offset) {
        params.append('offset', offset);
    } else {
        params.append('offset', 0);
    }

    if (order) params.append('order', order);

    const url = `${
        process.env.NEXT_PUBLIC_FREELEANCE_URL
    }/api/v1/users/freelancers/list/?${params.toString()}`;
    // const url = `${
    //     process.env.NEXT_PUBLIC_FREELEANCE_URL
    // }/api/v1/users/sellers?${params.toString()}`;

    try {
        const data = await fetchJson(url);
        console.log({ data, params, url });
        return {
            props: { data, metaTags },
        };
    } catch (error) {
        console.error('❌ SSR fetch error:', error);
        return {
            props: { data: [], metaTags },
        };
    }
}

export default FreelancersPage;
