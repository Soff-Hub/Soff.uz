import React from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import { useRouter } from 'next/router';
import useApi, { baseUrlUseApi } from '~/repositories/useApi';
import ProductsByDesignDevelopment from '~/components/partials/category/ProductsByDesignDevelopment';
import FooterComponents from '~/components/blocks/footer/FooterComponents';
import DesignDevelopmentsFilterSection from '~/components/elements/DesignDevelopmentsFilterSection';

export default function DesignDevelopments () {

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Kategoriya'}
            boxed={true}>
            <Meta
                title={`${'asdf'}`}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
            />

            <div className='ps-page--shop container p-xl-0 p-l-0'>
                <DesignDevelopmentsFilterSection
                    breacrumb={fourChildData}
                    count={data?.count}
                    isLoading={isFourChildLoading}
                    childCategoryData={childCategoryData}
                />
                <ProductsByDesignDevelopment
                    data={data}
                    page={page}
                    handlePagination={number => {
                        handlePageChange(number);
                    }}
                    isLoading={isLoading}
                />
            </div>
            <FooterComponents />
        </PageContainer>
    );
}
