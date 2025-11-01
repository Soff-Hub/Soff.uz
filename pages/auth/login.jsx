import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Meta from '~/components/shared/headers/Meta';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import LoginForm from '~/components/partials/account/auth/LoginForm';
import { useRouter } from 'next/router';
import { message } from 'antd';

const RegisterPage = () => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Kirish',
        },
    ];

    useEffect(() => {
        if (user) {
            router.replace('/');
            message.success('Siz allaqachon tizimga kirgansiz');
        }
    }, [user]);

    return (
        <PageContainer title="Ro'yxatdan o'tish">
            <div className="ps-page--my-account">
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
