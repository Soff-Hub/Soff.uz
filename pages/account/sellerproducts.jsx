import React from 'react';

import BreadCrumb from '~/components/elements/BreadCrumb';
// import MyProducts_listSeller from '~/components/partials/account/MyProducts_listSeller'
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';


const SellerProducts = () => {

    return (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta
                    title={"Sotib olinganlar"}
                />
                {/*<MyProducts_listSeller />*/}
            </div>
        </PageContainer>

    );
};

export default SellerProducts;
