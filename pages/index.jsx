import React from 'react';

import PageContainer from '~/components/layouts/PageContainer';

import HomeElectronicsPage from './home/electronic'

const HomepageDefaultPage = () => {
    return (
        <PageContainer title="Alldata - online hujjatlar bazasi">
           <HomeElectronicsPage/>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
