import React from 'react';
import shopCategories from '~/public/static/data/shopCategories';
import Link from 'next/link';
import ProductRepository from '~/repositories/ProductRepository';
import { useState } from 'react';
import { useEffect } from 'react';

const CatalogTop = () => {
    const [data, setData] = useState(null)

    const getCategoryData = async () => {
        const res = await ProductRepository.getMoreTopCategorys()
        if (res) {
            console.log(res.results);
            setData(res.results)
        }
    }

    useEffect(() => {
        getCategoryData()
    }, [])

    return (
        <div className="ps-catalog-top">
        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div
                    className="ps-block--categories-grid row"
                    data-mh="catalog-top">
                    { data?.length > 0 && data?.map((category, index) => {
                        return (
                            <div
                                key={index}
                                className=" ps-block--category-2 col-xl-3 ">
                                <div className="ps-block__thumbnail" style={{overflow:'hidden'}} >
                                    {
                                        category?.image ?
                                        <img
                                        className='category-image'
                                            src={category.image}
                                            alt="soff category image"
                                        /> :
                                        <img src='/static/img/eliminate-errors-manual-intervention-by-260nw-2006226221.webp' />
                                    }
                                </div>
                                <div className="ps-block__content">
                                    <h4>
                                        <Link href={`/category/${category.id}`}>
                                        <a>{category.name}</a>
                                        </Link>
                                    </h4>
                                    <ul>
                                        {category.child &&
                                            category.child.map((link) => {
                                                return (
                                                    <>
                                                        <li key={link}>
                                                            <Link
                                                                href={`/category/${link.id}`}
                                                                as={`/category/${link.id}`}>
                                                                <a>{link.name}</a>
                                                            </Link>
                                                        </li>
                                                    </>
                                                );
                                            })}
                                        <li>
                                            <Link
                                                href={`/category/${category.id}`}
                                                as={`/category/${category.id}`}>
                                                <a>Ko'proq...</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    </div>
    )
}

export default CatalogTop;
