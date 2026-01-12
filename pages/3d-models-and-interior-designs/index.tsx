import React from 'react';
import { useRouter } from 'next/router';
import PageContainer from '~/widgets/layouts/PageContainer';
import Meta from '~/shared/ui/meta';
import { baseUrlUseApi } from '~/repositories/useApi';
import ProductFilterSection from '~/components/elements/product-filter-section/ProductFilterSection';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import { useFilteredProducts } from '~/shared/hooks/useFilteredProducts';
import { fetchJsonSafely } from '~/shared/api/fetch-json';

const type = '3d';
const defaultTitle = '3D moddellar va Interier dizaynlar';

const meta = {
    title: '3D Modellar va Interyer Dizaynlari',
    image: 'https://soff.uz/static/img/3D-moddellar-va-Interier-dizaynlar-2.png',
    description:
        'Bu sahifa dizaynerlar, arxitektorlar va 3D model mutaxassislari uchun. Bu yerda 3D modellar, interyer dizaynlari va vizualizatsiyalarni topish mumkin.',
    keywords: ['3D', '3D modellar', 'Interyer dizaynlari'].map((name) => ({
        name,
    })),
    author: 'Soff.uz',
};

type ThreeDModelsAndInteriorDesignsProps = {
    productsData: any;
    fourChildData: any;
};

export default function ThreeDModelsAndInteriorDesigns({
    productsData,
    fourChildData,
}: ThreeDModelsAndInteriorDesignsProps) {
    const router = useRouter();

    const { productsData: filteredData, isLoading } = useFilteredProducts({
        direction: type,
        defaultData: productsData,
        fourChildData: fourChildData,
    });

    const page = router.query.page || 1;

    const handlePageChange = (newPage: number) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, page: newPage },
            },
            undefined,
            { shallow: true }
        );
    };

    return (
        <PageContainer>
            <Meta {...meta} />

            <ProductFilterSection
                title={defaultTitle}
                child={[]}
                parent={fourChildData?.results || []}
                path={'/3d-models-and-interior-designs/'}
            />
            <div className="ps-page--shop container p-xl-0 p-l-0">
                <ProductsByCategory
                    data={filteredData}
                    page={page}
                    handlePagination={(number: number) => {
                        handlePageChange(number);
                    }}
                    isLoading={isLoading}
                />
            </div>
        </PageContainer>
    );
}

export async function getStaticProps() {
    const queryParams = new URLSearchParams({
        direction: type,
        page: '1',
        page_size: '50',
    });

    const productsUrl = `${baseUrlUseApi}customer/products/?${queryParams.toString()}`;
    const fourChildUrl = `${baseUrlUseApi}customer/four-child?direction=${type}`;

    const [productsData, fourChildData] = await Promise.all([
        fetchJsonSafely(productsUrl),
        fetchJsonSafely(fourChildUrl),
    ]);

    if (!productsData) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            productsData,
            fourChildData,
        },
        revalidate: 300,
    };
}
