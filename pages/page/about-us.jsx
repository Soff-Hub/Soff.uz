import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import AboutContent from '~/components/partials/faqs/AboutContent';
import Meta from '~/shared/ui/meta';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AboutUs = () => {
    const { t } = useTranslation('about-us');
    
    return (
        <PageContainer>
            <Meta
                title={t('meta.title')}
                description={t('meta.description')}
            />
            <AboutContent />
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
                'about-us',
                'modals',
            ])),
        },
    };
}

export default AboutUs;
