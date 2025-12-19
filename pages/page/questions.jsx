import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';

const QuestionsPage = () => {
    return (
        <PageContainer>
            <Meta
                title={'Savol-javoblar'}
                description="Saytdan foydalanish haqida to'liq qo'llanma bizning Savol-javoblar sahifamizda batafsil yoritib berilgan"
            />
            <div className="ps-page--singlee">
                <div className="container-faqs"></div>
            </div>
        </PageContainer>
    );
};

export default QuestionsPage;
