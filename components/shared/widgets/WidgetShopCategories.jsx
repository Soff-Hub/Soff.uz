import React, { useEffect, useState } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';
import { useRouter } from 'next/router';

const WidgetShopCategories = ({ data, setchaildId, setParentId }) => {
    const Router = useRouter();
    const [loading, setLoading] = useState(false);
    const { slug } = Router.query;
    const [category, setCategory] = useState(null);

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

    const [categoriesView, setcategoriesView] = useState(null);


    const categoryView2 = () => {
        if (category?.length > 0) {
            if (!loading) {
                if (category && category.length > 0) {
                    const items = category.map((item, i) => (
                        <li
                            key={item.id}
                            className={
                                item.id === Number(slug) ? 'active' : ''
                            }>
                            {item.children !== null ? (
                                <div
                                    class="accordion accordion-flush"
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
                                            class="accordion-collapse collapse"
                                            aria-labelledby="flush-headingOne"
                                            data-bs-parent="#accordionFlushExample">
                                            {item?.children?.map((item, i) => {
                                                return (
                                                    <Link
                                                        href={`/category/${item.id}`}>
                                                        <a
                                                            className={
                                                                item.id ===
                                                                Number(slug)
                                                                    ? 'active'
                                                                    : ''
                                                            }
                                                            onClick={() =>
                                                                IdYuborish(
                                                                    item.id
                                                                )
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
                                        onClick={() =>
                                            ParentDocumentId(item.id)
                                        }>
                                        {item.name}
                                    </a>
                                </Link>
                            )}
                        </li>
                    ));
                    return setcategoriesView(items);
                }
            } else {
                return setcategoriesView('Loading...');
            }
        }
    };

    useEffect(() => {
        getCategry();

    }, [data]);


    useEffect(() => {
        categoryView2()
    }, [category])

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Kategoriyalar</h4>
            {categoriesView?.length ?  <ul className="ps-list--categories">{categoriesView}</ul> :  <ul className="ps-list--categories">Loading...</ul>}
        </aside>
    );
};

export default WidgetShopCategories;
