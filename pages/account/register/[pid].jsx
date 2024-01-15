import React, { useEffect } from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Register from '~/components/partials/account/Register';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Mistake from '../mistake';
import Meta from '~/components/shared/headers/Meta';

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
            <Mistake />
            :
            <PageContainer footer={<FooterDefault />} title="Register">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Soff | Ro'yxatdan o'tish"}
                        description="Soff.uz - O'z hisobingizga kiring va mahsulotlaringizni soting"
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Register url={sallerEndPoint} />
                </div>
            </PageContainer>
    );
};

export default RegisterPage;
