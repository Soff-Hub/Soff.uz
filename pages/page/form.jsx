import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FormContent from '~/components/partials/faqs/FormContent';

const FormPage = () => {
    return (
        <PageContainer  title="FAQ">
            <div className='container-faqs mt-4'>

                   <FormContent/>
            </div>
        </PageContainer>
    );
};

export default FormPage;
