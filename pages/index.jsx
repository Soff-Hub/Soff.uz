
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PageLoader from '~/components/elements/common/PageLoader';

const HomepageDefaultPage = () => {
    const { push } = useRouter()
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            push('/account/dashbord')
        } else {
            push('/account/register')
        }
    }, [user])

    return (
        <div className="ps-page--my-account">
            <PageLoader />
        </div>
    );
};

export default HomepageDefaultPage;




