import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PageLoader from '~/components/elements/common/PageLoader';

const Selection = () => {
    const router = useRouter()

    useEffect(() => {
        router.push('/account/register')
    }, [])

    return <PageLoader />
};

export default Selection;
