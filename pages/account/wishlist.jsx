import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import Wishlist from '~/features/account/ui/wishlist';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const WishlistPage = () => {
    const { t } = useTranslation('account');
    return (
        <PageContainer>
            <Meta
                title={t('wishlist.title')}
                description={t('wishlist.description')}
            />
            <Wishlist />
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

export default WishlistPage;
