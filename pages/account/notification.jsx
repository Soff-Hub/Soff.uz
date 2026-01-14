import React from 'react';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import NotificationList from '~/features/account/ui/NotificationList';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Notification = () => {
    const { t } = useTranslation('account');
    const breadCrumb = [
        {
            text: t('notification.breadcrumbHome'),
            url: '/',
        },
        {
            text: t('notification.breadcrumbNotifications'),
        },
    ];
    return (
        <PageContainer>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Meta
                    title={t('notification.title')}
                    description={t('notification.description')}
                />
                <NotificationList />
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
                'account',
                'modals',
            ])),
        },
    };
}

export default Notification;
