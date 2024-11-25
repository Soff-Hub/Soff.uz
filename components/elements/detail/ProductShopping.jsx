import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { audioDownloaderSale } from '~/utilities/common-helpers';
import { EyeFilled } from '@ant-design/icons';
import Link from 'next/link';
import { setOneShopDoc } from '~/store/auth/slice';

const ProductShoopping = ({ product, demo }) => {
    const dispatch = useDispatch();
    const router = useRouter();

    const [isLoading, setLoading] = useState(false);

    const userAccess = useSelector((state) => state.auth.user?.access);

    const handleBuyNow = (e) => {
        e.preventDefault();
        if (userAccess) {
            dispatch(setOneShopDoc(product));
            router.push(`/account/checkout-one?id=${product?.id}`);
        } else {
            router.push(`/auth/login?id=${product?.id}`);
        }
    };

    const handleDownload = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await audioDownloaderSale(product, product);
        } catch (error) {
            console.error('Error in audioDownloaderSale:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="ps-product__shopping m-0 p-0">
                <div className="d-flex flex-column gap-4 w-100 m-0">
                    {product?.discount_price > 0 ? (
                        product?.document?.file_url ? (
                            <button
                                className="ps-btn text-center ps-btn--black py-3"
                                style={{ minWidth: '150px', fontSize: '14px' }}
                                onClick={handleDownload}
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                ) : (
                                    'Yuklab olish'
                                )}
                            </button>
                        ) : (
                            <button
                                className="ps-btn text-center buystep-2 m-0 w-100"
                                style={{ fontSize: '16px' }}
                                onClick={handleBuyNow}
                            >
                                Hoziroq xarid qilish
                            </button>
                        )
                    ) : (
                        <button
                            className="ps-btn py-3 buystep-2 ps-btn--black w-100"
                            style={{ minWidth: '212px', height: '40px', fontSize: '16px' }}
                            onClick={handleDownload}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            ) : (
                                'Bepul yuklab olish'
                            )}
                        </button>
                    )}

                    {demo && (
                        <Link href={`${demo || "#"}`}>
                            <a target='_blank'>
                                <button
                                    className="w-100"
                                    style={{
                                        backgroundColor: '#00A3FF',
                                        padding: '10px 60px',
                                        border: 'none',
                                        color: '#fff',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <strong className="d-flex align-items-center justify-content-center gap-1">
                                        <EyeFilled style={{ fontSize: '17px' }} />
                                        Demoni ko'rish
                                    </strong>
                                </button>
                            </a>
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductShoopping;
