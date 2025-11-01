import React from 'react';
import Meta from '~/components/shared/headers/Meta';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import CodeVerifyForm from '~/components/partials/account/auth/CodeVerifyForm';

const CodeVerifyPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Kirish',
            url: '/auth/login',
        },
        {
            text: 'Tasdiqlash',
        },
    ];

    return (
        <PageContainer title="Ro'yxatdan o'tish">
            <div className="ps-page--my-account">
                <Meta
                    title={"Ro'yxatdan o'tish"}
                    description="Soff.uz - Saytidan hoziroq ro'yxatdan o'ting va o'z mahsulatlaringizni soting"
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <CodeVerifyForm />
            </div>
        </PageContainer>
    );
};

export default CodeVerifyPage;
