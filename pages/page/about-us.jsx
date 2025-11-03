import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import AboutContent from '~/components/partials/faqs/AboutContent';
import Meta from '~/components/shared/headers/Meta';

const AboutUs = () => {
    return (
        <PageContainer>
            <div className="ps-page--singlee">
                <div className="container-faqs">
                    <Meta
                        title={'Soff.uz nima?'}
                        description="Soff.uz - Sayti haqida shu sahifamizda to'liq bilib olishingiz mumkin"
                    />
                    <AboutContent />
                </div>
            </div>
        </PageContainer>
    );
};

export default AboutUs;
