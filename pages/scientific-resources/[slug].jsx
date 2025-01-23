import React, { useEffect, useState } from 'react';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Meta from '~/components/shared/headers/Meta';
import ProductRepository from '~/repositories/ProductRepository';
import ProductsByCategory from '~/components/partials/category/ProductsByCategory';
import Link from 'next/link';
import { useRouter } from 'next/router';
import BreadCrumbCategories from '~/components/elements/BreadCrumbCategories';
import { Skeleton } from 'antd';

export default function ProductCategoryScreen () {
    const [data, setData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [page, setPage] = useState(1);
    const [loadingProducts, setLoadingProducts] = useState(false);
    const router = useRouter();
    const { slug } = router.query;

    async function getProductsByCategoryName () {
        setLoadingProducts(true);
        const responseData = await ProductRepository.getCustomerProducts(
            'file',
            page,
            48,
            slug
        );
        responseData && setData(responseData);
        setLoadingProducts(false);
        console.log('data=>', data);
    }

    const getCategories = async () => {
        const res = await ProductRepository.getMoreTopCategorys();
        res && setCategoryData(res.results);
    };

    useEffect(() => {
        getProductsByCategoryName();
    }, [page, slug]);

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <PageContainer
            footer={<FooterDefault />}
            title={'Kategoriya'}
            boxed={true}>
            <Meta
                title={`${'asdf'}`}
                description={`Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`}
            />
            <div className='ps-page--shop container'>
                <div className='nav-menu-cards d-flex align-items-center justify-content-center flex-wrap gap-3 mt-3'>
                    {categoryData.length > 0 ? (
                        categoryData.map(e => {
                            return (
                                <Link
                                    href='/scientific-resources/[slug]'
                                    as={`/scientific-resources/${
                                        slug == e.slug ? 'all' : e.slug
                                    }`}>
                                    <a
                                        className={`categoryMenuCard ${
                                            slug == e.slug &&
                                            'categoryMenuCardActive'
                                        } bg--white d-flex align-items-center gap-3 border  border-secondary-subtle rounded-2 p-2`}>
                                        <img
                                            className=' rounded-2'
                                            src={e.image}
                                            alt={e.name}
                                            height={25}
                                        />
                                        <span className=''>{e.name}</span>

                                        <svg
                                            height='24'
                                            width='24'
                                            viewBox='0 0 24 24'
                                            fill='#fff'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M18.3002 5.70997C17.9102 5.31997 17.2802 5.31997 16.8902 5.70997L12.0002 10.59L7.11022 5.69997C6.72022 5.30997 6.09021 5.30997 5.70021 5.69997C5.31021 6.08997 5.31021 6.71997 5.70021 7.10997L10.5902 12L5.70021 16.89C5.31021 17.28 5.31021 17.91 5.70021 18.3C6.09021 18.69 6.72022 18.69 7.11022 18.3L12.0002 13.41L16.8902 18.3C17.2802 18.69 17.9102 18.69 18.3002 18.3C18.6902 17.91 18.6902 17.28 18.3002 16.89L13.4102 12L18.3002 7.10997C18.6802 6.72997 18.6802 6.08997 18.3002 5.70997Z'
                                                class={`fillable d-none ${
                                                    slug == e.slug && 'd-block'
                                                } `}></path>
                                        </svg>
                                    </a>
                                </Link>
                            );
                        })
                    ) : (
                        <div className={`product-list p-loading`}>
                            {Array(15)
                                .fill(0)
                                .map((d, i) => (
                                    <Skeleton.Node
                                        key={i}
                                        active
                                        className={`skeletion-card small-card`}
                                    />
                                ))}
                        </div>
                    )}
                </div>

                <BreadCrumbCategories
                    breacrumb={categoryData}
                    count={data?.count}
                    loading={loadingProducts}
                />
            </div>
            <ProductsByCategory
                data={data}
                loading={loadingProducts}
                page={page}
                handlePagination={number => {
                    setPage(number);
                }}
            />
        </PageContainer>
    );
}
