import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { formatCurrency } from '~/utilities/product-helper';


const ProductSearchResult = ({ product }) => {
    const { title } = useProduct();

    let view;
    if (product.sale_price) {
        view = (
            <p className="">
                {product.discount_price !== 0 ? (
                    <>
                        {formatCurrency(product.sale_price)}
                        <span> so'm</span>
                        <del className="ml-2">
                            {formatCurrency(product.price)}
                            <span> so'm</span>
                        </del>
                    </>
                ) : (
                    <p className="text-warning border  border-warning px-3 rounded-3 m-0 p-0 mt-1" style={{maxWidth:"60px"}}>
                        Bepul
                    </p>
                )}
            </p>
        );
    } else {
        view = (
            <p className="ps-product__price">
                {product.discount_price === 0 ? (
                    <>
                        <p className="text-warning border  border-warning px-3 rounded-3 m-0 p-0 mt-1" style={{maxWidth:"60px"}}>
                            Bepul
                        </p>
                    </>
                ) : (
                    <>
                        {formatCurrency(product.price)}{' '}
                        <span> so'm</span>
                    </>
                )}
            </p>
        );
    }


    return (
        <div className=" ps-product--wide ps-product--search-result border mb-3 mx-2 shadow-sm" style={{ height: "75px" }}>
            <div style={{ height: "75px", maxWidth: "70px", marginRight: "20px", }}>
                <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                    <a>
                        <div
                            style={{
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                border: "1px solid green",
                                height: "73px", width: "70px",
                                position: "relative"
                            }}
                            className="m-0 ">
                            {
                                product?.document?.content_type === 'audio' && (<i
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        color: "green"
                                    }}
                                    className={`fa-solid fa-headphones  fa-2x `}
                                ></i>)
                            }
                            {
                                (product?.document?.content_type === 'file') && (<i
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        color: "green"
                                    }}
                                    className={`fa-solid fa-file fa-2x `}
                                ></i>)
                            }
                            {
                                (product?.document?.content_type === 'template') && (<i
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        color: "green"
                                    }}
                                    className={`fa-solid fa-file-lines fa-2x `}
                                ></i>)
                            }

                            {
                                product?.document?.content_type === 'video' && (<i
                                    style={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        color: "green"
                                    }}
                                    className={`fa-solid fa-video fa-2x `}
                                ></i>)
                            }
                        </div>

                    </a>
                </Link>

            </div>
            <div className="ps-product__content ps-product__content--search text-truncate ">
                {title(product)}
                {view}
            </div>
        </div>
    );
};
export default ProductSearchResult;
