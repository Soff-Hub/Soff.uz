import React from 'react';
import AffiliateBenefitsSection from '~/components/elements/affiliate_program/AffiliateBenefitsSection';
import CreateLinkSection from '~/components/elements/affiliate_program/CreateLinkSection';
import HeroSection from '~/components/elements/affiliate_program/HeroSection';
import JoinSoffSection from '~/components/elements/affiliate_program/JoinSoffSection';
import PromoteOptionsSection from '~/components/elements/affiliate_program/PromoteOptionsSection';
import ThreeStepsSection from '~/components/elements/affiliate_program/ThreeStepsSection';
import PageLayout from '~/widgets/layouts/PageLayout';

const AffiliateProgram = () => {
    return (
        <PageLayout>
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

export default AffiliateProgram;
