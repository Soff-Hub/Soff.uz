import React from 'react';
import { formatCurrency } from '~/shared/utilities/product-helper';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function useProduct() {
    const { t } = useTranslation('common');
    return {
        thumbnailImage: (payload) => {
            return (
                <>
                    {payload?.poster_url ? (
                        <div
                            style={{ overflow: 'hidden' }}
                            className="responsive-image-card text-center">
                            <Image
                                src={payload?.poster_url}
                                width="70px"
                                height="70px"
                                alt={payload?.title}
                            />
                        </div>
                    ) : (
                        <div
                            style={{
                                backgroundImage: `url(/static/img/docCopy.png)`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                height: '70px',
                            }}
                            className="placholder-hujjat products-image1"></div>
                    )}
                </>
            );
        },
        price: (payload) => {
            let view;
            if (payload.sale_price) {
                view = (
                    <p className="ps-product__price sale">
                        {payload.discount_price !== 0 ? (
                            <>
                                {formatCurrency(payload.sale_price)}
                                <span> {t('common.currency')}</span>
                                <del className="ms-2">
                                    {formatCurrency(payload.price)}
                                    <span> {t('common.currency')}</span>
                                </del>
                            </>
                        ) : (
                            <p className="free-product-text free-product-text_search">
                                Bepul
                            </p>
                        )}
                    </p>
                );
            } else {
                view = (
                    <p className="ps-product__price">
                        {payload.discount_price === 0 ? (
                            <>
                                <p className="free-product-text free-product-text_search">
                                    Bepul
                                </p>
                            </>
                        ) : (
                            <>
                                {formatCurrency(payload.price)}{' '}
                                <span> {t('common.currency')}</span>
                            </>
                        )}
                    </p>
                );
            }
            return view;
        },

        title: (payload) => {
            let view = (
                <Link href="/product/[pid]" as={`/product/${payload?.slug}`}>
                    <a className="ps-product__title ">{payload?.title}</a>
                </Link>
            );
            return view;
        },
    };
}
