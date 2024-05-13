import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';

import HomeElectronicsPage from './home/electronic'
import Meta from '~/components/shared/headers/Meta';
import { useMemo } from 'react';
import NewSearchHomePages from './home/newSearchHomePages';

const HomepageDefaultPage = () => {

    const memoValue = useMemo(() => {
        return (
            <NewSearchHomePages/>
        // <HomeElectronicsPage/>
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
