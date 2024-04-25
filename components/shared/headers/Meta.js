import Head from 'next/head';
import React from 'react';
var parse = require('html-react-parser');


const Meta = ({ title, image, description, keywords, author }) => {
  function removeHTMLTags(html) {
    var doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
}

  console.log('meta', removeHTMLTags(description));
  

    return (
        <Head>
            <meta  property="og:title" content={title} />
            <meta
                property="og:description"
                content={
                  description
                      ? removeHTMLTags(description)
                        : `${title} | Soff | Soff online hujjatlar bazasi`
                }
            />
            <meta property="og:image"  content={image} />
            <meta property="og:site_name" content="Soff.uz" />
            <meta
                property="og:keywords"
                content={keywords ? keywords?.map((e) => e) : title}
            />
            <meta name="site_name" content="Soff.uz" />
            <title>{title}</title>
            <meta name="title"  content={title} />
            <meta  name="image" content={image} />
            <meta
                name="description"
                content={
                  description
                        ? removeHTMLTags(description)
                        : `${title}  Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling.`
                }
            />
            <meta
                name="author"
                property="author"
                content={author ? author : 'nouthemes'}
            />
            <meta
                name="keywords"
                property="keywords"
                content={keywords ? keywords?.map((e) => e) : title}
            />
        </Head>
    );
};

export default Meta;
