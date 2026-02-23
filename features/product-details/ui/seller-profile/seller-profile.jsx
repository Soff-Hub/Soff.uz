import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { setActiveIndex } from '~/store/seller/slice';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaBriefcase } from 'react-icons/fa6';

function SellerProfile({ product }) {
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
                        alt="seller-profile"
                        height={200}
                        width={200}
                    />
                </div>
                <div className="d-flex flex-column justify-content-center">
                    <Link href={`/seller/${product?.seller?.id}`}>
                        <a>
                            <h3 className="sellerNameHover mb-1">
                                {product?.seller?.first_name}{' '}
                                {product?.seller?.last_name}
                            </h3>
                        </a>
                    </Link>
                    <div className="d-flex align-items-center gap-3 text-muted mt-1" style={{ fontSize: '15px' }}>
                        <div className="d-flex align-items-center gap-1" title="Jami mahsulotlar">
                            <FaCircleCheck className="text-success" />
                            <span className="fw-medium">
                                {product.seller.total_approved_documents
                                    ? product.seller.total_approved_documents
                                    : 0}{' '}
                                ta
                            </span>
                        </div>
                        <div className="d-flex align-items-center gap-1" title="Sotilgan mahsulotlar">
                            <FaBriefcase className="text-success" />
                            <span className="fw-medium">
                                {product.seller.total_sold_documents > 0
                                    ? product.seller.total_sold_documents
                                    : 0}{' '}
                                ta
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellerProfile;
