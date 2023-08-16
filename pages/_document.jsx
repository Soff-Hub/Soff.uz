// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

import React from 'react';

export default function Document() {
    return (
        <Html>
            <Head>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
                <link rel="shortcut icon" href={'/static/img/favi.png'} />
                <link rel="icon" href={'/static/img/favi.png'} sizes="32x32" />
                <link
                    rel="icon"
                    href={'/static/img/favi.png'}
                    sizes="192x192"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    href={'/static/img/favi.png'}
                />

                <link
                    href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext"
                    rel="stylesheet"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
