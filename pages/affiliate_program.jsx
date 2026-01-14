import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Meta from '~/shared/ui/meta';
import AffiliateBenefitsSection from '~/features/affiliate/ui/AffiliateBenefitsSection';
import CreateLinkSection from '~/features/affiliate/ui/CreateLinkSection';
import HeroSection from '~/features/affiliate/ui/HeroSection';
import JoinSoffSection from '~/features/affiliate/ui/JoinSoffSection';
import PromoteOptionsSection from '~/features/affiliate/ui/PromoteOptionsSection';
import ThreeStepsSection from '~/features/affiliate/ui/ThreeStepsSection';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const AffiliateProgram = () => {
    const { t } = useTranslation('affiliate');
    return (
        <PageLayout>
            <Meta title={t('meta.title')} description={t('meta.description')} />
            <div id="link" style={{ background: '#00ba3f' }}>
                <HeroSection />
            </div>
            <CreateLinkSection />
            <ThreeStepsSection />
            <PromoteOptionsSection />
            <AffiliateBenefitsSection />
            <div style={{ background: '#00ba3f' }}>
                <JoinSoffSection />
            </div>
        </PageLayout>
    );
};

export async function getServerSideProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'header',
                'footer',
                'common',
                'affiliate',
                'modals',
            ])),
        },
    };
}

export default AffiliateProgram;
