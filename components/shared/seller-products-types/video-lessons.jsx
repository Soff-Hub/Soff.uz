import React from 'react';
import VideoLessonsProducts from '~/components/elements/products/VideoLessonsProducts';

export default function VideoLessons (product) {
    const data = product?.data?.video;

    return (
        <div className='sellerpage'>
            {product && (
                <>
                    <div className='sellerpageTitleBox'>
                        <p className='sellerpageTitle'>Video darsliklar</p>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='8'
                            height='10'
                            viewBox='0 0 8 10'
                            fill='none'>
                            <path
                                d='M1.875 1.5L6.12488 4.63195L2 8.5'
                                stroke='#312F30'
                                strokeWidth='2'
                                strokeLinecap='round'
                            />
                        </svg>
                    </div>

                    <div className='VideoLessonsCardWrap'>
                        {data?.map((item, index) => (
                            <div className='' key={index}>
                                <VideoLessonsProducts product={item} />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {product?.length < 8 && (
                <div className='showMoreBox'>
                    <p className='showMore'>Yana ko’rsatish</p>
                </div>
            )}
        </div>
    );
}
