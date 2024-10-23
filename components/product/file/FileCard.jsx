import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { formatCurrencyWithSpace } from '~/utilities/product-helper'

export default function FileCard({ title, discount_price, poster_url }) {
    return (
        <div className='file-card'>
            <div className="file-card-inner">
                <div className="file-card-img">
                    <Link href="#">
                        <a>
                            <Image
                                src={`${poster_url}`}
                                width={500}
                                height={300}
                                quality={75}
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
                                {title}
                            </h3>
                        </a>
                    </Link>
                    <div className="file-card-bottom">
                        <ins className='file-card-price'>{formatCurrencyWithSpace(discount_price)} so'm</ins>
                        <div className='file-card-buy-actions'>
                            <img src="/static/img/add-cart.png" height={20} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
