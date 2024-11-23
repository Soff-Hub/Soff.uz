import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function ProductSellerInfo({ data }) {
    return (
        <div className='d-flex justify-content-start product-seller-info'>
            <Link href={'/seller/' + data?.id}>
                <a>
                    <div style={{ backgroundColor: '#F6F5F2', borderRadius: '22px' }} className='p-2 d-flex align-items-center gap-2 text-truncate'>
                        <div style={{ height: 25, width: 25 }}>
                            <Image
                                height={25}
                                width={25}
                                src={data?.image_url || `https://robohash.org/${data?.id}?bgset=bg1`}
                                alt={"product?.title"}
                                objectFit='cover'
                                style={{
                                    borderRadius: '50%',
                                    display: 'block !important',
                                    verticalAlign: 'middle !important'
                                }}
                                layout='responsive'
                            />
                        </div>
                        <h5 className='m-0 pr-4 user-field' style={{ fontWeight: 500 }}>{data?.first_name} {data?.last_name}</h5>
                    </div>
                </a>
            </Link>
        </div>
    )
}
