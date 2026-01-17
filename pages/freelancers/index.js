import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Freelancers from '~/features/freelancers';
import Meta from '~/shared/ui/meta';
import fetchJson from '~/shared/api/fetch-json';
import PageLayout from '~/widgets/layouts/PageLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const generateMetaTags = (query, t) => {
    const { directionValue = '', position = '', keyword = '' } = query;
    const parts = [directionValue, position, keyword]
        .filter(Boolean)
        .flat(Infinity);
    const titlePrefix = parts.length
        ? parts.join(' - ')
        : t('meta.defaultTitle');
    const title = `${titlePrefix} | Soff.uz`;

    let description = t('meta.description');
    if (directionValue) {
        description +=
            ' ' +
            t('meta.directionDescription', {
                direction: directionValue,
            });
    }
    if (position) {
        description += ' ' + t('meta.positionDescription', { position });
    }
    if (keyword) {
        description += ' ' + t('meta.keywordDescription', { keyword });
    }

    const dynamicKeywords = parts.flatMap((part) => [
        t('meta.keywords.freelancers', { part }),
        t('meta.keywords.freelancer', { part }),
        t('meta.keywords.specialist', { part }),
        t('meta.keywords.services', { part }),
        t('meta.keywords.job', { part }),
        t('meta.keywords.finding', { part }),
        t('meta.keywords.freelancerPrefix', { part }),
    ]);

    const baseKeywords = [
        t('meta.keywords.base.0'),
        t('meta.keywords.base.1'),
        t('meta.keywords.base.2'),
        t('meta.keywords.base.3'),
        t('meta.keywords.base.4'),
    ];

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

function FreelancersPage({ data }) {
    const { t } = useTranslation('freelancers');
    const router = useRouter();
    const metaTags = generateMetaTags(router.query, t);

    return (
        <PageLayout>
            <Meta {...metaTags} />
            <Freelancers data={data} />
        </PageLayout>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const locale = context.locale || 'uz';
    const {
        keyword = '',
        position = '',
        direction = '',
        sort_by = 'average_rating',
        limit = 20,
        offset = '0',
        order = '',
    } = query;

    const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
    });

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

    if (order) params.append('order', order);

    const url = `${
        process.env.NEXT_PUBLIC_FREELEANCE_URL
    }/api/v1/users/freelancers/list/?${params.toString()}`;

    try {
        const data = await fetchJson(url, locale);
        return {
            props: {
                data,
                ...(await serverSideTranslations(locale, [
                    'header',
                    'footer',
                    'common',
                    'card',
                    'modals',
                    'freelancers',
                ])),
            },
        };
    } catch (error) {
        console.error('❌ SSR fetch error:', error);
        return {
            props: {
                data: [],
                ...(await serverSideTranslations(locale, [
                    'header',
                    'footer',
                    'common',
                    'card',
                    'modals',
                    'freelancers',
                ])),
            },
        };
    }
}

export default FreelancersPage;
