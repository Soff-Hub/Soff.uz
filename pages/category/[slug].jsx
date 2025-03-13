import React, { useEffect, useState } from 'react';

import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';

// import ShopItems from '~/components/partials/shop/ShopItems';
import { baseUrl } from '~/repositories/Repository';
import Meta from '~/components/shared/headers/Meta';

export default function ProductCategoryScreen() {

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={"category2" ? "nom" : 'Kategoriya'}
            boxed={true}>
            <Meta
                title={`nom`}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning  kategoriyasida topdik`}
            />
            <div className="ps-page--shop">
                {/* <BreadCrumb breacrumb={breadCrumb} /> */}
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
                            {/* <ShopItems
                                data={filteredData}
                                columns={4}
                                pageSize={36}
                                dataCount={count}
                                setDataCount={setCount}
                                categoryData={category2 || []}
                            /> */}
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
