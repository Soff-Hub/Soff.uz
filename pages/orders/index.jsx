import React from 'react';
import { Pagination } from 'antd';
import { useRouter } from 'next/router';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import ServicesFilterSection from '~/features/freelancers/services/ServicesFilterSection';
import ServicesCardSection from '~/features/freelancers/services/ServicesCardSection';
import { useGetDirectionsQuery } from '~/store/profile/slice';

const getTitleFromDirection = (directions, value) => {
    const direction = directions.find((dir) => dir.value === value);
    return direction ? direction.label : null;
};

const getTitleFromCategory = (categories, id) => {
    const category = categories.find((cat) => String(cat.id) === String(id));
    return category ? category.title : null;
};

export default function SoffFreelancerPage({
    servicesData,
    parentCategory,
    childCategory,
    offset,
    limit,
    direction,
    category_id,
    search,
}) {
    const router = useRouter();
    const { data: directionsData } = useGetDirectionsQuery();
    const directions = directionsData || [];
    const currentPage = Math.floor(offset / limit) + 1;

    const directionTitle = getTitleFromDirection(directions, direction);
    const categoryTitle = getTitleFromCategory(parentCategory, category_id);

    const fullTitle =
        // NOTE: It may conflict with search page SEO
        directionTitle && categoryTitle && search
            ? `"${search}" so'rovi bo'yicha xizmatlar - Soff.uz`
            : directionTitle && categoryTitle
                ? `${directionTitle} - ${categoryTitle} | Soff.uz`
                : directionTitle
                    ? `${directionTitle} - Soff.uz`
                    : 'Xizmatlarga buyurtma berish - Soff.uz';

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
            <Meta
                title={fullTitle}
                description={
                    'Soff.uz xizmatlar bo‘limida frilanserlar tomonidan taklif etilgan xizmatlarni toping. Dizayn, dasturlash, marketing va boshqa ko‘plab yo‘nalishlarda mutaxassislarni izlang.'
                }
            />

            <div className="ps-page--shop my-5 container">
                <ServicesFilterSection
                    parentCategory={parentCategory}
                    childCategory={childCategory}
                    directions={directions}
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

    const fetchJson = async (url) => {
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
            search,
            direction,
            category_id,
            servicesData: servicesData || { results: [], total_service: 0 },
            parentCategory,
            childCategory,
            offset: Number(offset),
            limit: Number(limit),
        },
    };
}
