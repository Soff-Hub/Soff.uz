import React from 'react';
import { Rating } from 'react-simple-star-rating';

export default function SellerRating ({ data }) {
    return (
        <div className='mt-2'>
            <p className='fs-3'>Mezonlar bo‘yicha reytinglar</p>
            {data?.reviews?.ratings?.speed !== 0 && (
                <div className='d-flex gap-2 align-items-center'>
                    <p className='p-0 m-0 fs-4'>Tezlik:</p>
                    <Rating
                        readonly
                        allowFraction
                        initialValue={data?.reviews?.ratings?.speed}
                        size={20}
                        fillColor='orange'
                        emptyColor='gray'
                    />
                </div>
            )}
            {data?.reviews?.ratings?.quality !== 0 && (
                <div className='d-flex gap-2 align-items-center'>
                    <p className='p-0 m-0 fs-4'>Sifat:</p>
                    <Rating
                        readonly
                        allowFraction
                        initialValue={data?.reviews?.ratings?.quality}
                        size={20}
                        fillColor='orange'
                        emptyColor='gray'
                    />
                </div>
            )}
            {data?.reviews?.ratings?.communication !== 0 && (
                <div className='d-flex gap-2 align-items-center'>
                    <p className='p-0 m-0 fs-4'> Muloqot (aloqa sifati):</p>
                    <Rating
                        readonly
                        allowFraction
                        initialValue={data?.reviews?.ratings?.communication}
                        size={20}
                        fillColor='orange'
                        emptyColor='gray'
                    />
                </div>
            )}
        </div>
    );
}
