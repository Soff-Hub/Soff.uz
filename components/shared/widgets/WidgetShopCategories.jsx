import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WidgetShopCategories = ({ data, setchaildId, setParentId }) => {
    const Router = useRouter();
    const [loading, setLoading] = useState(false);
    const { slug } = Router.query;
    const [category, setCategory] = useState([]);

    async function getCategry() {
        const responseData = await ProductRepository.getTotalRecords();
        if (responseData) {
            setCategory(responseData);
        }
    }

    const  IdYuborish = (id) => {
        setchaildId(id)
    }

    const ParentDocumentId = (id) => {
        setParentId(id)
    }

    useEffect(() => {
        getCategry();
    
    }, [data]);
    
    // Views
    let categoriesView;
    if (!loading) {
        if (category && category.length > 0) {
            const items = category.map((item) => (
                <li
                    key={item.id}
                    className={item.id === Number(slug) ? 'active' : ''}>
                    {item.children !== null ? (
                        <div className="dropdown">
                            <button
                                className="btn btn-light fs-4  dropdown-toggle d-flex justify-content-between align-content-center"
                                style={{ minWidth: '120px' }}
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                {item.name}
                            </button>
                            <ul className="dropdown-menu">
                                {item?.children.map((item, i) => (
                                    <li key={i}>
                                        <Link href={`/category/${item.id}`}>
                                            <a className="dropdown-item fs-4" onClick={() => IdYuborish(item.id)} >
                                                {item.name}
                                            </a>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <Link href={`/category/${item.id}`}>
                            <a onClick={() => ParentDocumentId(item.id)}>
                            {item.name}
                            </a>
                        </Link>
                    )}
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
