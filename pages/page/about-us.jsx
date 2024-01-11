import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import AboutContent from '~/components/partials/faqs/AboutContent';
import Meta from '~/components/shared/headers/Meta';

const AboutUs = () => {
    return (
        <PageContainer footer={<FooterDefault />} title="FAQ page">
            <div className="ps-page--singlee">
                <div className="container-faqs">
                    <Meta
                        title={"Soff | Soff.uz nima?"}
                    />
                    <AboutContent />
                </div>
            </div>
        </PageContainer>
    );
};

export default AboutUs;

