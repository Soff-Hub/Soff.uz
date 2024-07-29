import React from 'react';
import Link from 'next/link';
import useProduct from '~/hooks/useProduct';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import PlaylistVideo from '../detail/thumbnail/PlaylistVideo';
import { useRouter } from 'next/router';


const PlaylistCard = ({ product }) => {
    const { title } = useProduct();
    const Router = useRouter();


    return (
        <div
            className="borderVideeo-2"
            style={{ boxShadow: "rgba(149, 157, 165, 0.2) 0px 5px 14px", borderRadius: '14px' }}

        >
            <div
                style={{
                    margin: '0 auto',
                }}>
                <Link href="/product/[pid]" as={`/product/${product.slug}`} >
                    <a
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: Router.pathname !== "/" ? '150px' : '210px',
                            objectFit: 'cover',
                        }}>
                        <PlaylistVideo product={product} class_products={true} />
                    </a>
                </Link>

            </div>
            <div className=" py-3">
                <div className="" style={{ display: 'flex', padding: '0 10px', justifyContent: 'space-between', gap: '10px' }}>
                    <h4 className='text-truncate fw-bold' style={{ lineHeight: '31px' }}>{title(product)}</h4>

                </div>
                <div className="ps-product__content card-narx-box" style={{ padding: '0 10px' }}>
                    {
                        product?.seller &&
                        <Link href="/seller/[pid]"
                            as={`/seller/${product?.seller?.id}`} className='mr-auto m-0'>{`${product?.seller?.first_name} ${product?.seller?.last_name}`}</Link>
                    }
                    <div className="d-flex justify-content-between align-items-center py-2">
                        {+product.price === 0 ? (
                            <></>
                        ) : <p className='m-0 fw-bold'>
                            {addPeriodToThousands(product.price)} so'm
                        </p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaylistCard;
