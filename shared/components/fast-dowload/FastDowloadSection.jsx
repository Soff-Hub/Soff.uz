import React from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './FastDownloadSection.module.scss';
import {
    fetchFastDownloadProduct,
    fetchProductDowload,
} from './FastDowloadApi';
import { IoMdClose } from 'react-icons/io';
import { Button } from 'antd';

import Cookies from 'js-cookie';
import { cn } from '~/shared/utilities/cn';
import Link from 'next/link';
const getToken = () => Cookies.get('token');

const FastDownloadSection = () => {
    const queryClient = useQueryClient();
    const {
        data: product,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['fast-download'],
        queryFn: fetchFastDownloadProduct,
        retry: false,
        enabled: !!getToken(),
        staleTime: 1000 * 60 * 5,
    });

    if (isLoading) return null;
    if (isError || !product || Object.keys(product).length == 0) return null;

    const handleDowload = async (id) => {
        try {
            await fetchProductDowload(id);
            queryClient.invalidateQueries(['fast-download']);
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    console.log({ product });

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
                    <Link
                        href={`/product/${product.slug}`}
                        className={styles.productTitle}>
                        {product.title}
                    </Link>
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
                        style={{
                            height: '40px',
                        }}
                        onClick={() => handleDowload(product.id)}>
                        <IoMdClose fontSize={20} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default FastDownloadSection;
