import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import NotificationList from '~/components/partials/account/NotificationList';

const Notification = () => {
    const breadCrumb = [
        {
            text: 'Bosh sahifa',
            url: '/',
        },
        {
            text: 'Yangiliklar',
        },
    ];
    return (
        <PageContainer>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Meta
                    title={'Yangiliklar'}
                    description={
                        'Soff.uz bildirishnomalar sahifasida sizga tegishli barcha yangiliklar, buyurtmalar, xabarlar va tizim ogohlantirishlarini ko‘rib chiqing.'
                    }
                />
                <NotificationList />
            </div>
        </PageContainer>
    );
};

export default Notification;
