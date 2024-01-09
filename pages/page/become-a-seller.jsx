import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import BecomeSeller from '~/components/partials/faqs/BecomeSeller';

const BecomeASeller = () => {
    return (
        <PageContainer footer={<FooterDefault />} title="FAQ page">
            <div className="ps-page--singlee">
                <div className="container-faqs">
                    <BecomeSeller/>
                </div>
            </div>
        </PageContainer>
    );
};

export default BecomeASeller;

