
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import PageLoader from '~/components/elements/common/PageLoader';
import Loader from './loader';

const HomepageDefaultPage = () => {
    const { push } = useRouter()

    useEffect(() => {
        push('/account/register')
    }, []);

    return (
        <div className="ps-page--my-account">
            <div className="continer">
                <PageLoader />
                <Loader />
            </div>
        </div>
    );
};

export default HomepageDefaultPage;




