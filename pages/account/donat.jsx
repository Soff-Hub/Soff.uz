import React from 'react';
import PageContainer from '~/widgets/layouts/PageContainer';
import SiteDonateForm from '~/entities/seller/ui/SiteDonateForm';

const Donat = () => {
    return (
        <PageContainer title="Loyiha rivojiga hissa qo'shing">
            <div className="container my-5 ">
                <h2 className="text-center mb-5">
                    Loyiha rivoji uchun o'z hissangizni qo'shing
                </h2>

                <SiteDonateForm />
            </div>
        </PageContainer>
    );
};

export default Donat;
