import React from 'react';
import CategoryHighlights from './CategoryHighlights';
import ScientificResourcesSwipper from './swiperItems/scientificResourcesSwipper';
import ModelsAndInteriorDesignSwipper from './swiperItems/ModelsAndInteriorDesignSwipper';
import DesignDevelopmentSwipper from './swiperItems/DesignDevelopmentSwipper';
import VideoLessonsSwipper from './swiperItems/videoLessonsSwipper';
import TemplatesSwipper from './swiperItems/templatesSwipper';

export default function HomeCategories () {
    return (
        <div className='products mt-1'>
            <div className='container  p-0'>
                <div className={`product-list`}>
                    <CategoryHighlights />
                    <ScientificResourcesSwipper />
                    <ModelsAndInteriorDesignSwipper />
                    <DesignDevelopmentSwipper />
                    <VideoLessonsSwipper />
                    <TemplatesSwipper />
                </div>
            </div>
        </div>
    );
}
