import React from 'react';
import Meta from '~/shared/ui/meta';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import CodeVerifyForm from '~/features/account/ui/auth/CodeVerifyForm';

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
        <PageContainer>
            <div className="ps-page--my-account">
                <Meta
                    title={"Ro'yxatdan o'tish"}
                    description="Soff.uz platformasida ro‘yxatdan o‘ting va frilans xizmatlaridan foydalaning. Ish toping, buyurtma bering yoki o‘z xizmatlaringizni taklif qiling — barchasi bitta joyda."
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <CodeVerifyForm />
            </div>
        </PageContainer>
    );
};

export default CodeVerifyPage;
