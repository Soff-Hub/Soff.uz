import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const removeHTMLTags = (html?: string) => {
    if (!html || typeof html !== 'string') return '';
    return html.replace(/<[^>]+>/g, '');
};

type MetaProps = {
    title?: string;
    image?: string;
    url?: string;
    type?: string;
    description?: string;
    keywords?: Array<{ name: string }>;
    author?: string;
    canonicalUrl?: string;
    children?: React.ReactNode;
};

const Meta = ({
    title = 'Raqamli mahsulotlar va onlayn xizmatlar bozori – Soff.uz',
    image = 'https://soff.uz/static/img/soff/logo-dark.png',
    url = 'https://soff.uz',
    type = 'website',
    description,
    keywords,
    author = 'Soff.uz',
    canonicalUrl,
    children,
}: MetaProps) => {
    const { asPath } = useRouter();

    const staticCanonicalUrl = `https://soff.uz${asPath.split('?')[0]}`;

    const processedDescription = description
        ? removeHTMLTags(description)
        : title || '';

    const keywordsString =
        keywords && Array.isArray(keywords)
            ? keywords
                  .map((e) => e?.name)
                  .filter(Boolean)
                  .join(', ')
            : title || '';

    const twitterDescription = description
        ? removeHTMLTags(description)
        : `${title || ''} | Soff - Intellektual mulk marketi`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="index, follow" />
            <meta name="author" content={author} />
            <meta name="description" content={processedDescription} />
            <meta name="keywords" content={keywordsString} />
            <link
                rel="alternate"
                href={`${url}/ru${asPath}`}
                hrefLang={'x-default'}
            />

            <link rel="alternate" href={`${url}/en${asPath}`} hrefLang="en" />
            <link rel="alternate" href={`${url}/uz${asPath}`} hrefLang="uz" />
            <link rel="alternate" href={`${url}/ru${asPath}`} hrefLang="ru" />

            <link rel="canonical" href={canonicalUrl || staticCanonicalUrl} />

            <meta property="og:locale" content="uz_UZ" />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={processedDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="soff.uz" />
            <meta property="og:keywords" content={keywordsString} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={image} />
            <meta property="twitter:type" content={type} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={twitterDescription} />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:site_name" content="Soff.uz" />
            <meta property="twitter:keywords" content={keywordsString} />
            {children}
        </Head>
    );
};

export default Meta;
