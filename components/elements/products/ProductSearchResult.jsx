import React from 'react';
import Link from 'next/link';
import Router from 'next/router';


const ProductSearchResult = ({ product, close }) => {

    const click = () => {
        Router.push(`/product/${product.slug}`)
        close?.()
    }

    return (
        <div className='search_products_head'>
            <div className="search_products_box_cards">
                <div style={{ cursor: 'pointer' }} onClick={click}>
                    <a className='d-flex flex-column gap-1'>
                        <span className='body_span_title ' style={{ color: "gray" }}>
                            <span style={{ fontWeight: "600", color: "gray" }}>{product?.category_data?.parent}</span> | {product?.category_data?.category}</span>
                        <h4 className='title_elh44'><i className={`fa-solid 
                fa-${product?.content_type === "video" ? "video" :
                                product?.content_type === "audio" ? "music" :
                                    product?.content_type === "template" ? "file-lines" : "file"



                            } mr-2`}></i>  {product?.title}</h4>
                        <p className='m-0 fs-5'>
                            {product?.file_type && <strong style={{ fontWeight: "600", color: "gray" }} >Turi: {product?.file_type} </strong>}
                            {product?.file_size && <strong style={{ fontWeight: "600", color: "gray" }} className='mx-2'>Hajmi: {product?.file_size} </strong>}
                            {product?.page_count && <strong style={{ fontWeight: "600", color: "gray" }} className='mx-2'>Sahifalar soni: {product?.page_count} </strong>}
                        </p>
                    </a>

                </div>

            </div>
        </div>
    );
};
export default ProductSearchResult;
