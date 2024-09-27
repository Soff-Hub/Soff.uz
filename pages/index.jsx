
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import Register from '~/components/partials/account/Register';

const HomepageDefaultPage = () => {
    const { push } = useRouter()

    useEffect(() => {
        push('/account/register')
    }, [])

    return (
        <div className="ps-page--my-account">
            <Register url={'auth/seller-register/'} />
        </div>
    );
};

export default HomepageDefaultPage;




