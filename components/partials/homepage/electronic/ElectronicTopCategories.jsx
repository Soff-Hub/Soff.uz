import React, { Component, useEffect, useState } from 'react';
import Link from 'next/link';
import CollectionRepository from '~/repositories/CollectionRepository';

function ElectronicTopCategories() {

      
        const [category, getCategory] = useState([])

        async function getCategoryData() {
            const responsData = await CollectionRepository.getCategoryData( `customer/category-list/`)
            if (responsData) {
                getCategory(responsData)
            }
        }

        useEffect(() => {
            getCategoryData()
        }, [])

        console.log(category);

        return (
            <div className="ps-top-categories">
                <div className="container">
                    <h3>Oyning eng yaxshi kategoriyalari</h3>
                    <div className="row">
                        {category.map(category => (
                           <Link href="/product/[pid]" as={`/product/${category.id}`} >
                            <div className="col-md-2 col-sm-3 col-16 " key={category.id} >
                                <div className="ps-block--category-2 top-category-items " style={{cursor:'pointer'}}>
                                    <div>
                                       <img src={category.image} alt="banner" />
                                    </div>
                                    <div className="ps-block__content d-flex justify-content-center align-items-center my-2" >
                                        <h4>{category.name}</h4>
                                    </div>
                                </div>
                            </div>
                           </Link>
                        ))}
                    </div>
                </div>
            </div>
        );
}

export default ElectronicTopCategories;
