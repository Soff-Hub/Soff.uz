import React from 'react';
import Link from 'next/link';

const ProductSearchGoogle = ({ product }) => {

    return (
        <div className='search_products_head'>
            <div className="search_products_box_cards ">
                <Link href="/product/[pid]" as={`/product/${product.slug}`}>

                    <a>
                        <span className='body_span_title ' style={{ color: "gray" }}>
                            <span style={{ fontWeight: "600", color: "gray" }}>

                                {product?.category_data?.parent}</span> {product?.category_data?.parent ? "|" : "Playlist"} {product?.category_data?.category}

                        </span>

                        <h4 className='title_elh4 d-flex align-items-center'>
                            <i className={`fa-solid 
                    fa-${product?.content_type === "video" ? "video" :
                                    product?.content_type === "audio" ? "music" :
                                        product?.content_type === "template" ? "file-lines" :
                                            product?.content_type === "file" ? "file" : ""



                                } mr-2`}></i>
                            {product?.type === "playlist" && <img src="./static/img/playlists.png" className='mr-2 ' alt="playlists" width={22} height={22} />}

                            {product?.title}  </h4></a>
                </Link>

                <p className='descripton_title'>
                    {product?.description}
                </p>
                <p>
                    {product?.file_type && <strong style={{ fontWeight: "600", color: "gray" }} >Turi: {product?.file_type} </strong>}
                    {product?.file_size && <strong style={{ fontWeight: "600", color: "gray" }} className='mx-2'>Hajmi: {product?.file_size} </strong>}
                    {product?.page_count && <strong style={{ fontWeight: "600", color: "gray" }} className='mx-2'>Sahifalar soni: {product?.page_count} </strong>}
                </p>
            </div>
        </div>
    );
};
export default ProductSearchGoogle;
