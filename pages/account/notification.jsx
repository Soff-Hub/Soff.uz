import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import NotificationList from '~/components/partials/account/NotificationList';

const Notification = () => {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Yangiliklar',
        },
    ];
    return (
            <PageContainer footer={<FooterDefault />} title="Notifications">
                <div className="ps-page--my-account">
                    <Meta
                        title={"Soff | Yangiliklar"}
                    />
                    <BreadCrumb breacrumb={breadCrumb} />
                    <NotificationList />
                </div>
            </PageContainer> 

    );
};

export default Notification;
