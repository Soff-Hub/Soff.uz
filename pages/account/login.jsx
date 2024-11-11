import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import { PacmanLoader } from 'react-spinners';
import Meta from '~/components/shared/headers/Meta';
import { useRouter } from 'next/router';
import AuthLayout from '~/components/layouts/AuthLayout';
import Head from 'next/head';
import Login from '~/components/partials/account/Login';

const LoginPage = () => {
    const { user } = useSelector((state) => state.auth);
    const { push } = useRouter()

    useEffect(() => {
        if (user) {
            if (user?.is_superuser || user?.role === 'seller') {
                push('/account/dashbord')
            } else push('/account/shops')
        }
    }, [user])

    return user ? (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20%',
            }}>
            <PacmanLoader color='#00A44F' />
        </div>
    ) :
        user?.access ?
            <Page404 /> :
            (
                <AuthLayout>
                    <Head>
                        <title>Soff.uz da sotuvchi bo'ling </title>
                    </Head>
                    <div className="ps-page--my-account">
                        <Meta
                            title={"Kirish"}
                            description="Soff.uz - Saytiga hoziroq kiring va o'z mahsulatlaringizni soting"
                        />
                        <Login />
                    </div>
                </AuthLayout>
            )
};

export default LoginPage;
