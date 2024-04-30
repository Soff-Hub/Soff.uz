import Head from 'next/head';
import React from 'react';

const Meta = ({ title, image, description, keywords, author }) => {
    const removeHTMLTags = (html) => {
        return html.replace(/<[^>]+>/g, '');
    };

    return (
        <Head>
            <meta property="og:title" content={title} />
            <title>{title}</title>
            <meta
                property="og:description"
                content={
                    description
                        ? removeHTMLTags(description)
                        : `${title} | Soff | Soff online hujjatlar bazasi`
                }
            />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content="Soff.uz" />
            <meta
                property="og:keywords"
                content={keywords ? keywords?.map((e) => e) : title}
            />
            <meta
                name="author"
                property="author"
                content={author ? author : 'nouthemes'}
            />
        </Head>
    );
};

export default Meta;
