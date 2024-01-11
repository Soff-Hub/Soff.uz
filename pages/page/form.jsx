import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FormContent from '~/components/partials/faqs/FormContent';
import Meta from '~/components/shared/headers/Meta';

const FormPage = () => {
    return (
        <PageContainer title="FAQ">
            <Meta
                title={"Soff | Savollaringiz bormi?"}
            />
            <div className='container-faqs ms-lg-5 ms-md-3' style={{ margin: '0 auto' }}>
                <FormContent />
            </div>
        </PageContainer>
    );
};

export default FormPage;
