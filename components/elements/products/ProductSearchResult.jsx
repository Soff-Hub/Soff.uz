import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import LazyLoad from 'react-lazyload';

const ProductSearchResult = ({ product }) => {
    const { price, title } = useProduct();
    return (
        <div className=" ps-product--wide ps-product--search-result border mb-3 mx-2 shadow-sm" style={{ height: "83px" }}>
            <div className="ps-product__thumbnail" style={{ height: "83px", }}>
                <Link href="/product/[pid]" as={`/product/${product.slug}`}>
                    <a>
                        <LazyLoad>
                            {product?.poster_url ? (
                                <div  style={{ overflow: 'hidden', display:'flex', justifyContent:'center' }}>
                                    <div
                                        style={{
                                            backgroundImage: `url(${product?.poster_url})`,
                                            backgroundSize: 'contain',
                                            backgroundRepeat: 'no-repeat',
                                            backgroundPosition: 'center',
                                            border: "1px solid green",
                                            height: "83px", width: "70px",
                                        }}
                                        className="m-0 "></div>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        backgroundImage: `url(/static/img/docCopy.png)`,
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        border: "1px solid green",
                                            height: "83px", width: "70px",
                                    }}
                                    className="placholder-hujjat "></div>
                            )}
                        </LazyLoad>

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
