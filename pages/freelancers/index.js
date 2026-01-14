import React from 'react';
import Freelancers from '~/features/freelancers';
import Meta from '~/shared/ui/meta';
import fetchJson from '~/shared/api/fetch-json';
import PageLayout from '~/widgets/layouts/PageLayout';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const baseKeywords = [
    'frilanserslar',
    'frilanser xizmatlari',
    'onlayn ishchilar',
    'mustaqil ishchilar',
    'Soff.uz',
];

const generateMetaTags = (query, t) => {
    const { directionValue = '', position = '', keyword = '' } = query;
    const parts = [directionValue, position, keyword]
        .filter(Boolean)
        .flat(Infinity);
    const titlePrefix = parts.length
        ? parts.join(' - ')
        : t('meta.freelancers.defaultTitle');
    const title = `${titlePrefix} | Soff.uz`;

    let description = t('meta.freelancers.description');
    if (directionValue) {
        description += ' ' + t('meta.freelancers.directionDescription', { direction: directionValue });
    }
    if (position) {
        description += ' ' + t('meta.freelancers.positionDescription', { position });
    }
    if (keyword) {
        description += ' ' + t('meta.freelancers.keywordDescription', { keyword });
    }

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

    // Load translations for server-side use
    const fs = require('fs');
    const path = require('path');
    const translationPath = path.join(process.cwd(), 'public', 'locales', locale, 'orders.json');
    let translations = {};
    try {
        const translationContent = fs.readFileSync(translationPath, 'utf8');
        translations = JSON.parse(translationContent);
    } catch (error) {
        console.error('Error loading translations:', error);
    }
    
    // Helper function to get translation
    const getTranslation = (key, params = {}) => {
        const keys = key.split('.');
        let value = translations;
        for (const k of keys) {
            value = value?.[k];
        }
        if (typeof value === 'string') {
            return Object.keys(params).reduce((str, param) => {
                return str.replace(new RegExp(`{{${param}}}`, 'g'), params[param]);
            }, value);
        }
        return value || key;
    };

    const metaTags = generateMetaTags(query, getTranslation);

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
        const data = await fetchJson(url);
        return {
            props: { 
                data, 
                metaTags,
                ...(await serverSideTranslations(locale, [
                    'header',
                    'footer',
                    'common',
                    'orders',
                    'modals',
                ])),
            },
        };
    } catch (error) {
        console.error('❌ SSR fetch error:', error);
        return {
            props: { 
                data: [], 
                metaTags,
                ...(await serverSideTranslations(locale, [
                    'header',
                    'footer',
                    'common',
                    'orders',
                    'modals',
                ])),
            },
        };
    }
}

export default FreelancersPage;
