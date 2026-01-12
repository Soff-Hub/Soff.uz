import React, { useEffect } from 'react';
import { appWithTranslation } from 'next-i18next';
import '~/scss/style.scss';
import '~/scss/electronic.scss';
import '~/widgets/navbar-menu/popover-override.css';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { Providers } from '~/app/providers';
import AffiliateListener from '~/entities/affiliate';
import { useTelegram } from '~/shared/hooks/useTelegram';
import { TelegramLink } from '~/shared/components/telegram-link';
import { useTimeManager } from '~/shared/hooks/useTimeManager';
import '~/shared/utilities/dayjs-locale-uz';
import Script from 'next/script';

function App({ Component, pageProps }) {
    const { tg } = useTelegram();
    const { startTimeout } = useTimeManager();

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
            document?.getElementById('__next')?.classList?.add('loaded');
        }, 10);

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

        console.log(`
        ███████╗ ██████╗ ███████╗███████╗
        ██╔════╝██╔═══██╗██╔════╝██╔════╝
        ███████╗██║   ██║█████╗  █████╗  
        ╚════██║██║   ██║██╔══╝  ██╔══╝  
        ███████║╚██████╔╝██║     ██║     
        ╚══════╝ ╚═════╝ ╚═╝     ╚═╝     
        `);

        document.addEventListener('keydown', handleKeyDown);

        window.addEventListener('contextmenu', (e) => e.preventDefault());

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('contextmenu', (e) =>
                e.preventDefault()
            );
            localStorage.removeItem('utm_source');
            localStorage.removeItem('utm_medium');
            localStorage.removeItem('utm_campaign');
        };
    }, []);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <title>
                    Raqamli mahsulotlar va onlayn xizmatlar bozori – Soff.uz
                </title>
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
                            logo: 'https://soff.uz/static/img/soff/logo-dark.png',
                            sameAs: [
                                'https://t.me/soff_uz',
                                'https://www.youtube.com/@soffuz',
                                'https://www.facebook.com/people/Soffuz/61579052952962/',
                            ],
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: 'https://soff.uz/search-page?keyword={search_term_string}',
                                'query-input':
                                    'required name=search_term_string',
                            },
                        }),
                    }}></script>
            </Head>
            {process.env.NODE_ENV === 'production' && (
                <>
                    <Script
                        src="https://www.googletagmanager.com/gtag/js?id=G-H60GJQ0WF2"
                        strategy="afterInteractive"
                        // onLoad={() =>
                        //     console.log('✅ Google Analytics loader loaded')
                        // }
                        // onError={(e) => console.error('❌ GA loader error:', e)}
                    />
                    <Script
                        src="/scripts/google-analytics-init.js"
                        strategy="afterInteractive"
                        // onLoad={() => {
                        //     console.log('✅ Google Analytics init loaded');
                        //     console.log('gtag:', typeof gtag);
                        //     console.log('dataLayer:', typeof dataLayer);
                        // }}
                        // onError={(e) => console.error('❌ GA init error:', e)}
                    />
                    <Script
                        src="/scripts/yandex-metrika-init.js"
                        strategy="afterInteractive"
                        // onLoad={() => {
                        //     console.log('✅ Yandex Metrika loaded');
                        //     console.log('ym:', typeof ym);
                        // }}
                        // onError={(e) =>
                        //     console.error('❌ Yandex Metrika error:', e)
                        // }
                    />
                    <Script
                        src="/scripts/facebook-pixel-init.js"
                        strategy="afterInteractive"
                        // onLoad={() => {
                        //     console.log('✅ Facebook Pixel loaded');
                        //     console.log('fbq:', typeof fbq);
                        // }}
                        // onError={(e) =>
                        //     console.error('❌ Facebook Pixel error:', e)
                        // }
                    />
                    <Script
                        src="/scripts/yandex-context-init.js"
                        strategy="afterInteractive"
                        // onLoad={() => {
                        //     console.log('✅ Yandex Context loaded');
                        //     console.log('yaContextCb:', window.yaContextCb);
                        // }}
                        // onError={(e) =>
                        //     console.error('❌ Yandex Context error:', e)
                        // }
                    />
                </>
            )}
            <Script
                src="https://telegram.org/js/telegram-web-app.js"
                strategy="afterInteractive"
            />
            <NextProgress
                height="4px"
                delay={300}
                options={{ showSpinner: false }}
                color="#00A44F"
            />
            <Providers>
                <AffiliateListener />
                <Component {...pageProps} />
                <TelegramLink />
            </Providers>
        </>
    );
}

export default appWithTranslation(App);
