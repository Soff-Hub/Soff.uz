import Head from 'next/head';
import React from 'react';

const Meta = ({ title, image, description, keywords, author }) => {
    const removeHTMLTags = (html) => {
        return html.replace(/<[^>]+>/g, '');
    };

    // console.log('title', title);
    // console.log('image', image);
    // console.log('description', description);
    // console.log('keywords', keywords);
    // console.log('author', author);

    return (
        <Head>
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta
                property="og:description"
                content={
                    description
                        ? removeHTMLTags(description)
                        : `${title} | Soff | Soff online hujjatlar bazasi`
                }
            />
            <meta property="og:image" content={image} />
            <meta property="og:url" content="soff.uz" />
            <meta property="og:site_name" content="Soff.uz" />
            <meta
                property="og:keywords"
                content={keywords ? keywords?.map((e) => e?.name) : title}
            />


            <meta property="twitter:image" content={image}></meta>
            <meta property="twitter:type" content="website" />
            <meta property="twitter:title" content={title} />
            <meta
                property="twitter:description"
                content={
                    description
                        ? removeHTMLTags(description)
                        : `${title} | Soff | Soff online hujjatlar bazasi`
                }
            />
            <meta property="twitter:url" content="soff.uz" />
            <meta property="twitter:site_name" content="Soff.uz" />
            <meta
                property="twitter:keywords"
                content={keywords ? keywords?.map((e) => e?.name) : title}
            />
        </Head>
    );
};

export default Meta;
