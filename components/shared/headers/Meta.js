import Head from 'next/head';
import React from 'react';

const Meta = ({ title, image, description, keywords, author="Soff.uz" }) => {
    const removeHTMLTags = (html) => {
        return html.replace(/<[^>]+>/g, '');
    };

    return (
        <Head>
            <title>{title}</title>
            <meta name="author" content={author}/>
            <meta name="description" content={description ? removeHTMLTags(description) : `${title}`}/>
            <meta
                property="description"
                content={description ? removeHTMLTags(description) : `${title}`}
            />

            <meta property="og:locale" content="uz_UZ" />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            
            <meta
                property="og:description"
                content={description ? removeHTMLTags(description) : `${title}`}
            />
            <meta property="og:image" content={image} />
            <meta property="og:url" content="https://soff.uz" />
            <meta property="og:site_name" content="soff.uz" />
            <meta
                property="og:keywords"
                content={keywords ? keywords.map((e) => e?.name).join(", ") : title}
            />

            <meta name="twitter:card" content="summary_large_image" />
            <meta property="twitter:image" content={image}></meta>
            <meta property="twitter:type" content="website" />
            <meta property="twitter:title" content={title} />
            <meta
                property="twitter:description"
                content={
                    description
                        ? removeHTMLTags(description)
                        : `${title} | Soff - Intellektual mulk marketi`
                }
            />
            <meta property="twitter:url" content="soff.uz" />
            <meta property="twitter:site_name" content="Soff.uz" />
            <meta
                property="twitter:keywords"
                content={keywords ? keywords.map((e) => e?.name).join(", ") : title}
            />
        </Head>
    );
};

export default Meta;
