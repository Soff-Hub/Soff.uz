import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import Document from 'next/document';

export default function MyDocument() {
    return (
        <Html lang="uz" style={{ overflowX: 'hidden' }}>
            <Head>
                <link rel="shortcut icon" href={'/favicon.ico'} />
                <link rel="icon" type="image/x-icon" href={'/favicon.ico'} />
                <link
                    rel="icon"
                    type="image/png"
                    href={'/static/img/soff%20logo.png'}
                    sizes="32x32"
                />
                <link
                    rel="icon"
                    type="image/png"
                    href={'/static/img/soff%20logo.png'}
                    sizes="192x192"
                />
                <link
                    rel="apple-touch-icon-precomposed"
                    href={'/static/img/soff%20logo.png'}
                />

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
                <noscript>
                    <img
                        height="1"
                        width="1"
                        style={{ display: 'none' }}
                        src="https://www.facebook.com/tr?id=702406552890915&ev=PageView&noscript=1"
                    />
                </noscript>
            </Head>
            <body>
                <Main />
                <NextScript />
                <div id="portal-root"></div>
            </body>
        </Html>
    );
}

MyDocument.getInitialProps = async (ctx) => {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => (
                <StyleProvider cache={cache}>
                    <App {...props} />
                </StyleProvider>
            ),
        });

    const initialProps = await Document.getInitialProps(ctx);
    const style = extractStyle(cache, true);
    return {
        ...initialProps,
        styles: (
            <>
                {initialProps.styles}
                <style dangerouslySetInnerHTML={{ __html: style }} />
            </>
        ),
    };
};
