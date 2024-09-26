import React, { useEffect } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import RegisterCustomer from '~/components/partials/account/RegisterCustomer';
import Router from 'next/router';

const RegisterPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: "Kirish",
        },
    ];
    // const sallerEndPoint = query?.role === 'customer' ? 'auth/new-register/' : 'auth/seller-register/';
    const sallerEndPoint = 'auth/register/'

    useEffect(() => {
        Router.push('/auth/login')
    }, [])

    return (
        //   user?.access ?
        //   <Page404/>
        //   :
        <PageContainer footer={<FooterDefault />} title="Register">
            <div className="ps-page--my-account">
                <Meta
                    title={"Ro'yxatdan o'tish"}
                    description="Soff.uz - Saytidan hoziroq ro'yxatdan o'ting va o'z mahsulatlaringizni soting"
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <RegisterCustomer url={sallerEndPoint} />
            </div>
        </PageContainer>
    );
};

export default RegisterPage;
