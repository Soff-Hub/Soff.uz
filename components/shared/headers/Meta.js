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
            <meta name="twitter:image" content={image}></meta>
            <meta property="og:url" content={image} />
            <meta property="og:site_name" content="Soff.uz" />
            <meta
                property="og:keywords"
                content={
                    keywords ? keywords?.map((e) => e?.name) : title
                }
            />

            <meta name="viewport" />
           
        </Head>
    );
};

export default Meta;
