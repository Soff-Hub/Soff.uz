import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';
import { Select, Skeleton } from 'antd';
const Option = Select.Option;

const CategoriesFilterSecion = ({
    breacrumb,
    count,
    isLoading,
    childCategoryData,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [dropDownMenu, setDropdownMenu] = useState(false);
    const [childCategoryOpen, setChildCategoryOpen] = useState(false);

    const router = useRouter();

    // router.isReady yuklanmaguncha null qaytarish
    if (!router.isReady) return null;

    const { slug, parentCategory, childCategory } = router.query;

    const subCategory = expanded
        ? childCategoryData?.results
        : childCategoryData?.results || null;

    return (
        <div>
            <div className='d-lg-none d-block mt-5'>
                <div className='d-flex gap-3 justify-content-between'>
                    <Select
                        onChange={value => {
                            {
                                router.push({
                                    pathname: `/scientific-resources/${value}`,
                                    query: { parentCategory: value }, // query parametrini qo'shish
                                });
                            }
                        }}
                        defaultValue={parentCategory || 'all'}
                        style={{
                            height: '42px',
                            flex: 1,
                        }}>
                        <Option key={'all'} value={'all'}>
                            <i className='fa-solid fa-list mr-2'></i> Barchasi
                        </Option>
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
                            );
                        })}
                    </Select>
                    {subCategory && (
                        <Select
                            onChange={value => {
                                {
                                    router.push({
                                        pathname:
                                            '/scientific-resources/[slug]',
                                        query: {
                                            ...router.query,
                                            slug: value,
                                            page: 1,
                                            childCategory: value,
                                        },
                                    });
                                }
                            }}
                            defaultValue={childCategory ? childCategory : 'all'}
                            style={{
                                height: '42px',
                                flex: 1,
                            }}>
                            <Option key={'all'} value={'all'}>
                                <i className='fa-solid fa-list mr-2'></i> Barcha
                                yo'nalish
                            </Option>
                            {subCategory.map((item, index) => {
                                return (
                                    <Option key={item.slug} value={item.slug}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                </div>
            </div>

            <div className='d-none container d-lg-block p-lg-0'>
                <div className='subcategoryMenu p-lg-0'>
                    <div className='d-flex align-items-center justify-content-between mb-4 gap-3 pointer '>
                        <div
                            onClick={() => setDropdownMenu(!dropDownMenu)}
                            className='categoryCard btn-success d-flex align-items-center rounded-3 gap-4 shadow-md'>
                            <img src='/static/img/rectangel.png' alt='' />
                            <p className='m-0 text-white fs-3 fw-semibold	'>
                                Barcha Katalog
                            </p>
                            <img src='/static/img/down.png' alt='' />
                        </div>
                        {breacrumb?.results?.slice(0, 5).map((item, index) => (
                            <div
                                key={index}
                                className={`${
                                    parentCategory === item.slug
                                        ? 'categoryMenuCardActive'
                                        : ''
                                } d-lg-none subcategory_btn d-xl-block px-3 py-3 shadow-sm pointer  rounded-3 gap-3  bg-white d-flex align-items-center`} // Ota kategoriya aktivligi
                                onClick={() =>
                                    router.push({
                                        pathname: `/scientific-resources/${item.slug}`,
                                        query: {
                                            parentCategory: item.slug,
                                        }, // query parametrini qo'shish
                                    })
                                }>
                                <span className='m-0 fs-3 fw-medium	'>
                                    {item.name}
                                </span>
                                <img
                                    className='rounded-2'
                                    src={item.image}
                                    alt={item.name}
                                    height={25}
                                />
                            </div>
                        ))}
                    </div>
                    <div className=''>
                        {dropDownMenu && (
                            <div className='px-md-3 d-flex align-items-center justify-content-between flex-wrap rounded-3 gap-3 border-secondary bg-white p-4'>
                                {breacrumb?.results?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${
                                            parentCategory === item.slug
                                                ? 'categoryMenuCardActive'
                                                : ''
                                        } p-3 subcategory_btn shadow-sm pointer  rounded-3 gap-3  bg-white d-flex align-items-center`} // Ota kategoriya aktivligi
                                        onClick={() =>
                                            router.push({
                                                pathname: `/scientific-resources/${item.slug}`,
                                                query: {
                                                    parentCategory: item.slug,
                                                }, // query parametrini qo'shish
                                            }) && setDropdownMenu(!dropDownMenu)
                                        }>
                                        {' '}
                                        <span className='m-0  fs-3 fw-medium	subcategory_btn_title'>
                                            {item.name}
                                        </span>
                                        <img
                                            className='rounded-2'
                                            src={item.image}
                                            alt={item.name}
                                            height={25}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {subCategory?.length > 0 && (
                        <>
                            <div className='ps-breadcrumb-2 py-3  '>
                                <div className='d-flex justify-content-between '>
                                    <ul className='breadcrumb-2 mt-2 gap-5 d-flex align-items-center  justify-content-between bg-none'>
                                        {subCategory
                                            .slice(0, 6)
                                            .map((item, index) => {
                                                return (
                                                    <li
                                                        className={`${
                                                            slug === item.slug
                                                                ? 'active'
                                                                : ''
                                                        } text-capitalize`}
                                                        key={index}
                                                        onClick={() =>
                                                            router.push({
                                                                pathname:
                                                                    '/scientific-resources/[slug]',
                                                                query: {
                                                                    ...router.query,
                                                                    slug: item.slug,
                                                                    page: 1,
                                                                    childCategory:
                                                                        item.slug,
                                                                },
                                                            })
                                                        }
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}>
                                                        {item.name}
                                                    </li>
                                                );
                                            })}
                                        <li
                                            className='  d-flex align-items-center gap-1 pointer text-success'
                                            onClick={() =>
                                                setChildCategoryOpen(
                                                    !childCategoryOpen
                                                )
                                            }>
                                            (<span>{subCategory.length}+</span>)
                                            Barchasini korish
                                            <img
                                                src='/static/img/greenDown.png'
                                                alt='down'
                                                width={'8.33px'}
                                                height={'4.17px'}
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    {childCategoryOpen && (
                                        <ul className='breadcrumb-2 d-flex align-items-center mt-5 justify-content-between bg-white gap-2 flex-wrap   shadow-md rounded-3 p-3'>
                                            {subCategory.map((item, index) => {
                                                return (
                                                    <li
                                                        onClick={() =>
                                                            router.push({
                                                                pathname:
                                                                    '/scientific-resources/[slug]',
                                                                query: {
                                                                    ...router.query,
                                                                    slug: item.slug,
                                                                    page: 1,
                                                                    childCategory:
                                                                        item.slug,
                                                                },
                                                            }) &&
                                                            setChildCategoryOpen(
                                                                !childCategoryOpen
                                                            )
                                                        }
                                                        className={`${
                                                            slug === item.slug
                                                                ? 'active'
                                                                : ''
                                                        } pointer text-capitalize`}
                                                        key={index}>
                                                        {item.name}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    {isLoading && (
                        <Skeleton.Node
                            active
                            className={`skeletion-card small-full-card`}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoriesFilterSecion;
