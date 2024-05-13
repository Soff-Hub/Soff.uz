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

const NewSearchHeader = ({ kk }) => {
    const {
        category_lists: categoryData,
        top_category_lists: topCategoryData,
    } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [run, setRun] = useState(false)
    const [search, setSearch] = useState('')

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

    useEffect(() => {
        if (localStorage.getItem('tour') && localStorage.getItem('tour') === "true") {
            setRun(true);
        }
    }, [])

    return (
       <div className='search_navbars'>
        <div className="container">
            <div className='navbar_serach'>
            <h4 className='text-white'>STARTUPYAR</h4>
            <div className='d-flex align-items-center gap-5'>
                <span className='text-white span_search'>Partner with us</span>
                <button className='search_button'>Get Featured</button>
            </div>
            </div>
        </div>
       </div>
    );
};

export default NewSearchHeader;

export async function getServerSideProps() {
    try {
        const request = await fetch(baseUrl + 'seller/admin/category-parent/');
        if (!request.ok) {
            throw new Error(
                'Request to the API failed with status ' + request.status
            );
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
