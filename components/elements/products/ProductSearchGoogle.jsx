import React from 'react';
import Link from 'next/link';

const ProductSearchGoogle = ({ product }) => {



    // let view;
    // if (product.sale_price) {
    //     view = (
    //         <p className="">
    //             {product.discount_price !== 0 ? (
    //                 <>
    //                     {formatCurrency(product.sale_price)}
    //                     <span> so'm</span>
    //                     <del className="ml-2">
    //                         {formatCurrency(product.price)}
    //                         <span> so'm</span>
    //                     </del>
    //                 </>
    //             ) : (
    //                 <p className="text-warning border  border-warning px-3 rounded-3 m-0 p-0 mt-1" style={{ maxWidth: "60px" }}>
    //                     Bepul
    //                 </p>
    //             )}
    //         </p>
    //     );
    // } else {
    //     view = (
    //         <p className="ps-product__price">
    //             {product.discount_price === 0 ? (
    //                 <>
    //                     <p className="text-warning border  border-warning px-3 rounded-3 m-0 p-0 mt-1" style={{ maxWidth: "60px" }}>
    //                         Bepul
    //                     </p>
    //                 </>
    //             ) : (
    //                 <>
    //                     {formatCurrency(product.price)}{' '}
    //                     <span> so'm</span>
    //                 </>
    //             )}
    //         </p>
    //     );
    // }

    console.log(product);

    return (
        <div className='search_products_head'>
            <div className="search_products_box_cards">
                <Link href={"https://soff.uz"}>
                    <a><p className='body_span_title'>https://soff.uz</p></a>
                </Link>
                <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                    <a> <h4 className='title_elh4'><i className={`fa-solid 
                    fa-${product?.document?.content_type==="video" ? "video" :
                    product?.document?.content_type==="audio" ? "music" : 
                    product?.document?.content_type==="template" ? "file-lines" : "file"



                    } mr-2`}></i>  {product?.title}</h4></a>
                </Link>

                <p className='descripton_title'>

                    Write a small description of what you have done in the company and what you learned. Try to be not too detailed. Write two to three lines of text. {product?.title}
                </p>
            </div>
        </div>
    );
};
export default ProductSearchGoogle;
