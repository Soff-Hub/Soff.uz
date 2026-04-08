import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import AntdProvider from './AntdProvider';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const retryFunc = (failureCount, error) => {
    if (error?.status && error?.status < 499) {
        return false;
    }
    if (failureCount > 1) return false;
    return true;
};

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            cacheTime: 10 * 60 * 1000, // 10 minutes
            retryDelay: 1000,
            retry: retryFunc,
            refetchOnWindowFocus: false,
            refetchOnMount: true,
        },
    },
});

export const Providers = ({ children, session }) => (
    <ReduxProvider store={store}>
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            scriptProps={{
                async: false,
                defer: false,
                appendTo: 'head',
                nonce: undefined,
            }}
        >
            <QueryClientProvider client={queryClient}>
                <SessionProvider session={session}>
                    <AntdProvider>{children}</AntdProvider>
                </SessionProvider>
            </QueryClientProvider>
        </GoogleReCaptchaProvider>
    </ReduxProvider>
);
