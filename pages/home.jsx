import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import { useMemo } from 'react';
import HomeElectronicsPage from '~/pages/home_pages/electronic';

const HomepageDefaultPage = () => {

    const memoValue = useMemo(() => {
        return (
            <HomeElectronicsPage />
        )
    }, [])

    return (
        <PageContainer title="Soff - barcha ma'lumotlar bazasi">
            <Meta title="Soff - barcha ma'lumotlar bazasi" image="/static/img/soff/soff_green_white.png" />
            {memoValue}
        </PageContainer>
    );
};

export default HomepageDefaultPage;