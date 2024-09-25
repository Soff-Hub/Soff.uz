
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import Register from '~/components/partials/account/Register';

const HomepageDefaultPage = () => {
    const { push } = useRouter()

    useEffect(() => {
        push('/account/register')
    }, [])

    return (
        <PageContainer title="Soff Seller">
            <div className="ps-page--my-account">
                <Register url={'auth/seller-register/'} />
            </div>
        </PageContainer>
    );
};

export default HomepageDefaultPage;




