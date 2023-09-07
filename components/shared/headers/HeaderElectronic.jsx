
import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import menuData from '~/public/static/data/menu';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import Menu from '~/components/elements/menu/Menu';
import { stickyHeader } from '~/utilities/common-helpers';
import CollectionRepository from '~/repositories/CollectionRepository';
import ProductRepository from '~/repositories/ProductRepository';

const HeaderElectronic = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }


    }, []);
    
    const [categoryData, setCategoryData] = useState([])
    const [topCategoryData, setTopCategoryData] = useState([])
    
    async function getCategoryFunc() {
        const responseData = await CollectionRepository.getCategoryData(
            `customer/category-list/`
        );
        if (responseData ) {
            setCategoryData(responseData);
        }
    }

    async function getTopCategory(){
        const responsData = await ProductRepository.getTopCategories()
        if (responsData) {
            setTopCategoryData(responsData)
        }
    }

    useEffect (() => {
        getCategoryFunc()
        getTopCategory()
    }, [])

    


    return (
        <header
            className="header header--standard header--electronic"
            id="headerSticky">
            <div className="header__content">
                <div className="container">
                    <div className="header__content-left">
                        <Link href="/">
                            <a className="ps-logo">
                                <img
                                    src="/static/img/alldata_logo.png"
                                    alt="alldata"
                                />
                            </a>
                        </Link>
                        <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>

                                <span> Kategoriya </span>
                            </div>
                            <div className="menu__content">
                                <Menu
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
