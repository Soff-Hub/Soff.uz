import { Pagination, Input, Button, Select, Skeleton, Rate, Modal } from 'antd';
import { useState, useMemo } from 'react';
import { DownloadOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { api, baseURL } from '~/repositories/api';
import axios from 'axios';
import Cookies from 'js-cookie';
import useDebounce from '~/shared/hooks/useDebounce';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import useResponsive from '~/shared/utilities/useResponsive';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { cn } from '~/shared/utilities/cn';
import dayjs from 'dayjs';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import FileDownloadLink from '~/shared/ui/file-download-link';
import CommentForm from '~/features/comments/ui/commentForm';
import styles from './MyProducts_listSeller.module.scss';
import { useTranslation } from 'next-i18next';

const { Option } = Select;

export default function PurchasedProducts() {
    const { t } = useTranslation('account');

    const CATEGORY_LIST = [
        { title: t('sellerProducts.categories.file'), value: 'file' },
        { title: t('sellerProducts.categories.3d'), value: '3d' },
        { title: t('sellerProducts.categories.design'), value: 'design' },
        { title: t('sellerProducts.categories.website'), value: 'website' },
        { title: t('sellerProducts.categories.template'), value: 'template' },
        { title: t('sellerProducts.categories.video'), value: 'video' },
    ];
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [category, setCategory] = useState('file');
    const [currPage, setCurrPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [ratedProducts, setRatedProducts] = useState(new Set());
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [selectedRating, setSelectedRating] = useState(0);

    const token = Cookies.get('token');
    const { isMobile } = useResponsive();
    const inputSize = isMobile ? 'middle' : 'large';

    const handleDownloadThroughTelegram = async (getId) => {
        try {
            const fileSourceValue = await api.get(
                `seller/return-telegram-link/${getId}/`
            );
            window.open(fileSourceValue.data.link, '_blank');
        } catch (error) {
            console.error('Telegram download error:', error);
        }
    };

    const handleRateChange = (value, productId) => {
        setSelectedRating(value);
        setSelectedProduct(productId);
        setIsCommentModalOpen(true);
    };

    const handleRateBoxClick = (productId) => {
        setSelectedProduct(productId);
        setIsCommentModalOpen(true);
    };

    const handleModalClose = () => {
        setIsCommentModalOpen(false);
        setSelectedRating(0);
        setSelectedProduct(null);
    };

    const handleRatingSuccess = () => {
        if (selectedProduct) {
            setRatedProducts((prev) => new Set([...prev, selectedProduct]));
        }
        handleModalClose();
        queryClient.invalidateQueries({
            queryKey: ['purchased-products'],
            exact: false,
        });
    };

    let { data: productsData, isLoading: loadingTable } = useQuery({
        queryKey: [
            'purchased-products',
            currPage,
            pageSize,
            category,
            debouncedSearch,
        ],
        queryFn: async () => {
            if (!token) return;
            const { data } = await axios.get(
                `${baseURL}seller/purchased-products/`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: {
                        page: currPage,
                        page_size: pageSize,
                        direction: category,
                        search: debouncedSearch,
                        t: Date.now(),
                    },
                }
            );
            return data;
        },
        enabled: !!token,
    });

    return (
        <div className={styles.wrapper}>
            <div className="container my-5">
                <h1 className="page-title">{t('sellerProducts.pageTitle')}</h1>
                <SidebarLayout>
                    {/* Search va Filter */}
                    <div
                        className={cn(
                            'row',
                            'g-3',
                            'align-items-center',
                            styles.filtersWrapper
                        )}>
                        <div
                            className={cn(
                                'col-12',
                                'col-sm-6',
                                styles.searchWrapper
                            )}>
                            <Input.Search
                                placeholder={t(
                                    'sellerProducts.searchPlaceholder'
                                )}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                size={inputSize}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <Select
                                value={category}
                                className="w-100"
                                size={inputSize}
                                onChange={(value) => setCategory(value)}
                                allowClear>
                                {CATEGORY_LIST.map((item) => (
                                    <Option key={item.value} value={item.value}>
                                        {item.title}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </div>

                    {/* Purchased Products */}
                    <PurchasedProductsLayout
                        products={productsData?.results}
                        handleDownloadThroughTelegram={
                            handleDownloadThroughTelegram
                        }
                        loadingTable={loadingTable}
                        ratedProducts={ratedProducts}
                        onRateChange={handleRateChange}
                        onRateBoxClick={handleRateBoxClick}
                    />

                    {/* Pagination */}
                    <div className="d-flex justify-content-center my-5">
                        <Pagination
                            current={currPage}
                            total={productsData?.count || 0}
                            pageSize={pageSize}
                            onChange={(page, size) => {
                                setCurrPage(page);
                                setPageSize(size);
                            }}
                            showSizeChanger
                            pageSizeOptions={['5', '10', '20']}
                        />
                    </div>
                </SidebarLayout>
            </div>

            {/* Rating Modal */}
            <Modal
                title={t('sellerProducts.commentModalTitle')}
                open={isCommentModalOpen}
                onCancel={handleModalClose}
                footer={null}
                width={isMobile ? '100%' : 600}
                centered>
                <CommentForm
                    documentId={selectedProduct}
                    fComment={false}
                    initialRating={selectedRating}
                    onSuccess={handleRatingSuccess}
                    mode="modal"
                />
            </Modal>
        </div>
    );
}

const PurchasedProductsLayout = ({
    products,
    handleDownloadThroughTelegram,
    loadingTable,
    ratedProducts,
    onRateChange,
    onRateBoxClick,
}) => {
    const { t } = useTranslation('account');
    const hasProducts = products && products.length;

    // Empty state
    if (!loadingTable && !hasProducts) {
        return (
            <div className={styles.emptyState}>
                <div className={styles.emptyStateIcon}>
                    <ShoppingCartOutlined />
                </div>
                <h3 className={styles.emptyStateTitle}>
                    {t('sellerProducts.emptyTitle')}
                </h3>
                <p className={styles.emptyStateText}>
                    {t('sellerProducts.emptyDescription')}
                </p>
                <Link href="/scientific-resources/all?slug=all">
                    <Button
                        type="primary"
                        size="large"
                        className={styles.browseBtn}>
                        {t('sellerProducts.browseProducts')}
                    </Button>
                </Link>
            </div>
        );
    }

    // Loading state
    if (loadingTable) {
        return (
            <div className={styles.productsList}>
                {Array(6)
                    .fill(0)
                    .map((_, i) => (
                        <div key={i} className={styles.productCard}>
                            <Skeleton active paragraph={{ rows: 4 }} />
                        </div>
                    ))}
            </div>
        );
    }

    // Products list - inline card layout
    return (
        <div className={styles.productsList}>
            {products.map((item) => {
                const productId = item.document?.id;
                const hasRating = item?.user_rating && item.user_rating > 0;

                return (
                    <div key={item.id} className={styles.productCard}>
                        <div className={styles.productContent}>
                            {/* Product Image */}
                            <div className={styles.productImageWrapper}>
                                <Link
                                    href={`/product/${
                                        item.document?.slug || ''
                                    }`}>
                                    <img
                                        src={
                                            item.document?.poster_url ||
                                            '/no-image.png'
                                        }
                                        alt={item.document?.title || 'No Image'}
                                        className={styles.productImage}
                                    />
                                </Link>
                            </div>

                            {/* Product Info */}
                            <div className={styles.productInfo}>
                                <div className={styles.productHeader}>
                                    <h3 className={styles.productTitle}>
                                        <Link
                                            href={`/product/${
                                                item.document?.slug || ''
                                            }`}>
                                            {item.document?.title ||
                                                t('sellerProducts.unknown')}
                                        </Link>
                                    </h3>
                                    <span className={styles.productDate}>
                                        {dayjs(item.created_at).format(
                                            'YYYY-MM-DD HH:mm'
                                        )}
                                    </span>
                                </div>

                                <div className={styles.productMeta}>
                                    <span className={styles.productCategory}>
                                        {item.document?.category?.name || '-'}
                                    </span>
                                </div>

                                <div className={styles.productPrice}>
                                    {formatCurrencyWithSpace(item?.price)}{' '}
                                    {t('sellerProducts.currency')}
                                </div>

                                {/* Rating Component */}
                                {!hasRating && (
                                    <div className={styles.ratingWrapper}>
                                        <div
                                            className={styles.rateContainer}
                                            onClick={() =>
                                                onRateBoxClick(productId)
                                            }
                                            style={{ cursor: 'pointer' }}>
                                            <Rate
                                                className={styles.rateComponent}
                                                value={0}
                                                onChange={(value) =>
                                                    onRateChange(
                                                        value,
                                                        productId
                                                    )
                                                }
                                            />
                                            <span className={styles.rateLabel}>
                                                {t('sellerProducts.rate')}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className={styles.actionButtons}>
                                    <FileDownloadLink
                                        url={item.document?.file_url}
                                        filename={item.document?.title}
                                        className={styles.downloadLinkWrapper}>
                                        <Button
                                            type="primary"
                                            icon={<DownloadOutlined />}
                                            className={styles.downloadBtn}
                                            size="middle"
                                            block>
                                            {t('sellerProducts.download')}
                                        </Button>
                                    </FileDownloadLink>
                                    <Button
                                        type="link"
                                        className={styles.telegramBtn}
                                        onClick={() =>
                                            handleDownloadThroughTelegram(
                                                productId
                                            )
                                        }
                                        size="middle"
                                        block>
                                        <img
                                            src="/static/img/telegram.png"
                                            alt="Telegram"
                                            height={20}
                                        />
                                        <span>
                                            {t(
                                                'sellerProducts.downloadViaTelegram'
                                            )}
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
