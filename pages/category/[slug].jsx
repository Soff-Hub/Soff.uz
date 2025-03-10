import React, { useEffect, useState } from 'react';

import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
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
             
            </div>
        </PageContainer>
    );
};
// export async function getServerSideProps(context) {
//     const { slug } = context.params
//     const res = await fetch(`${baseUrl}customer/parent-category-list/?category=${slug}`);
//     const responseData = await res.json();

//     return {
//         props: {
//             category2: responseData,
//         },
//     };
// }
