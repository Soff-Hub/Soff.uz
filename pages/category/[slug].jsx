import React, { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import WidgetShopCategories from '~/components/shared/widgets/WidgetShopCategories';
import WidgetShopFilterByPriceRange from '~/components/shared/widgets/WidgetShopFilterByPriceRange';
import ProductRepository from '~/repositories/ProductRepository';
import { useRouter } from 'next/router';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

import ShopItems from '~/components/partials/shop/ShopItems';
import { baseUrl } from '~/repositories/Repository';

export default function ProductCategoryScreen({ category2 }) {
    const Router = useRouter();
    const { slug } = Router.query;
    const [category, setCategory] = useState(category2);
    const [filteredData, setFilteredData] = useState(null);

    const [chaildId, setchaildId] = useState(null);
    const [parentId, setParentId] = useState(null);

    const [count, setCount] = useState(null);
    const [nom, setNom] = useState('Kategoriyalar');
    // const [breadCrumbName, setBreadCrumb] = useState(null)

    async function getCategry() {
        const responseData = await ProductRepository.getCategoryParent();
        if (responseData?.length > 0) {
            if (responseData?.every((cat) => cat.slug !== slug)) {
                setchaildId(slug);
                setParentId(null)
            } else {
                setParentId(slug);
                setchaildId(null)
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
            console.log("-->", responseData);
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

        if (category?.length > 0) {
            for (let i = 0; i < category.length; i++) {
                if (category[i].id === Number(slug)) {
                    setNom(category[i].name);
                } else {
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
            text: nom,
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
                        <div className="ps-layout__left">
                            <WidgetShopCategories data={category} />
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
                            />
                        </div>
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};
export async function getServerSideProps(context) {
    const { slug } = context.params
    const res = await fetch(`${baseUrl}customer/parent-category-list/?category=${slug}`);
    const responseData = await res.json();
    console.log('customer/parent-category-list/');

    return {
        props: {
            category2: responseData,
        },
    };
}
