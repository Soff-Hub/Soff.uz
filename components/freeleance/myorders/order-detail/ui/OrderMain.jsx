import {
    Breadcrumb,
    Button,
    Modal,
    message,
    Input,
    Rate,
    Alert,
    Radio,
    Tooltip,
    Switch,
    Card,
    Skeleton,
} from 'antd';
import {
    DownloadOutlined,
    SmileOutlined,
    WarningOutlined,
    BellOutlined,
} from '@ant-design/icons';
import React, { useEffect, useMemo, useState } from 'react';
import styles from '../style/style.module.scss';
import modalStyles from '~/features/user-profile/styles/orderPaymentPrompt.module.scss';
import Link from 'next/link';
import dayjs from 'dayjs';
import RequirementModal from './modals/RequirementModal';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import ServiceCheckout from '~/components/freeleance/services/service-deatail/ui/auth/serviceCheckout';
import useGetFile from '../api/useGetFile';
import useSubmit from '../api/useSubmit';
import { useQueryClient } from '@tanstack/react-query';
import ReactConfetti from 'react-confetti';
// import { useRouter } from 'next/router';
import OrderCard from '~/entities/order/order-card';
import useResponsive from '~/shared/utilities/useResponsive';
import { useDispatch } from 'react-redux';
import { setShowSearch } from '~/store/fast-dowload/slice';
import { IoCheckboxOutline } from 'react-icons/io5';
import TelegramNotification from '~/shared/components/telegram-notlification';
import useGetCustomBalance from '~/components/freeleance/myorders/myorder/api/useGetCustomBalance';
import { FiFileText } from 'react-icons/fi';
import { formatFileSize } from '~/shared/utilities/utils';
import { downloadFile } from '~/shared/utilities/utils';

function extractName(url) {
    return url.split('/').pop().split('?')[0];
}

// TimerComponent to show time remaining until deadline
const TimerComponent = ({ deadlineDate }) => {
    const [timeRemaining, setTimeRemaining] = useState('');
    const [isOverdue, setIsOverdue] = useState(false);

    useEffect(() => {
        const updateTimer = () => {
            if (!deadlineDate) return;

            const now = dayjs();
            const deadline = dayjs(deadlineDate);
            const diff = deadline.diff(now);

            if (diff < 0) {
                // Deadline has passed - show overdue time
                const overdueDuration = dayjs.duration(Math.abs(diff));
                const years = Math.floor(overdueDuration.asYears());
                const months = Math.floor(overdueDuration.asMonths()) % 12;
                const days = Math.floor(overdueDuration.asDays()) % 30;
                const hours = overdueDuration.hours();
                const minutes = overdueDuration.minutes();

                let overdueString = '';

                if (years > 0) {
                    overdueString += `${years} yil `;
                }
                if (months > 0) {
                    overdueString += `${months} oy `;
                }
                if (days > 0) {
                    overdueString += `${days} kun `;
                }
                if (hours > 0) {
                    overdueString += `${hours} soat `;
                }
                if (minutes > 0 && days === 0 && hours === 0) {
                    overdueString += `${minutes} daqiqa `;
                }

                setTimeRemaining(overdueString.trim() + ' kechikdi');
                setIsOverdue(true);
                return;
            }

            const duration = dayjs.duration(diff);
            const years = Math.floor(duration.asYears());
            const months = Math.floor(duration.asMonths()) % 12;
            const days = Math.floor(duration.asDays()) % 30;
            const hours = duration.hours();
            const minutes = duration.minutes();

            let timeString = '';

            if (years > 0) {
                timeString += `${years} yil `;
            }
            if (months > 0) {
                timeString += `${months} oy `;
            }
            if (days > 0) {
                timeString += `${days} kun `;
            }
            if (hours > 0) {
                timeString += `${hours} soat `;
            }
            if (minutes > 0 && days === 0) {
                timeString += `${minutes} daqiqa `;
            }

            if (!timeString) {
                timeString = 'Bir necha daqiqa ';
            }

            setTimeRemaining(timeString.trim() + ' qoldi');
            setIsOverdue(false);
        };

        updateTimer();
        const interval = setInterval(updateTimer, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [deadlineDate]);

    if (!timeRemaining) return null;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginTop: '8px',
                color: isOverdue ? '#ff4d4f' : '#666',
                fontSize: '14px',
            }}>
            <span>
                {isOverdue ? '⚠️ ' : '⏰ '}
                Muddat: {timeRemaining}
            </span>
        </div>
    );
};

const TelegramNotificationHeader = (
    <div className={styles.telegramNotification}>
        <h5 className={styles.telegramNotificationTitle}>
            <div className={styles.telegramNotificationIcon}>
                <BellOutlined
                    style={{
                        fontSize: '25px',
                    }}
                />
            </div>
            Bildirishnomalarni yoqing
        </h5>
        <p className={'mb-0 text-muted ' + styles.telegramNotificationDesc}>
            Buyurtma holati haqida xabardor bo'lish uchun Telegram orqali
            bildirishnoma oling
        </p>
    </div>
);

const OrderMain = ({ order, handleOrderUpdate }) => {
    const [open, setOpen] = useState(false);
    const [congratModal, setCongratModal] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [text, setText] = useState('');
    const [res, setRes] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [rate, setRate] = useState();
    const {
        data: file,
        isFetching: fileIsFetching,
        refetch: refetchFiles,
    } = useGetFile(order?.id);
    const submit = useSubmit();
    const queryClient = useQueryClient();
    const { isDesktop } = useResponsive();
    const dispatch = useDispatch();

    const price = order?.service?.price || order?.budget || 0;
    const [mode, setMode] = useState(true);
    const { data } = useGetCustomBalance();
    const balance = Number(data?.wallet || 0);
    const balanceDisabled = balance > 0;

    const leftBalance = formatCurrencyWithSpace(Number(balance));
    const isSufficientBalance = balance >= price;

    const items = [
        { title: <Link href={'/order/my-orders'}>Mening buyurtmalarim</Link> },
        { title: `#${order?.id}` },
    ];

    const { TextArea } = Input;

    const onClose = () => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ['order'] });
    };

    // useEffect(() => {
    //     if (query?.isOpen === 'true' && !isOpen) {
    //         setIsOpen(true);
    //         push(`/order/${query?.id}`);
    //     }
    // }, [query?.isOpen]);

    const isFullyPaid = order?.approved_transaction_amount >= price;
    const isPartiallyPaid =
        order?.approved_transaction_amount > 0 &&
        order?.approved_transaction_amount < price;
    const notPaidAmount = price - (order?.approved_transaction_amount || 0);

    const serviceCheckoutOrder = {
        id: order?.id,
        price: isPartiallyPaid ? notPaidAmount : price,
        title: order?.title,
    };

    useEffect(() => {
        setMode(Number(data?.wallet || 0) > 0);
    }, [data?.wallet]);

    useEffect(() => {
        if (!isFullyPaid) {
            setIsOpen(true);
        }
    }, [setIsOpen, order]);

    useEffect(() => {
        dispatch(setShowSearch(false));

        return () => {
            dispatch(setShowSearch(true));
        };
    }, [dispatch]);

    const pendingFiles = useMemo(() => {
        if (!file || !file?.files?.length) return [];
        return file?.files?.filter((f) => f.status === 'pending');
    }, [file]);

    const completedFiles = useMemo(() => {
        if (!file || !file?.files?.length) return [];
        return file?.files?.filter((f) => f.status === 'completed');
    }, [file]);

    const hasPendingFiles = pendingFiles.length;

    let filesContent = null;
    if (fileIsFetching) {
        filesContent = (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                }}>
                {Array(3)
                    .fill(null)
                    .map((_, index) => (
                        <Skeleton.Button
                            key={index}
                            style={{ height: '80px', width: '100%' }}
                        />
                    ))}
            </div>
        );
    } else if (hasPendingFiles) {
        filesContent = pendingFiles.map((f) => (
            <div key={f.url} className={styles.orderConfirmFile}>
                <div className={styles.orderConfirmFileInfo}>
                    <div className={styles.orderConfirmFileIconWrapper}>
                        <FiFileText className={styles.orderConfirmFileIcon} />
                    </div>
                    <div className={styles.orderConfirmFileText}>
                        <p>{extractName(f.url)}</p>
                        <p>
                            {formatFileSize(f?.size)} •{' '}
                            {dayjs(f?.created_at).format('YYYY-MM-DD HH:mm')}
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(f.url)}
                    className="ml-4 flex-shrink-0">
                    <DownloadOutlined className="w-4 h-4 mr-2" />
                    Yuklab olish
                </Button>
            </div>
        ));
    } else {
        filesContent = <p>Hozircha yuklangan fayllar mavjud emas.</p>;
    }

    const completedFilesContent = null;
    if (completedFiles.length) {
        completedFilesContent = completedFiles.map((f) => (
            <div key={f.url} className={styles.orderConfirmFile}>
                <div className={styles.orderConfirmFileInfo}>
                    <div className={styles.orderConfirmFileIconWrapper}>
                        <FiFileText className={styles.orderConfirmFileIcon} />
                    </div>
                    <div className={styles.orderConfirmFileText}>
                        <p>{extractName(f.url)}</p>
                        <p>
                            {formatFileSize(f?.size)} •{' '}
                            {dayjs(f?.created_at).format('YYYY-MM-DD HH:mm')}
                        </p>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => downloadFile(f.url)}
                    className="ml-4 flex-shrink-0">
                    <DownloadOutlined className="w-4 h-4 mr-2" />
                    Yuklab olish
                </Button>
            </div>
        ));
    }

    // const handleOrderUpdate = (id) => {
    //     // Bu yerda orders listini qayta yuklash yoki state yangilash
    //     queryClient.invalidateQueries({ queryKey: ['order', id] });
    // };
    return (
        <div className="col-lg-9 col-12 rounded-2 my-4">
            <div className={styles.orderDetailMain}>
                {/* Notification Settings Card */}
                {order?.order_status_doing?.status !== 'rejected' && (
                    <TelegramNotification
                        hideIfActivated
                        header={TelegramNotificationHeader}
                    />
                )}

                {order?.order_status_doing?.status === 'pending' && (
                    <div className={styles.orderPayCardFlex}>
                        <div className={styles.orderPayCardInfo}>
                            <h5
                                className={`mb-0 ${
                                    !isDesktop && 'text-center'
                                }`}>
                                Frilanser ish boshlashiga to'lov qiling.
                            </h5>
                        </div>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#00a44f',
                                borderColor: '#00a44f',
                                padding: '16px 36px',
                            }}
                            onClick={() => setIsOpen(true)}>
                            <i class="fa-solid fa-credit-card"></i> To'lovni
                            amalga oshiring
                        </Button>
                    </div>
                )}
                {order?.order_status_doing?.status === 'order_accepted' && (
                    <div className={styles.orderPayCardFlex}>
                        <div>
                            <h4
                                style={{
                                    color: '#389e0d',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    marginBottom: 0,
                                }}
                                className={styles.orderNameLink}>
                                <div
                                    style={{
                                        width: '25px',
                                    }}>
                                    <IoCheckboxOutline
                                        style={{ fontSize: '25px' }}
                                    />
                                </div>
                                Buyurtma qabul qilindi! Frilanser ishni
                                boshladi.
                            </h4>
                            <p className="mt-2 mb-0 text-muted">
                                Ish tayyor bo'lgach fayl shu yerdan yuklanadi •
                                Chat orqali frilanser bilan aloqada bo'ling
                            </p>
                            <TimerComponent
                                deadlineDate={order?.deadline_date}
                            />
                        </div>
                    </div>
                )}
                {(order?.order_status_doing?.status === 'approved' ||
                    order?.order_status_doing?.status ===
                        'requirement_file_rejected') && (
                    <div className={styles.orderPayCardFlex}>
                        <div>
                            <h3 className={styles.orderNameLink}>
                                Buyurtma talablari kutilmoqda
                            </h3>
                            {order?.order_status_doing?.status ===
                                'approved' && (
                                <p>
                                    Siz to‘lovni amalga oshirdingiz. Endi
                                    mutahasis ishni boshlashi uchun kerakli
                                    materiallar va ko‘rsatmalarni yuboring.
                                </p>
                            )}
                            {order?.order_status_doing?.status ===
                                'requirement_file_rejected' && (
                                <p>
                                    Siz yuborgan materiallar yoki ko‘rsatmalar
                                    yetarli emasligi sababli mutahasis ularni
                                    rad etdi. Iltimos, ishni boshlash uchun
                                    barcha kerakli fayllar va aniq
                                    ko‘rsatmalarni qayta yuboring.
                                </p>
                            )}
                        </div>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#00a44f',
                                borderColor: '#00a44f',
                                padding: '16px 28px',
                            }}
                            onClick={() => setOpen(true)}>
                            Talablarni yuborish
                        </Button>
                    </div>
                )}

                {order?.order_status_doing?.status == 'order_file_sent' && (
                    <div className={styles.orderPayCardGrid}>
                        <h3 className={styles.orderConfirmTitle}>
                            Ishni qabul qilish
                        </h3>
                        <p>
                            Mutahasis buyurtmani yakunladi va natijani sizga
                            jo'natdi. Natijani yuklab olib ko'rib chiqing va
                            tasdiqlang yoki rad eting.
                        </p>
                        <Alert
                            message="Eslatma:"
                            description="Agar siz 24 soat ichida ishni holatini o'zgartirmasangiz, buyurtma avtomatik ravishda qabul qilinadi va to'lov mutaxassisga o'tkaziladi."
                            type="warning"
                            showIcon
                            style={{
                                marginBottom: '10px',
                            }}
                        />
                        <h4
                            className="mb-3"
                            style={{
                                fontWeight: '400',
                                color: '#333',
                            }}>
                            Yuklangan fayllar
                        </h4>
                        {filesContent}
                        <div className={styles.orderConfirmFileActions}>
                            <Button
                                color="danger"
                                variant="outlined"
                                // value="end"
                                onClick={() => {
                                    setRes('rejected');
                                    setFeedbackOpen(true);
                                }}>
                                Kamchilik aniqlandi
                            </Button>
                            <Button
                                type="primary"
                                variant="contained"
                                // value="start"
                                onClick={() => {
                                    setRes('complected');
                                    setFeedbackOpen(true);
                                }}>
                                Qabul qilish
                            </Button>
                        </div>
                    </div>
                )}

                {order?.order_status_doing?.status === 'rejected' && (
                    <Alert
                        icon={<WarningOutlined />}
                        message="Fayl qayta ishlov uchun qaytarildi"
                        description={order?.order_status_doing?.reason}
                        type="error"
                        showIcon
                        className="mb-3"
                    />
                )}
                <Breadcrumb items={items} className="mb-2" />
                <OrderCard
                    order={order}
                    infoOnly
                    detail
                    onOrderUpdate={handleOrderUpdate}
                />
                {order?.order_status_doing?.status === 'completed' && (
                    <div className=" mt-3">
                        <div className={styles.orderPayCardGrid}>
                            <h4
                                className="mb-3"
                                style={{
                                    fontWeight: '400',
                                    color: '#333',
                                }}>
                                Buyurtma fayllari
                            </h4>
                            {completedFilesContent}
                        </div>
                    </div>
                )}

                {order?.order_requirement?.length > 0 && (
                    <div
                        className="mt-4 border border-success"
                        style={{
                            borderRadius: '12px',
                            padding: '16px',
                            backgroundColor: '#fafafa',
                        }}>
                        <h5
                            style={{
                                fontWeight: '600',
                                marginBottom: '16px',
                                fontSize: '18px',
                                color: '#333',
                            }}>
                            Buyurtma talablari
                        </h5>

                        <div className="d-flex flex-column flex-md-row align-items-start gap-3">
                            {/* Tavsif qismi */}
                            <div
                                style={{
                                    flex: 1,
                                    fontSize: '15px',
                                    lineHeight: '1.6',
                                    color: '#444',
                                    overflowWrap: 'break-word',
                                    whiteSpace: 'pre-line',
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: order.order_requirement[0]
                                        ?.order_requirement_description,
                                }}
                            />
                            {/* Fayl bo‘lsa tugma chiqadi */}
                            {order.order_requirement[0]
                                ?.order_requirement_file && (
                                <div className="d-flex justify-content-md-end justify-content-start w-md-auto">
                                    <Button
                                        icon={<DownloadOutlined />}
                                        onClick={() =>
                                            downloadFile(
                                                order.order_requirement[0]
                                                    .order_requirement_file
                                            )
                                        }>
                                        Faylni yuklab olish
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <RequirementModal
                visible={open}
                onClose={() => setOpen(false)}
                orderId={order?.id}
            />

            <Modal
                title="Natija bo‘yicha fikringiz"
                open={feedbackOpen}
                onCancel={() => {
                    setFeedbackOpen(false);
                    setRes('');
                    setText('');
                }}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        loading={submit.isPending}
                        onClick={() => {
                            if (res === 'rejected' && !text.trim()) {
                                message.error(
                                    'Kamchiliklarni yozishingiz kerak'
                                );
                                return;
                            } else if (
                                res === 'complected' &&
                                (!text.trim() || !rate)
                            ) {
                                message.error(
                                    'Fikr va bahoni yozishingiz kerak'
                                );
                                return;
                            }

                            const payload = { id: order?.id };

                            payload.status =
                                res === 'rejected' ? 'rejected' : 'completed';

                            if (res === 'rejected' && text) {
                                payload.reason = text;
                            }
                            if (res === 'complected' && rate) {
                                payload.rating = rate;
                            }
                            if (res === 'complected' && text) {
                                payload.comment = text;
                            }

                            submit.mutate(payload, {
                                onSuccess: () => {
                                    message.success('Fikringiz yuborildi');
                                    setFeedbackOpen(false);
                                    setRes('');
                                    queryClient.invalidateQueries({
                                        queryKey: ['order'],
                                    });
                                    refetchFiles();
                                    setText('');
                                    setRate(undefined);
                                    if (payload.status == 'completed') {
                                        setCongratModal(true);
                                    }
                                },
                                onError: () => {
                                    message.error(
                                        'Fikr yuborishda xatolik yuz berdi'
                                    );
                                },
                            });
                        }}>
                        Yuborish
                    </Button>,
                ]}>
                {res === 'complected' && (
                    <div className="d-flex flex-column gap-4">
                        <p className="m-0">
                            Siz natijani qabul qildingiz. <br />
                            Endi xizmat haqida oz fikringizni yozib qoldiring va
                            ishni yakunlang.
                        </p>
                        <Rate
                            allowHalf={false}
                            value={rate}
                            onChange={(val) => setRate(val)}
                        />
                        <TextArea
                            placeholder="Xizmat haqida fikrlaringizni yozib qoldiring"
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                )}

                {res === 'rejected' && (
                    <>
                        <p>
                            Kamchiliklarni iloji boricha batafsil yozing. Bu
                            sotuvchiga tezroq tuzatish kiritishga yordam beradi.
                        </p>
                        <TextArea
                            placeholder="Ishning aniqlangan kamchiliklarini yozing"
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </>
                )}
            </Modal>

            <Modal
                open={isOpen}
                onCancel={() => {
                    setIsOpen(false);
                    setShowPayment(false);
                }}
                footer={null}
                width={600}>
                <div className={modalStyles.serviceOrderModal}>
                    {!showPayment ? (
                        <div className={modalStyles.servicePreOrder}>
                            <h3 className={modalStyles.title}>
                                Buyurtma uchun to'lovni amalga oshiring
                            </h3>

                            <div className={modalStyles.securityMessage}>
                                <i className="fa-solid fa-shield-halved text-success fs-4 mb-2"></i>
                                <p className="text-muted mb-0">
                                    Sizning to'lovingiz Soff tizimi tomonidan
                                    xavfsiz saqlanadi. Mutaxassisga to'lov faqat
                                    siz ishni ko'rib chiqib, tasdiqlaganingizdan
                                    so'ng amalga oshiriladi.
                                </p>
                            </div>

                            {isPartiallyPaid && (
                                <div className="text-center mb-4 text-warning">
                                    <p className="text-warning mb-0 mt-2">
                                        Eslatma: Siz ilgari{' '}
                                        {formatCurrencyWithSpace(
                                            order?.approved_transaction_amount
                                        )}{' '}
                                        so'm to'lovni amalga oshirgansiz.
                                        Iltimos, qolgan{' '}
                                        {formatCurrencyWithSpace(notPaidAmount)}{' '}
                                        so'm to'lovni amalga oshiring.
                                    </p>
                                </div>
                            )}

                            {!mode ? (
                                <div className="service-details-box bg-white border rounded p-3 mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="d-flex align-items-center">
                                            <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                            <div>
                                                {/* <h5 className="mb-1 fw-bold">{title}</h5> */}
                                                <p className="text-muted mb-0">
                                                    {order?.service?.title ||
                                                        order?.title}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <h4
                                                className="text-primary white-space-nowrap mb-0 fw-bold"
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                }}>
                                                {formatCurrencyWithSpace(
                                                    isPartiallyPaid
                                                        ? notPaidAmount
                                                        : price
                                                )}{' '}
                                                so'm
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            ) : null}

                            <div className={'text-center'}>
                                <Button
                                    type="primary"
                                    size="large"
                                    className="px-5 py-2"
                                    style={{
                                        backgroundColor: '#28a745',
                                        borderColor: '#28a745',
                                    }}
                                    onClick={() => setShowPayment(true)}>
                                    Buyurtma berish
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={modalStyles.orderPayment}>
                            <div className={modalStyles.orderPaymentHeader}>
                                {/* NOTE: Balance button temporarily commented */}
                                {balanceDisabled ? (
                                    <Tooltip title="To'lov uchun balansingizdan foydalaning">
                                        <Button
                                            onClick={() =>
                                                setMode((pre) => !pre)
                                            }
                                            className={
                                                mode && isSufficientBalance
                                                    ? modalStyles.orderButtonActive
                                                    : mode &&
                                                      !isSufficientBalance
                                                    ? modalStyles.orderButtonWarn
                                                    : modalStyles.orderButtonInactive
                                            }
                                            disabled={!balanceDisabled}>
                                            <Switch value={mode} size="small" />
                                            Balance - {leftBalance} so'm
                                        </Button>
                                    </Tooltip>
                                ) : null}

                                <Button
                                    type="text"
                                    className={modalStyles.backButton}
                                    icon={
                                        <i className="fa-solid fa-arrow-left"></i>
                                    }
                                    onClick={() => setShowPayment(false)}>
                                    Orqaga
                                </Button>
                            </div>
                            <div className="bg-white">
                                <ServiceCheckout
                                    onClose={onClose}
                                    order={serviceCheckoutOrder}
                                    balanceMode={mode}
                                    balance={balance}
                                    document={order?.service?.id}
                                    order_id={order?.id}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
            {congratModal && (
                <ReactConfetti recycle={false} numberOfPieces={300} />
            )}
            <Modal
                open={congratModal}
                centered
                footer={null}
                onCancel={() => setCongratModal(false)}
                bodyStyle={{
                    textAlign: 'center',
                    padding: '2rem',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #d4f7d4, #ffffff)',
                }}>
                <div className="text-center">
                    <SmileOutlined
                        style={{ fontSize: '48px', color: '#28a745' }}
                    />
                    <h2
                        style={{
                            color: '#28a745',
                            fontSize: '24px',
                            marginTop: '1rem',
                        }}>
                        🎉 Tabriklaymiz! 🎉
                    </h2>
                    <p style={{ fontSize: '16px', marginTop: '0.5rem' }}>
                        Sizning buyurtmangiz <b> muvaffaqiyatli yakunlandi</b>.
                        Bizning platformamizni tanlaganingiz uchun rahmat 💚
                    </p>

                    <Button
                        type="primary"
                        size="large"
                        style={{
                            marginTop: '1.5rem',
                            backgroundColor: '#28a745',
                            borderColor: '#28a745',
                            borderRadius: '8px',
                        }}
                        onClick={() => setCongratModal(false)}>
                        Rahmat 🚀
                    </Button>
                </div>
            </Modal>
        </div>
    );
};

export default OrderMain;
