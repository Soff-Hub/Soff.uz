import React, { useEffect } from 'react';

import Register from '~/components/partials/account/Register';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Meta from '~/components/shared/headers/Meta';
import { useRouter } from 'next/router';
import AuthLayout from '~/components/layouts/AuthLayout';
import Head from 'next/head';

const RegisterPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: "Ro'yxatdan o'tish",
        },
    ];
    const { push } = useRouter()
    const { user } = useSelector(state => state.auth)
    const sallerEndPoint = 'auth/seller-register/'

    useEffect(() => {
        if (user) {
            push('/account/dashbord')
        }
    }, [user])

    return (
        user?.access ?
            <Page404 />
            :
            <AuthLayout>
                <Head>
                    <title>Soff.uz da sotuvchi bo'ling </title>
                </Head>

                <div className="ps-page--my-account">
                    <Meta
                        title={"Ro'yxatdan o'tish"}
                        description="Soff.uz - Saytidan hoziroq ro'yxatdan o'ting va o'z mahsulatlaringizni soting"
                    />
                    <Register url={sallerEndPoint} />
                </div>
            </AuthLayout>
    );
};

export default RegisterPage;
