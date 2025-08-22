import React from 'react';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import PageContainer from '~/components/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import ServicesFilterSection from '~/components/freeleance/services/ServicesFilterSection';
import ServicesCardSection from '~/components/freeleance/services/ServicesCardSection';

export default function SoffFreelancerPage({
    servicesData,
    parentCategory,
    childCategory,
    offset,
    limit,
}) {
    const router = useRouter();
    const currentPage = Math.floor(offset / limit) + 1; // hozirgi page

    const onChangePage = (page, pageSize) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                offset: (page - 1) * pageSize,
                limit: pageSize,
            },
        });
    };

    return (
        <PageContainer>
            <Meta title="Raqamli mahsulot buyurtma berish - Soff.uz" />

            <div className="ps-page--shop my-5 container p-xl-0 p-l-0">
                <ServicesFilterSection
                    parentCategory={parentCategory}
                    childCategory={childCategory}
                    count={servicesData?.total_service}
                />

                <ServicesCardSection services={servicesData} />

                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        current={currentPage}
                        pageSize={Number(limit)}
                        total={servicesData?.total_service || 0}
                        showSizeChanger
                        pageSizeOptions={['10', '20', '50']}
                        onChange={onChangePage}
                    />
                </div>
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const {
        category_id = '',
        parent_category_id = '',
        search = '',
        direction = '',
        limit = 20,
        offset = 0,
    } = query;

    const servicesQuery = new URLSearchParams({
        ...(category_id && { category_id }),
        ...(search && { search }),
        ...(direction && { direction }),
        limit,
        offset,
    });

    const servicesUrl = `${
        process.env.NEXT_PUBLIC_FREELEANCE_URL
    }/api/v1/customer?${servicesQuery.toString()}`;
    const parentCategoryUrl = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/categories/?direction=${query.direction}`;

    const [servicesRes, parentCategoryRes] = await Promise.all([
        fetch(servicesUrl),
        fetch(parentCategoryUrl),
    ]);

    const servicesData = servicesRes.ok ? await servicesRes.json() : null;
    const parentCategory = parentCategoryRes.ok
        ? await parentCategoryRes.json()
        : null;

    let childCategory = [];
    if (parent_category_id) {
        const childCategoryRes = await fetch(
            `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/categories?parent_id=${parent_category_id}`
        );
        childCategory = childCategoryRes.ok
            ? await childCategoryRes.json()
            : [];
    }

    return {
        props: {
            servicesData,
            parentCategory,
            childCategory,
            offset: Number(offset),
            limit: Number(limit),
        },
    };
}
