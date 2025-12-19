import React from 'react';
import ImageSlideCarousel from '~/features/product-details/ui/actions/imageScroll';
import styles from '../styles/detail.module.scss';

const ImageCarousel = ({ images }) => {
    return (
        <div className={styles.carouselWrapper}>
            <ImageSlideCarousel isProduct={false} images={images} />
        </div>
    );
};

export default ImageCarousel;
