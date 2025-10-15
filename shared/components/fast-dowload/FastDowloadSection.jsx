import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './FastDownloadSection.module.scss';
import {
    fetchFastDownloadProduct,
    fetchProductDowload,
} from './FastDowloadApi';
import { IoMdClose } from 'react-icons/io';
import { Button } from 'antd';
import { cn } from '~/shared/utilities/cn';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const FastDownloadSection = () => {
    const queryClient = useQueryClient();
    const { user } = useSelector((state) => state.auth);
    console.log('User in FastDownloadSection:', user);
    const {
        data: product,
        isLoading,
        isError,
        error,
        isFetched,
    } = useQuery({
        queryKey: ['fast-download', showFastDownload],
        queryFn: fetchFastDownloadProduct,
        enabled: user?.access ? true : false,
        staleTime: 1000 * 60 * 5,
    });
    console.log({ product, isLoading, isError, error, isFetched });
    if (isLoading) return null;
    if (isError || !product || Object.keys(product).length == 0) return null;

    const handleDowload = async (id) => {
        try {
            await fetchProductDowload(id);
            queryClient.invalidateQueries({
                queryKey: ['fast-download'],
                exact: false,
            });
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.productContainer}`}>
                <div className={styles.productInfo}>
                    <Link href={`/product/${product.slug}`}>
                        <img
                            src={product.poster}
                            alt={product.title}
                            className={styles.productImage}
                        />
                    </Link>
                    <p className={styles.productTitle}>
                        <Link href={`/product/${product.slug}`}>
                            {product.title}
                        </Link>
                    </p>
                </div>
                <div className={cn('flex', 'gap-3', 'items-center')}>
                    <a
                        href={product.url}
                        target="_blank"
                        className={styles.downloadBtn}
                        onClick={() => handleDowload(product.id)}
                        download>
                        Yuklab olish
                    </a>
                    <Button
                        className={styles.closeBtn}
                        onClick={() => handleDowload(product.id)}>
                        <IoMdClose />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FastDownloadSection;
