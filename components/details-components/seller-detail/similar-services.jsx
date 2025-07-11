import React from 'react';
import Swiper_Pages from '~/components/blocks/categoryHighlights/swipper/swiper';
import ServiceCard from '~/components/shared/seller-profile/serviceCard';

export default function SimilarServices ({ portfoiloData }) {
    return (
        <div>
            {Array.isArray(portfoiloData) && portfoiloData.length > 0 && (
                <div className='categoryHighlightsSwipper'>
                    <div className='SwipperTitlewrap'>
                        <h2 className='SwipperTitle mt-md-5 mt-xl-0 mt-lg-0 mt-5 w-75'>
                            O‘xshash xizmatlar va takliflar{' '}
                        </h2>
                    </div>
                    {portfoiloData && (
                        <Swiper_Pages categoryName type='template'>
                            {portfoiloData?.map((item, index) => (
                                <div>
                                    <ServiceCard item={item} key={index} />
                                </div>
                            ))}
                        </Swiper_Pages>
                    )}
                </div>
            )}
        </div>
    );
}
