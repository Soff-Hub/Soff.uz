import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Select, Skeleton } from 'antd';

const DevelopmentAndItFilterSecion = ({
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
        <>
            {isLoading && (
                <div className='d-flex flex-column gap-5 mt-5'>
                    <Skeleton.Input
                        active
                        style={{ width: '40%', height: '40px' }}
                    />
                    <Skeleton.Input
                        active
                        style={{ width: '100%', height: '50px' }}
                    />
                </div>
            )}
            {
                <div className='DevelopmentAndItFilterSecion'>
                    <h2 className='DevelopmentAndItFilterSeciontitle'>
                        Rivojlanish & IT
                    </h2>
                    <div className='DevelopmentAndItFilterSecionWrap'>
                        <p className='DevelopmentAndItFilterSecionCount'>
                            {subCategory?.length || 0} ta
                            {subCategory?.length === 1
                                ? ' servis'
                                : ' servislar'}
                        </p>

                        <div className='DevelopmentAndItFilterSecionForm'>
                            <div className='DevelopmentAndItFilterSecionFormInputBox'>
                                <input
                                    type='text'
                                    placeholder='Xizmatlarni izlash'
                                    className='DevelopmentAndItFilterSecionFormInput'
                                />
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='12'
                                    height='13'
                                    viewBox='0 0 12 13'
                                    fill='none'>
                                    <path
                                        d='M9.47006 9.13465L12 11.6646L11.1646 12.5L8.63465 9.97006C7.72497 10.6978 6.57133 11.1332 5.31661 11.1332C2.38184 11.1332 0 8.75138 0 5.81661C0 2.88184 2.38184 0.5 5.31661 0.5C8.25138 0.5 10.6332 2.88184 10.6332 5.81661C10.6332 7.07133 10.1978 8.22497 9.47006 9.13465ZM8.28487 8.69632C9.00722 7.95188 9.45175 6.93641 9.45175 5.81661C9.45175 3.53194 7.60127 1.68147 5.31661 1.68147C3.03194 1.68147 1.18147 3.53194 1.18147 5.81661C1.18147 8.10127 3.03194 9.95175 5.31661 9.95175C6.43641 9.95175 7.45188 9.50722 8.19632 8.78487L8.28487 8.69632Z'
                                        fill='#7B7B7B'
                                    />
                                </svg>
                            </div>
                            <select
                                className='DevelopmentAndItFilterSecionFormCategegory'
                                onChange={value => {
                                    {
                                        router.push({
                                            pathname: `/Development-and-it/${value}`,
                                            query: { parentCategory: value }, // query parametrini qo'shish
                                        });
                                    }
                                }}
                                defaultValue={parentCategory || 'all'}>
                                <option
                                    key={'all'}
                                    value={'all'}
                                    className='w-50'>
                                    Barchasi
                                </option>
                                {breacrumb?.results?.map((item, index) => {
                                    return (
                                        <option
                                            key={item.slug}
                                            value={item.slug}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                            </select>
                            {subCategory && (
                                <select
                                    className='DevelopmentAndItFilterSecionFormCategegory'
                                    onChange={value => {
                                        {
                                            router.push({
                                                pathname:
                                                    '/Development-and-it/[slug]',
                                                query: {
                                                    ...router.query,
                                                    slug: value,
                                                    page: 1,
                                                    childCategory: value,
                                                },
                                            });
                                        }
                                    }}
                                    defaultValue={
                                        childCategory ? childCategory : 'all'
                                    }>
                                    <option key={'all'} value={'all'}>
                                        Barcha yo'nalish
                                    </option>
                                    {subCategory.map((item, index) => {
                                        return (
                                            <option
                                                key={item.slug}
                                                value={item.slug}>
                                                {item.name}
                                            </option>
                                        );
                                    })}
                                </select>
                            )}
                            <select className='DevelopmentAndItFilterSecionFormSelect'>
                                <option value='Budjet' selected disabled>
                                    Budjet
                                </option>
                            </select>
                            <select className='DevelopmentAndItFilterSecionFormSelect'>
                                <option
                                    value='Yetkazib_berish_vaqti'
                                    selected
                                    disabled>
                                    Yetkazib berish vaqti
                                </option>
                            </select>
                            <select className='DevelopmentAndItFilterSecionFormSelect'>
                                <option
                                    value='Reytingi_yuqori'
                                    selected
                                    disabled>
                                    Reytingi yuqori
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default DevelopmentAndItFilterSecion;
