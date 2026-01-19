import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import {
    Drawer,
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
import { useFPost } from '~/shared/hooks/useFApi';
import { useSelector } from 'react-redux';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { LiaHandshake } from 'react-icons/lia';
import { useRouter } from 'next/router';
import OrderCard from '~/entities/order/ui/order-base';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { cn } from '~/shared/utilities/cn';
import useOffers, { clearOfferDelayFlag } from '../api/useOffers';
import ServiceCheckout from '~/features/freelancers/services/service-deatail/ui/auth/serviceCheckout';
import useGetCustomBalance from '~/features/freelancers/myorders/myorder/api/useGetCustomBalance';
import styles from '../style/select-order-drawer.module.scss';
import useGetOffers from '../api/useGetOffers';
import { ClipLoader } from 'react-spinners';
import { useDisableWindowScroll } from '~/shared/hooks/useDisableWindowScroll';
import OfferCard from './OfferCard';
import ChatWindow from '~/features/freelancers/chat/ui/ChatWindow';
import { useQueryClient } from '@tanstack/react-query';
import axiosInstance from '~/shared/api/freeleanceApi';
import { useGetChatById } from '~/features/freelancers/chat/api/useGetChatById';
import { MODERATOR_ID } from '~/shared/constants';
import { IoMdArrowBack } from 'react-icons/io';
import OffersFilter from './OffersFilter';
import ModeratorChatCard from './ModeratorChatCard';
import { FaArrowLeft } from 'react-icons/fa6';
import { FaCreditCard } from 'react-icons/fa6';
import { FaFileAlt } from 'react-icons/fa';

// Dynamically import OffersWaitingLoader to reduce initial bundle size
const OffersWaitingLoader = dynamic(() => import('./OffersWaitingLoader'), {
    ssr: false,
    loading: () => (
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
        </div>
    ),
});

const SelectOrderDrawer = ({ open, onClose, onOpen, order }) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const [paymentModal, setPaymentModal] = useState(false);
    const [chatDrawerOpen, setChatDrawerOpen] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const { isDesktop, isMobile, isTablet, size } = useResponsive();
    const { push } = useRouter();
    const { offers, setOffers, isConnected, bufferedCount, remainingSeconds } =
        useOffers(order?.id, open);
    const price = order?.service?.price || order?.budget || 0;
    const [mode, setMode] = useState(true);
    const { data } = useGetCustomBalance();
    const balance = Number(data?.wallet || 0);
    const balanceDisabled = balance > 0;
    const loadMoreRef = useRef(null);
    const queryClient = useQueryClient();
    const axios = axiosInstance(user?.access);

    // Filter state
    const [filters, setFilters] = useState({
        min_rating: null,
        has_category_experience: null,
        sort_by: null,
        sort_order: null,
    });
    const [filterAccordionOpen, setFilterAccordionOpen] = useState(false);

    // Get chat data to find matching offer
    const { data: chatData } = useGetChatById(currentChat?.opponentId);
    const chat = chatData?.pages?.[0]?.chat;
    const opponentId =
        chat?.opponent?.id ||
        chat?.opponent?.soff_seller_id ||
        chat?.opponent_id;

    // Find the offer that matches the chat's seller
    const matchingOffer = offers?.find(
        (offer) =>
            offer?.seller?.soff_seller_id === opponentId ||
            offer?.seller?.id === opponentId
    );

    const handleCreateChat = async (sellerId) => {
        try {
            const formData = new FormData();
            formData.append('participant_id', sellerId);

            const { data } = await axios.post('chats/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (data?.chat_id) {
                queryClient.invalidateQueries({ queryKey: ['chats'] });
                setCurrentChat({ chatId: data.chat_id, opponentId: sellerId });
                setChatDrawerOpen(true);
            }
        } catch (error) {
            const errorMsg =
                error?.response?.data?.detail || 'Xatolik yuz berdi';
            message.error(errorMsg);
        }
    };

    const isModerator = currentChat?.opponentId === MODERATOR_ID;

    const leftBalance = formatCurrencyWithSpace(Number(balance));
    const isSufficientBalance = balance >= price;

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

    const {
        data: initialOffers,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useGetOffers({
        orderId: order?.id,
        enabled: isFullyPaid && open,
        filters,
    });

    useEffect(() => {
        if (!open || !loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (
                    entries[0].isIntersecting &&
                    hasNextPage &&
                    !isFetchingNextPage
                ) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        observer.observe(loadMoreRef.current);

        return () => {
            if (loadMoreRef.current) {
                observer.unobserve(loadMoreRef.current);
            }
        };
    }, [
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
        open,
        loadMoreRef.current,
    ]);

    useEffect(() => {
        setMode(Number(data?.wallet || 0) > 0);
    }, [data?.wallet]);

    useEffect(() => {
        if (open) {
            setOffers([]);
        }
    }, [filters, open]);

    useEffect(() => {
        if (open) {
            if (!initialOffers || !initialOffers?.pages?.length) return;
            let mergedOffers = [];
            mergedOffers = initialOffers.pages.flatMap((page) => page.results);
            setOffers((pre) => {
                const existingOfferIds = new Set(pre.map((offer) => offer.id));
                const newOffers = mergedOffers
                    .filter((offer) => !existingOfferIds.has(offer.id))
                    .map((offer) => ({
                        ...offer,
                    }));
                return [...pre, ...newOffers];
            });
        }
    }, [initialOffers, open]);

    useDisableWindowScroll(open);

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
            if (order?.id) {
                clearOfferDelayFlag(order.id);
            }
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

    let orderDrawerContent = null;
    if (isFullyPaid) {
        orderDrawerContent = (
            <>
                <ModeratorChatCard
                    onCreateChat={() => handleCreateChat(MODERATOR_ID)}
                    isMobile={isMobile}
                />
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

                <OffersFilter
                    filters={filters}
                    setFilters={setFilters}
                    isMobile={isMobile}
                    filterAccordionOpen={filterAccordionOpen}
                    setFilterAccordionOpen={setFilterAccordionOpen}
                    disabled={
                        bufferedCount > 0 ||
                        (remainingSeconds !== null &&
                            remainingSeconds > 0 &&
                            offers?.length === 0)
                    }
                />

                <div className={cn('w-full')}>
                    {offers?.length > 0 ? (
                        <>
                            {offers.map((item) => (
                                <OfferCard
                                    key={item?.id}
                                    offer={item}
                                    onSelect={setSelectedOffer}
                                    onCreateChat={handleCreateChat}
                                />
                            ))}

                            {hasNextPage && (
                                <div
                                    style={{
                                        width: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        margin: '10px auto',
                                    }}>
                                    <ClipLoader color="green" />
                                </div>
                            )}
                        </>
                    ) : (
                        <OffersWaitingLoader
                            bufferedCount={bufferedCount}
                            remainingSeconds={remainingSeconds}
                        />
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
                    <FaCreditCard />
                    To'lovni amalga oshiring
                </Button>
            </div>
        );
    }

    const isSmallScreen = isMobile || isTablet;
    const drawerWidth = chatDrawerOpen
        ? size > 1400
            ? '90%'
            : '100%'
        : isDesktop
          ? '70%'
          : isSmallScreen
            ? '100%'
            : '80%';

    const handleCloseDrawer = () => {
        setChatDrawerOpen(false);
        setCurrentChat(null);
        setFilters({
            min_rating: null,
            has_category_experience: null,
            sort_by: null,
            sort_order: null,
        });
        setFilterAccordionOpen(false);
        setOffers([]);
        onClose();
    };

    return (
        <>
            <Drawer
                title="Frilanser takliflari"
                placement="right"
                className={styles.selectOrderDrawer}
                width={drawerWidth}
                onClose={handleCloseDrawer}
                open={open}
                destroyOnClose
                bodyStyle={{
                    padding: 0,
                    overflow: 'hidden',
                }}>
                <div
                    className={styles.drawerContent}
                    style={{
                        display: chatDrawerOpen ? 'flex' : 'block',
                        height: '100%',
                    }}>
                    <div
                        className={styles.offersSection}
                        style={{
                            width: chatDrawerOpen
                                ? isSmallScreen
                                    ? '0'
                                    : '50%'
                                : '100%',
                            display:
                                chatDrawerOpen && isSmallScreen
                                    ? 'none'
                                    : 'block',
                            overflowY: 'auto',
                            overflowX: 'hidden',
                        }}>
                        <div className={styles.offersContent}>
                            {!isFullyPaid && orderDrawerContent}
                            <OrderCard order={order} infoOnly />
                            {isFullyPaid && orderDrawerContent}
                            <div ref={loadMoreRef} style={{ height: 1 }} />
                        </div>
                    </div>
                    {chatDrawerOpen && (
                        <div
                            className={styles.chatSection}
                            style={{
                                width: isMobile ? '100%' : '50%',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                position: 'relative',
                            }}>
                            <div
                                style={{
                                    padding: '16px',
                                    borderBottom: '1px solid #f0f0f0',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexShrink: 0,
                                    gap: '12px',
                                }}>
                                {isMobile ? (
                                    <Button
                                        icon={<IoMdArrowBack />}
                                        onClick={() => {
                                            setChatDrawerOpen(false);
                                            setCurrentChat(null);
                                        }}>
                                        Orqaga
                                    </Button>
                                ) : (
                                    <h3 style={{ margin: 0 }}>Chat</h3>
                                )}

                                <div
                                    style={{
                                        display: 'flex',
                                        gap: '8px',
                                        alignItems: 'center',
                                        marginLeft: 'auto',
                                    }}>
                                    {matchingOffer && !isModerator && (
                                        <Button
                                            type="primary"
                                            icon={
                                                <LiaHandshake fontSize={18} />
                                            }
                                            onClick={() => {
                                                setSelectedOffer(matchingOffer);
                                                setChatDrawerOpen(false);
                                                setCurrentChat(null);
                                            }}>
                                            Taklifni tanlash
                                        </Button>
                                    )}
                                </div>
                            </div>
                            <div
                                style={{
                                    flex: 1,
                                    overflow: 'hidden',
                                    height: '100%',
                                    minHeight: 0,
                                }}>
                                {currentChat.chatId && (
                                    <ChatWindow
                                        isModerator={isModerator}
                                        key={currentChat.chatId}
                                        chatId={currentChat.chatId}
                                        hideCreateOrderButton={true}
                                        fullHeight={true}
                                        goBack={() => {
                                            setChatDrawerOpen(false);
                                            setCurrentChat(null);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    )}
                </div>
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
                                <FaFileAlt className="text-primary me-3 fs-4" />
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
                            icon={<FaArrowLeft />}
                            onClick={handleRetreatDrawer}>
                            Orqaga
                        </Button>
                    </div>
                    {!mode ? (
                        <div className="service-details-box bg-white border rounded p-3 my-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <FaFileAlt className="text-primary me-3 fs-4" />
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
