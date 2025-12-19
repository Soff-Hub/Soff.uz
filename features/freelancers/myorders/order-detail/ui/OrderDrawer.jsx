import React, { useState, useEffect } from 'react';
import { Drawer, Avatar, Button, Tag, message, Modal, Spin, Card } from 'antd';
import TextSlicer from '~/shared/utilities/TextSlicer';
import useResponsive from '~/shared/utilities/useResponsive';
import { useFGet, useFPost } from '~/shared/hooks/useFApi';
import { useSelector } from 'react-redux';
import { ExclamationCircleOutlined, StarFilled } from '@ant-design/icons';
import { useRouter } from 'next/router';
import OrderCard from '~/entities/order/order-card';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { cn } from '~/shared/utilities/cn';
import useOffers from '../../myorder/api/useOffers';
import ServiceCheckout from '~/features/freelancers/services/service-deatail/ui/auth/serviceCheckout';
import { useTelegram } from '~/shared/hooks/useTelegram';

// NOTE: on equal payment done
// {"success":true,"extra_amount":0,"order_id":367,"freelancer_id":281}

// NOTE: on more payment required
// {"success":false,"extra_amount":75000.0,"order_id":371,"freelancer_id":281}

// NOTE: on payment with lower amount
// {"success":true,"extra_amount":0,"order_id":372,"freelancer_id":281}

const OrderDrawer = ({
    open,
    onClose,
    onOpen,
    order,
    paymentModal,
    setPaymentModal,
}) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [verfiedOffer, setVerfiedOffer] = useState(null);
    const { user } = useSelector(state => state.auth);
    const { isDesktop } = useResponsive();
    const { push } = useRouter();
    const { offers, setOffers, isConnected } = useOffers(order?.id, open);
    const { tg } = useTelegram();
    const price = order?.service?.price || order?.budget || 0;

    const { data: initialOffers } = useFGet(order?.id, `offer/${order?.id}/`, {
        enabled: open && !!order?.id && !!user?.access,
        token: user?.access,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });

    useEffect(() => {
        if (initialOffers && open) {
            setOffers(initialOffers);
        }
    }, [initialOffers, open]);

    const { mutate: selectOffer, isPending } = useFPost({
        url: 'offer/select-offer',
        token: user?.access,
        onSuccess: data => {
            if (!data.success) {
                message.warning(
                    `Frilanser tanlash uchun iltimos qo'shimcha ${formatCurrencyWithSpace(
                        data.extra_amount
                    )} so'm to'lovni amalga oshiring`,
                    2.5
                );
                setPaymentModal(true);
                onClose();
                setVerfiedOffer(selectedOffer);
                setSelectedOffer(null);
                return;
            }

            message.success(
                selectedOffer.money < price
                    ? `Frilanser tanlandi! Ortiqcha to'lov summasi: ${formatCurrencyWithSpace(
                          price - selectedOffer.money
                      )} so'm qaytarildi`
                    : `Frilanser tanlandi!`
            );
            setSelectedOffer(null);
            push(`/order/${order?.id}`);
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

    const handleClosePaymentModal = () => {
        setPaymentModal(false);
    };

    const handleOpenPaymentModal = () => {
        setPaymentModal(true);
        onClose();
    };

    const handleRetreatDrawer = () => {
        handleClosePaymentModal();
    };

    const onSuccessPayment = () => {
        if (verfiedOffer) {
            push(`/order/${order?.id}`);
            return;
        }
        handleRetreatDrawer();
    };

    const isFullyPaid = order?.approved_transaction_amount >= price;
    const isPartiallyPaid =
        order?.approved_transaction_amount > 0 &&
        order?.approved_transaction_amount < price;
    const notPaidAmount = price - (order?.approved_transaction_amount || 0);

    const offerAmount =
        (selectedOffer?.money || 0) - (order?.approved_transaction_amount || 0);

    let orderDrawerContent = null;
    if (isFullyPaid && !order?.user) {
        orderDrawerContent = (
            <>
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
                        offers.map(item => (
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
            </>
        );
    }

    return (
        <>
            <Drawer
                title="Frilanser takliflari"
                placement="right"
                width={isDesktop ? '70%' : '80%'}
                onClose={onClose}
                open={open}
                destroyOnClose>
                <OrderCard order={order} infoOnly />
                {orderDrawerContent}
            </Drawer>

            <Modal
                title={
                    <>
                        Haqiqatan ham Siz{' '}
                        <strong>{selectedOffer?.seller?.full_name}</strong> ni
                        tanlamoqchimisiz?
                    </>
                }
                open={
                    // true
                    !!selectedOffer
                }
                onCancel={() => setSelectedOffer(null)}
                onOk={handleSelect}
                okText="Ha, tanlayman"
                cancelText="Bekor qilish"
                confirmLoading={isPending}
                zIndex={20000}
                centered>
                <div className="text-center mb-4 text-warning">
                    {offerAmount > 0 && (
                        <p className="text-warning mb-0 mt-2">
                            Eslatma: Siz ilgari{' '}
                            {formatCurrencyWithSpace(
                                order?.approved_transaction_amount
                            )}{' '}
                            so'm to'lovni amalga oshirgansiz. Taklif narxi{' '}
                            {formatCurrencyWithSpace(selectedOffer?.money)}{' '}
                            so'm.
                        </p>
                    )}
                    {offerAmount < 0 && (
                        <p className="text-warning mb-0 mt-2">
                            Eslatma: Siz tanlagan frilanserning taklif narxi{' '}
                            {formatCurrencyWithSpace(-offerAmount)} so'm siz
                            ilgari to'lagan summadan kam. Ortiqcha to'lov
                            summasi balansingizga qaytariladi.
                        </p>
                    )}
                </div>
                {offerAmount > 0 ? (
                    <div className="service-details-box bg-white border rounded p-3 mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                <div>
                                    <h5 className="mb-1 fw-bold">
                                        {order?.title}
                                    </h5>
                                </div>
                            </div>
                            <div className="text-end">
                                <h4 className="text-primary mb-0 fw-bold">
                                    +{formatCurrencyWithSpace(offerAmount)} so'm
                                </h4>
                            </div>
                        </div>
                    </div>
                ) : null}
                <p>
                    <TextSlicer
                        title={'Frilanser izohi:'}
                        bio={`${selectedOffer?.comment || 'Izoh yo‘q'}`}
                    />
                </p>
            </Modal>
            <Modal
                open={paymentModal}
                onCancel={handleClosePaymentModal}
                footer={null}
                width={600}>
                <div className="type_payment">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <Button
                            type="text"
                            icon={<i className="fa-solid fa-arrow-left"></i>}
                            onClick={handleRetreatDrawer}>
                            Orqaga
                        </Button>
                    </div>
                    <div className="bg-white">
                        <ServiceCheckout
                            order_id={order?.id}
                            onClose={handleClosePaymentModal}
                            onSuccess={onSuccessPayment}
                        />
                    </div>
                </div>
            </Modal>
            <style jsx>
                {`
                    @media (max-width: 576px) {
                        .checkout_price {
                            font-size: 12px;
                            white-space: nowrap;
                        }

                        .checkout_title {
                            font-size: 12px;
                        }
                    }
                `}
            </style>
        </>
    );
};

export default OrderDrawer;
