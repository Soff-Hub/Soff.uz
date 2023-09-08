import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopBrands from '~/components/shared/widgets/WidgetShopBrands';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepository';
import { useRouter } from 'next/router';
import ProductItems from '~/components/partials/product/ProductItems';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

import ShopItems from '~/components/partials/shop/ShopItems';

const ProductCategoryScreen = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detail_arr, setDetail_arr] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [chaildId, setchaildId] = useState(!true);
    const [parentId, setParentId] = useState(true);
    const [count, setCount] = useState(null);
    async function getCategry() {
        const responseData = await ProductRepository.getFilderProduct(1, null, slug, null, null);
        if (responseData) {
            setCategory(responseData?.results);
            setFilteredData(responseData?.results);
            console.log('default data', responseData?.results);
        }
    }

    async function getChaildData(chaildID) {
        setParentId(null);
        setFilteredData(null);
        const responseData = await ProductRepository.getFilderProduct(1, chaildID, null, null, null);
        if (responseData) {
            console.log('respons chaild data', responseData?.results);
            setFilteredData(responseData?.results);
            setCount(responseData.count)
        }

    }

    async function getParentData(parentID) {
        setchaildId(null);
        setFilteredData(null);
        const responseData = await ProductRepository.getFilderProduct(1, null, parentID, null, null);
        if (responseData) {
            setFilteredData(responseData?.results);
            setCount(responseData.count)
        }
    }

    
    useEffect(() => {
        if (chaildId) {
            getChaildData(slug);
        }

        if (parentId) {
            getParentData(slug);
        }
    }, [slug]);


    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },

        {
            text: 'Product category',
        },
    ];
    //Views
    let productItemsViews;

    if (!loading) {
        if (category && category.length > 0) {
            productItemsViews = (
                <ProductItems columns={4} products={category} />
            );
        } else {
            productItemsViews = <p>No Product found</p>;
        }
    } else {
        productItemsViews = <p>Loading...</p>;
    }


    return (
        <PageContainer
            footer={<FooterDefault />}
            title={category ? category.name : 'Category'}
            boxed={true}>
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            <WidgetShopCategories
                                data={category}
                                setchaildId={setchaildId}
                                setParentId={(id) => getParentData(id)}
                            />
                            <WidgetShopFilterByPriceRange
                            // data={filteredData}
                                setFilteredData={setFilteredData}
                            />
                        </div>
                        <div className="ps-layout__right">
                            <ShopItems
                                data={filteredData}
                                columns={4}
                                pageSize={16}
                                dataCount={count}
                                setDataCount={setCount}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default ProductCategoryScreen;
