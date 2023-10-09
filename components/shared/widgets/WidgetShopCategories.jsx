import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PropagateLoader } from 'react-spinners';
import ProductRepository from '~/repositories/ProductRepository';

const WidgetShopCategories = ({ data }) => {
    const Router = useRouter();
    const { slug } = Router.query;
    const category = data;
    const [activeAccordionIndex, setActiveAccordionIndex] = useState(null);
    const [childData, setChildData] = useState({});

    const handleClickGetChildData = async (slug) => {
        const response = await ProductRepository.getChaildCategory(slug);
        if (response) {
            setChildData((prevData) => ({
                ...prevData,
                [slug]: response,
            }));
        }
    };

    const handleAccordionClick = (index, slug) => {
        if (activeAccordionIndex === index) {
            setActiveAccordionIndex(null);
        } else {
            setActiveAccordionIndex(index);
            handleClickGetChildData(slug);
        }
    };

    const renderChildLinks = (children, parentSlug) => {
        return children?.map((item, i) => (
            <Link key={i} href={`/category/${item.id}`}>
                <a className={item.id === Number(slug) ? 'active' : ''}>
                    {item.name}
                </a>
            </Link>
        ));
    };

    const renderAccordionItems = () => {
        return category?.map((item, i) => (
            <li key={item.id} className={item.id === Number(slug) ? 'active' : ''}>
                {item.is_childe ? (
                    <div className="accordion accordion-flush" id={`accordion-${i}`}>
                        <div
                            className="accordion-item"
                            style={{ backgroundColor: '#fffcfced' }}
                        >
                            <h2 className="accordion-header" id={`heading-${i}`}>
                                <button
                                    className={`accordion-button ${activeAccordionIndex === i ? '' : 'collapsed'
                                        }`}
                                    type="button"
                                    onClick={() => handleAccordionClick(i, item.slug)}
                                >
                                    {item.name}
                                </button>
                            </h2>
                            <div
                                id={`collapse-${i}`}
                                className={`accordion-collapse collapse ${activeAccordionIndex === i ? 'show' : ''
                                    }`}
                                aria-labelledby={`heading-${i}`}
                                data-bs-parent={`#accordion-${i}`}
                            >
                                <div className="accordion-body">
                                    {renderChildLinks(childData[item.slug], item.slug)}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link href={`/category/${item.id}`}>
                        <a className="category-list-item">{item.name}</a>
                    </Link>
                )}
            </li>
        ));
    };

    return (
        <aside className="widget widget_shop">
            <h4 className="widget-title">Kategoriyalar</h4>
            {category?.length ? (
                <ul className="ps-list--categories">{renderAccordionItems()}</ul>
            ) : (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignContent: 'center',
                    }}
                >
                    <PropagateLoader color="#C9C9C9" />
                </div>
            )}
        </aside>
    );
};

export default WidgetShopCategories;
