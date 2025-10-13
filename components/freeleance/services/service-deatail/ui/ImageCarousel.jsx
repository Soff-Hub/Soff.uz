import React from 'react';
import ImageSlideCarousel from '~/components/details-components/details-actions/imageScroll';
import styles from '../styles/detail.module.scss';

const ImageCarousel = ({ images }) => {
    return (
        <div className={styles.carouselWrapper}>
            <ImageSlideCarousel images={images} />
        </div>
    );
};

export default ImageCarousel;
