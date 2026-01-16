import React from 'react';
import MyProducts_listSeller from '~/features/account/ui/MyProducts_listSeller';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const SellerProducts = () => {
    const { t } = useTranslation('account');
    return (
        <>
            <Meta
                title={t('sellerProducts.title')}
                description={t('sellerProducts.description')}
            />
            <PageContainer>
                <div className="ps-page--my-account">
                    <MyProducts_listSeller />
                </div>
            </PageContainer>
        </>
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
                // 'product-pages',
                'modals',
            ])),
        },
    };
}

export default SellerProducts;
