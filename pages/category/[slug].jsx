import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepository';
import { useRouter } from 'next/router';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

import ShopItems from '~/components/partials/shop/ShopItems';

const ProductCategoryScreen = () => {
    const Router = useRouter();
    const { slug } = Router.query;
    const [category, setCategory] = useState(null);
    const [filteredData, setFilteredData] = useState(null);

    const [chaildId, setchaildId] = useState(null);
    const [parentId, setParentId] = useState(null);

    const [count, setCount] = useState(null);
    const [nom, setNom] = useState('Kategoriyalar');

    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    async function getCategry() {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData?.length > 0) {
            if (responseData?.every((cat) => Number(cat.id) !== Number(slug))) {
                setchaildId(slug);
            } else {
                setParentId(slug);
            }

            setCategory(responseData);
        }
    }

    async function getChaildData(chaildID) {
        setParentId(null);
        setFilteredData(null);
        const responseData = await ProductRepository.getFilderProduct(
            1,
            chaildID,
            null,
            null,
            null,
            null,
            null,
            null,
            null
        );
        if (responseData) {
            setFilteredData(responseData?.results);
            setCount(responseData.count);
        }
        setchaildId(null);
    }

    async function getParentData(parentID) {
        setchaildId(null);
        setFilteredData(null);
        const responseData = await ProductRepository.getFilderProduct(
            1,
            null,
            parentID,
            null,
            null,
            null,
            null,
            null,
            null
        );
        if (responseData) {
            setFilteredData(responseData?.results);
            setMin(responseData?.min_price);
            setMax(responseData?.max_price);
            setCount(responseData.count);
        }
        setParentId(null);
    }

    useEffect(() => {
        getCategry();
    }, [slug]);

    useEffect(() => {
        if (chaildId) {
            getChaildData(slug);
        }

        if (parentId) {
            getParentData(slug);
        }

        if (category?.length) {
            for (let i = 0; i < category.length; i++) {
                if (category[i].id === Number(slug)) {
                    setNom(category[i].name);
                } else if (category[i]?.children?.length > 0) {
                    for (let j = 0; j < category[i]?.children?.length; j++) {
                        if (category[i]?.children[j].id === Number(slug)) {
                            setNom(category[i]?.children[j].name);
                        }
                    }
                }
            }
        }
    }, [slug, parentId, chaildId]);

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },

        {
            text: `${nom}`,
        },
    ];


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
                            />
                            <WidgetShopFilterByPriceRange
                                setFilteredData={setFilteredData}
                                chaildId={chaildId}
                                parentId={parentId}
                            />
                        </div>
                        <div className="ps-layout__right">
                            <ShopItems
                                data={filteredData}
                                columns={4}
                                pageSize={16}
                                dataCount={count}
                                setDataCount={setCount}
                                chaildId={chaildId}
                                parentId={parentId}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export default ProductCategoryScreen;
