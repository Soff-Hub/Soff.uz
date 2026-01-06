import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
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

const Header = dynamic(() => import('~/widgets/header'), {
    ssr: false,
    loading: HeaderLoader,
});

const Footer = dynamic(() => import('~/widgets/footer'), { ssr: true });
const NetworkStatusComponent = dynamic(
    () => import(`~/shared/ui/network-status`),
    { ssr: false }
);

const PageLayout = ({ children, title, withFooter = true }) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();

    const hasTitle = Boolean(title);
    const isValideUser = Boolean(user);

    useGetProfileQuery(`userfetch - ${user?.access}`, {
        skip: !user?.access,
    });
    useGetDirectionsQuery();

    async function handleLogin(googleData) {
        Router.push(`/oauth/?token=${googleData}&returnUrl=${Router.asPath}`);
    }

    const defaultRoutePage = () => {
        dispatch(checkAuthorization());
    };

    useEffect(() => {
        defaultRoutePage();
    }, []);

    return (
        <ViewportContextProvider>
            {hasTitle && (
                <Head>
                    <title>{title}</title>
                </Head>
            )}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    height: '100dvh',
                    height: '-webkit-fill-available',
                }}>
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
                        intermediate_iframe_close_callback={(e) =>
                            e.preventDefault()
                        }
                        useOneTap
                        prompt="select_account"
                    />
                </div>
            )}
        </ViewportContextProvider>
    );
};

PageLayout.prototype = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
    withFooter: PropTypes.bool,
};

export default PageLayout;
