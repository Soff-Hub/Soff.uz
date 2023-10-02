import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import Menu from '~/components/elements/menu/Menu';
import { stickyHeader } from '~/utilities/common-helpers';
import CollectionRepository from '~/repositories/CollectionRepository';
import ProductRepository from '~/repositories/ProductRepository';
// import axios from 'axios';
// import { baseUrl } from '~/repositories/Repository';

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

    // console.log(topCategoryData, categoryData);
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
                                    src="/static/img/soff/soff_green_white.png"
                                    alt="soff"
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

// export async function getStaticProps() {
//     const requests = [
//       axios.get("https://api.soff.uz/api/v1/customer/top-categories/"),
//       axios.get("https://api.soff.uz/api/v1/customer/category-list/"),
//     ];
  
//     const responses = await Promise.all(requests);
  
//     const successdata = [];
  
//     for (let i = 0; i < responses.length; i++) {
//       if (responses[i].status === 200) {
//         successdata.push(responses[i].data);
//       }
//     }

//     console.log(responses);
  
//     return {
//       props: {
//         topCategoryData: successdata[0] || null,
//         // categoryData: successdata[1] || null,
//       },
//       revalidate: 60,
//     };
//   }

export default HeaderElectronic;
