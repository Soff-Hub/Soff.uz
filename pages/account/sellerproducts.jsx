import React from 'react';
import MyProducts_listSeller from '~/components/partials/account/MyProducts_listSeller'
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';


const SellerProducts = () => {

    return (
        <PageContainer
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta
                    title={"Sotib olinganlar"}
                />
                <MyProducts_listSeller />
            </div>
        </PageContainer> 

    );
};

export default SellerProducts;
