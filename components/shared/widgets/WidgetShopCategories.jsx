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

    const IdYuborish = (id) => {
        setchaildId(id);
    };

    const ParentDocumentId = (id) => {
        setParentId(id);
    };

let arr = []
if (category?.length > 0) {
    for (let i = 0; i < category.length; i++) {
        if (category[i]?.children) {
            arr.unshift(category[i])
        }else{
            arr.push(category[i])

        }
    }
    useEffect(() => {
        getCategry();
    }, [data]);
    // Views
    let categoriesView;
    if (!loading) {
        if (arr && arr.length > 0) {
            const items = arr.map((item, i) => (
                <li
                    key={item.id}
                    className={item.id === Number(slug) ? 'active' : ''}>
                    {item.children !== null ? (
                        <div

                            class="accordion accordion-flush"

                            id="accordionFlushExample">
                            <div
                                className="accordion-item"
                                style={{ backgroundColor: '#fffcfced' }}>
                                <h2
                                    className="accordion-header"
                                    id="flush-headingOne">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#flush-collapseOne-${i}`}
                                        aria-expanded="false"
                                        aria-controls={`flush-collapseOne-${i}`}>
                                        {item.name}
                                    </button>
                                </h2>
                                <div
                                    id={`flush-collapseOne-${i}`}

                                    class="accordion-collapse collapse"

                                    aria-labelledby="flush-headingOne"
                                    data-bs-parent="#accordionFlushExample">
                                    {item?.children?.map((item, i) => {
                                        return (
                                            <Link href={`/category/${item.id}`}>
                                                <a
                                                     className={item.id === Number(slug) ? 'active' : ''}
                                                    onClick={() =>
                                                        IdYuborish(item.id)
                                                    }>
                                                    {item.name}
                                                </a>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <Link href={`/category/${item.id}`}>
                            <a
                                className="category-list-item"
                                onClick={() => ParentDocumentId(item.id)}>

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
}}

export default WidgetShopCategories;
