import React from 'react';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/components/shared/headers/Meta';
import ServicesFilterSection from '~/components/freeleance/services/ServicesFilterSection';
import ServicesCardSection from '~/components/freeleance/services/ServicesCardSection';
import GrayCard from '~/widgets/gray-card';

export default function SoffFreelancerPage({
    servicesData,
    parentCategory,
    childCategory,
    offset,
    limit,
}) {
    const router = useRouter();
    const currentPage = Math.floor(offset / limit) + 1;

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

                {servicesData.total_service != 0 && (
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
                )}
                {/* <GrayCard
                    title="Izlaganingiz yo’qmi? O'z buyurtmangizni joylashtiring!"
                    btn="Buyurtmar berish"
                    // link='https://t.me/soff_freelancing_bot'
                /> */}
                {/* <div className="servicesOrders" /> */}
            </div>
        </PageContainer>
    );
}

export async function getServerSideProps(context) {
    const { query } = context;
    const {
        category_id = '',
        search = '',
        direction = '',
        limit = 23,
        offset = 0,
    } = query;

    const fetchJson = async url => {
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            return await res.json();
        } catch {
            return null;
        }
    };

    const servicesQuery = new URLSearchParams({
        ...(category_id && { category_id }),
        ...(search && { search }),
        ...(direction && { direction }),
        limit,
        offset,
    });

    const servicesUrl = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/customer?${servicesQuery}`;
    const parentCategoryUrl = direction
        ? `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/categories/?direction=${direction}`
        : null;
    const childCategoryUrl = category_id
        ? `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/categories?parent_id=${category_id}`
        : null;

    const [servicesData, parentCategory, childCategory] = await Promise.all([
        fetchJson(servicesUrl),
        parentCategoryUrl ? fetchJson(parentCategoryUrl) : Promise.resolve([]),
        childCategoryUrl ? fetchJson(childCategoryUrl) : Promise.resolve([]),
    ]);

    return {
        props: {
            servicesData: servicesData || { results: [], total_service: 0 },
            parentCategory,
            childCategory,
            offset: Number(offset),
            limit: Number(limit),
        },
    };
}
