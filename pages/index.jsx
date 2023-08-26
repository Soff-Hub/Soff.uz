import React from 'react';

import PageContainer from '~/components/layouts/PageContainer';

import HomeElectronicsPage from './home/electronic'
import RoleChecker from '~/components/partials/account/modules/AccountLinks';

const HomepageDefaultPage = () => {
    return (
        <PageContainer title="Alldata - online hujjatlar bazasi">
            <RoleChecker/>
           <HomeElectronicsPage/>
        </PageContainer>
    );
};

export default HomepageDefaultPage;
