import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import BecomeSeller from '~/components/partials/faqs/BecomeSeller';
import Meta from '~/components/shared/headers/Meta';

const BecomeASeller = () => {
    return (
        <PageContainer footer={<FooterDefault />} title="FAQ page">
            <div className="ps-page--singlee">
                <div className="container-faqs">
                    <Meta
                        title={"Sotuvchiga aylaning"}
                    />
                    <BecomeSeller />
                </div>
            </div>
        </PageContainer>
    );
};

export default BecomeASeller;

