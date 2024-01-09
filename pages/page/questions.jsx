import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import FaqsContent from '~/components/partials/faqs/FaqsContent';

const QuestionsPage = () => {

    

    return (
        <PageContainer footer={<FooterDefault />} title="FAQ page">
            <div className="ps-page--singlee">
                <div className="container-faqs">
                    <FaqsContent/>
                </div>
            </div>
        </PageContainer>
    );
};

export default QuestionsPage;
