import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import CollectionRepository from '~/repositories/CollectionRepository';

function ElectronicTopCategories() {
    const [category, getCategory] = useState([]);

    async function getCategoryData() {
        const responsData = await CollectionRepository.getCategoryData(
            `customer/category-list/`
        );
        if (responsData) {
            getCategory(responsData);
        }
    }

    useEffect(() => {
        getCategoryData();
    }, []);

    return (
        <div className="ps-top-categories">
            <div className="container">
                <h3>Oyning eng yaxshi kategoriyalari</h3>
                <div className="yaxshi-categoriyalar">
                    {category ? (
                        category.map((category) => (
                            <div className="col-xl-2 col-lg-2 col-sm-4 col-xs-4 col-5 ">
                                <Link
                                    key={category.id}
                                    href="/category/[pid]"
                                    as={`/category/${category.id}`}>
                                    <a>
                                        <div
                                            className="ps-block--category-2 top-category-items "
                                            style={{ cursor: 'pointer' }}>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignContent: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                             
                                                <div style={{
                                                    backgroundImage:`url(${category.image})`,
                                                    backgroundRepeat:'no-repeat',
                                                    backgroundSize:'cover',
                                                    backgroundPosition:'center'
                                                }}
                                                className="yaxshi-categoriyalar-image"
                                                ></div>
                                            </div>
                                            <div className="ps-block__content d-flex justify-content-center align-items-center my-1">
                                                <h4>{category.name}</h4>
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
                                    <div className="card" aria-hidden="true">
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
            </div>
        </div>
    );
}

export default ElectronicTopCategories;
