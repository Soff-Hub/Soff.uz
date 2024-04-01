import React from 'react';
import Link from 'next/link';
import ProductRepository from '~/repositories/ProductRepository';
import { useState } from 'react';
import { useEffect } from 'react';
import NextImageCard from './nextImagecard';

const CatalogTop = () => {
    const [data, setData] = useState(null);

    const getCategoryData = async () => {
        const res = await ProductRepository.getMoreTopCategorys();
        if (res) {
            setData(res.results);
        }
    };

    useEffect(() => {
        getCategoryData();
    }, []);
    return (
        <div className="ps-top-categories">
            <div className=" container row">
                <h3 className="mb-5">Kategoriyalar</h3>
                <div className="col-md-12 ">
                    <div
                        className="ps-block--categories-grid row"
                        data-mh="catalog-top">
                        {data?.length > 0 &&
                            data?.map((category, index) => {
                                return (
                                    <div
                                        key={index}
                                        className=" ps-block--category-2 col-xl-3  ">
                                        <div
                                            className="ps-block__thumbnail"
                                            style={{ overflow: 'hidden' }}>
                                            {category?.image ? (
                                                <NextImageCard
                                                    url={category?.image}
                                                    clasS="category-image"
                                                    width="280px"
                                                    height="280px"
                                                />
                                            ) : (
                                                <img src="/static/img/faq-folder-5557635-4639344.webp" />
                                            )}
                                        </div>
                                        <div className="ps-block__content">
                                            {
                                                category?.child?.length > 0 ?
                                            <h4>
                                                <Link
                                                    href={`/category/${category?.slug}`}>
                                                    <a>{category?.name}</a>
                                                </Link>
                                            </h4>
                                                    :
                                                    <h4>
                                                   {category?.name}
                                                </h4>  
                                            }
                                            <ul>
                                                {category?.child?.length > 0 && category?.id !== 46 && category?.id !== 47 && category?.id !== 55 ?
                                                    category?.child
                                                        .slice(0, 3)
                                                        .map((link) => {
                                                            return (
                                                                <>
                                                                    <li
                                                                        key={
                                                                            link
                                                                        }>
                                                                        <Link
                                                                            href={`/category/${link?.slug}`}
                                                                            as={`/category/${link?.slug}`}>
                                                                            <a>
                                                                                {
                                                                                    link?.name
                                                                                }
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                </>
                                                            );
                                                        }) : 
                                                        <li>
                                                            Tez kunda...
                                                        </li>
                                                        
                                                        }
                                                {category?.child?.length  >
                                                    0 && category.id !== 46 && category.id !== 47 && category.id !== 55 && (
                                                    <li>
                                                        <Link
                                                            href={`/category/${category.slug}`}
                                                            as={`/category/${category.slug}`}>
                                                            <a className="pt-2 text-success">
                                                                Ko'proq
                                                                <i
                                                                    className="fa-solid fa-angles-right fa-beat-fade"
                                                                    style={{
                                                                        fontSize:
                                                                            '13px',
                                                                        paddingTop:
                                                                            '1px',
                                                                        paddingLeft:
                                                                            '5px',
                                                                    }}></i>
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )}
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CatalogTop;
