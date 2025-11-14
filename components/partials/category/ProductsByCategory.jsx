import React from 'react';
import { Pagination } from 'antd';
import Link from 'next/link';
import ProductCard from '~/entities/product/product-card';

export default function ProductsByCategory({
    data = [],
    page,
    handlePagination,
}) {
    return (
        <section className="">
            <div className="row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 row-gap-2 row-gap-md-5 row-gap-lg-3 mb-5">
                {data?.results?.map(item => (
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
                                alt="Ma'lumot topilmadi"
                            />
                            <h3>😕 Bu yerda hozircha hech narsa yo‘q...</h3>
                            <p>
                                Ammo bu siz uchun ajoyib imkoniyat!
                                Birinchilardan bo‘lib ushbu kategoriyaga
                                mahsulot joylashtiring, o‘z auditoriyangizni
                                yarating va daromad olishni boshlang.
                                Imkoniyatni qo‘ldan boy bermang!
                            </p>
                            <p>
                                <Link href="https://seller.soff.uz">
                                    <a target="_blank">Sotuvchi bo'lish</a>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {data?.count >= 50 && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        className="text-success"
                        total={data?.count}
                        pageSize={50}
                        responsive={true}
                        showSizeChanger={false}
                        current={page}
                        onChange={e => handlePagination(e)}
                    />
                </div>
            )}
        </section>
    );
}
