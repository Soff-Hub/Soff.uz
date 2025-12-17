import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './FastDownloadSection.module.scss';
import {
    fetchFastDownloadProduct,
    fetchProductDowload,
} from './FastDowloadApi';
import { IoMdClose } from 'react-icons/io';
import { Button, Rate, Modal } from 'antd';
import { cn } from '~/shared/utilities/cn';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useCart from '~/shared/hooks/useCart';
import useResponsive from '~/shared/utilities/useResponsive';
import CommentForm from '~/components/details-components/comment-section/commentForm';
import FileDownloadLink from '~/components/FileDownloadLink';

// Default product for testing
const DEFAULT_PRODUCT = {
    id: 1,
    slug: 'test-product',
    title: 'Test Product - Fast Download',
    poster: 'https://i.ytimg.com/vi/n0KlHOMIyS4/maxresdefault.jpg',
    url: 'https://i.ytimg.com/vi/n0KlHOMIyS4/maxresdefault.jpg',
};

const FastDownloadSection = () => {
    const queryClient = useQueryClient();
    const { isMobile } = useResponsive();
    const { user } = useSelector((state) => state.auth);
    const { removeAll } = useCart();
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);

    const {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['fast-download'],
        queryFn: fetchFastDownloadProduct,
        enabled: user?.access ? true : false,
        staleTime: 1000 * 60 * 5,
    });

    // Use default product for testing when API fails or no data
    const displayProduct =
        product && Object.keys(product).length > 0 ? product : null;

    useEffect(() => {
        const carts = JSON.parse(localStorage.getItem('cart')) || [];
        const hasProductincart = carts.includes(displayProduct?.id);
        if (hasProductincart) {
            removeAll();
        }
    }, [displayProduct]);

    // Show component even when loading/error for testing with default product
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

    const handleRateChange = (value) => {
        setSelectedRating(value);
        setIsCommentModalOpen(true);
    };

    const handleRateBoxClick = () => {
        setIsCommentModalOpen(true);
    };

    const handleModalClose = () => {
        setIsCommentModalOpen(false);
        setSelectedRating(0);
    };

    const rateBox = (
        <div
            className={styles.rateContainer}
            onClick={handleRateBoxClick}
            style={{ cursor: 'pointer' }}>
            <Rate
                className={styles.rateComponent}
                allowHalf
                value={selectedRating}
                onChange={handleRateChange}
            />
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.productContainer}`}>
                <div className={styles.productInfo}>
                    <Link href={`/product/${displayProduct?.slug}`}>
                        <a>
                            <img
                                src={displayProduct?.poster}
                                alt={displayProduct?.title}
                                className={styles.productImage}
                            />
                        </a>
                    </Link>
                    <div className={styles.productInfoPart}>
                        <p className={styles.productTitle}>
                            <Link href={`/product/${displayProduct?.slug}`}>
                                <a>
                                    {displayProduct?.title || 'Mahsulot nomi'}
                                </a>
                            </Link>
                        </p>
                        <div
                            style={{
                                width: 'fit-content',
                            }}>
                            {isMobile && rateBox}
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        'flex',
                        'gap-3',
                        'items-center',
                        styles.actionsWrapper
                    )}>
                    {!isMobile && rateBox}
                    <FileDownloadLink
                        url={`${displayProduct?.url}`}
                        filename={displayProduct?.title}
                        onClick={() => {
                            handleDowload(displayProduct?.id);
                        }}>
                        <Button className={styles.downloadBtn} type="primary">
                            Yuklab olish
                        </Button>
                    </FileDownloadLink>
                    <Button
                        className={styles.closeBtn}
                        size="middle"
                        onClick={() => handleDowload(displayProduct?.id)}>
                        <IoMdClose />
                    </Button>
                </div>
            </div>
            <Modal
                title="Izoh qoldiring"
                open={isCommentModalOpen}
                onCancel={handleModalClose}
                footer={null}
                width={isMobile ? '100%' : 600}
                centered>
                <CommentForm
                    documentId={displayProduct?.id}
                    fComment={false}
                    initialRating={selectedRating}
                    onSuccess={handleModalClose}
                    mode="modal"
                />
            </Modal>
        </div>
    );
};

export default FastDownloadSection;
