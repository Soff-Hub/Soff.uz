import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import FreeBtn from '~/components/elements/FreeBtn'
import { formatCurrencyWithSpace } from '~/utilities/product-helper'

export default function FileCard(props) {
    const { title, discount_price, poster_url, document, file_url, slug } = props

    return (
        <div className={`file-card ${document?.content_type}`}>
            <div className="file-card-inner">
                <div className="file-card-img">
                    <Link href={`/product/${slug}`}>
                        <a>
                            <img
                                // loading='lazy'
                                src={`${poster_url || 'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:soffuz/media/Screenshot_from_2023-10-14_20-57-14.png'}`}
                                // width={500}
                                // height={300}
                                // quality={50}
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
                    <Link href={`/product/${slug}`}>
                        <a>
                            <h3 className='file-card-title'>
                                {title}
                            </h3>
                        </a>
                    </Link>
                    {
                        discount_price > 0 ? <div className="file-card-bottom mt-2">
                            <ins className='file-card-price'>{formatCurrencyWithSpace(discount_price)} so'm</ins>
                            <div className='file-card-buy-actions'>
                                <img src="/static/img/add-cart.png" height={20} />
                            </div>
                        </div> : <FreeBtn url={file_url} />
                    }
                </div>
            </div>
        </div>
    )
}
