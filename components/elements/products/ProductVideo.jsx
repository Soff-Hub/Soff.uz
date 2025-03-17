import React, { useState } from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import ModuleProductVideoActions from './modules/ModuleProductVideoActions';
// import DefaultVideo from '../detail/thumbnail/DefaultVideo';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';


const ProductVideo = ({ product, isPlay, setIsPlay, iscategroy = false }) => {
    const { title } = useProduct();
    const [countShow, setCountShow] = useState(false);



    return (
        <div className="borderVideeo" style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 5px 14px" }}

            onMouseEnter={() => setCountShow(true)}
            onMouseLeave={() => setCountShow(false)}>

            <div
                style={{
                    margin: '0 auto',
                }}>
                <Link href="/product/[pid]" as={`/product/${product.slug}`} >
                    <a
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: iscategroy ? '160px' : '210px',
                            objectFit: 'cover'
                        }}>
                        {/* <DefaultVideo isPlay={isPlay} setIsPlay={setIsPlay} product={product} class_products={true} */}
                        
                        />
                    </a>
                </Link>

            </div>
            <div className=" py-3">
                <div className="" style={{ display: 'flex', padding: '0 10px', justifyContent: 'space-between', gap: '10px' }}>
                    <h4 className='text-truncate fw-bold' style={{ lineHeight: '31px', overflow: 'hidden' }}>{title(product)}</h4>
                    {
                        (product?.views_count || product?.views_count === 0) &&
                        <p className='text-end mb-0 mt-1'
                            style={{
                                fontSize: "12px",
                                opacity: countShow ? "1" : "0",
                                transition: "opacity 0.3s linear"
                            }}
                        ><i
                            style={{
                                fontSize: "10px",
                            }}
                            className='fa-solid fa-eye '></i> {product?.views_count}</p>
                    }

                </div>
                <div className="ps-product__content card-narx-box" style={{ padding: '0 10px' }}>
                    {
                        product?.seller &&
                        <Link href="/seller/[pid]"
                            as={`/seller/${product?.seller?.id}`} className='mr-auto m-0'>{`${product?.seller?.first_name} ${product?.seller?.last_name}`}</Link>
                    }
                    <div className="d-flex justify-content-between align-items-center">
                        {+product.discount_price === 0 ? (
                            <p className="free-audio-price px-3 mt-1 text-warning rounded" style={{ border: "1.5px solid #FFC107" }}>Bepul</p>
                        ) : product.discount === 0 ? (
                            <p className='m-0 fw-bold'>
                                {addPeriodToThousands(product.discount_price)} so'm
                            </p>
                        ) : (
                            <>
                                <del>
                                    {addPeriodToThousands(product.price)} so'm
                                </del>
                                <p className='m-0 fw-bold'>
                                    {addPeriodToThousands(product.discount_price)}
                                    so'm
                                </p>
                            </>
                        )}
                        <ModuleProductVideoActions product={product} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductVideo;
