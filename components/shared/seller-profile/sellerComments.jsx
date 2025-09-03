import { useUrlSearchParams } from '@shined/react-use';
import { useQuery } from '@tanstack/react-query';
import { Rate, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';
import { api, apiForFreelance } from '~/repositories/api';
import { useGet } from '~/repositories/https';
import { getTimeAgo } from '~/utilities/calculateTime';
export default function SellerComments({ pid }) {
    const router = useRouter();
    const { data, isLoading } = useQuery({
        queryKey: 'sellerComments',
        queryFn: async () => {
            const serviceComments = await apiForFreelance.get(
                `customer/service/feedbacks/?user_id=${pid}`
            );

            const productComments = await api.get(`customer/reviews/${pid}`);

            return {
                serviceComments: serviceComments.data,
                productComments: productComments.data,
            };
        },
        enabled: !!router.query.pid,
    });

    return (
        <div className="SellerComments p-5">
            <div className="col-12 col-md-6 ">
                <div className="d-flex align-items-center  justify-content-between">
                    <p style={{ fontWeight: '600' }} className="fs-4">
                        Xizmatlar uchun commentlar
                    </p>
                    {data?.serviceComments.total && (
                        <span>
                            {' '}
                            {data?.serviceComments.total} ta izoh mavjud
                        </span>
                    )}
                </div>
                {isLoading && (
                    <>
                        {Array(15)
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
                                href={`/service/${item.service_id}`}
                                className="SellerCommentsCardBtn">
                                Xizmatni ko'rish
                            </a>
                        </div>
                    </div>
                ))}
                {/* {data?.serviceComments?.total && (
                    <p className="text-center mt-3 fs-5">
                        Ko'proq ko'rish . . .
                    </p>
                )} */}
            </div>
            <div className="col-12 col-md-6 ">
                <p style={{ fontWeight: '600' }} className="fs-4">
                    Mahsulotlar uchun commentlar
                </p>
                {isLoading && (
                    <>
                        {Array(15)
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
                                <Rate
                                    style={{
                                        fontSize: '16px',
                                        color: 'orange',
                                    }}
                                    value={item.rating}
                                    disabled
                                />
                            </div>
                            <img
                                src={item.rating}
                                className="SellerCommentsCardSellerRating"
                                alt=""
                            />
                        </div>
                        <div className="SellerCommentsCardSellerCommentWrap">
                            <p className="SellerCommentsCardComment">
                                {item.text}
                            </p>
                        </div>
                        <div className="SellerCommentsCardBtnWrap">
                            <a
                                href={`/product/${item.slug}`}
                                className="SellerCommentsCardBtn">
                                Mahsulotni ko'rish
                            </a>
                        </div>
                    </div>
                ))}
                <p className="text-center fs-5">Ko'proq ko'rish . . .</p>
            </div>
        </div>
    );
}
