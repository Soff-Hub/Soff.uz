import React, { FC, useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { checkAuthorization } from '~/store/auth/slice';
import { useRouter } from 'next/router';
import { GoogleLogin } from '@react-oauth/google';
import {
    useGetDirectionsQuery,
    useGetProfileQuery,
} from '~/store/profile/slice';
import dynamic from 'next/dynamic';
import HeaderLoader from '~/widgets/header/HeaderLoader';
import { ViewportContextProvider } from '~/shared/contexts/ViewportContext';
import { useAppDispatch, useAppSelector } from '~/app/store/hooks';

const Header = dynamic(() => import('~/widgets/header'), {
    ssr: false,
    loading: HeaderLoader,
});

const Footer = dynamic(() => import('~/widgets/footer'), { ssr: true });
const NetworkStatusComponent = dynamic(
    () => import(`~/shared/ui/network-status`),
    { ssr: false }
);

type PageLayoutProps = {
    children: React.ReactNode;
    title?: string;
    withFooter?: boolean;
};

const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    // @ts-ignore
    height: '100dvh',
    // @ts-ignore
    height: '-webkit-fill-available',
};

const PageLayout: FC<PageLayoutProps> = ({
    children,
    title,
    withFooter = true,
}) => {
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const hasTitle = Boolean(title);
    const isValideUser = Boolean(user);

    useGetProfileQuery(`userfetch - ${user?.access}`, {
        skip: !user?.access,
    });
    useGetDirectionsQuery('directions-fetch');

    async function handleLogin(googleData?: string) {
        if (!googleData) return;
        await router.push(
            `/oauth/?token=${googleData}&returnUrl=${router.asPath}`
        );
    }

    useEffect(() => {
        const defaultRoutePage = () => {
            dispatch(checkAuthorization());
        };
        defaultRoutePage();
    }, []);

    return (
        <ViewportContextProvider>
            {hasTitle && (
                <Head>
                    <title>{title}</title>
                </Head>
            )}

            <div style={wrapperStyle}>
                <Header />
                <NetworkStatusComponent />
                <main
                    style={{
                        flex: '1',
                    }}>
                    {children}
                </main>

                {withFooter && <Footer />}
            </div>

            {!isValideUser && (
                <div style={{ height: 0, overflow: 'hidden' }}>
                    <GoogleLogin
                        onSuccess={(credentialResponse) => {
                            handleLogin(credentialResponse?.credential);
                        }}
                        useOneTap
                        prompt_parent_id="select_account"
                    />
                </div>
            )}
        </ViewportContextProvider>
    );
};

export default PageLayout;
