import Image from 'next/image';
import React, { useState } from 'react';

/**
 * Optimized Image Component with fallback support
 */
const OptimizedImage = ({
    src,
    alt = '',
    width,
    height,
    className = '',
    priority = false,
    fill = false,
    style = {},
    objectFit = 'cover',
    sizes,
    fallbackSrc = '/static/img/orqafon1.avif', // Default fallback
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        if (!hasError && imgSrc !== fallbackSrc) {
            setHasError(true);
            setImgSrc(fallbackSrc);
        }
    };

    // Default blur placeholder
    const defaultBlurDataURL =
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==';

    const imageProps = {
        src: imgSrc,
        alt,
        className,
        priority,
        loading: priority ? 'eager' : 'lazy',
        placeholder: 'blur',
        blurDataURL: defaultBlurDataURL,
        style: {
            objectFit,
            ...style,
        },
        onError: handleError,
        ...props,
    };

    if (fill) {
        return (
            <Image
                {...imageProps}
                layout="fill"
                objectFit={objectFit}
                sizes={sizes || '100vw'}
            />
        );
    }

    return (
        <Image {...imageProps} width={width || 100} height={height || 100} />
    );
};

export default OptimizedImage;
