import React from 'react';
import AffiliateBenefitsSection from '~/features/affiliate/ui/AffiliateBenefitsSection';
import CreateLinkSection from '~/features/affiliate/ui/CreateLinkSection';
import HeroSection from '~/features/affiliate/ui/HeroSection';
import JoinSoffSection from '~/features/affiliate/ui/JoinSoffSection';
import PromoteOptionsSection from '~/features/affiliate/ui/PromoteOptionsSection';
import ThreeStepsSection from '~/features/affiliate/ui/ThreeStepsSection';
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
