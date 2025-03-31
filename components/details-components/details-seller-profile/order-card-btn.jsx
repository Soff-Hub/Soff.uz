import { Button, Rate } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function OrderCardBtn({ product }) {
    const router = useRouter()

    return (
        <div className='seller_products_actions_secound'>
            <div className='seller_profile'>
                <div className='img_container'>
                    <Image
                        src={
                            product?.seller?.image_url ||
                            '/static/img/ozodbek.png'
                        }
                        alt='seller-profile'
                        height={200}
                        width={200}
                    />
                </div>
                <div>
                    <Link
                        href='/seller/[pid]'
                        as={`/seller/${product.seller.id}`}>
                        <h3 className='pointer'>
                            {product?.seller?.first_name}{' '}
                            {product?.seller?.last_name}
                        </h3>
                    </Link>

                    {/* <Rate allowHalf defaultValue={3.5} /> */}
                </div>
            </div>
            <div className='seller_profile'>
                <div className='d-flex align-items-center'>
                    <p style={{ fontSize: 36 }}>🔍</p>
                    <p className='ms-3 font-weight-bold' style={{ fontSize: 22, color: '#312F30' }}>
                        Izlaganingizni topa olmadingizmi?
                    </p>

                    {/* <Rate allowHalf defaultValue={3.5} /> */}
                </div>
            </div>
            <div className='w-100 d-flex flex-column gap-3'>
                <div className='w-100 d-flex align-items-center fs-3 gap-2'>
                    <i className='fa-solid text-success fs-2 fa-user'></i>
                    <span>Balki uni aynan siz uchun yaratish kerakdir! </span>
                </div>
                <div className='w-100 d-flex align-items-center fs-3 gap-2'>
                    <i className='fa-solid text-success fs-2 fa-circle-check'></i>
                    <span>Sizga mos yechim tayyorlaymiz!</span>
                </div>
            </div>
            <Button
                iconPosition='end'
                style={{ height: '58px', fontSize: '20px' }}
                type='primary'
                className='w-100 seller_profile_button'
                icon={<i className='fa-solid fa-rocket'></i>}
                size={'large'}
                onClick={() => router.push("/orders")}>
                Buyurtma berish
            </Button>
        </div>
    );
}

export default OrderCardBtn;
