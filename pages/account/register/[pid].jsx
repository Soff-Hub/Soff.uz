import React, { useEffect } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Register from '~/components/partials/account/Register';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Mistake from '../mistake';
import Meta from '~/components/shared/headers/Meta';
import AuthLayout from '~/components/layouts/AuthLayout';
import Head from 'next/head';

const RegisterPage = () => {
    const Router = useRouter()
    const { pid } = Router.query
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: "Ro'yxatdan o'tish",
        },
    ];
    const { user } = useSelector(state => state.auth)
    const sallerEndPoint = `auth/seller-register/${pid}/`;


    return (
        user?.access ?
            <Loader />
            :
            <AuthLayout>
                <Head>
                    <title>Soff.uz da sotuvchi bo'ling</title>
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
