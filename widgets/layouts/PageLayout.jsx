import React, { useEffect } from 'react';
import Head from 'next/head';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthorization, setAccountLinks } from '~/store/auth/slice';
import { useRouter } from 'next/router';
// import Header from '../header';
import { GoogleLogin } from '@react-oauth/google';
import { fetchDirections, fetchProfile } from '~/store/profile/slice';
import dynamic from 'next/dynamic';
// import Footer from '~/widgets/footer';

export let cutomerAccountLink = [
    {
        text: 'Sotib olinganlar',
        url: '/account/sellerproducts',
        icon: 'fa-solid fa-bag-shopping',
    },
    {
        text: 'Buyurtmalarim',
        url: '/order/my-orders',
        icon: 'fas fa-truck',
    },
];

const Header = dynamic(() => import('~/widgets/header'), { ssr: false });
const Footer = dynamic(() => import('~/widgets/footer'), { ssr: true });

const PageLayout = ({ children, title, withFooter = true } = {}) => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const Router = useRouter();

    async function handleLogin(googleData) {
        Router.push(`/oauth/?token=${googleData}&returnUrl=${Router.asPath}`);
    }

    useEffect(() => {
        if (user?.role === 'customer') {
            dispatch(setAccountLinks(cutomerAccountLink));
            dispatch(fetchProfile());
        }
        dispatch(fetchDirections());
    }, [user?.role]);

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
