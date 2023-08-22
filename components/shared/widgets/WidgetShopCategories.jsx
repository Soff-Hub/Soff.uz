import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WidgetShopCategories = ({data}) => {
    const Router = useRouter();
    // const [categories, setCategories] = useState(null);
    const [loading, setLoading] = useState(false);
    const { slug } = Router.query;

    // async function getCategories() {
    //     setLoading(true);
    //     const responseData = await ProductRepository.getProductCategories();
    //     if (responseData) {
    //         setCategories(responseData);
    //         setTimeout(
    //             function () {
    //                 setLoading(false);
    //             }.bind(this),
    //             250
    //         );
    //     }
    // }

    // useEffect(() => {
    //     getCategories();
    // }, []);
    const [category, setCategory] = useState([]);

    async function getCategry() {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData) {
            console.log(`id li malumotlar`, responseData);
            setCategory(responseData);
        }
    }

    useEffect(() => {
        getCategry()
    }, []);

    // Views
    let categoriesView;
    if (!loading) {
        if (category && category.length > 0) {
            const items = category.map((item) => (
                <li
                    key={item.id}
                    className={item.id === Number(slug) ? 'active' : ''}>
                    <Link href={`/category/${item.id}`}>{item.name}</Link>
                </li>
            ));
            categoriesView = <ul className="ps-list--categories">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Categories</h4>
            {categoriesView}
        </aside>
    );
};

export default WidgetShopCategories;
