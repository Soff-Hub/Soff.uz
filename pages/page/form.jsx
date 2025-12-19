import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import FormContent from '~/components/partials/faqs/FormContent';
import Meta from '~/shared/ui/meta';

const FormPage = () => {
    return (
        <PageContainer>
            <Meta
                title={'Savollaringiz bormi?'}
                description="Soff.uz - Sayti haqida shu sahifamizda to'liq bilib olishingiz mumkin"
            />
            <div className="container my-3" style={{ margin: '0 auto' }}>
                <FormContent />
            </div>
        </PageContainer>
    );
};

export default FormPage;
