import React from 'react';

import PageContainer from '~/components/layouts/PageContainer';

import HomeElectronicsPage from './home/electronic'

const HomepageDefaultPage = () => {
    return (
        <PageContainer title="Soff - barcha ma'lumotlar bazasi">
           <HomeElectronicsPage/>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
