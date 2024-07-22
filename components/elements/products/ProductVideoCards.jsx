import React from 'react';
import Link from 'next/link';
import ModuleProductVideoActions from './modules/ModuleProductVideoActions';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import Router from 'next/router';
import DefaultVideoLists from '../detail/thumbnail/DefaultVideoLists';


const ProductVideoCards = ({ product, isPlay, setIsPlay, type }) => {

    return (
        <div className="d-flex gap-3 "
        >
            <Link href="/product/[pid]" as={`/product/${product.slug}`} >
                <a
                >
                    <DefaultVideoLists
                        isPlay={isPlay}
                        setIsPlay={setIsPlay}
                        product={product}

                        minWidth={type === "playlists" ? "100px" : "120px"}
                        height={type === "playlists" ? "56px" : "70px"}
                        style={{ maxWidth: type === "playlists" ? '100px' : '120px', objectFit: 'contain', borderRadius: '5px' }}
                    />
                </a>
            </Link>

            <div className="  d-flex flex-column  justify-content-between w-100 ">
                <h5 onClick={() => Router.push(`/product/${product.slug}`)}
                    style={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: type === "playlists" ? 2 : 3,
                        fontFamily: "Roboto, Arial, sans-serif",
                        lineHeight: "2rem",
                        whiteSpace: "normal",
                        fontWeight: type === "playlists" ? 600 : 500,
                        fontSize: type === "playlists" ? "13px" : "14px",
                        cursor: "pointer"
                    }}>{product?.title}</h5>

                {type === "playlists" ? <></> :
                    <div className="d-flex justify-content-between align-items-end">
                        {+product.discount_price === 0 ? (
                            <p className="px-3 m-0 text-warning rounded" style={{ border: "1.5px solid #FFC107", fontSize: "10px" }}>Bepul</p>
                        ) : (
                            <p className='m-0 fw-bold fs-5'>
                                {addPeriodToThousands(product.discount_price)} so'm
                            </p>
                        )}
                        <ModuleProductVideoActions product={product} />
                    </div>}

            </div>
        </div>
    );
};

export default ProductVideoCards;
