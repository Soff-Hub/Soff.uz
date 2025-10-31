import React, { useEffect, useState } from 'react';
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/electronic.scss';
import '~/widgets/navbar-menu/popover-override.css';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { Toaster } from 'react-hot-toast';
import { Providers } from '~/app/providers';
import AffiliateListener from '~/entities/affiliate';
import { useTelegram } from '~/shared/hooks/useTelegram';
import { PacmanLoader } from 'react-spinners';
import { TelegramLink } from '~/shared/components/telegram-link';
import { useTimeManager } from '~/shared/hooks/useTimeManager';

function App({ Component, pageProps }) {
    const { tg } = useTelegram();
    const { startTimeout } = useTimeManager();
    const [siteLoaded, setSiteLoaded] = useState(false);

    useEffect(() => {
        tg?.ready();
    }, [tg]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const utmSource = params.get('utm_source');
        const utmMedium = params.get('utm_medium');
        const utmCampaign = params.get('utm_campaign');

        if (utmSource) localStorage.setItem('utm_source', utmSource);
        if (utmMedium) localStorage.setItem('utm_medium', utmMedium);
        if (utmCampaign) localStorage.setItem('utm_campaign', utmCampaign);

        startTimeout(() => {
            document.getElementById('__next').classList.add('loaded');
        }, 10);
        window.addEventListener('contextmenu', (e) => e.preventDefault());

        return () => {
            localStorage.removeItem('utm_source');
            localStorage.removeItem('utm_medium');
            localStorage.removeItem('utm_campaign');
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
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

    // ✅ Sayt to‘liq yuklanguncha loader ko‘rsatish
    useEffect(() => {
        const handleLoad = () => {
            // Barcha JS, CSS, img va fontlar yuklandi
            startTimeout(() => {
                setSiteLoaded(true);
            }, 400); // biroz delay bilan silliq o'tish
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
        }

        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         OneSignal.init({
    //             appId: '4c89c0b3-5aea-4145-b4cc-de98a7c8397a',
    //             notifyButton: {
    //                 enable: true,
    //             }
    //         });
    //     }
    // }, []);

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
                                target: 'https://soff.uz/search-page?keyword={search_term_string}',
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

            {/* ✅ Loader — sayt to‘liq yuklanmaguncha PacmanLoader chiqadi */}
            {!siteLoaded && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: '#fff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        zIndex: 9999,
                        transition: 'opacity 0.4s ease',
                    }}>
                    <PacmanLoader color="#00A44F" size={30} />
                </div>
            )}

            {siteLoaded && (
                <Providers>
                    <AffiliateListener />
                    <Component {...pageProps} />
                    <Toaster position="top-center" />
                    <TelegramLink />
                </Providers>
            )}
        </>
    );
}

export default App;
