import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import { connect } from 'react-redux';
import Meta from '~/shared/ui/meta';
import ShoppingCart from '~/features/account/ui/shopping-cart';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const ShoppingCartScreen = () => {
    const { t } = useTranslation('account');
    return (
        <PageContainer>
            <Meta
                title={t('shoppingCart.title')}
                description={t('shoppingCart.description')}
            />
            <ShoppingCart />
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

export default connect((state) => state)(ShoppingCartScreen);
