
import Head from "next/head";
import React from "react";

const Meta = ({ title, image, description = "Soff.uz - Intellektual mulk marketi, Intellektual mahsulotlarini soting va xarid qiling." }) => {
  return (
    <Head>
      <meta property="og:title" content={title} />
      <meta
        property="og:description"
        content="Soff | Soff online hujjatlar bazasi"
      />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Soff.uz" />
      <title>{title}</title>
      <meta
        name="description"
        content={description}
      />
    </Head>
  );
};

export default Meta;