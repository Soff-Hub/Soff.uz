import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Register from '~/components/partials/account/Register';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import Page404 from '../page/page-404';
import Meta from '~/components/shared/headers/Meta';

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
    const { user } = useSelector(state => state.auth)

    const userEndPoint = 'auth/register/';
    return (
        user?.access ?
            <Page404 /> :
            <PageContainer footer={<FooterDefault />} title="Register">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Soff | Ro'yxatdan o'tish"}
                        description="Soff.uz - Saytidan hoziroq ro'yxatdan o'ting va o'z mahsulatlaringizni soting"
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Register url={userEndPoint} />
                </div>
            </PageContainer>
    );
};

export default RegisterPage;
