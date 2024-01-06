import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ProductRepository from '~/repositories/ProductRepository';
import { useRouter } from 'next/router';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import CatalogTop from '~/components/CatalogTop';


const ProductCategoryScreen = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [category, setCategory] = useState(null);

    async function getCategry() {
        const responseData = await ProductRepository.getCategoryParent();
        if (responseData?.length > 0) {
            if (responseData?.every((cat) => Number(cat.id) !== Number(slug))) {
                setchaildId(slug);
                setParentId(null)
            } else {
                setParentId(slug);
                setchaildId(null)
            }
            setCategory(responseData);
        }
    }


    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/main',
        },

        {
            text: ' Barcha Kategoriyalar',
        },
    ];
    return (
        <PageContainer
            footer={<FooterDefault />}
            title={category ? category.name : 'Kategoriya'}
            boxed={true}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                    <CatalogTop/>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default ProductCategoryScreen;
