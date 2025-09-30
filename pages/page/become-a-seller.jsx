import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import BecomeSeller from '~/components/partials/faqs/BecomeSeller';
import Meta from '~/components/shared/headers/Meta';

const BecomeASeller = () => {
    return (
        <PageContainer title="FAQ page">
            <div className="ps-page--singlee">
                <div className="container-faqs">
                    <Meta
                        title={"Sotuvchiga aylaning"}
                        description="Soff.uz - Saytimizda siz sotuvchi bo'lib ro'yxatdan o'tishingiz mumkin albatta"
                    />
                    <BecomeSeller />
                </div>
            </div>
        </PageContainer>
    );
};

export default BecomeASeller;

