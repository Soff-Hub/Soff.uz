import React from 'react';
import ScientificResourcesSwipper from './swiperItems/scientificResourcesSwipper';
import ModelsAndInteriorDesignSwipper from './swiperItems/ModelsAndInteriorDesignSwipper';
import DesignDevelopmentSwipper from './swiperItems/DesignDevelopmentSwipper';
import VideoLessonsSwipper from './swiperItems/videoLessonsSwipper';
import TemplatesSwipper from './swiperItems/templatesSwipper';
import CatalogsSection from '../catalogsSection';

export default function CategoryHighlights() {
    return (
        <div className="mt-1">
            <div className="container  p-0">
                <div className={`product-list`}>
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
