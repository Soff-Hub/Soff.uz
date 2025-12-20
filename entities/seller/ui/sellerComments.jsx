import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Rate, Skeleton, Pagination } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { api, apiForFreelance } from '~/repositories/api';
import { getTimeAgo } from '~/shared/utilities/dayjs-locale-uz';

export default function SellerComments({ pid }) {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [productPage, setProductPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ['sellerComments', pid, productPage],
        queryFn: async () => {
            const serviceComments = await apiForFreelance.get(
                `customer/service/feedbacks/?user_id=${pid}`
            );

            const productComments = await api.get(
                `customer/reviews/${pid}?page=${productPage}`
            );

            return {
                serviceComments: serviceComments.data,
                productComments: productComments.data,
            };
        },
        enabled: !!router.query.pid,
        keepPreviousData: true,
    });

    return (
        <div className="SellerComments p-5">
            {/* Xizmatlar izoh qismi */}
            <div className="col-12 col-md-6 ">
                <div className="d-flex align-items-center  justify-content-between mb-3">
                    <p style={{ fontWeight: '400' }} className="fs-4 m-0">
                        Xizmatlar uchun izohlar
                    </p>
                    {data?.serviceComments?.total > 0 && (
                        <span>
                            {data?.serviceComments.total} ta izoh mavjud
                        </span>
                    )}
                </div>
                {isLoading && (
                    <>
                        {Array(10)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton
                                    key={i}
                                    active
                                    className="SellerCommentsSkeleton shadow"
                                />
                            ))}
                    </>
                )}
                {data?.serviceComments?.items?.map((item, index) => (
                    <div key={index} className="SellerCommentsCard">
                        <div className="SellerCommentsCardAboutSeller">
                            <div className="SellerCommentsCardAboutSellerinfo mb-4">
                                <div className="SellerCommentsCardSellerAvatar">
                                    <img
                                        src={
                                            item.user?.photo_url
                                                ? item.user?.photo_url
                                                : '/static/img/user_without_img.png'
                                        }
                                        alt={item.isName}
                                    />
                                    <div>
                                        <p>{item?.user?.full_name}</p>
                                        <p className="SellerCommentsCardSellerActivety">
                                            {getTimeAgo(item.created_at)}
                                        </p>
                                    </div>
                                </div>
                                <Rate
                                    style={{
                                        fontSize: '16px',
                                        color: 'orange',
                                    }}
                                    value={item.quality}
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="SellerCommentsCardSellerCommentWrap">
                            <p className="SellerCommentsCardComment">
                                {item.comment}
                            </p>
                        </div>
                        <div className="SellerCommentsCardBtnWrap">
                            <a
                                href={`/service/${item.slug}`}
                                className="SellerCommentsCardBtn">
                                Xizmatni ko'rish
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            {/* Mahsulot izoh qismi */}
            <div className="col-12 col-md-6 ">
                <div className="d-flex align-items-center  justify-content-between mb-3">
                    <p style={{ fontWeight: '400' }} className="fs-4 m-0">
                        Mahsulotlar uchun izohlar
                    </p>
                    {data?.productComments?.count > 0 && (
                        <span>
                            {data?.productComments.count} ta izoh mavjud
                        </span>
                    )}
                </div>

                {isLoading && (
                    <>
                        {Array(10)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton
                                    key={i}
                                    active
                                    className="SellerCommentsSkeleton shadow"
                                />
                            ))}
                    </>
                )}
                {data?.productComments?.results?.map((item, index) => (
                    <div key={index} className="SellerCommentsCard mb-4">
                        <div className="SellerCommentsCardAboutSeller">
                            <div className="SellerCommentsCardAboutSellerinfo mb-4">
                                <div className="SellerCommentsCardSellerAvatar">
                                    <img
                                        src={
                                            item.user_image
                                                ? item.user_image
                                                : '/static/img/user_without_img.png'
                                        }
                                        alt={item.isName}
                                    />
                                    <p>{item.user_full_name}</p>
                                    <p className="SellerCommentsCardSellerActivety">
                                        {getTimeAgo(item.created_at)}
                                    </p>
                                </div>
                                {item.rating > 0 && (
                                    <Rate
                                        style={{
                                            fontSize: '16px',
                                            color: 'orange',
                                        }}
                                        value={item.rating}
                                        disabled
                                    />
                                )}
                            </div>
                        </div>
                        <div className="SellerCommentsCardSellerCommentWrap">
                            <p className="SellerCommentsCardComment">
                                {item.text}
                            </p>
                        </div>
                        <div className="SellerCommentsCardBtnWrap">
                            <a
                                href={`/product/${item.document_slug}`}
                                className="SellerCommentsCardBtn">
                                Mahsulotni ko'rish
                            </a>
                        </div>
                    </div>
                ))}

                {/* ✅ Pagination qo‘shildi */}
                {data?.productComments?.count > 0 && (
                    <div className="d-flex justify-content-center mt-4">
                        <Pagination
                            current={productPage}
                            pageSize={10} // backend qaytaradigan default limit
                            total={data?.productComments?.count}
                            onChange={(page) => setProductPage(page)}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
