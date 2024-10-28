import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { formatCurrencyWithSpace } from '~/utilities/product-helper'
import PremiumBadge from './PremiumBadge'

export default function AudioCard(props) {
    const { title, discount_price, poster_url, seller, slug } = props

    return (
        <div className={`file-card audio`}>
            <div className="file-card-inner">
                {discount_price > 0 && <div className="audio-premium-badge">
                    <PremiumBadge />
                    <p>Pullik</p>
                </div>}
                <div className="file-card-img">
                    <Link href={`/product/${slug}`}>
                        <a>
                            <img
                                src={`${poster_url || 'https://eu2.contabostorage.com/20ddac7ab90d4d188d1ca104120b91ed:test/media/poster/IMG_0989.PNG'}`}
                                className='file-card-imge'
                                alt=''
                            />
                        </a>
                    </Link>
                </div>
                <div className="file-card-content">
                    <div className="audio-card-play">
                        <i className="fa-solid fa-play fs-2 m-0"></i>
                    </div>
                    <Link href={`/product/${slug}`}>
                        <a>
                            <h3 className='file-card-title text-truncate'>
                                {title}
                            </h3>
                        </a>
                    </Link>
                    <Link href={`/seller/${seller?.id}`}>
                        <a>
                            <p className='file-card-seller m-0'>
                                {seller?.fullname}
                            </p>
                        </a>
                    </Link>
                    {/* <div className="file-card-bottom">
                        <ins className='file-card-price'>{formatCurrencyWithSpace(discount_price)} so'm</ins>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
