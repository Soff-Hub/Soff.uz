import React from 'react';
import { useTranslation } from 'next-i18next';
import { Pagination } from 'antd';
import Link from 'next/link';
import ProductCard from '~/entities/product/product-card';

export default function ProductsByCategory({
    data = [],
    page,
    handlePagination,
}) {
    const { t } = useTranslation('product-pages');
    return (
        <section className="">
            <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-2 row-gap-md-5 row-gap-lg-3 mb-5">
                {data?.results?.map((item) => (
                    <div key={item.id} className="col px-1 px-md-3 px-lg-2">
                        <ProductCard product={item} />
                    </div>
                ))}
            </div>
            {(data?.count == 0 || !data) && (
                <div className="container">
                    <div className="ps-page-status">
                        <div
                            className="ps-section__content"
                            style={{ paddingInline: '15px' }}>
                            <img
                                src="/static/img/noinfo.svg"
                                alt={t('productsByCategory.noInfoFound')}
                            />
                            <h3>{t('productsByCategory.emptyStateTitle')}</h3>
                            <p>
                                {t('productsByCategory.emptyStateDescription')}
                            </p>
                            <p>
                                <Link href="https://seller.soff.uz">
                                    <a target="_blank">{t('productsByCategory.becomeSeller')}</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {data?.count >= 50 && (
                <div className="d-flex justify-content-center my-5">
                    <Pagination
                        className="text-success"
                        total={data?.count}
                        pageSize={50}
                        responsive={true}
                        showSizeChanger={false}
                        current={page}
                        onChange={(e) => handlePagination(e)}
                    />
                </div>
            )}
        </section>
    );
}
