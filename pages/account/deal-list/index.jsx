import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import DealListPage from '~/components/partials/account/DealListPage';
import DealsList from '~/components/partials/account/DealsList';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

const DealList = () => {

    const router = useRouter()


    useEffect(() => {
        router.push(`/account/deal-list/list`)
    }, [])

    return <></>
};

export default DealList;
