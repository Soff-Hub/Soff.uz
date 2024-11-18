import React, { useEffect } from 'react';
import { wrapper } from '~/store/store';
import { CookiesProvider } from 'react-cookie';
import MasterLayout from '~/components/layouts/MasterLayout';
import '~/public/static/fonts/Linearicons/Font/demo-files/demo.css';
import '~/public/static/fonts/font-awesome/css/font-awesome.min.css';
import '~/public/static/css/bootstrap.min.css';
import '~/public/static/css/slick.min.css';
import '~/scss/style.scss';
import '~/scss/electronic.scss';
import NextProgress from 'next-progress';
import { AudioProvider } from '~/hooks/AudioContext';
import { SidebarProvider } from '~/hooks/SidebarContext';
import { Provider } from 'react-redux';
import { persistor, store } from '~/rtk-store';
import { PersistGate } from 'redux-persist/integration/react';


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
            <NextProgress
                delay={300}
                options={{ showSpinner: false }}
                color="#00A44F"
            />
            <CookiesProvider>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <AudioProvider>
                            <SidebarProvider>
                                <MasterLayout>
                                    <Component {...pageProps} />
                                </MasterLayout>
                            </SidebarProvider>
                        </AudioProvider>
                    </PersistGate>
                </Provider>
            </CookiesProvider>
        </>
    );
}

export default wrapper.withRedux(App);
