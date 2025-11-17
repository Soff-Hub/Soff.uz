import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

const Meta = ({
    title,
    image = 'https://soff.uz/static/img/soff/logo-dark.png',
    url = 'https://soff.uz',
    type = 'website',
    description,
    keywords,
    author = 'Soff.uz',
    canonicalUrl,
    children,
}) => {
    const router = useRouter();
    const removeHTMLTags = html => {
        return html.replace(/<[^>]+>/g, '');
    };

    // Build canonical URL (always HTTPS + no query params)
    const staticCanonicalUrl = `https://soff.uz${router.asPath.split('?')[0]}`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="robots" content="index, follow" />
            <meta name="author" content={author} />
            <meta
                name="description"
                content={description ? removeHTMLTags(description) : `${title}`}
            />
            <meta
                name="keywords"
                content={
                    keywords ? keywords.map(e => e?.name).join(', ') : title
                }
            />

            <link rel="canonical" href={canonicalUrl || staticCanonicalUrl} />

            <meta property="og:locale" content="uz_UZ" />
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />

            <meta
                property="og:description"
                content={description ? removeHTMLTags(description) : `${title}`}
            />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:site_name" content="soff.uz" />
            <meta
                property="og:keywords"
                content={
                    keywords ? keywords.map(e => e?.name).join(', ') : title
                }
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={image}></meta>
            <meta property="twitter:type" content={type} />
            <meta property="twitter:title" content={title} />
            <meta
                property="twitter:description"
                content={
                    description
                        ? removeHTMLTags(description)
                        : `${title} | Soff - Intellektual mulk marketi`
                }
            />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:site_name" content="Soff.uz" />
            <meta
                property="twitter:keywords"
                content={
                    keywords ? keywords.map(e => e?.name).join(', ') : title
                }
            />
            {children}
        </Head>
    );
};

export default Meta;
