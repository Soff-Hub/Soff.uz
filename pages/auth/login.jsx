import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Meta from '~/shared/ui/meta';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import LoginForm from '~/features/account/ui/auth/LoginForm';
import { useRouter } from 'next/router';
import { message } from 'antd';

const RegisterPage = () => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const isAlreadyPrinted = useRef(false);

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
        if (user && !isAlreadyPrinted.current) {
            isAlreadyPrinted.current = true;
            router.replace('/');
            message.success('Siz allaqachon tizimga kirgansiz');
        }
    }, [user]);

    return (
        <PageContainer title="Ro'yxatdan o'tish">
            <div className="ps-page--my-account">
                <Meta
                    title={"Ro'yxatdan o'tish"}
                    description="Soff.uz platformasida ro‘yxatdan o‘ting va frilans xizmatlaridan foydalaning. Ish toping, buyurtma bering yoki o‘z xizmatlaringizni taklif qiling — barchasi bitta joyda."
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <LoginForm />
            </div>
        </PageContainer>
    );
};

export default RegisterPage;
