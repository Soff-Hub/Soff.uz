import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import BecomeSeller from '~/components/partials/faqs/BecomeSeller';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BecomeASeller = () => {
    const { t } = useTranslation('become-a-seller');
    
    return (
        <PageContainer>
            <div className="ps-page--singlee">
                <div className="container-faqs">
                    <Meta
                        title={t('meta.title')}
                        description={t('meta.description')}
                    />
                    <BecomeSeller />
                </div>
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
                'become-a-seller',
                'modals',
            ])),
        },
    };
}

export default BecomeASeller;
