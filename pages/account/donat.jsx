import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import SiteDonateForm from '~/components/partials/seller/SiteDonateForm';

const Donat = () => {

    return <PageContainer>
        <div className="container my-5 ">
            <h2 className="text-center mb-5">
                Loyiha  rivoji uchun o'z hissangizni qo'shing
            </h2>

            <SiteDonateForm />

        </div>
    </PageContainer>
};

export default Donat;
