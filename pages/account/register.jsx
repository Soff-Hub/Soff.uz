import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
import Register from '~/components/partials/account/Register';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

const RegisterPage = () => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: "Ro'yxatdan o'tish",
        },
    ];

    const sallerEndPoint = 'auth/seller-register/';

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Register">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Register url={sallerEndPoint} />
                </div>
            </PageContainer>
        </>
    );
};

export default RegisterPage;
