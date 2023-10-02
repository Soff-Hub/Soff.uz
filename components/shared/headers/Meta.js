
import Head from "next/head";
import React from "react";

const Meta = ({ title, image }) => {
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Soff | Soff online hujjatlar bazasi"
      />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="soff.uz" />
      <title>{title}</title>
    </Head>
  );
};

export default Meta;