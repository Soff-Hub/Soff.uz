import { Button, Rate } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function SellerProfile({ product }) {
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
                        as={`/seller/${product?.seller?.id}`}>
                        <h3 className='pointer'>
                            {product?.seller?.first_name}{' '}
                            {product?.seller?.last_name}
                        </h3>
                    </Link>

                    {/* <Rate allowHalf defaultValue={3.5} /> */}
                </div>
            </div>
            <div className='w-100 d-flex flex-column gap-3'>
                <div className='w-100 d-flex align-items-center fs-3 gap-2'>
                    <i className='fa-solid text-success fs-3 fa-circle-check'></i>
                    <span>Jami mahsulotlar soni:</span>
                    <span> 87 ta</span>
                </div>
                <div className='w-100 d-flex align-items-center fs-3 gap-2'>
                    <i className='text-success fs-3 fa-solid fa-briefcase'></i>
                    <span>Sotilgan mahsulotlar soni:</span>
                    <span> 625 ta</span>
                </div>
            </div>
            <Button
                iconPosition='end'
                style={{ height: '58px', fontSize: '20px' }}
                type='primary'
                className='w-100 seller_profile_button'
                icon={<i className='fa-solid fa-rocket'></i>}
                size={'large'}>
                Buyurtma berish
            </Button>
        </div>
    );
}

export default SellerProfile;
