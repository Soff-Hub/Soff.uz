import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';
import { Select, Skeleton } from 'antd';
const Option = Select.Option;

const ThreeDCategoriesFilterSecion = ({ breacrumb, count, isLoading, childCategoryData }) => {
    const [expanded, setExpanded] = useState(false);

    const router = useRouter();

    // router.isReady yuklanmaguncha null qaytarish
    if (!router.isReady) return null;

    const { slug, parentCategory, childCategory } = router.query;

    const subCategory = expanded ? childCategoryData?.results : childCategoryData?.results.slice(0, 20) || null;

    return (
        <div>
            <div className='d-lg-none d-block mt-5'>
                <div className='d-flex gap-3 justify-content-between'>
                    <Select
                        onChange={(value) => {
                            {
                                router.push({
                                    pathname: `/3d-models-and-interior-designs/${value}`,
                                    query: { parentCategory: value } // query parametrini qo'shish
                                })
                            }
                        }}
                        defaultValue={parentCategory || 'all'}
                        style={{
                            height: "42px",
                            flex: 1,
                        }}
                    >
                        <Option key={'all'} value={'all'}><i className="fa-solid fa-list mr-2"></i> Barchasi</Option>
                        {breacrumb?.results?.map((item, index) => {
                            return (
                                <Option key={item.slug} value={item.slug}>
                                    <img
                                        className='rounded-2 me-2'
                                        src={item.image}
                                        alt={item.name}
                                        width={25}
                                    />
                                    {item.name}
                                </Option>
                            )
                        })}
                    </Select>
                    {
                        subCategory &&
                        <Select
                            onChange={(value) => {
                                {
                                    router.push({
                                        pathname: "/3d-models-and-interior-designs/[slug]",
                                        query: {
                                            ...router.query,
                                            slug: value,
                                            page: 1,
                                            childCategory: value
                                        }
                                    })
                                }
                            }}
                            defaultValue={childCategory ? childCategory : 'all'}
                            style={{
                                height: "42px",
                                flex: 1,
                            }}
                        >
                            <Option key={'all'} value={'all'}><i className="fa-solid fa-list mr-2"></i> Barcha yo'nalish</Option>
                            {subCategory.map((item, index) => {
                                return (
                                    <Option key={item.slug} value={item.slug}>
                                        {item.name}
                                    </Option>
                                )
                            })}
                        </Select>
                    }
                </div>
            </div>

            <div className='d-none d-lg-block my-4'>
                <div className='bg--white p-4  border  border-secondary-subtle rounded-2'>

                    <div className='nav-menu-cards d-flex align-items-center justify-content-center flex-wrap gap-3 mt-3'>
                        {
                            breacrumb?.results?.map((item, index) => (
                                <div
                                    key={index}
                                    className={`${parentCategory === item.slug ? 'categoryMenuCardActive' : ''} categoryMenuCard bg--white d-flex align-items-center gap-3 border  border-secondary-subtle rounded-2 p-2`} // Ota kategoriya aktivligi
                                    onClick={() => router.push({
                                        pathname: `/3d-models-and-interior-designs/${item.slug}`,
                                        query: { parentCategory: item.slug } // query parametrini qo'shish
                                    })}
                                >
                                    <img
                                        className='rounded-2'
                                        src={item.image}
                                        alt={item.name}
                                        height={25}
                                    />
                                    <span className=''>{item.name}</span>
                                    <svg
                                        height='24'
                                        width='24'
                                        viewBox='0 0 24 24'
                                        fill='#fff'
                                        xmlns='http://www.w3.org/2000/svg'>
                                        <path
                                            d='M18.3002 5.70997C17.9102 5.31997 17.2802 5.31997 16.8902 5.70997L12.0002 10.59L7.11022 5.69997C6.72022 5.30997 6.09021 5.30997 5.70021 5.69997C5.31021 6.08997 5.31021 6.71997 5.70021 7.10997L10.5902 12L5.70021 16.89C5.31021 17.28 5.31021 17.91 5.70021 18.3C6.09021 18.69 6.72022 18.69 7.11022 18.3L12.0002 13.41L16.8902 18.3C17.2802 18.69 17.9102 18.69 18.3002 18.3C18.6902 17.91 18.6902 17.28 18.3002 16.89L13.4102 12L18.3002 7.10997C18.6802 6.72997 18.6802 6.08997 18.3002 5.70997Z'
                                            class={`fillable d-none ${slug == item.slug && 'd-block'
                                                } `}></path>
                                    </svg>
                                </div>
                            ))
                        }
                    </div>
                    {
                        subCategory && subCategory.length > 0 && (
                            <>
                                <div className='ps-breadcrumb-2 py-3'>
                                    <ul className='breadcrumb-2'>
                                        <li>{subCategory.name} (<span>{formatCurrencyWithSpace(count)}+</span>)</li>
                                        {subCategory.map((item, index) => {
                                            return (
                                                <li
                                                    className={`${slug === item.slug ? "active" : ""}`}
                                                    key={index}
                                                    onClick={() =>
                                                        router.push({
                                                            pathname: "/3d-models-and-interior-designs/[slug]",
                                                            query: {
                                                                ...router.query,
                                                                slug: item.slug,
                                                                page: 1,
                                                                childCategory: item.slug
                                                            }
                                                        })
                                                    }

                                                    style={{ cursor: 'pointer' }}>
                                                    {item.name}
                                                </li>
                                            );
                                        })}
                                        <li className='forMoreInformation active' onClick={() => setExpanded(!expanded)}> {expanded ? "Kamroq ko‘rsatish" : "Barchasini ko‘rsatish"}</li>
                                    </ul>
                                </div>
                            </>
                        )
                    }
                    {
                        isLoading && <Skeleton.Node
                            active
                            className={`skeletion-card small-full-card`}
                        />
                    }
                </div>
            </div>

        </div >
    );
};

export default ThreeDCategoriesFilterSecion;