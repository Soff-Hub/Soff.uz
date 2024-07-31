import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import CatalogTop from '~/components/CatalogTop';
import Meta from '~/components/shared/headers/Meta';


const ProductCategoryScreen = () => {

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },

        {
            text: ' Barcha Kategoriyalar',
        },
    ];

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Kategoriya'}
            boxed={true}>
            <div className="ps-page--shop">
                <Meta
                    title={`Ayni vaqtdagi eng yaxshi kategoriyalar`}
                    description={`Saytimizdagi eng sotuvi avjida bo'lgan kategoriyalardan biri⚡`}
                />
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                        <CatalogTop />
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default ProductCategoryScreen;
