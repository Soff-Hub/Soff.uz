import React from 'react'
import Link from 'next/link'
import Videoplayer from './Videoplayer'
import PremiumBadge from '../audio/PremiumBadge'

export default function VideoCard(product) {

    return (
        <div className="video-card-container">
            {product?.discount_price > 0 && <div className="audio-premium-badge" style={{ zIndex: 7, top: '40px', left: 10 }}>
                <PremiumBadge />
                <p>Pullik</p>
            </div>}
            <Link href="/product/[pid]" as={`/product/${product?.slug}`} >
                <a
                >
                    <Videoplayer product={product} type='list' className='miniplayer' />
                </a>
            </Link>
            <div className='video-card-content'>
                <h3 className='text-truncate video-card-title m-0'>{product?.title}</h3>
            </div>
            <Link href={`/seller/${product?.seller?.id}`}>
                <a>
                    <div className='video-card-info'>
                        <i className="fa-solid fa-user"></i>
                        <h3 className='text-truncate video-card-title m-0'>{product?.seller?.fullname}</h3>
                    </div>
                </a>
            </Link>
        </div>
    )
}
