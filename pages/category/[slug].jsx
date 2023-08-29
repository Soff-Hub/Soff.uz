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

    // console.log('category id', slug);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [detail_arr, setDetail_arr] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [obj, setObj] = useState({});
    async function getCategry() {
        const responseData = await ProductRepository.getRelatedProduct(slug);
        if (responseData) {
            // console.log(`${slug} id li malumotlar`, responseData);
            setCategory(responseData);
        }
    }

    async function getCategoryData(params) {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData) {
            setCategory(responseData);
            let arr = responseData.find((item) => item.id == Number(slug));
            setTimeout(() => {
                setDetail_arr(arr?.promotional_sliders);
            }, 5000)


            setFilteredData(arr?.promotional_sliders)
            setObj(arr);
        }
    }

    useEffect(() => {
        getCategry();

        getCategoryData();
    }, [slug]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },


        {
            text: obj ? obj.name : 'Product category',
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
                            <WidgetShopCategories data={category} />
                            <WidgetShopFilterByPriceRange
                                data={detail_arr}
                                setFilteredData={setFilteredData}
                            />
                        </div>
                        <div className="ps-layout__right">
                            <ShopItems
                                data={filteredData}

                                columns={4}

                                pageSize={8}


                            />
                            {/* <h3 className="ps-shop__heading">
                                {category && category.name}
                            </h3>
                            {productItemsViews} */}
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default ProductCategoryScreen;
