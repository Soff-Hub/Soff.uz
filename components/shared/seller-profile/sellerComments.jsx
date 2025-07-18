import { Rate, Skeleton } from 'antd';
import React from 'react';
import { useGet } from '~/repositories/https';
import { getTimeAgo } from '~/utilities/calculateTime';
export default function SellerComments({ pid }) {
    const { data: serviceComments, isLoading } = useGet("serviceComments", `http://176.96.241.219:8005/api/v1/comments/service-comments?seller_id=8`)
    const { data: productComments, isLoading: isLoadingProduct } = useGet("productComments", `http://176.96.241.219:8006/api/v1/customer/reviews/${pid}`)
    return (
        <div className='SellerComments '>
            <div className='col-12 col-md-6 '>
                <p style={{fontWeight: '600'}} className='fs-4'>Xizmatlar uchun commentlar</p>
                {isLoading && (
                    <>
                        {Array(15)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton
                                    key={i}
                                    active
                                    className='SellerCommentsSkeleton shadow'
                                />
                            ))}
                    </>
                )}
                {serviceComments?.comments?.map((item, index) => (
                    <div key={index} className='SellerCommentsCard mb-4'>
                        <div className='SellerCommentsCardAboutSeller'>
                            <div className='SellerCommentsCardAboutSellerinfo mb-4'>
                                <div className='SellerCommentsCardSellerAvatar'>
                                    <img
                                        src={
                                            item.user_image
                                                ? item.user_image
                                                : '/static/img/user_without_img.png'
                                        }
                                        alt={item.isName}
                                    />
                                    <p>{item.buyer_user.full_name}</p>
                                    <p className='SellerCommentsCardSellerActivety'>
                                        {getTimeAgo(item.created_at)}
                                    </p>
                                </div>
                                <Rate style={{ fontSize: '16px', color: 'orange' }} value={item.rating} disabled />
                            </div>
                            <img
                                src={item.rating}
                                className='SellerCommentsCardSellerRating'
                                alt=''
                            />
                        </div>
                        <div className='SellerCommentsCardSellerCommentWrap'>
                            <p className='SellerCommentsCardComment'>{item.content}</p>
                        </div>
                        <div className='SellerCommentsCardBtnWrap'>
                            <a
                                href={`/product/${item.slug}`}
                                className='SellerCommentsCardBtn'>
                                Xizmatni  ko'rish
                            </a>
                        </div>
                    </div>
                ))}
                <p className='text-center mt-3 fs-5'>Ko'proq ko'rish . . .</p>
            </div>
            <div className='col-12 col-md-6 '>
                <p style={{fontWeight: '600'}} className='fs-4'>Mahsulotlar uchun commentlar</p>
                {isLoading && (
                    <>
                        {Array(15)
                            .fill(0)
                            .map((d, i) => (
                                <Skeleton
                                    key={i}
                                    active
                                    className='SellerCommentsSkeleton shadow'
                                />
                            ))}
                    </>
                )}
                {productComments?.results?.map((item, index) => (
                    <div key={index} className='SellerCommentsCard mb-4'>
                        <div className='SellerCommentsCardAboutSeller'>
                            <div className='SellerCommentsCardAboutSellerinfo mb-4'>
                                <div className='SellerCommentsCardSellerAvatar'>
                                    <img
                                        src={
                                            item.user_image
                                                ? item.user_image
                                                : '/static/img/user_without_img.png'
                                        }
                                        alt={item.isName}
                                    />
                                    <p>{item.user_full_name}</p>
                                    <p className='SellerCommentsCardSellerActivety'>
                                        {getTimeAgo(item.created_at)}
                                    </p>
                                </div>
                                <Rate style={{ fontSize: '16px', color: 'orange' }} value={item.rating} disabled />
                            </div>
                            <img
                                src={item.rating}
                                className='SellerCommentsCardSellerRating'
                                alt=''
                            />
                        </div>
                        <div className='SellerCommentsCardSellerCommentWrap'>
                            <p className='SellerCommentsCardComment'>{item.text}</p>
                        </div>
                        <div className='SellerCommentsCardBtnWrap'>
                            <a
                                href={`/product/${item.slug}`}
                                className='SellerCommentsCardBtn'>
                                Mahsulotni ko'rish
                            </a>
                        </div>
                    </div>
                ))}
                <p className='text-center fs-5'>Ko'proq ko'rish . . .</p>
            </div>
        </div>
    );
}
