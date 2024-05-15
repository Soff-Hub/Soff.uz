import React from 'react';
import Link from 'next/link';


const ProductSearchResult = ({ product }) => {

    return (
        <div className='search_products_head'>
            <div className="search_products_box_cards">
                <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                    <a>
                        <span className='body_span_title' style={{color: "gray" }}>
                            <span style={{ fontWeight: "600", color: "gray" }}>{product?.category_data?.parent}</span> | {product?.category_data?.category}</span>
                        <h4 className='title_elh44'><i className={`fa-solid 
                fa-${product?.content_type === "video" ? "video" :
                                product?.content_type === "audio" ? "music" :
                                    product?.content_type === "template" ? "file-lines" : "file"



                            } mr-2`}></i>  {product?.title}</h4></a>
                </Link>

            </div>
        </div>
    );
};
export default ProductSearchResult;
