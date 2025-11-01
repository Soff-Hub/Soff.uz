import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import FormContent from '~/components/partials/faqs/FormContent';
import Meta from '~/components/shared/headers/Meta';

const FormPage = () => {
    return (
        <PageContainer title="Savollaringiz bormi? (FAQ)">
            <Meta
                title={'Savollaringiz bormi?'}
                description="Soff.uz - Sayti haqida shu sahifamizda to'liq bilib olishingiz mumkin"
            />
            <div
                className="container-faqs ms-lg-5 ms-md-3"
                style={{ margin: '0 auto' }}>
                <FormContent />
            </div>
        </PageContainer>
    );
};

export default FormPage;
