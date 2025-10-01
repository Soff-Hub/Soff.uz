import React, { useEffect } from 'react';
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/electronic.scss';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { Toaster } from 'react-hot-toast';
import { Providers } from '~/app/providers';
import AffiliateListener from '~/entities/affiliate';
import { useTelegram } from '~/shared/hooks/useTelegram';

function App({ Component, pageProps }) {
    const { tg } = useTelegram();

    useEffect(() => {
        setTimeout(function() {
            document.getElementById('__next').classList.add('loaded');
        }, 0);
        window.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        });
    }, []);

    useEffect(() => {
        const handleKeyDown = e => {
            if (
                (e.ctrlKey && e.shiftKey && e.key === 'I') || // Prevent Ctrl+Shift+I (Windows)
                (e.metaKey && e.altKey && e.key === 'I') || // Prevent Command+Option+I (macOS)
                (e.ctrlKey && e.shiftKey && e.key === 'J') || // Prevent Ctrl+Shift+J (Windows)
                (e.metaKey && e.altKey && e.key === 'J') || // Prevent Command+Option+J (macOS)
                (e.ctrlKey && e.key === 'U') || // Prevent Ctrl+U (Windows)
                (e.metaKey && e.key === 'U') || // Prevent Command+U (macOS)
                (e.ctrlKey && e.key === 'S') || // Prevent Ctrl+S (Windows)
                (e.metaKey && e.key === 'S') || // Prevent Command+S (macOS)
                e.key === 'F12'
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    useEffect(() => {
        tg?.ready?.();
    }, [tg]);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>Soff</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="format-detection" content="telephone=no" />
                <meta name="mobile-web-app-capable" content="yes"></meta>
                <meta
                    name="google-adsense-account"
                    content="ca-pub-2651864926558603"
                />

                <link rel="alternate" href="https://soff.uz/" hrefLang="uz" />
                <script
                    defer
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'Soff.uz',
                            url: 'https://soff.uz',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target:
                                    'https://soff.uz/search-page?keyword={search_term_string}',
                                'query-input':
                                    'required name=search_term_string',
                            },
                        }),
                    }}></script>
            </Head>

            <NextProgress
                height="4px"
                delay={300}
                options={{ showSpinner: false }}
                color="#00A44F"
            />
            <Providers>
                <AffiliateListener />
                <Component {...pageProps} />
                <Toaster position="top-center" />
            </Providers>
        </>
    );
}

export default App;
