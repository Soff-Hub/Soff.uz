import React, { useState, useEffect } from 'react';
import {
    Drawer,
    Avatar,
    Button,
    Tag,
    message,
    Modal,
    Spin,
    Switch,
    Tooltip,
} from 'antd';
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
import ServiceCheckout from '~/components/freeleance/services/service-deatail/ui/auth/serviceCheckout';
import useGetCustomBalance from '~/components/freeleance/myorders/myorder/api/useGetCustomBalance';
import styles from '../style/select-order-drawer.module.scss';

const SelectOrderDrawer = ({ open, onClose, onOpen, order }) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const [paymentModal, setPaymentModal] = useState(false);
    const { isDesktop, isMobile } = useResponsive();
    const { push } = useRouter();
    const { offers, setOffers, isConnected } = useOffers(order?.id, open);
    const price = order?.service?.price || order?.budget || 0;
    const [mode, setMode] = useState(true);
    const { data } = useGetCustomBalance();
    const balance = Number(data?.wallet || 0);
    const balanceDisabled = balance > 0;

    const leftBalance = formatCurrencyWithSpace(Number(balance));
    const isSufficientBalance = balance >= price;

    const { data: initialOffers } = useFGet(order?.id, `offer/${order?.id}/`, {
        enabled: open && !!order?.id && !!user?.access,
        token: user?.access,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });

    useEffect(() => {
        setMode(Number(data?.wallet || 0) > 0);
    }, [data?.wallet]);

    useEffect(() => {
        if (initialOffers && open) {
            setOffers(initialOffers);
        }
    }, [initialOffers, open]);

    const { mutate: selectOffer, isPending } = useFPost({
        url: 'offer/select-offer',
        token: user?.access,
        onSuccess: (data) => {
            if (!data.success) {
                message.warning(
                    `Frilanser tanlash uchun iltimos qo'shimcha ${formatCurrencyWithSpace(
                        data.extra_amount
                    )} so'm to'lovni amalga oshiring`,
                    2.5
                );
                setPaymentModal(true);
                onClose();
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
        onOpen();
    };
    const onSuccessPayment = (orderId, accepted_by_id) => {
        if (accepted_by_id) {
            push(`/order/${orderId}`);
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

    const serviceCheckoutOrder = {
        id: order?.id,
        price: isPartiallyPaid ? notPaidAmount : price,
        title: order?.title,
    };

    let orderDrawerContent = null;
    if (isFullyPaid) {
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
            </>
        );
    } else {
        orderDrawerContent = (
            <div className="border rounded-4 border-success align-items-center gap-3 justify-content-between d-flex flex-column flex-lg-row flex-sm-column p-4 mb-4">
                <h3 className="fs-3 mb-0 text-center">
                    Frilanser ishni boshlashi uchun to'lovni amalga oshiring
                </h3>
                <Button
                    type="primary"
                    size="large"
                    className="px-5 py-2"
                    onClick={handleOpenPaymentModal}>
                    <i class="fa-solid fa-credit-card"></i>
                    To'lovni amalga oshiring
                </Button>
            </div>
        );
    }
    return (
        <>
            <Drawer
                title="Frilanser takliflari"
                placement="right"
                width={isDesktop ? '70%' : isMobile ? '100%' : '80%'}
                onClose={onClose}
                open={open}
                destroyOnClose>
                {!isFullyPaid && orderDrawerContent}
                <OrderCard order={order} infoOnly />
                {isFullyPaid && orderDrawerContent}
            </Drawer>

            <Modal
                title={
                    <>
                        Haqiqatan ham Siz{' '}
                        <strong>{selectedOffer?.seller?.full_name}</strong> ni
                        tanlamoqchimisiz?
                    </>
                }
                open={!!selectedOffer}
                onCancel={() => setSelectedOffer(null)}
                onOk={handleSelect}
                okText="Ha, tanlayman"
                cancelText="Yo'q"
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
                onCancel={handleRetreatDrawer}
                classNames={{
                    content: styles.paymentOrderModalContainer,
                }}
                destroyOnClose
                footer={null}
                width={600}>
                <div className={styles.orderPayment}>
                    <div className={styles.orderPaymentHeader}>
                        {/* NOTE: Balance button temporarily commented */}
                        {balanceDisabled ? (
                            <Tooltip title="To'lov uchun balansingizdan foydalaning">
                                <Button
                                    onClick={() => setMode((pre) => !pre)}
                                    className={
                                        mode && isSufficientBalance
                                            ? styles.orderButtonActive
                                            : mode && !isSufficientBalance
                                            ? styles.orderButtonWarn
                                            : styles.orderButtonInactive
                                    }
                                    disabled={!balanceDisabled}>
                                    <Switch value={mode} size="small" />
                                    Balance - {leftBalance} so'm
                                </Button>
                            </Tooltip>
                        ) : null}
                        <Button
                            type="text"
                            className={styles.backButton}
                            icon={<i className="fa-solid fa-arrow-left"></i>}
                            onClick={handleRetreatDrawer}>
                            Orqaga
                        </Button>
                    </div>
                    {!mode ? (
                        <div className="service-details-box bg-white border rounded p-3 my-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                    <div>
                                        <h5 className="mb-1 checkout_title fw-bold">
                                            {order?.title}
                                        </h5>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <h4 className="text-primary checkout_price mb-0 fw-bold">
                                        {formatCurrencyWithSpace(
                                            serviceCheckoutOrder.price
                                        )}{' '}
                                        so'm
                                    </h4>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <div className="bg-white">
                        <ServiceCheckout
                            order_id={order?.id}
                            order={serviceCheckoutOrder}
                            balanceMode={mode}
                            balance={balance}
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
                            font-size: 14px;
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

export default SelectOrderDrawer;
