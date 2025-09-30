import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './FastDownloadSection.module.scss';
import { fetchFastDownloadProduct, fetchProductDowload } from './FastDowloadApi';

const FastDownloadSection = () => {
    const queryClient = useQueryClient()
    const { data: product, isLoading, isError, error } = useQuery({
        queryKey: ['fast-download'],
        queryFn: fetchFastDownloadProduct,
        retry: false,
        enabled: typeof window !== 'undefined',
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return null;
    if (isError || !product || Object.keys(product).length == 0) return null;

    const handleDowload = async (id) => {
        try {
            await fetchProductDowload(id)
            queryClient.invalidateQueries(['fast-download'],)
        } catch (error) {
            console.error('Download error:', error);
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.productContainer}`}>
                <div className={styles.productInfo}>
                    <img
                        src={product.poster}
                        alt={product.title}
                        className={styles.productImage}
                    />
                    <h3 className={styles.productTitle}>{product.title}</h3>
                </div>
                <a
                    href={product.url}
                    target='_blank'
                    className={styles.downloadBtn}
                    onClick={() => handleDowload(product.id)}
                    download
                >
                    Yuklab olish
                </a>
            </div>
        </div>
    );
};

export default FastDownloadSection;
