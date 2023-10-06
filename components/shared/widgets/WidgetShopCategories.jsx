import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropagateLoader } from 'react-spinners';

const WidgetShopCategories = ({ data}) => {
    const Router = useRouter();
    const { slug } = Router.query;
    const category = data

    let items
    if (category?.length > 0) {
        items = category.map((item, i) => (
            <li
                key={item.id}
                className={
                    item.id === Number(slug) ? 'active' : ''
                }>
                {item.children !== null ? (
                    <div
                        className="accordion accordion-flush"
                        id="accordionFlushExample">
                        <div
                            className="accordion-item"
                            style={{
                                backgroundColor: '#fffcfced',
                            }}>
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
                                className="accordion-collapse collapse"
                                aria-labelledby="flush-headingOne"
                                data-bs-parent="#accordionFlushExample">
                                {item?.children?.map((item, i) => {
                                    return (
                                        <Link
                                            href={`/category/${item.id}`}>
                                            <a
                                            id='acc-li-xl'
                                                className={
                                                    item.id ===
                                                    Number(slug)
                                                        ? 'active'
                                                        : ''
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
                        >
                            {item.name}
                        </a>
                    </Link>
                )}
            </li>
        ));
        
    }

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Kategoriyalar</h4>
            {items?.length ? (
                <ul className="ps-list--categories">{items}</ul>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}>
                    <PropagateLoader color="#C9C9C9" />
                </div>
            )}
        </aside>
    );
};

export default WidgetShopCategories;
