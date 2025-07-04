import React from 'react';
import CategoryHighlights from './CategoryHighlights';

export default function HomeCategories () {
    return (
        <div className='products mt-1'>
            <div className='container  p-0'>
                <div className={`product-list`}>
                    <CategoryHighlights />
                </div>
            </div>
        </div>
    );
}
