import React, { useEffect, useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';

export default function ProductCategoryScreen({ category2 }) {

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Kategoriya'}
            boxed={true}>
            <Meta
                title={`${"asdf"}`}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
            />
            <div className="ps-page--shop">

            </div>
            
        </PageContainer>
    );
};