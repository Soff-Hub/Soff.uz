import React from 'react';
import PageLayout from '~/widgets/layouts/PageLayout';
import Meta from '~/shared/ui/meta';
import { PricingPage } from '~/features/platform-subscription';

const Subscription = () => {
    return (
        <PageLayout>
            <Meta
                title={'Obuna'}
                description={
                    'Soff.uz obunasi: har oy turli sotuvchilarning fayllarini bitta oylik to‘lov bilan oling. Olingan fayl doim sizda qoladi.'
                }
            />
            <div className="container">
                <PricingPage />
            </div>
        </PageLayout>
    );
};

export default Subscription;
