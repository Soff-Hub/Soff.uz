import { Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import CalculateTimeDifference from '~/components/partials/account/DateFormatter';

export default function SellerComments (pid) {
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    console.log('comments', comments);

    useEffect(() => {
        setIsLoading(true);
        if (pid) {
            fetch(
                `http://176.96.241.219:8006/api/v1/customer/reviews/${pid}`
                // `http://176.96.241.219:8006/api/v1/customer/freelance-profile/${pid}`
            )
                .then(res => res.json())
                .then(data => {
                    setComments(data?.results);
                })
                .catch(error => {
                    console.error('Error fetching seller:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [pid]);

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
            {comments?.map((item, index) => (
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
                                <p>{item.user_full_name}</p>
                            </div>
                            <p className='SellerCommentsCardSellerActivety'>
                                <CalculateTimeDifference
                                    targetDate={item.created_at}
                                />
                            </p>
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
                            href={`/product/${item.document_slug}`}
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
