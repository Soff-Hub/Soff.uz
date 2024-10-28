import Link from 'next/link'
import React from 'react'
import FreeBtn from '~/components/elements/FreeBtn';
import { formatCurrencyWithSpace } from '~/utilities/product-helper'

export default function TemplateCard(props) {
    return (
        <div className={`file-card ${props?.tab}`}>
            <div className="file-card-inner">
                <div className="file-card-img">
                    <Link href={`/product/${props?.props?.slug}`}>
                        <a>
                            <img
                                src={`${props?.poster_url || 'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:test/media/poster/IMG_0989.PNG'}`}
                                className='file-card-imge'
                                alt=''
                            />
                        </a>
                    </Link>

                    <div className="wishlist-item-actions">
                        <i className="fa-regular fa-heart fs-2 m-0"></i>
                    </div>
                </div>
                <div className="file-card-content">
                    <Link href="#">
                        <a>
                            <h3 className='file-card-title'>
                                {props?.title}
                            </h3>
                        </a>
                    </Link>
                    <Link href={`/seller/${props?.seller?.id}`}>
                        <a className='d-flex align-items-center gap-2 mt-2'>
                            <i className="fa-solid fa-user"></i>
                            <p className='file-card-seller m-0'>
                                {props?.seller?.fullname}
                            </p>
                        </a>
                    </Link>

                    <div className='py-3 mt-auto'>
                        {props?.demo_link ? <div className="view-on-demo-btn">
                            <Link href={props?.demo_link || '#'}>
                                <a target='_blank'>
                                    Demo ko'rish
                                </a>
                            </Link>
                        </div> : ''}
                    </div>

                    {props?.discount_price > 0 ? <div className="file-card-bottom">
                        <ins className='file-card-price'>{formatCurrencyWithSpace(props?.discount_price)} so'm</ins>
                        <div className='file-card-buy-actions'>
                            <img src="/static/img/add-cart.png" height={20} />
                        </div>
                    </div> : <div className='mt-2'>
                        <FreeBtn url={props?.file_url} />
                    </div>}
                </div>
            </div>
        </div>
    )
}
