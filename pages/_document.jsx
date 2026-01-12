import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
    return (
        <Html lang="uz" style={{ overflowX: 'hidden' }}>
            <Head>
                <link rel="shortcut icon" href={'/favicon.ico'} />
                <link rel="icon" type="image/x-icon" href={'/favicon.ico'} />
                <link
                    rel="icon"
                    type="image/png"
                    href={'/static/img/soff logo.png'}
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={'/static/img/soff logo.png'}
                    sizes="192x192"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    href={'/static/img/soff logo.png'}
                />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
                    as="style"
                />

                <link
                    rel="preload"
                    href="/static/fonts/google-sans.woff2"
                    as="font"
                    type="font/woff2"
                    crossorigin
                />

                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css"
                />

                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
                />

                {/* {process.env.NODE_ENV === 'production' && (
                    <script
                        defer
                        src="https://www.googletagmanager.com/gtag/js?id=G-H60GJQ0WF2"></script>
                )} */}

                {/* {process.env.NODE_ENV === 'production' && (
                    <script
                        defer
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-H60GJQ0WF2');
                    `,
                        }}></script>
                )} */}

                {/* {process.env.NODE_ENV === 'production' && (
                    <script
                        defer
                        dangerouslySetInnerHTML={{
                            __html: `
                        (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
                        m[i].l=1*new Date();
                        for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
                        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
                        (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
                     
                        ym(96098801, "init", {
                             clickmap:true,
                             trackLinks:true,
                             webvisor:true,
                             accurateTrackBounce:true
                        });
                    `,
                        }}></script>
                )} */}
                {/* {process.env.NODE_ENV === 'production' && (
                    <script
                        defer
                        dangerouslySetInnerHTML={{
                            __html: `
                        !function(f,b,e,v,n,t,s)
                        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                        n.queue=[];t=b.createElement(e);t.async=!0;
                        t.src=v;s=b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t,s)}(window, document,'script',
                        'https://connect.facebook.net/en_US/fbevents.js');
                        fbq('init', '2024989874941740');
                        fbq('track', 'PageView');
                        `,
                        }}></script>
                )} */}
                {/* <script
                    src="https://telegram.org/js/telegram-web-app.js"
                    defer></script> */}
                <noscript>
                    <div>
                        <img
                            src="https://mc.yandex.ru/watch/96098801"
                            style={{ position: 'absolute', left: '-9999px' }}
                            alt=""
                        />
                    </div>
                </noscript>
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=2024989874941740&ev=PageView&noscript=1"
                    />
                </noscript>

                {/* <script>window.yaContextCb=window.yaContextCb||[]</script> */}
            </Head>
            <body>
                <Main />
                <NextScript />
                <div id="portal-root"></div>
            </body>
        </Html>
    );
}
