import React from 'react';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';

const QuestionsPage = () => {



    return (
        <PageContainer footer={<FooterDefault />} title="FAQ page">
            <Meta
                title={"Savol-javoblar"}
                description="Saytdan foydalanish haqida to'liq qo'llanma bizning Savol-javoblar sahifamizda batafsil yoritib berilgan"
            />
            <div className="ps-page--singlee">
                <div className="container-faqs">
                </div>
            </div>
        </PageContainer>
    );
};

export default QuestionsPage;
