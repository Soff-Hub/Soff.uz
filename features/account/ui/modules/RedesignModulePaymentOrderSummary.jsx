import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { connect, useDispatch } from 'react-redux';
import { calculateAmount } from '~/shared/utilities/ecomerce-helpers';
import ProductRepository from '~/repositories/ProductRepository';
import { addPeriodToThousands } from '../price-formatter';
import { Skeleton } from 'antd';
import useCart from '~/shared/hooks/useCart';
import { cn, useRcn } from '~/shared/utilities/cn';
import { fileColors } from '~/features/product-details/ui/actions/file-actions';

const RedesignModulePaymentOrderSummary = ({ ecomerce, items }) => {
    const [percentage, setPercentage] = useState(0);
    const [promotion, setPromotion] = useState({
        discount_percent: 0,
        expires_at: null,
    });
    const { removeCartOneItem, removePlaylistCartOneItem } = useCart();
    const dispatch = useDispatch();

    // Use items if passed, otherwise fallback to ecomerce.cartDataItems
    const cartItems = items || (ecomerce && ecomerce.cartDataItems) || [];

    const fontSizeClass = useRcn({
        mobile: 'text-sm',
        tablet: 'text-lg',
        desktop: 'text-xl',
    });

    const produtsHeightClass = useRcn({
        mobile: 'max-h-[200px]',
        tablet: 'max-h-[300px]',
        desktop: 'h-auto',
    });

    let amount = calculateAmount(cartItems);

    async function getData() {
        try {
            const [taxResponse, promoResponse] = await Promise.all([
                ProductRepository.getOrderPercentage(),
                ProductRepository.getActivePromotion(),
            ]);

            if (taxResponse) {
                setPercentage(Number(taxResponse?.data?.percentage));
            }
            if (promoResponse) {
                setPromotion(promoResponse);
            }
        } catch (error) {
            console.error('Failed to fetch summary data:', error);
        }
    }

    const taxAmount = Math.floor(amount * percentage);
    const totalWithoutPromo = amount + taxAmount;
    const discountAmount = Math.floor(
        totalWithoutPromo * (promotion.discount_percent / 100)
    );
    const finalTotal = totalWithoutPromo - discountAmount;

    const hisob = addPeriodToThousands(finalTotal);
    const taxFormatted = addPeriodToThousands(taxAmount);
    const discountFormatted = addPeriodToThousands(discountAmount);

    const handleRemoveItem = async (e, item) => {
        e.preventDefault();
        if (item.cartType === 'playlist') {
            removePlaylistCartOneItem(item.id);
        } else {
            removeCartOneItem(item.id);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div
            className={cn(
                'bg-white',
                'rounded-xl',
                'shadow-sm',
                'flex',
                'flex-col'
            )}>
            <p
                className={cn(
                    'text-dark',
                    'font-semibold',
                    'm-0',
                    'px-4',
                    'py-2'
                )}>
                {cartItems.length} ta mahsulot
            </p>
            <div
                className={cn(
                    'flex-1',
                    'overflow-y-auto',
                    'px-4',
                    'space-y-3',
                    'py-2',
                    produtsHeightClass
                )}>
                {cartItems && cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div
                            key={`${item.cartType || 'product'}-${item.id}`}
                            className={cn(
                                'flex',
                                'items-start',
                                'justify-between',
                                'p-3',
                                'border',
                                'rounded-lg',
                                'hover:shadow-md',
                                'transition'
                            )}>
                            <div className={cn('flex-1')}>
                                <Link
                                    href={
                                        item.cartType === 'playlist'
                                            ? `/video-lessons/playlists/${item.slug}`
                                            : `/product/${item.slug}`
                                    }>
                                    <a>
                                        <p
                                            className={cn(
                                                'font-semibold',
                                                'text-sm',
                                                'md:text-base',
                                                'mb-2',
                                                'line-clamp-2'
                                            )}>
                                            {item.title}
                                            {item.cartType === 'playlist' && (
                                                <span
                                                    style={{
                                                        fontSize: '12px',
                                                        color: '#2ecc71',
                                                        marginLeft: '8px',
                                                        fontWeight: 'normal',
                                                    }}>
                                                    (Kurs)
                                                </span>
                                            )}
                                        </p>
                                    </a>
                                </Link>
                                <span
                                    className={cn(
                                        'text-white',
                                        'px-2',
                                        'py-1',
                                        'rounded'
                                    )}
                                    style={{
                                        background:
                                            item.cartType === 'playlist'
                                                ? '#2ecc71'
                                                : fileColors[item?.file_type] ||
                                                  '#007DFF',
                                    }}>
                                    {item.cartType === 'playlist'
                                        ? 'PLAYLIST'
                                        : item?.file_type}
                                </span>
                            </div>

                            <div
                                className={cn(
                                    'flex',
                                    'flex-col',
                                    'items-end',
                                    'gap-2',
                                    'min-w-[90px]'
                                )}>
                                <button
                                    onClick={(e) => handleRemoveItem(e, item)}
                                    className={cn(
                                        'transition',
                                        'border',
                                        'rounded-full',
                                        'p-1',
                                        'hover:bg-gray-100'
                                    )}>
                                    <img
                                        src="/static/img/xicon.svg"
                                        alt="delete"
                                        className="w-4 h-4"
                                    />
                                </button>

                                {item.discount === 0 || !item.discount ? (
                                    <p
                                        className={cn(
                                            'font-medium',
                                            'text-sm',
                                            'md:text-base',
                                            'text-gray-800',
                                            'm-0'
                                        )}>
                                        {addPeriodToThousands(
                                            item.discount_price || item.price
                                        )}{' '}
                                        so'm
                                    </p>
                                ) : (
                                    <div
                                        className={cn(
                                            'flex',
                                            'flex-col',
                                            'items-end'
                                        )}>
                                        <del
                                            className={cn(
                                                'text-gray-400',
                                                'text-xs',
                                                'md:text-sm'
                                            )}>
                                            {addPeriodToThousands(item.price)}{' '}
                                            so'm
                                        </del>
                                        <p
                                            className={cn(
                                                'font-semibold',
                                                'text-sm',
                                                'md:text-base',
                                                'text-red-500',
                                                'm-0'
                                            )}>
                                            {addPeriodToThousands(
                                                item.discount_price
                                            )}{' '}
                                            so'm
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <Skeleton active paragraph={{ rows: 7 }} />
                    </>
                )}
            </div>

            {/* Footer */}
            {cartItems && cartItems.length > 0 && (
                <div className={cn('border-t', 'p-4', 'bg-gray-50')}>
                    {percentage > 0 && (
                        <div
                            className={cn(
                                'flex',
                                'justify-between',
                                'items-center',
                                'mb-2'
                            )}>
                            <p className={cn('mb-0', 'text-sm')}>
                                Sayt xizmat haqi:
                            </p>
                            <p className={cn('mb-0', 'text-sm', 'font-medium')}>
                                {taxFormatted} so'm ({percentage * 100}%)
                            </p>
                        </div>
                    )}
                    {promotion.discount_percent > 0 && (
                        <div
                            className={cn(
                                'flex',
                                'justify-between',
                                'items-center',
                                'mb-2'
                            )}>
                            <p className={cn('mb-0', 'text-sm', 'text-success')}>
                                Sizning chegirmangiz (-{promotion.discount_percent}%):
                            </p>
                            <p className={cn('mb-0', 'text-sm', 'font-medium', 'text-success')}>
                                -{discountFormatted} so'm
                            </p>
                        </div>
                    )}
                    <div
                        className={cn(
                            'flex',
                            'justify-between',
                            'items-center'
                        )}>
                        <p className={cn('font-bold', 'mb-0', fontSizeClass)}>
                            Jami to'lov:
                        </p>
                        <p className={cn('font-bold', 'mb-0', fontSizeClass)}>
                            {hisob} so'm
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default connect((state) => state)(RedesignModulePaymentOrderSummary);
