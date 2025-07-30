import React from 'react'
import AffiliateBenefitsSection from '~/components/elements/affiliate_program/AffiliateBenefitsSection'
import AffiliateExplainSection from '~/components/elements/affiliate_program/AffiliateExplainSection'
import CreateLinkSection from '~/components/elements/affiliate_program/CreateLinkSection'
import HeroSection from '~/components/elements/affiliate_program/HeroSection'
import JoinSoffSection from '~/components/elements/affiliate_program/JoinSoffSection'
import PromoteOptionsSection from '~/components/elements/affiliate_program/PromoteOptionsSection'
import ThreeStepsSection from '~/components/elements/affiliate_program/ThreeStepsSection'
import WithSoffYouGet from '~/components/elements/affiliate_program/WithSoffYouGetSection'
import PageLayout from '~/components/layouts/PageLayout'

const AffiliateProgram = () => {
    return (
        <PageLayout>
            <div style={{background: '#00ba3f'}}>
                <HeroSection />
            </div>
            <CreateLinkSection />
            <ThreeStepsSection />
            <PromoteOptionsSection />
            <AffiliateBenefitsSection />
            <AffiliateExplainSection/>
            <WithSoffYouGet/>
            <div style={{background: '#00ba3f'}}>
                <JoinSoffSection />
            </div>
        </PageLayout>
    )
}

export default AffiliateProgram
