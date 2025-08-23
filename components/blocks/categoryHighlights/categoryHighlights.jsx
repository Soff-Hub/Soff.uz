import React from 'react';
import ScientificResourcesSwipper from './swiperItems/scientificResourcesSwipper';

export default function CategoryHighlights() {
    return (
        <div className="mt-1">
            <div className="container  p-0">
                <div className={`product-list`}>
                    <ScientificResourcesSwipper />
                </div>
            </div>
        </div>
    );
}
