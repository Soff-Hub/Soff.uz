import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Select, Skeleton } from 'antd';

const Option = Select.Option;

export const getTitleFromSlug = (array, slug) => {
    let title = null;
    if (array && slug) {
        title = array.find((item) => item.slug === slug)?.name;
    }
    return title;
};

const CategoryFilterSecion = ({
    breacrumb,
    count,
    isLoading,
    childCategoryData,
}) => {
    const [expanded, setExpanded] = useState(false);
    const [dropDownMenu, setDropdownMenu] = useState(false);
    const [childCategoryOpen, setChildCategoryOpen] = useState(false);

    const router = useRouter();
    if (!router.isReady) return null;

    const { slug, childCategory } = router.query;

    const subCategory = expanded
        ? childCategoryData?.results
        : childCategoryData?.results || null;

    return (
        <div>
            {/* Mobile dropdown */}
            <div className="d-xl-none d-block mb-4">
                <div className="row mx-auto gap-3">
                    <Select
                        className="col-md-6 col-12 p-0 m-0 mr-md-2"
                        onChange={(value) => {
                            router.push({
                                pathname: `/category/${value}`,
                                query: { page: 1 },
                            });
                        }}
                        defaultValue={slug || 'all'}
                        style={{ height: '42px', flex: 1 }}>
                        <Option key="all" value="all">
                            <i className="fa-solid fa-list mr-2"></i>
                            Barchasi
                        </Option>
                        {breacrumb?.results?.map((item) => (
                            <Option key={item.slug} value={item.slug}>
                                {item.image && (
                                    <img
                                        className="rounded-2 me-2"
                                        src={item.image}
                                        alt={item.name}
                                        width={25}
                                    />
                                )}
                                {item.name}
                            </Option>
                        ))}
                    </Select>

                    {subCategory && (
                        <Select
                            className="col-md-6 col-12 p-0 m-0 ml-md-2"
                            onChange={(value) => {
                                router.push({
                                    pathname: `/category/${slug}`,
                                    query: {
                                        page: 1,
                                        childCategory: value,
                                    },
                                });
                            }}
                            defaultValue={childCategory || 'all'}
                            style={{ height: '42px', flex: 1 }}>
                            <Option key="all" value="all">
                                <i className="fa-solid fa-list mr-2"></i>
                                Barcha yo'nalish
                            </Option>
                            {subCategory.map((item) => (
                                <Option key={item.slug} value={item.slug}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    )}
                </div>
            </div>

            {/* Desktop menu */}
            <div className="d-none d-lg-block">
                <div className="subcategoryMenu d-xl-block d-lg-none p-lg-0">
                    <div className="mb-3 pointer top_search_category justify-content-between">
                        <div
                            onClick={() => setDropdownMenu(!dropDownMenu)}
                            className="Models_category_menu">
                            <img src="/static/img/list-category.svg" alt="" />
                            <h1 style={{ whiteSpace: 'nowrap' }}>
                                {!slug || slug === 'all'
                                    ? 'Barcha Katalog'
                                    : breacrumb?.results.find(
                                          (item) => item.slug === slug
                                      )?.name}
                            </h1>
                            <img
                                src={
                                    dropDownMenu
                                        ? '/static/img/up-icon.svg'
                                        : '/static/img/down-icon.svg'
                                }
                                alt=""
                            />
                        </div>

                        <div className="d-flex gap-3">
                            {breacrumb?.results
                                ?.filter(
                                    (item) =>
                                        !'audio video template'.includes(
                                            item.slug
                                        )
                                )
                                .slice(0, 7)
                                .map((item, index) => (
                                    <div className="my-2" key={index}>
                                        <div
                                            className={`${
                                                slug === item.slug
                                                    ? 'bg-success'
                                                    : ''
                                            } category-btn card p-3 shadow-sm rounded-3`}
                                            onClick={() =>
                                                router.push({
                                                    pathname: `/category/${item.slug}`,
                                                    query: { page: 1 },
                                                })
                                            }
                                            style={{ cursor: 'pointer' }}>
                                            <div className="d-flex justify-content-between">
                                                <p
                                                    className={`${
                                                        slug === item.slug
                                                            ? 'bg-success text-white'
                                                            : ''
                                                    } category-btn-title m-0 p-0`}>
                                                    {item.name}
                                                </p>
                                                <img
                                                    style={{
                                                        width: '26px',
                                                        height: '21px',
                                                    }}
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {dropDownMenu && (
                        <div className="card p-3">
                            <div className="row">
                                {breacrumb?.results?.map((item, index) => (
                                    <div className="col-2 my-2" key={index}>
                                        <div
                                            className={`${
                                                slug === item.slug
                                                    ? 'bg-success'
                                                    : ''
                                            } category-btn card p-3 shadow-sm rounded-3`}
                                            onClick={() => {
                                                router.push({
                                                    pathname: `/category/${item.slug}`,
                                                    query: { page: 1 },
                                                });
                                                setDropdownMenu(false);
                                            }}
                                            style={{ cursor: 'pointer' }}>
                                            <div className="d-flex justify-content-between">
                                                <p
                                                    className={`${
                                                        slug === item.slug
                                                            ? 'bg-success text-white'
                                                            : ''
                                                    } category-btn-title m-0 p-0`}>
                                                    {item.name}
                                                </p>
                                                <img
                                                    style={{
                                                        width: '26px',
                                                        height: '21px',
                                                    }}
                                                    src={item.image}
                                                    alt={item.name}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {subCategory?.length > 0 && (
                        <div className="ps-breadcrumb-2 py-3 px-xl-0 px-l-0">
                            <div className="subCategoryContainer">
                                <div className="pointer top_search_category justify-content-between">
                                    <div
                                        className="d-flex align-items-center gap-1 pointer text-success text-capitalize"
                                        onClick={() =>
                                            setChildCategoryOpen(
                                                !childCategoryOpen
                                            )
                                        }>
                                        (<span>{subCategory.length}+</span>){' '}
                                        {` `}
                                        {childCategory
                                            ? subCategory.find(
                                                  (item) =>
                                                      item.slug ===
                                                      childCategory
                                              )?.name || 'Barchasini korish'
                                            : 'Barchasini korish'}
                                        <img
                                            src={
                                                childCategoryOpen
                                                    ? '/static/img/up-icon-green.svg'
                                                    : '/static/img/down-icon-green.svg'
                                            }
                                            alt=""
                                        />
                                    </div>

                                    <div className="d-flex gap-3">
                                        {subCategory
                                            .slice(0, 6)
                                            .map((item, index) => (
                                                <div
                                                    className="my-2"
                                                    key={index}>
                                                    <div
                                                        className="sub-category-btn p-3"
                                                        onClick={() =>
                                                            router.push({
                                                                pathname: `/category/${slug}`,
                                                                query: {
                                                                    page: 1,
                                                                    childCategory:
                                                                        item.slug,
                                                                },
                                                            })
                                                        }
                                                        style={{
                                                            cursor: 'pointer',
                                                        }}>
                                                        <div className="d-flex justify-content-between">
                                                            <p
                                                                className={`${
                                                                    childCategory ===
                                                                    item.slug
                                                                        ? 'text-success text-white'
                                                                        : ''
                                                                } text-capitalize sub-category-btn-title m-0 p-0`}>
                                                                {item.name}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {childCategoryOpen && (
                                    <div className="d-flex flex-wrap bg-white shadow-sm rounded-3 p-4">
                                        {subCategory.map((item, index) => (
                                            <div
                                                onClick={() => {
                                                    router.push({
                                                        pathname: `/category/${slug}`,
                                                        query: {
                                                            page: 1,
                                                            childCategory:
                                                                item.slug,
                                                        },
                                                    });
                                                    setChildCategoryOpen(false);
                                                }}
                                                className={`${
                                                    slug === item.slug
                                                        ? 'active'
                                                        : ''
                                                } pointer text-capitalize col-2 my-1 border`}
                                                key={index}>
                                                {item.name}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {isLoading && (
                        <Skeleton.Node
                            active
                            className="skeletion-card small-full-card mb-3"
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CategoryFilterSecion;
