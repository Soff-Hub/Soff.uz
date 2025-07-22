import React from 'react';
import { useSelector } from 'react-redux';
import Meta from '~/components/shared/headers/Meta';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import LoginForm from '~/components/partials/account/auth/LoginForm';
import Page404 from '../page/page-404';

const RegisterPage = () => {
    const { user } = useSelector(state => state.auth);

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Kirish',
        },
    ];


    return user?.access ? (
        <Page404 />
    ) : (
        <PageContainer footer={<FooterDefault />} title='Register'>
            <div className='ps-page--my-account'>
                <Meta
                    title={"Ro'yxatdan o'tish"}
                    description="Soff.uz - Saytidan hoziroq ro'yxatdan o'ting va o'z mahsulatlaringizni soting"
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <LoginForm />
            </div>
        </PageContainer>
    );
};

export default RegisterPage;
