import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '~/widgets/sidebar/Sidebar';
import Link from 'next/link';
import { Button, Skeleton } from 'antd';
import useCart from '~/shared/hooks/useCart';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import {
    fileReactIcons,
    fileColors,
} from '~/features/product-details/ui/actions/file-actions';
import { IoIosClose } from 'react-icons/io';
import styles from './shopping-cart.module.scss';
import { cn } from '~/shared/utilities/cn';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa6';
import { MdOutlineSecurity } from 'react-icons/md';
import Icon from '~/shared/ui/Icon';
import { useCountTimeBack } from '~/shared/hooks/useCountDown';
import { useMounted } from '~/shared/hooks/useMounted';

function ShoppingCart() {
    const state = useSelector((state) => state.auth.user);
    const { cartDataItems, playlistCartDataItems, status } = useSelector(
        (state) => state.ecomerce
    );
    const { removeCartOneItem, removePlaylistCartOneItem } = useCart();
    const [taxPercentage, setTaxPercentage] = useState(0.1); // Default 10%
    const [promotion, setPromotion] = useState({
        discount_percent: 0,
        expires_at: null,
    });
    const [collapsed, setCollapsed] = useState(false);
    const isMounted = useMounted();
    const timeLeft = useCountTimeBack(promotion.expires_at);

    // Combine items for calculations
    const allItems = [
        ...(cartDataItems || []).map((item) => ({ ...item, cartType: 'product' })),
        ...(playlistCartDataItems || []).map((item) => ({
            ...item,
            cartType: 'playlist',
        })),
    ];

    const hasItems = allItems.length > 0;
    const isLoading = status === 'loading';

    useEffect(() => {
        async function fetchData() {
            try {
                const [taxResponse, promoResponse] = await Promise.all([
                    ProductRepository.getOrderPercentage(),
                    ProductRepository.getActivePromotion(),
                ]);

                if (taxResponse?.data?.percentage) {
                    setTaxPercentage(taxResponse.data.percentage);
                }
                if (promoResponse) {
                    setPromotion(promoResponse);
                }
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData();
    }, []);

    // Calculate totals
    const subtotal = hasItems ? calculateAmount(allItems) : 0;
    const discountAmount = Math.floor(
        subtotal * (promotion.discount_percent / 100)
    );
    const amountAfterDiscount = subtotal - discountAmount;
    const tax = Math.floor(amountAfterDiscount * taxPercentage);
    const totalWithTax = amountAfterDiscount + tax;
    const total = totalWithTax;

    const handleRemoveItem = (e, item) => {
        e.preventDefault();
        if (item.cartType === 'playlist') {
            removePlaylistCartOneItem(item.id);
        } else {
            removeCartOneItem(item.id);
        }
    };

    const onChangeCollapse = () => {
        setCollapsed((pre) => !pre);
    };

    let cartContent;
    if (isLoading) {
        cartContent = (
            <div className={styles.contentWrapper}>
                <div className={styles.cartItems}>
                    <div className={styles.columnHeader}>
                        <h2 className={styles.pageTitle}>Mahsulotlar</h2>
                    </div>
                    <div className={styles.itemsList}>
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div key={index} className={styles.productRow}>
                                <Skeleton.Avatar active size={48} shape="square" />
                                <div style={{ flex: 1, marginLeft: 16 }}>
                                    <Skeleton.Input active style={{ width: '60%' }} size="small" />
                                    <Skeleton.Input active style={{ width: '30%', marginTop: 8 }} size="small" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    } else if (hasItems) {
        const isExpiring =
            promotion.expires_at &&
            (timeLeft.minutes > 0 || timeLeft.seconds > 0);

        cartContent = (
            <div className={styles.contentWrapper}>
                {/* LEFT: Items List */}
                <div className={styles.cartItems}>
                    <div className={styles.columnHeader}>
                        <h1 className={styles.pageTitle}>
                            Savatdagi mahsulotlar ({allItems.length})
                        </h1>
                    </div>

                    <div className={styles.itemsList}>
                        {allItems.map((item) => (
                            <div key={`${item.cartType}-${item.id}`} className={styles.productRow}>
                                <div
                                    className={styles.fileBadge}
                                    style={{
                                        backgroundColor: item.cartType === 'playlist'
                                            ? '#2ecc71'
                                            : (fileColors[item.file_type] || '#E22C2F')
                                    }}
                                >
                                    <Icon icon={fileReactIcons[item.cartType === 'playlist' ? 'VIDEO' : item.file_type]} />
                                    <span>{item.cartType === 'playlist' ? 'Кurs' : item.file_type}</span>
                                </div>

                                <div className={styles.productInfo}>
                                    <Link href={item.cartType === 'playlist' ? `/video-lessons/playlists/${item.slug || item.id}` : `/product/${item.slug || item.id}`}>
                                        <a className={styles.productTitle}>{item.title}</a>
                                    </Link>
                                    <span className={styles.productMeta}>
                                        {item.cartType === 'playlist' ? 'To\'liq o\'quv kursi' : 'Tayyor raqamli mahsulot'}
                                    </span>
                                </div>

                                <div className={styles.priceAndActions}>
                                    <div className="text-right">
                                        {item.discount_price && Number(item.discount_price) < Number(item.price) ? (
                                            <>
                                                <span className={styles.currentPrice}>{addPeriodToThousands(item.discount_price)} so'm</span>
                                                <div className={styles.oldPrice}>{addPeriodToThousands(item.price)} so'm</div>
                                            </>
                                        ) : (
                                            <span className={styles.currentPrice}>
                                                {item.price && Number(item.price) > 0 
                                                    ? `${addPeriodToThousands(item.price)} so'm` 
                                                    : 'Bepul'}
                                            </span>
                                        )}
                                    </div>
                                    <Button
                                        type="text"
                                        icon={<IoIosClose fontSize={24} />}
                                        onClick={(e) => handleRemoveItem(e, item)}
                                        className={styles.deleteBtn}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT: Order Summary */}
                <div className={styles.orderSummary}>
                    {isMounted && promotion.discount_percent > 0 && (
                        <div className={styles.promoBadge}>
                            <div>
                                <div className="font-bold" style={{ fontSize: '14px' }}>{promotion.discount_percent}% CHEGIRMA!</div>
                                <div style={{ fontSize: '11px' }}>Faqat siz uchun maxsus taklif</div>
                            </div>
                            {isExpiring && (
                                <div className="font-mono font-bold" style={{ fontSize: '15px' }}>
                                    {String(timeLeft.minutes).padStart(2, '0')}:
                                    {String(timeLeft.seconds).padStart(2, '0')}
                                </div>
                            )}
                        </div>
                    )}

                    <div className={styles.receiptCard}>
                        <div className={styles.receiptHeader}>To'lov ma'lumotlari</div>

                        <div className={styles.receiptBody}>
                            <div className={styles.receiptRow}>
                                <span className={styles.label}>Mahsulotlar soni</span>
                                <span className={styles.value}>{allItems.length} ta</span>
                            </div>
                            <div className={styles.receiptRow}>
                                <span className={styles.label}>Umumiy summa</span>
                                <span className={styles.value}>{addPeriodToThousands(subtotal)} so'm</span>
                            </div>

                            {promotion.discount_percent > 0 && (
                                <div className={cn(styles.receiptRow, styles.discountRow)}>
                                    <span className={styles.label}>Aksiya chegirmasi (-{promotion.discount_percent}%)</span>
                                    <span className={styles.value}>-{addPeriodToThousands(discountAmount)} so'm</span>
                                </div>
                            )}

                            <div className={styles.receiptRow}>
                                <span className={styles.label}>Xizmat haqi ({Math.round(taxPercentage * 100)}%)</span>
                                <span className={styles.value}>{addPeriodToThousands(tax)} so'm</span>
                            </div>

                            <div className={styles.receiptDivider} />

                            <div className={styles.totalRow}>
                                <span className={styles.label}>Jami:</span>
                                <span className={styles.totalValue}>{addPeriodToThousands(total)} so'm</span>
                            </div>
                        </div>

                        <Link href={state !== null ? "/account/checkout" : "/auth/login?returnUrl=/account/checkout"}>
                            <a>
                                <Button type="primary" className={styles.checkoutBtn}>
                                    To'lovga o'tish
                                </Button>
                            </a>
                        </Link>

                        <div className={styles.securePayment}>
                            <Icon icon={MdOutlineSecurity} />
                            <span>Xavfsiz va tezkor to'lov</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        cartContent = (
            <div className={styles.emptyCartWrapper}>
                <div className={styles.emptyIconBox}>
                    <FaBoxOpen />
                </div>
                <h3 className={styles.emptyTitle}>Savat bo'sh</h3>
                <p className={styles.emptySubtitle}>
                    Siz hali birorta mahsulot qo'shmadingiz. O'zingizga kerakli raqamli mahsulotni tanlang va xarid qilishni boshlang.
                </p>
                <Link href={'/scientific-resources/all'}>
                    <a>
                        <Button type="primary" size="large" className={styles.shopNowBtn}>
                            <FaArrowLeft size={14} />
                            Xarid qilishni boshlash
                        </Button>
                    </a>
                </Link>
            </div>
        );
    }

    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.mainLayout}>
                    <div className={cn(styles.sidebarArea, collapsed && styles.isSidebarCollapsed)}>
                        <Sidebar
                            collapsed={collapsed}
                            onChangeCollapse={onChangeCollapse}
                        />
                    </div>
                    {cartContent}
                </div>
            </div>
        </>
    );
}

export default ShoppingCart;
