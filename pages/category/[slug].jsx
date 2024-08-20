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
import Meta from '~/components/shared/headers/Meta';

export default function ProductCategoryScreen({ category2 }) {
    const Router = useRouter();
    const { slug } = Router.query;
    const [filteredData, setFilteredData] = useState(null);

    const [chaildId, setchaildId] = useState(null);
    const [parentId, setParentId] = useState(null);

    const [count, setCount] = useState(null);
    const [nom, setNom] = useState('Kategoriyalar');
    const [defVal, setDefVal] = useState(null);
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    async function getCategry() {
        const responseData = await ProductRepository.getCategoryParent();
        if (category2?.length > 0) {
            if (category2?.every((cat) => cat.slug !== slug)) {
                setchaildId(slug);
                setParentId(null)
            } else {
                setParentId(slug);
                setchaildId(null)
            }
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
            setDefVal([responseData?.min_price, responseData?.max_price]);
            setMax(responseData?.max_price);
            setMin(responseData?.min_price);
        }
        setCount(responseData?.count || 0);
        setchaildId(null);
    }

    async function getParentData(parentID) {
        setchaildId(null);
        setParentId(null);
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
            setDefVal([responseData?.min_price, responseData?.max_price]);
            setMax(responseData?.max_price);
            setMin(responseData?.min_price);
        
        }
        setCount(responseData?.count || 0);
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

        if (category2?.length > 0) {
            for (let i = 0; i < category2.length; i++) {
                if (category2[i].slug === slug) {
                    setNom(category2[i].name);
                } else {
                    for (let j = 0; j < category2[i]?.children?.length; j++) {
                        if (category2[i]?.children[j].id === Number(slug)) {
                            setNom(category2[i]?.children[j].name);
                        }
                    }
                }
            }
        }
    }, [slug, parentId, chaildId]);

    useEffect(() => {
        if (min !== null && max !== null) {
            setDefVal([min, max]);
        }
    }, [min, max]);


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
            title={category2 ? nom : 'Kategoriya'}
            boxed={true}>
            <Meta
                title={`${nom}`}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning ${nom} kategoriyasida topdik`}
            />
            <div className="ps-page--shop">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="ps-layout--shop ps-shop--category">
                        <div className="ps-layout__left">
                            <WidgetShopCategories data={category2} />
                            <WidgetShopFilterByPriceRange
                                setFilteredData={setFilteredData}
                                chaildId={chaildId}
                                parentId={parentId}
                                categoryData={category2 || []}
                                setCount={setCount}
                                defVal={defVal}
                                min={min}
                                max={max}
                                setDefVal={setDefVal}
                                setMax={setMax}
                                setMin={setMin}
                            />
                        </div>
                        <div className="ps-layout__right">
                            <ShopItems
                                data={filteredData}
                                columns={4}
                                pageSize={36}
                                dataCount={count}
                                setDataCount={setCount}
                                categoryData={category2 || []}
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

    return {
        props: {
            category2: responseData,
        },
    };
}
