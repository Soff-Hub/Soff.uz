import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import FormContent from '~/components/partials/faqs/FormContent';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const FormPage = () => {
    const { t } = useTranslation('form');
    
    return (
        <PageContainer>
            <Meta
                title={t('meta.title')}
                description={t('meta.description')}
            />
            <div className="container my-3" style={{ margin: '0 auto' }}>
                <FormContent />
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
                'form',
                'modals',
            ])),
        },
    };
}

export default FormPage;
