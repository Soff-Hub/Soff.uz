import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import HomeElectronicsPage from './home/electronic'
import Meta from '~/components/shared/headers/Meta';
import { useMemo } from 'react';

const HomepageDefaultPage = ({ category }) => {
    const memoValue = useMemo(() => {
        return <HomeElectronicsPage category={category?.results} />
    }, [])
    return (
        <PageContainer title="Soff - barcha ma'lumotlar bazasi">
            <Meta title="Soff.uz" image="/static/img/soff/soff_green_white.png" />
            {memoValue}
        </PageContainer>
    );
};






export default HomepageDefaultPage;
