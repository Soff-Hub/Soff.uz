import React, { useEffect } from 'react';
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

const Header = dynamic(() => import('~/widgets/header'), { ssr: false });
const Footer = dynamic(() => import('~/widgets/footer'), { ssr: true });
const NetworkStatusComponent = dynamic(
    () => import(`~/components/NetworkStatus`),
    { ssr: false }
);

const PageLayout = ({ children, title, withFooter = true } = {}) => {
    const { user } = useSelector((state) => state.auth);

    useGetProfileQuery(undefined, {
        skip: user?.role !== 'customer',
    });
    useGetDirectionsQuery();

    const dispatch = useDispatch();
    const Router = useRouter();

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
        <>
            {title ? (
                <Head>
                    <title>{title}</title>
                </Head>
            ) : null}

            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }}>
                <Header />
                <NetworkStatusComponent />
                <main
                    style={{
                        flex: '1 0 auto',
                        display: 'flex',
                        flexDirection: 'column',
                    }}>
                    {children}
                </main>

                {withFooter ? <Footer /> : null}
            </div>

            {!user && (
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
        </>
    );
};

export default PageLayout;
