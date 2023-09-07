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
    const [chaildId, setchaildId] = useState(null);
    const [parentId, setParentId] = useState('');
    async function getCategry() {
        const responseData = await ProductRepository.getRelatedProduct(slug);
        if (responseData) {
            setCategory(responseData);
            setFilteredData(responseData);
            console.log('default data', responseData);
        }
    }
    // async function getParentDefaultData() {
    //     const responseData = await ProductRepository.getRelatedProduct(slug);
    //     if (responseData) {
    //         console.log('ota categoriya ichidagilar', responseData);
    //         setCategory(responseData);
    //         setFilteredData(responseData);
    //     }
    // }

    async function getChaildData(id) {
        setFilteredData(null);
        const responseData = await ProductRepository.getCategoriesChaild(id);
        if (responseData) {
            console.log('respons chaild data', responseData);
            setFilteredData(responseData);
        }

        setchaildId(null);
    }

    async function getParentData(id) {
        setFilteredData(null);
        const responseData = await ProductRepository.getDocumnetsParentData(id);
        if (responseData) {
            setFilteredData(responseData);
        }
        setParentId(null);
    }

    
    useEffect(() => {
        getParentData(slug);
        if (chaildId) {
            getChaildData(slug);
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
                                data={filteredData}
                                setFilteredData={setFilteredData}
                            />
                        </div>
                        <div className="ps-layout__right">
                            <ShopItems
                                data={filteredData}
                                columns={4}
                                pageSize={8}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default ProductCategoryScreen;
