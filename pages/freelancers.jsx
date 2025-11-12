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

function FreelancersPage({ data }) {
    return (
        <PageLayout>
            <Meta {...meta} />
            <Freelancers data={data} />
        </PageLayout>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const {
        keyword = '',
        position = "",
        direction = "",
        sort_by = '',
        limit = 20,
        offset = 0,
    } = query;

    const params = new URLSearchParams();

    if (keyword) params.append('search', keyword);

    // position
    if (Array.isArray(position)) {
        position.forEach((p) => params.append('position', p));
    } else if (position) {
        params.append('position', position);
    }

    if (direction) {
        params.append('direction', direction);
    }

    if (sort_by) params.append('sort_by', sort_by);
    params.append('limit', limit);
    params.append('offset', offset);

    const url = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/users/sellers?${params.toString()}`;

    try {
        const data = await fetchJson(url);
        return {
            props: { data },
        };
    } catch (error) {
        console.error('❌ SSR fetch error:', error);
        return {
            props: { data: [] },
        };
    }
}

export default FreelancersPage;
