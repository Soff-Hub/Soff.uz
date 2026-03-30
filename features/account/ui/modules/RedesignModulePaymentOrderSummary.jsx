import React from 'react';
import { useSelector } from 'react-redux';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import useCart from '~/shared/hooks/useCart';
import { addPeriodToThousands } from '../price-formatter';
import styles from '../checkout.module.scss';
import { IoIosClose } from 'react-icons/io';
import Icon from '~/shared/ui/Icon';
import {
    fileReactIcons,
    fileColors,
} from '~/features/product-details/ui/actions/file-actions';

const CheckoutItemRow = ({ product, remove }) => {
    const isDiscounted = product.discount_price > 0 && Number(product.discount_price) < Number(product.price);
    const finalPrice = isDiscounted ? product.discount_price : product.price;
    const isFree = Number(finalPrice) === 0;

    const cartType = product.is_video_course || product.playlist_items ? 'playlist' : 'product';

    return (
        <div className={styles.itemRow}>
            <div
                className={styles.fileBadge}
                style={{
                    backgroundColor: cartType === 'playlist'
                        ? '#2ecc71'
                        : (fileColors[product.file_type] || '#E22C2F')
                }}
            >
                <Icon icon={fileReactIcons[cartType === 'playlist' ? 'VIDEO' : product.file_type]} />
                <span>{cartType === 'playlist' ? 'Кurs' : product.file_type || 'FIL'}</span>
            </div>

            <div className={styles.productInfo}>
                <h4 className={styles.productTitle}>{product.title}</h4>
                <span className={styles.productMeta}>
                    {cartType === 'playlist' ? 'To\'liq o\'quv kursi' : 'Tayyor raqamli mahsulot'}
                </span>
            </div>

            <div className={styles.priceAndActions}>
                <div className="text-right">
                    {isDiscounted ? (
                        <>
                            <span className={styles.currentPrice}>{addPeriodToThousands(product.discount_price)} so'm</span>
                            <span className={styles.oldPrice}>{addPeriodToThousands(product.price)} so'm</span>
                        </>
                    ) : (
                        <span className={styles.currentPrice}>
                            {isFree ? 'Bepul' : `${addPeriodToThousands(product.price)} so'm`}
                        </span>
                    )}
                </div>
                <button
                    className={styles.deleteBtn}
                    onClick={() => remove(product)}
                >
                    <IoIosClose />
                </button>
            </div>
        </div>
    );
};

const RedesignModulePaymentOrderSummary = () => {
    const { cartDataItems, playlistCartDataItems } = useSelector((state) => state.ecomerce);
    const { removeCartOneItem, removePlaylistCartOneItem } = useCart();
    const ecomerce = [
        ...(cartDataItems || []).map(item => ({ ...item, cartType: 'product' })),
        ...(playlistCartDataItems || []).map(item => ({ ...item, cartType: 'playlist' }))
    ];

    const handleRemove = (item) => {
        if (item.cartType === 'playlist' || item.is_video_course) {
            removePlaylistCartOneItem(item.id);
        } else {
            removeCartOneItem(item.id);
        }
    };

    if (ecomerce.length === 0) {
        return (
            <div className={styles.emptyCheckout}>
                <div className={styles.emptyIcon}>🛒</div>
                <h3>Savat bo'sh</h3>
                <p>Buyurtma berish uchun mahsulot tanlang</p>
                <button
                    className={styles.submitBtn}
                    onClick={() => (window.location.href = '/')}
                    style={{ maxWidth: '200px' }}
                >
                    Bosh sahifaga
                </button>
            </div>
        );
    }

    return (
        <div className={styles.orderSummaryWrapper}>
            <div className="flex flex-col">
                {ecomerce.map((item) => (
                    <CheckoutItemRow key={item.id} product={item} remove={handleRemove} />
                ))}
            </div>
        </div>
    );
};

export default RedesignModulePaymentOrderSummary;
