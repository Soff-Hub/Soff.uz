import React from 'react';
import Meta from '~/components/shared/headers/Meta';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import TelegramConfigmForm from '~/components/partials/account/auth/TelegramConfirmForm';

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
            text: 'Telegram',
        },
    ];

    return (
        <PageContainer title="Ro'yxatdan o'tish">
            <div className="ps-page--my-account">
                <Meta
                    title={"Ro'yxatdan o'tish"}
                    description="Soff.uz platformasida ro‘yxatdan o‘ting va frilans xizmatlaridan foydalaning. Ish toping, buyurtma bering yoki o‘z xizmatlaringizni taklif qiling — barchasi bitta joyda."
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <TelegramConfigmForm />
            </div>
        </PageContainer>
    );
};

export default CodeVerifyPage;
