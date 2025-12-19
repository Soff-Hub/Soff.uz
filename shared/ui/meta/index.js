import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

// Memoize the removeHTMLTags function outside component
const removeHTMLTags = (html) => {
    if (!html || typeof html !== 'string') return '';
    return html.replace(/<[^>]+>/g, '');
};

const Meta = React.memo(
    ({
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

        // Memoize canonical URL computation
        const staticCanonicalUrl = useMemo(
            () => `https://soff.uz${router.asPath.split('?')[0]}`,
            [router.asPath]
        );

        // Memoize processed description
        const processedDescription = useMemo(() => {
            if (description) {
                return removeHTMLTags(description);
            }
            return title || '';
        }, [description, title]);

        // Memoize keywords string
        const keywordsString = useMemo(() => {
            if (keywords && Array.isArray(keywords)) {
                return keywords
                    .map((e) => e?.name)
                    .filter(Boolean)
                    .join(', ');
            }
            return title || '';
        }, [keywords, title]);

        // Memoize Twitter description
        const twitterDescription = useMemo(() => {
            if (description) {
                return removeHTMLTags(description);
            }
            return `${title || ''} | Soff - Intellektual mulk marketi`;
        }, [description, title]);

        return (
            <Head>
                <title>{title}</title>
                <meta name="robots" content="index, follow" />
                <meta name="author" content={author} />
                <meta name="description" content={processedDescription} />
                <meta name="keywords" content={keywordsString} />

                <link
                    rel="canonical"
                    href={canonicalUrl || staticCanonicalUrl}
                />

                <meta property="og:locale" content="uz_UZ" />
                <meta property="og:type" content={type} />
                <meta property="og:title" content={title} />
                <meta
                    property="og:description"
                    content={processedDescription}
                />
                <meta property="og:image" content={image} />
                <meta property="og:url" content={url} />
                <meta property="og:site_name" content="soff.uz" />
                <meta property="og:keywords" content={keywordsString} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta property="twitter:image" content={image} />
                <meta property="twitter:type" content={type} />
                <meta property="twitter:title" content={title} />
                <meta
                    property="twitter:description"
                    content={twitterDescription}
                />
                <meta property="twitter:url" content={url} />
                <meta property="twitter:site_name" content="Soff.uz" />
                <meta property="twitter:keywords" content={keywordsString} />
                {children}
            </Head>
        );
    }
);

Meta.displayName = 'Meta';

export default Meta;
