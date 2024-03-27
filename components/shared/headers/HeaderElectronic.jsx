import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import Menu from '~/components/elements/menu/Menu';
import { stickyHeader } from '~/utilities/common-helpers';
import CollectionRepository from '~/repositories/CollectionRepository';
import ProductRepository from '~/repositories/ProductRepository';

import MenuCategory from '~/components/elements/menu/MenuCategory';
import { useDispatch, useSelector } from 'react-redux';
import { Category_Lists, TopCategory_Lists } from '~/store/auth/action';
import NextImageCard from '~/components/nextImagecard';

const HeaderElectronic = ({kk}) => {
    const {
        category_lists: categoryData,
        top_category_lists: topCategoryData,
    } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    async function getCategoryFunc() {
        const responseData = await CollectionRepository.getCategoryData(
            `seller/admin/category-parent/`
        );
        if (responseData) {
            dispatch(Category_Lists(responseData?.data?.results));
        }
    }

    async function getTopCategory() {
        const responsData = await ProductRepository.getTopCategories();
        if (responsData) {
            dispatch(TopCategory_Lists(responsData));
        }
    }

    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
        if (categoryData?.length === 0) {
            getCategoryFunc();
        }
        if (topCategoryData?.length === 0) {
            getTopCategory();
        }
    }, []);

    return (
        <header
            className="header header--standard header--electronic"
            id="headerSticky">
            <div className="header__content">
                <div className="container">
                    <div className="header__content-left">
                        <Link href="/">
                            <a className="ps-logo">
                                {/* <img
                                    src="/static/img/soff/soff_green_white.png"
                                    alt="soff"
                                /> */}
                            <NextImageCard
                             url="/static/img/soff/soff_green_white.png" clasS='logoo' width='200px' height='60px' />
                            </a>
                        </Link>
                        <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>
                                <span> Kategoriya </span>
                            </div>
                            <div className="menu__content">
                                <MenuCategory
                                    source={categoryData}
                                    className="menu--dropdown"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="header__content-center">
                        <SearchHeader />
                    </div>
                    <div className="header__content-right">
                        <ElectronicHeaderActions />
                    </div>
                   
                </div>
            </div>
            <nav className="navigation">
                <div className="container">
                    <Menu
                        source={topCategoryData}
                        className="menu menu--electronic"
                    />
                </div>
            </nav>
        </header>
    );
};

export default HeaderElectronic;


export async function getServerSideProps() {
    try {
        const request = await fetch(baseUrl + 'seller/admin/category-parent/');
        if (!request.ok) {
            throw new Error('Request to the API failed with status ' + request.status);
        }
        const categoryResponse = await request.json();

        return {
            props: {
                kk: categoryResponse,
            },
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                kk: null,
            },
        };
    }
}

