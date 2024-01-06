// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';

import React from 'react';

export default function Document() {
    return (
        <Html>
            <Head>

                <link rel="shortcut icon" href={'/static/img/soff logo.png'} />
                <link rel="icon" href={'/static/img/soff logo.png'}  sizes="32x32" />
                <link
                    rel="icon"
                    href={'/static/img/soff logo.png'}
                    sizes="192x192"
                />
                <link
                    rel="apple-touch-icon-precomposed"

                    href={'/static/img/soff logo.png'}
                />

                <link
                    href="https://fonts.googleapis.com/css?family=Work+Sans:300,400,500,600,700&amp;amp;subset=latin-ext"
                    rel="stylesheet"
                />

                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" />
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-H60GJQ0WF2"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-H60GJQ0WF2');
                    `,
                    }}
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                    __html: `
                        (function(h,o,t,j,a,r){
                            h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                            h._hjSettings={hjid:3805854,hjsv:6};
                            a=o.getElementsByTagName('head')[0];
                            r=o.createElement('script');r.async=1;
                            r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                            a.appendChild(r);
                        })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                        `,
                    }}
                ></script>

            </Head>
            <body>
                <Main />
                <NextScript />
             <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"></script>
            </body>
        </Html>
    );
}
