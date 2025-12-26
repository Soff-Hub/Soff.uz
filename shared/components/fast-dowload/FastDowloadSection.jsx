import React, { useEffect, useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './FastDownloadSection.module.scss';
import {
    fetchFastDownloadProduct,
    fetchProductDowload,
} from './FastDowloadApi';
import { IoMdClose } from 'react-icons/io';
import { Button, Rate, Modal } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import useCart from '~/shared/hooks/useCart';
import useResponsive from '~/shared/utilities/useResponsive';
import CommentForm from '~/features/comments/ui/commentForm';
import FileDownloadLink from '~/shared/ui/file-download-link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '~/repositories/api';
import { downloadFile } from '~/shared/utilities/utils';

// Default product for testing
// const DEFAULT_PRODUCT = {
//     id: 1,
//     slug: 'test-product',
//     title: 'Test Product - Fast Download',
//     poster: 'https://i.ytimg.com/vi/n0KlHOMIyS4/maxresdefault.jpg',
//     url: 'https://i.ytimg.com/vi/n0KlHOMIyS4/maxresdefault.jpg',
// };

const getDownloadedProducts = (product) => {
    const downloadeds = localStorage.getItem('downloadedProducts');
    const downloadedProducts = downloadeds ? JSON.parse(downloadeds) : [];
    const isAlreadyDownloaded = downloadedProducts.includes(product.id);
    return { downloadedProducts, isAlreadyDownloaded };
};

const getProductCarts = (product) => {
    const carts = localStorage.getItem('cart');
    const productCarts = carts ? JSON.parse(carts) : [];
    const isAlreadyInCart = productCarts.includes(product.id);
    return { productCarts, isAlreadyInCart };
};

const handleDeleteDownloadProduct = (product) => {
    const { downloadedProducts, isAlreadyDownloaded } =
        getDownloadedProducts(product);
    if (isAlreadyDownloaded) {
        downloadedProducts = downloadedProducts.filter(
            (id) => id !== product.id
        );
        localStorage.setItem(
            'downloadedProducts',
            JSON.stringify(downloadedProducts)
        );
    }
};

const FastDownloadSection = () => {
    const fileDownloadRef = useRef(null);
    const queryClient = useQueryClient();
    const { isMobile } = useResponsive();
    const { user, isLoggedIn } = useSelector((state) => state.auth);
    const { removeAll } = useCart();
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);

    let {
        data: product,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['fast-download'],
        queryFn: fetchFastDownloadProduct,
        enabled: user?.access ? true : false,
        staleTime: 1000 * 60 * 5,
    });

    const hasRating = product?.user_rating && product.user_rating > 0;
    const productId = product?.id;

    // NOTE: this is for testing purpose only
    // product = DEFAULT_PRODUCT;

    const handleDowload = async (id) => {
        try {
            await fetchProductDowload(id);
            queryClient.invalidateQueries({
                queryKey: ['fast-download'],
                exact: false,
            });
            handleDeleteDownloadProduct(product);
        } catch (error) {
            console.error('Download error:', error);
        }
    };

    const handleDownloadThroughTelegram = async () => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                throw new Error('Token mavjud emas');
            }
            const fileSourceValue = await axios.get(
                `${baseURL}customer/return-telegram-link/${productId}/`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            window.open(fileSourceValue.data.link, '_blank');
            handleDowload(productId);
        } catch (error) {
            console.error('Telegram download error:', error);
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
        queryClient.invalidateQueries({
            queryKey: ['fast-download'],
            exact: false,
        });
        queryClient.invalidateQueries({
            queryKey: ['purchased-products'],
            exact: false,
        });
    };

    useEffect(() => {
        if (!product?.id) return;

        const { isAlreadyInCart } = getProductCarts(product);
        if (isAlreadyInCart) {
            removeAll();
        }

        const { isAlreadyDownloaded, downloadedProducts } =
            getDownloadedProducts(product);

        if (!isAlreadyDownloaded) {
            const newDownloadedProducts = [...downloadedProducts, product.id];
            localStorage.setItem(
                'downloadedProducts',
                JSON.stringify(newDownloadedProducts)
            );
            downloadFile(product.url);
        }
    }, [product]);

    if (!isLoggedIn || isLoading) return null;
    if (isError || !product || Object.keys(product).length == 0) return null;

    const rateBox = (
        <div
            className={styles.rateContainer}
            onClick={handleRateBoxClick}
            style={{ cursor: 'pointer' }}>
            <Rate
                className={styles.rateComponent}
                value={selectedRating}
                onChange={handleRateChange}
            />
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <div className={`container ${styles.productContainer}`}>
                <div className={styles.productInfo}>
                    <Link href={`/product/${product?.slug}`}>
                        <a>
                            <img
                                src={product?.poster}
                                alt={product?.title}
                                className={styles.productImage}
                            />
                        </a>
                    </Link>
                    <div className={styles.productInfoPart}>
                        <p className={styles.productTitle}>
                            <Link href={`/product/${product?.slug}`}>
                                <a>{product?.title || 'Mahsulot nomi'}</a>
                            </Link>
                        </p>
                        {!hasRating && (
                            <div
                                style={{
                                    width: 'fit-content',
                                }}>
                                {isMobile && rateBox}
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.actionsWrapper}>
                    {!isMobile && !hasRating && rateBox}
                    <FileDownloadLink
                        ref={fileDownloadRef}
                        url={`${product?.url}`}
                        filename={product?.title}
                        onClick={() => {
                            handleDowload(product?.id);
                        }}>
                        <Button className={styles.downloadBtn} type="primary">
                            Yuklab olish
                        </Button>
                    </FileDownloadLink>
                    <Button
                        type="link"
                        size="middle"
                        className={styles.telegramBtn}
                        onClick={handleDownloadThroughTelegram}>
                        <img
                            src="/static/img/telegram.png"
                            alt="Telegram"
                            height={20}
                        />
                        <span className={styles.telegramBtnText}>
                            Yuklab olish
                        </span>
                    </Button>
                    <Button
                        className={styles.closeBtn}
                        size="middle"
                        onClick={() => handleDowload(product?.id)}>
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
                    documentId={product?.id}
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
