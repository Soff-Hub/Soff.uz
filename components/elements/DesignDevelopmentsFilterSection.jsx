import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Select, Skeleton } from 'antd';
const Option = Select.Option;

const CategoriesFilterForDesignDevelopmentsSection = ({
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
            <div className='d-xl-none d-block mt-5 container p-xl-0 p-l-0 '>
                <div className='row mx-auto my-md-4 row-gap-3'>
                    <Select
                        className=' col-md-6  col-12  p-0 m-0 mr-md-2'
                        onChange={value => {
                            {
                                router.push({
                                    pathname: `/design-developments/${value}`,
                                    query: { parentCategory: value }, // query parametrini qo'shish
                                });
                            }
                        }}
                        defaultValue={parentCategory || 'all'}
                        style={{
                            height: '42px',
                            flex: 1,
                        }}>
                        <Option key={'all'} value={'all'} className='w-50'>
                            <i className='fa-solid fa-list mr-2'></i>
                            Barchasi
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
                            className=' col-md-6  col-12  p-0 m-0 ml-md-2'
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

            <div className='d-none d-lg-block'>
                <div className='subcategoryMenu d-xl-block d-lg-none p-lg-0'>
                    <div className=' justify-content-start mb-3  pointer top_search_category '>
                        <div
                            onClick={() => setDropdownMenu(!dropDownMenu)}
                            className='Models_category_menu'>
                            <img src='/static/img/rectangel.png' alt='' />
                            <p className='' style={{ whiteSpace: 'nowrap' }}>
                                Barcha Katalog
                            </p>
                            <img src='/static/img/down.png' alt='' />
                        </div>

                        <div className='Models_category_btn_wrap'>
                            {breacrumb?.results
                                ?.slice(0, 5)
                                .map((item, index) => (
                                    <div
                                        key={index}
                                        style={{ whiteSpace: 'nowrap' }}
                                        className={`${
                                            parentCategory === item.slug
                                                ? 'categoryMenuCardActive'
                                                : ''
                                        } Models_category_btn `} // Ota kategoriya aktivligi
                                        onClick={() =>
                                            router.push({
                                                pathname: `/design-developments/${item.slug}`,
                                                query: {
                                                    parentCategory: item.slug,
                                                }, // query parametrini qo'shish
                                            })
                                        }>
                                        <span className='Models_category_btn_title '>
                                            {item.name}
                                        </span>
                                        <img
                                            className='Models_category_btn_img'
                                            src={item.image}
                                            alt={item.name}
                                            height={25}
                                        />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className=''>
                        {dropDownMenu && (
                            <div className='CategoryOpen  container d-flex align-items-center justify-content-between flex-wrap rounded-3 gap-3 bg-white p-4'>
                                {breacrumb?.results?.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`${
                                            parentCategory === item.slug
                                                ? 'categoryMenuCardActive'
                                                : ''
                                        } Models_category_btn border`} // Ota kategoriya aktivligi
                                        onClick={() =>
                                            router.push({
                                                pathname: `/design-developments/${item.slug}`,
                                                query: {
                                                    parentCategory: item.slug,
                                                }, // query parametrini qo'shish
                                            }) && setDropdownMenu(!dropDownMenu)
                                        }>
                                        {' '}
                                        <span className='Models_category_btn_title'>
                                            {item.name}
                                        </span>
                                        <img
                                            className='Models_category_btn_img'
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
                            <div className='ps-breadcrumb-2 py-3 px-xl-0 px-l-0 '>
                                <div className='subCategoryContainer'>
                                    <div className='d-flex justify-content-between w-100'>
                                        <ul className=' breadcrumb-2 mt-2 gap-5 d-flex align-items-center  justify-content-start w-100 bg-none'>
                                            {subCategory
                                                .slice(0, 6)
                                                .map((item, index) => {
                                                    return (
                                                        <li
                                                            className={`${
                                                                slug ===
                                                                item.slug
                                                                    ? 'active'
                                                                    : ''
                                                            } text-capitalize`}
                                                            key={index}
                                                            onClick={() =>
                                                                router.push({
                                                                    pathname:
                                                                        '/design-developments/[slug]',
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
                                                                whiteSpace:
                                                                    'nowrap',
                                                                cursor: 'pointer',
                                                            }}>
                                                            {item.name}
                                                        </li>
                                                    );
                                                })}
                                        </ul>

                                        <div
                                            className='  d-flex align-items-center justify-content-end gap-1 pointer text-success w-100'
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
                                        </div>
                                    </div>

                                    {childCategoryOpen && (
                                        <ul className='subCategoryOpen container breadcrumb-2 d-flex align-items-center mt-5 justify-content-between bg-white gap-2 flex-wrap shadow-md rounded-3 p-3'>
                                            {subCategory.map((item, index) => {
                                                return (
                                                    <li
                                                        onClick={() =>
                                                            router.push({
                                                                pathname:
                                                                    '/design-developments/[slug]',
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

export default CategoriesFilterForDesignDevelopmentsSection;
