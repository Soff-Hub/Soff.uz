import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Meta from '~/shared/ui/meta';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import LoginForm from '~/features/account/ui/auth/LoginForm';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const RegisterPage = () => {
    const { user } = useSelector((state) => state.auth);
    const router = useRouter();
    const isAlreadyPrinted = useRef(false);
    const { t } = useTranslation('login');

    const breadCrumb = [
        {
            text: t('breadcrumb.home'),
            url: '/',
        },
        {
            text: t('breadcrumb.login'),
        },
    ];

    useEffect(() => {
        if (user && !isAlreadyPrinted.current) {
            isAlreadyPrinted.current = true;
            router.replace('/');
            message.success(t('alreadyLoggedIn'));
        }
    }, [user, t, router]);

    const metaTitle = t('meta.title');
    const metaDescription = t('meta.description');

    return (
        <PageContainer title={metaTitle}>
            <div className="ps-page--my-account">
                <Meta title={metaTitle} description={metaDescription} />
                <BreadCrumb breacrumb={breadCrumb} />
                <LoginForm />
            </div>
        </PageContainer>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'login',
                'modals',
            ])),
        },
    };
}

export default RegisterPage;
