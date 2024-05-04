import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';


const ProductSearchResult = ({ product }) => {
    const { price, title } = useProduct();

    return (
        <div className=" ps-product--wide ps-product--search-result border mb-3 mx-2 shadow-sm" style={{ height: "83px" }}>
            <div style={{ height: "83px", maxWidth: "70px", marginRight: "20px", }}>
                <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                    <a>
                        <div
                            style={{
                                backgroundImage: product?.poster_url ? `url(${product?.poster_url})` : "url(/static/img/docCopy.png)",
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                border: "1px solid green",
                                height: "83px", width: "70px",
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
                                product?.document?.content_type === 'file' || product?.document?.content_type === 'template' && (<i
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
                {price(product)}
            </div>
        </div>
    );
};
export default ProductSearchResult;
