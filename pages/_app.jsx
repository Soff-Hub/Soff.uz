import React, { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import MasterLayout from '~/components/layouts/MasterLayout';
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/electronic.scss';
import Head from 'next/head';
import NextProgress from 'next-progress';
import { AudioProvider } from '~/hooks/AudioContext';
import { ProductProvider } from '~/context/ProductsContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from 'react-redux';
import { store } from '~/store';

function App({ Component, pageProps }) {

    useEffect(() => {
        setTimeout(function () {
            document.getElementById('__next').classList.add('loaded');
        }, 0);
        window.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

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
                (e.key === 'F12')
            ) {
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    return (
        <>
            <Head>
                <title>Soff</title>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta name="format-detection" content="telephone=no" />
                {/* <meta name="apple-mobile-web-app-capable" content="yes" /> */}
                <meta name="mobile-web-app-capable" content="yes"></meta>
            </Head>

            <NextProgress
                delay={300}
                options={{ showSpinner: false }}
                color="#00A44F"
            />
            <Provider store={store}>
                <GoogleOAuthProvider clientId="203103939049-2ste634q2uc1io9oaup8gt35tsmucru0.apps.googleusercontent.com">
                    <CookiesProvider>
                        <ProductProvider>
                            <AudioProvider>
                                <MasterLayout>
                                    <Component {...pageProps} />
                                </MasterLayout>
                            </AudioProvider>
                        </ProductProvider>
                    </CookiesProvider>
                </GoogleOAuthProvider>
            </Provider>
        </>
    );
}

export default App
