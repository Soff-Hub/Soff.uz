import React, { useState } from 'react';
import RedesignProduct from '~/components/elements/products/Redesign/Redesign-Product';
import ServiceIsUnavailable from '../seller-profile/ServiceIsUnavailable';

export default function ScientificResources ({ data, setCategoryValue }) {
    const [showAll, setShowAll] = useState(false);

    const allItems = data?.file || [];
    const visibleItems = showAll ? allItems : allItems.slice(0, 5);

    const handleShowMore = () => {
        setCategoryValue('file');
        setShowAll(true);
    };

    return (
        <div className='sellerpage'>
            {allItems.length > 0 ? (
                <>
                    <div className='sellerpageTitleBox'>
                        <p className='sellerpageTitle'>Ilmiy ishlar</p>
                    </div>

                    <div className='scientificResourcesWrap'>
                        {visibleItems.map((item, index) => (
                            <div key={index}>
                                <RedesignProduct product={item} />
                            </div>
                        ))}
                    </div>

                    {allItems.length > 5 && !showAll && (
                        <div className='showMoreBox' onClick={handleShowMore}>
                            <p className='showMore'>Yana ko’rsatish</p>
                        </div>
                    )}
                </>
            ): (
                <ServiceIsUnavailable/>
            )}
        </div>
    );
}
