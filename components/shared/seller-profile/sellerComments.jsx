import { Skeleton } from 'antd';
import React from 'react';
import { useGet } from '~/repositories/https';
import { getTimeAgo } from '~/utilities/calculateTime';
export default function SellerComments ({ pid }) {
    const {data: comments, isLoading} = useGet("comments", `http://176.96.241.219:8005/api/v1/comments/service-comments?service_id=9`)


    return (
        <div className='SellerComments'>
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
            {comments?.comments?.map((item, index) => (
                <div key={index} className='SellerCommentsCard'>
                    <div className='SellerCommentsCardAboutSeller'>
                        <div className='SellerCommentsCardAboutSellerinfo'>
                            <div className='SellerCommentsCardSellerAvatar'>
                                <img
                                    src={
                                        item.user_image
                                            ? item.user_image
                                            : '/static/img/user_without_img.png'
                                    }
                                    alt={item.isName}
                                />
                                <p>{item.user.full_name}</p>
                                <p className='SellerCommentsCardSellerActivety'>
                                    {getTimeAgo(item.created_at)}
                                </p>
                            </div>
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
                            Mahsulotni ko'rish
                        </a>
                    </div>
                </div>
            ))}
            <p className='text-center fs-5'>Ko'proq ko'rish . . .</p>
        </div>
    );
}
