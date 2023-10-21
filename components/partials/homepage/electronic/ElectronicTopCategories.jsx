import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import CollectionRepository from '~/repositories/CollectionRepository';

function ElectronicTopCategories() {
    const [category, getCategory] = useState([]);

    async function getCategoryData() {
        const responsData = await CollectionRepository.getCategoryData(
            `customer/category-month/`
        );
        if (responsData) {
            getCategory(responsData.data.results);
        }
    }
    useEffect(() => {
        getCategoryData();
    }, []);

    return (
        <div className="ps-top-categories">
            <div className="container">
                <h3>
                    <Link
                        href="/topCategory/categories"
                        as="/topCategory/categories">
                        <a> Kategoriyalar</a>
                    </Link>
                </h3>
                <div className="yaxshi-categoriyalar">
                    {category ? (
                        category.map((category) => (
                            <div
                                className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6 "
                                key={category.id}>
                                <Link
                                    href={`/category/${category.id}`}
                                    as={`/category/${category.id}`}>
                                    <a>
                                        <div
                                            className="ps-block--category-2 top-category-items p-3 rounded "
                                            style={{ cursor: 'pointer' }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignContent: 'center',
                                                    justifyContent: 'center',
                                                    overflow: 'hidden',
                                                }}>
                                                <div
                                                    style={{
                                                        backgroundImage: `url(${category.image})`,
                                                        backgroundRepeat:
                                                            'no-repeat',
                                                        backgroundSize:
                                                            'contain',
                                                        backgroundPosition:
                                                            'center',
                                                    }}
                                                    className="yaxshi-categoriyalar-image"></div>
                                            </div>
                                            <div className="ps-block__content d-flex justify-content-center align-items-center my-1">
                                                <h4 className="text-truncate text-uppercase">
                                                    {category.name}
                                                </h4>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="yaxshi-categ-placholder-box">
                            {[1, 2, 3, 4, 5, 6].map((item, i) => {
                                return (
                                    <div
                                        className="card"
                                        aria-hidden="true"
                                        key={i}>
                                        <div
                                            className="card-img-top placeholder"
                                            alt="..."
                                        />
                                        <div className="card-body">
                                            <p className="card-text placeholder-glow">
                                                <span className="placeholder col-7"></span>
                                                <span className="placeholder col-6"></span>
                                                <span className="placeholder col-6"></span>
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <div className=" more-parent">
                        <div className="more">
                            <Link href="/topCategory/categories">
                                <a>
                                    Ko'proq
                                    <i
                                        className="fa-solid fa-angles-right fa-beat-fade"
                                        style={{
                                            fontSize: '13px',
                                            paddingTop: '1px',
                                            paddingLeft: '5px',
                                        }}></i>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ElectronicTopCategories;
