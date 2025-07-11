import React from 'react';
import { Rating } from 'react-simple-star-rating';

export default function ServiceCard ({ item }) {
    console.log('ServiceCard', item);
    console.log('ServiceCard', item);

    return (
        <div className='servicesSectionCard'>
            <div className='servicesSectionCardImg'>
                <img
                    src={item?.image ? item?.image : item?.poster_url}
                    alt=''
                />
            </div>
            <div className='servicesSectionCardbody'>
                <p className='servicesSectionCardTitle'>{item.title} </p>
                <div className='servicesSectionCardRating'>
                    <Rating
                        readonly
                        allowFraction
                        initialValue={item?.ratings}
                        size={20}
                        fillColor='orange'
                    />

                    {item?.countComment && <span>({item?.countComment})</span>}
                </div>
                <div className='servicesSectionCardPrice'>
                    <p>{item?.price} so’m</p>
                    <a href={item?.path}>Tafsilotlar</a>
                </div>
            </div>
        </div>
    );
}
