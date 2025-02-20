import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Skeleton } from 'antd';

const CategoriesFilterSecion = ({ breacrumb, count, isLoading, childCategoryData }) => {
    const [expanded, setExpanded] = useState(false);
    const router = useRouter();

    if (!router.isReady) return null;

    const { slug, parentCategory, childCategory } = router.query;

    const subCategory = expanded ? childCategoryData?.results : childCategoryData?.results.slice(0, 20) || null;

    return (
        <div className='p-4 my-2  border-secondary-subtle rounded-2'>
            <div className='nav-menu-cards d-flex align-items-center justify-content-center flex-wrap gap-3 mt-3 mb-4'>
                {breacrumb?.results?.map((item, index) => (
                    <div
                        key={index}
                        className={`${parentCategory === item.slug
                                ? 'categoryMenuCardActive'
                                : ''
                            } categoryMenuCard bg--white d-flex align-items-center gap-3 border  border-secondary-subtle rounded-2 p-2`} // Ota kategoriya aktivligi
                        onClick={() =>
                            router.push({
                                pathname: `/design-developments/${item.slug}`,
                                query: { parentCategory: item.slug }, // query parametrini qo'shish
                            })
                        }>
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
                ))}
            </div>
            {subCategory ? (
                <>
                    <div className='ps-breadcrumb-3 py-3'>
                        <ul className='breadcrumb-3 '>
                            {subCategory.map((item, index) => {
                                return (
                                    <li
                                        className={`${slug === item.slug ? 'active ' : ''
                                            }`}
                                        key={index}
                                        onClick={() =>
                                            router.push(
                                                {
                                                    pathname:
                                                        '/design-developments/[slug]',
                                                    query: {
                                                        ...router.query,
                                                        slug: item.slug,
                                                        page: 1,
                                                        childCategory:
                                                            item.slug,
                                                    },
                                                }
                                            )
                                        }
                                        style={{ cursor: 'pointer' }}>
                                        {item.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </>
            ) : (
                <></>
            )}

            {isLoading && (
                <Skeleton.Node
                    active
                    className={`skeletion-card small-full-card`}
                />
            )}
        </div>
    );
};

export default CategoriesFilterSecion;
