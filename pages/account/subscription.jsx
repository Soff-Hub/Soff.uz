import React from 'react';
import BreadCrumb from '~/shared/ui/breadcrumb';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { MySubscription } from '~/features/platform-subscription';

const AccountSubscription = () => {
    const breadCrumb = [
        { text: 'Bosh sahifa', url: '/' },
        { text: 'Mening obunam' },
    ];
    return (
        <PageContainer>
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <Meta
                    title={'Mening obunam'}
                    description={'Soff.uz obunangizni boshqaring: limitlar, to‘lovlar va obuna orqali olingan fayllar.'}
                />
                <MySubscription />
            </div>
        </PageContainer>
    );
};

export default AccountSubscription;
