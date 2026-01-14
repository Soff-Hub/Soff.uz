import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const QuestionsPage = () => {
    const { t } = useTranslation('questions');
    
    return (
        <PageContainer>
            <Meta
                title={t('meta.title')}
                description={t('meta.description')}
            />
            <div className="ps-page--singlee">
                <div className="container-faqs"></div>
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
                'questions',
                'modals',
            ])),
        },
    };
}

export default QuestionsPage;
