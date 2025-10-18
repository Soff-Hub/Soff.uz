import React, { useState, useEffect } from 'react';
import { Drawer, Avatar, Button, Tag, message, Modal, Spin } from 'antd';
import TextSlicer from '~/shared/utilities/TextSlicer';
import useResponsive from '~/shared/utilities/useResponsive';
import { useFGet, useFPost } from '~/shared/hooks/useFApi';
import { useSelector } from 'react-redux';
import { ExclamationCircleOutlined, StarFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
import OrderCard from '~/entities/order/order-card';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { cn } from '~/shared/utilities/cn';
import useOffers from '../api/useOffers';
import Link from 'next/link';

const SelectOrderDrawer = ({ open, onClose, order }) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const { isDesktop } = useResponsive();
    const { push } = useRouter();

    const { data: initialOffers } = useFGet(order?.id, `offer/${order?.id}/`, {
        enabled: open && !!order?.id && !!user?.access,
        token: user?.access,
    });

    const { offers, setOffers, isConnected } = useOffers(order?.id, open);

    useEffect(() => {
        if (initialOffers && open) {
            setOffers(initialOffers);
        }
    }, [initialOffers, open]);

    const { mutate: selectOffer, isPending } = useFPost({
        url: 'offer/select-offer',
        token: user?.access,
        onSuccess: () => {
            message.success('Frilanser tanlandi!');
            setSelectedOffer(null);
            push(`/order/${order?.id}?isOpen=true`);
            onClose();
        },
        onError: () => {
            message.error(
                'Frilanser tanlanmadi. Iltimos qayta urinib ko‘ring!'
            );
        },
    });

    const handleSelect = () => {
        if (!selectedOffer) return;
        const fd = new FormData();
        fd.append('offer_id', selectedOffer.id);
        selectOffer(fd);
    };

    return (
        <>
            <Drawer
                title="Frilanser takliflari"
                placement="right"
                width={isDesktop ? '70%' : '80%'}
                onClose={onClose}
                open={open}
                destroyOnClose>
                <OrderCard order={order} />
                <Tag
                    className="w-100 my-4 fs-4 text-wrap"
                    style={{
                        color: 'orange',
                        background: 'transparent',
                        border: 'none',
                    }}
                    icon={<ExclamationCircleOutlined />}>
                    Ishni boshlash uchun frilanser tanlashingiz kerak
                </Tag>

                <div className={cn('w-full')}>
                    {offers?.length > 0 ? (
                        offers.map((item) => (
                            <div
                                key={item?.id}
                                className={cn(
                                    'shadow-lg',
                                    'p-[16px]',
                                    'bg-light',
                                    'rounded-2xl',
                                    'flex',
                                    'flex-col',
                                    'gap-3',
                                    'border',
                                    'mb-2'
                                )}>
                                <div
                                    className={cn(
                                        'flex',
                                        'items-center',
                                        'gap-4'
                                    )}>
                                    <a
                                        href={`/seller/${item?.seller?.soff_seller_id}`}
                                        target="_blank"
                                        rel="noopener noreferrer">
                                        <Avatar
                                            src={
                                                item?.seller?.photo_url ||
                                                '/static/img/ozodbek.png'
                                            }
                                            size={50}
                                            style={{ minWidth: '50px' }}
                                            className={cn('cursor-pointer')}
                                        />
                                    </a>
                                    <div className={cn('flex', 'flex-col')}>
                                        <a
                                            href={`/seller/${item?.seller?.soff_seller_id}`}
                                            target="_blank"
                                            rel="noopener noreferrer">
                                            <h3
                                                className={cn(
                                                    'text-[24px]',
                                                    'mb-0',
                                                    'cursor-pointer',
                                                    'hover-text-primary',
                                                    'transition'
                                                )}>
                                                {item?.seller?.full_name}
                                            </h3>
                                        </a>
                                        <span className={cn('text-primary')}>
                                            {item?.seller?.position?.title}
                                        </span>
                                    </div>
                                </div>
                                <p
                                    className={cn(
                                        'mb-0',
                                        'text-lg',
                                        'text-dark'
                                    )}>
                                    {item.comment}
                                </p>
                                <div
                                    className={cn(
                                        'flex',
                                        'justify-between',
                                        'items-center'
                                    )}>
                                    <div>
                                        <div
                                            className={cn(
                                                'flex',
                                                'items-center',
                                                'gap-1'
                                            )}>
                                            <i
                                                style={{
                                                    fontSize: '14px',
                                                    color: 'rgba(0,0,0,0.6)',
                                                }}
                                                className="fa-solid fa-sack-dollar"></i>
                                            <span
                                                className={cn(
                                                    'text-[14px]',
                                                    'text-secondary'
                                                )}>
                                                Taklif narxi:
                                            </span>
                                        </div>
                                        <span
                                            className={cn(
                                                'text-base',
                                                'font-semibold'
                                            )}>
                                            {formatCurrencyWithSpace(
                                                item?.money
                                            )}{' '}
                                            so‘m
                                        </span>
                                    </div>
                                    {item?.seller?.avg_rating &&
                                        item?.seller?.avg_rating !== 0 && (
                                            <div>
                                                <span
                                                    className={cn(
                                                        'text-[14px]',
                                                        'text-secondary'
                                                    )}>
                                                    Reytingi:
                                                </span>
                                                <div
                                                    className={cn(
                                                        'flex',
                                                        'items-center',
                                                        'gap-1'
                                                    )}>
                                                    <StarFilled
                                                        className={cn(
                                                            'text-base',
                                                            'text-warning'
                                                        )}
                                                    />
                                                    <span
                                                        className={cn(
                                                            'text-base',
                                                            'text-warning'
                                                        )}>
                                                        {
                                                            item?.seller
                                                                ?.avg_rating
                                                        }
                                                    </span>
                                                    <span>
                                                        (
                                                        {
                                                            item?.seller
                                                                ?.feedback_count
                                                        }{' '}
                                                        izoh)
                                                    </span>
                                                </div>
                                            </div>
                                        )}
                                    <Button
                                        onClick={() => setSelectedOffer(item)}
                                        type="primary">
                                        Tanlash
                                    </Button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div
                            className={cn(
                                'flex',
                                'flex-col',
                                'justify-center',
                                'items-center',
                                'w-full',
                                'h-[500px]',
                                'flex-1'
                            )}>
                            <Spin size="large" />
                            <p
                                className={cn(
                                    'mt-4',
                                    'text-base',
                                    'text-secondary'
                                )}>
                                Frilanserlar taklif yubormoqda. Iltimos biroz
                                kuting...
                            </p>
                        </div>
                    )}
                </div>
            </Drawer>

            <Modal
                title="Frilanserni tanlash"
                open={!!selectedOffer}
                onCancel={() => setSelectedOffer(null)}
                onOk={handleSelect}
                okText="Ha, tanlayman"
                cancelText="Bekor qilish"
                confirmLoading={isPending}
                zIndex={20000}
                centered>
                <p style={{ fontSize: '12px' }}>
                    Haqiqatan ham Siz{' '}
                    <strong>{selectedOffer?.seller?.full_name}</strong> ni
                    tanlamoqchimisiz?
                </p>
                <p>
                    <TextSlicer
                        title={'Izoh:'}
                        bio={`${selectedOffer?.comment || 'Izoh yo‘q'}`}
                    />
                </p>
            </Modal>
        </>
    );
};

export default SelectOrderDrawer;
