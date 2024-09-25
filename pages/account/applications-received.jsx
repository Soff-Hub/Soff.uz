import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta'; 
import ApplicationsReceiveds from '~/components/partials/account/ApplicationsReceived';

const ApplicationsReceived = () => {

    return (
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Kelib tushgan arizalar"}
                    />
                    <ApplicationsReceiveds />
                </div>
            </PageContainer>
    )
}

export default ApplicationsReceived
