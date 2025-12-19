import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import AboutContent from '~/components/partials/faqs/AboutContent';
import Meta from '~/shared/ui/meta';

const AboutUs = () => {
    return (
        <PageContainer>
            <Meta
                title={'Soff.uz nima?'}
                description="Soff.uz - Sayti haqida shu sahifamizda to'liq bilib olishingiz mumkin"
            />
            <AboutContent />
        </PageContainer>
    );
};

export default AboutUs;
