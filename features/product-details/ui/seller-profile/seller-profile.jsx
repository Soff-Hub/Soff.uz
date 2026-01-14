import { Button, Rate } from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setActiveIndex } from '~/store/seller/slice';

function SellerProfile({ product }) {
    const { t } = useTranslation('product-pages');
    const router = useRouter();
    const dispatch = useDispatch();

    const handleOrder = () => {
        router.push(`/seller/${product?.seller?.id}`);
        dispatch(setActiveIndex('services'));
    };

    return (
        <div className="seller_products_actions_secound">
            <div className="seller_profile">
                <div className="img_container">
                    <Image
                        src={
                            product?.seller?.image_url ||
                            '/static/img/ozodbek.png'
                        }
                        alt={t('productDetail.sellerProfile.sellerImage')}
                        height={200}
                        width={200}
                    />
                </div>
                <div>
                    <span
                        style={{
                            color: 'gray',
                        }}>
                        {t('productDetail.sellerProfile.author')}
                    </span>
                    <Link href={`/seller/${product?.seller?.id}`}>
                        <a>
                            <h3 className="sellerNameHover">
                                {product?.seller?.first_name}{' '}
                                {product?.seller?.last_name}
                            </h3>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="w-100 d-flex flex-column gap-3">
                <div className="w-100 d-flex align-items-center fs-3 gap-2">
                    <i className="fa-solid text-success fs-3 fa-circle-check"></i>
                    <span>
                        {t('productDetail.sellerProfile.totalProducts')}
                    </span>
                    <span>
                        {product.seller.total_approved_documents
                            ? product.seller.total_approved_documents
                            : 0}{' '}
                        {t('productDetail.sellerProfile.countUnit')}
                    </span>
                </div>
                <div className="w-100 d-flex align-items-center fs-3 gap-2">
                    <i className="text-success fs-3 fa-solid fa-briefcase"></i>
                    <span>{t('productDetail.sellerProfile.soldProducts')}</span>
                    <span>
                        {product.seller.total_sold_documents > 0
                            ? product.seller.total_sold_documents
                            : 0}{' '}
                        {t('productDetail.sellerProfile.countUnit')}
                    </span>
                </div>
            </div>
            {/* <Button
                iconPosition="end"
                style={{ height: '58px', fontSize: '20px' }}
                type="primary"
                className="w-100 seller_profile_button"
                icon={<i className="fa-solid fa-rocket"></i>}
                size={'large'}
                onClick={handleOrder}>
                Buyurtma berish
            </Button> */}
        </div>
    );
}

export default SellerProfile;
