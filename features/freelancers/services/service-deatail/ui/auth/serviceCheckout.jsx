import React, {
    useState,
    useImperativeHandle,
    forwardRef,
    useRef,
} from 'react';
import { Input, Modal, Tabs, Alert, Button } from 'antd';
import { BeatLoader } from 'react-spinners';
import { useRouter } from 'next/router';
import useCreateOrder from './api/createOrder';
import { useVerifyCode } from './api/verifyCode';
import { useCountdown } from '~/shared/hooks/useCountDown';
import { useQueryClient } from '@tanstack/react-query';
import { message as AlertMessage } from 'antd';
import { FaRegCreditCard } from 'react-icons/fa6';
import { FaRegCalendarDays } from 'react-icons/fa6';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { IoCard } from 'react-icons/io5';
import { FaWallet } from 'react-icons/fa';
import { SecurePaymentAlert } from '~/features/account/ui/CreditCard2';
import { TbReload } from 'react-icons/tb';

const ServiceCheckout = ({
    document,
    order_id,
    order,
    balanceMode = false,
    balance,
    files,
    description,
    onClose,
    onSuccess,
}) => {
    const verificationModalRef = useRef();
    const [isVerificationModalOpen, setIsVerificationModalOpen] =
        useState(false);
    const [resData, setResData] = useState(null);
    const [type, setType] = useState('card');
    const {
        mutateAsync: createOrder,
        isPending: isOrderCreatePending,
        isSuccess: isOrderCreateSuccess,
    } = useCreateOrder(balanceMode);
    const [formattedCardNumber, setFormattedCardNumber] = useState('');
    const [numberDate, setNumberDate] = useState('');
    const { push } = useRouter();
    const queryClient = useQueryClient();
    const router = useRouter();

    const resetVerificationModal = () => {
        if (verificationModalRef.current) {
            verificationModalRef.current.reset();
        }
    };

    async function handleClickPayment(e) {
        e.preventDefault();

        await createOrder(
            {
                service_id: document,
                payment_type: type,
                order_id,
                order_requirement_description: description,
                order_requirement_file: files?.[0]?.originFileObj,
            },
            {
                onSuccess: (data) => {
                    if (onClose) onClose();
                    router.push(data.url);
                },
                onError: (err) => {
                    AlertMessage.error(err.response.data.detail);
                },
            }
        );
    }

    async function handlePaymePayment(e) {
        e.preventDefault();

        await createOrder(
            {
                service_id: document,
                payment_type: type,
                order_id,
                order_requirement_description: description,
                order_requirement_file: files?.[0]?.originFileObj,
            },
            {
                onSuccess: (data) => {
                    if (onClose) onClose();
                    router.push(data.url);
                },
                onError: (err) => {
                    AlertMessage.error(err.response.data.detail);
                },
            }
        );
    }

    // 📌 Oddiy karta raqami orqali to'lov
    async function handleCardPayment(e) {
        e?.preventDefault();

        const payload = {
            service_id: document,
            payment_type: type,
            card_number: formattedCardNumber.replace(/\s/g, ''),
            expire_date: numberDate.replace('/', ''),
            order_requirement_description: description,
            order_requirement_file: files?.[0]?.originFileObj,
        };

        if (order_id) payload.order_id = order_id;
        await createOrder(payload, {
            onSuccess: async (data) => {
                if (
                    data.msg === 'Success' &&
                    data.payment_method === 'wallet'
                ) {
                    await queryClient.invalidateQueries({
                        queryKey: ['orders'],
                    });
                    await queryClient.invalidateQueries({
                        queryKey: ['getCustomBalance'],
                    });
                    AlertMessage.success(
                        "To'lov muvaffaqiyatli amalga oshirildi"
                    );
                    if (onSuccess) {
                        onSuccess(data?.order_id);
                        return;
                    }
                    if (!order_id) push('/order/my-orders?tab=2');
                    if (onClose) onClose();
                }
                setIsVerificationModalOpen(true);
                setResData(data);
                resetVerificationModal();
            },
            onError: (err) => {
                console.error('❌ Click payment error:', err);
                setResData({
                    detail: err?.response?.data?.detail || "Noma'lum xato",
                });
            },
        });
    }

    function handleCancelVerification() {
        setIsVerificationModalOpen(false);
        setResData(null);
    }

    const handleCardNumberChange = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        let formattedValue = '';

        if (inputValue.length <= 16) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += inputValue[i];
            }
        }

        setFormattedCardNumber(formattedValue);
    };

    const handleCardNumberDate = (e) => {
        const inputValue = e.target.value.replace(/\D/g, '');
        let formattedValue = '';

        if (inputValue.length <= 4) {
            for (let i = 0; i < inputValue.length; i++) {
                if (i > 0 && i % 2 === 0) {
                    formattedValue += '/';
                }
                formattedValue += inputValue[i];
            }
        }
        setNumberDate(formattedValue);
    };

    const isBalanceSufficient = balance >= order?.price;
    const isInputsDisabled = balanceMode ? isBalanceSufficient : false;
    const isInputsRequired = balanceMode ? !isBalanceSufficient : true;
    const isBalanceMode = isBalanceSufficient && balanceMode;

    const items = [
        {
            key: 'card',
            label: (
                <div className="click" height={80} width={'auto'}>
                    <img
                        src="/static/img/uzcard_humo.png"
                        alt=""
                        height={80}
                        width={'auto'}
                    />
                </div>
            ),
            children: (
                <>
                    <ChildrenWithInsufficientBalance
                        order={order}
                        balance={balance}
                        isVisible={balanceMode && !isBalanceSufficient}
                    />
                    <div style={{ marginInline: '10px' }}>
                        <form
                            onSubmit={handleCardPayment}
                            className="pb-3 d-flex align-items-end justify-content-between row gap-4 bg-white">
                            <div
                                className="col-xl-7 p-0 my-2"
                                style={{ flex: 1 }}>
                                <p className="cardNumber">Karta raqam</p>
                                <label
                                    htmlFor="ccn"
                                    className="m-0"
                                    style={{ width: '100%' }}>
                                    <Input
                                        prefix={
                                            <FaRegCreditCard
                                                style={{
                                                    width: '45px',
                                                    fontSize: '20px',
                                                }}
                                            />
                                        }
                                        required={isInputsRequired}
                                        disabled={isInputsDisabled}
                                        type="tel"
                                        // className="form-control rounded-3 card__number"
                                        style={{
                                            height: '50px',
                                        }}
                                        inputMode="numeric"
                                        maxLength="19"
                                        placeholder="0000 0000 0000 0000"
                                        value={formattedCardNumber}
                                        onChange={handleCardNumberChange}
                                    />
                                </label>
                            </div>
                            <div className="col-xl-4 p-0 click-form-item my-2">
                                <label className="m-0">
                                    <Input
                                        prefix={
                                            <FaRegCalendarDays
                                                style={{
                                                    width: '45px',
                                                    fontSize: '20px',
                                                }}
                                            />
                                        }
                                        required={isInputsRequired}
                                        disabled={isInputsDisabled}
                                        // className="form-control rounded-3 card__number"
                                        style={{
                                            height: '50px',
                                        }}
                                        inputMode="numeric"
                                        maxLength="5"
                                        placeholder="MM/YY"
                                        value={numberDate}
                                        onChange={handleCardNumberDate}
                                    />
                                </label>
                            </div>

                            <div className="col-12 p-0">
                                {resData?.detail && (
                                    <p
                                        style={{
                                            color: 'red',
                                            marginBottom: '0px',
                                        }}>
                                        {resData.detail}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="w-100 ps-btn"
                                    disabled={isOrderCreatePending}
                                    style={{
                                        color: '#fff',
                                        marginTop: '10px',
                                    }}>
                                    {isOrderCreatePending ? (
                                        <BeatLoader color="#fff" />
                                    ) : (
                                        'Davom etish'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                    <SecurePaymentAlert
                        bordered={false}
                        style={{
                            width: '100%',
                        }}
                    />
                    <VerificationCodeModal
                        ref={verificationModalRef}
                        isVerificationModalOpen={isVerificationModalOpen}
                        order_id={order_id}
                        resData={resData}
                        onSuccess={onSuccess}
                        onClose={onClose}
                        closeVerificationModal={() =>
                            setIsVerificationModalOpen(false)
                        }
                        handleCancelVerification={handleCancelVerification}
                        handleCardPayment={handleCardPayment}
                    />
                </>
            ),
        },
        {
            key: 'click',
            label: (
                <div className="click" height={80} width={'auto'}>
                    <img
                        src="/static/img/payment-method/click-logo.png"
                        alt=""
                    />
                </div>
            ),
            children: (
                <>
                    <ChildrenWithInsufficientBalance
                        order={order}
                        balance={balance}
                        isVisible={balanceMode && !isBalanceSufficient}
                    />
                    <div
                        style={{
                            margin: '0 auto',
                        }}>
                        <div className="px-4 rounded">
                            <form
                                onSubmit={handleClickPayment}
                                className="pt-3 pb-3 d-flex">
                                <button
                                    type="submit"
                                    className="w-100 ps-btn"
                                    disabled={isOrderCreatePending}
                                    style={{
                                        color: '#fff',
                                        marginTop: '10px',
                                    }}>
                                    {!isOrderCreatePending ? (
                                        'Davom etish'
                                    ) : (
                                        <BeatLoader color="#fff" />
                                    )}
                                </button>
                            </form>
                            <SecurePaymentAlert
                                bordered={false}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </div>
                    </div>
                </>
            ),
        },
        {
            key: 'payme',
            label: (
                <div className="click" height={80} style={{ width: '100%' }}>
                    <img
                        src="/static/img/payment-method/payme-logo.png"
                        alt=""
                    />
                </div>
            ),
            children: (
                <>
                    <ChildrenWithInsufficientBalance
                        order={order}
                        balance={balance}
                        isVisible={balanceMode && !isBalanceSufficient}
                    />
                    <div
                        style={{
                            margin: '0 auto',
                        }}>
                        <div className="px-4 rounded">
                            <form
                                onSubmit={handlePaymePayment}
                                className="pt-3 pb-3 d-flex">
                                <button
                                    type="submit"
                                    className="w-100 ps-btn"
                                    disabled={isOrderCreatePending}
                                    style={{
                                        color: '#fff',
                                        marginTop: '10px',
                                    }}>
                                    {!isOrderCreatePending ? (
                                        'Davom etish'
                                    ) : (
                                        <BeatLoader color="#fff" />
                                    )}
                                </button>
                            </form>
                            <SecurePaymentAlert
                                bordered={false}
                                style={{
                                    width: '100%',
                                }}
                            />
                        </div>
                    </div>
                </>
            ),
        },
    ];

    return isBalanceMode ? (
        <div>
            <Alert
                message="Sizning balansingizda yetarli mablag' mavjud. To'lovni balansdan to'lash mumkin - karta kerak emas."
                type="success"
                showIcon
                style={{ marginBlock: '20px' }}
            />
            <div className="service-details-box bg-white border rounded p-3 mb-4">
                <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                        gap: '8px',
                    }}>
                    <div className="d-flex align-items-start">
                        <div
                            style={{
                                width: '20px',
                            }}>
                            <IoCard
                                fontSize={16}
                                style={{
                                    marginRight: '8px',
                                    marginBottom: '5px',
                                }}
                            />
                        </div>
                        <h5
                            className="mb-1"
                            style={{
                                overflowWrap: 'anywhere',
                                fontWeight: 'normal',
                            }}>
                            {order?.title}
                        </h5>
                    </div>
                    <div className="text-end">
                        <h4
                            className=" mb-0"
                            style={{
                                whiteSpace: 'nowrap',
                                fontWeight: 'normal',
                                fontSize: '16px',
                            }}>
                            {formatCurrencyWithSpace(order?.price)} so'm
                        </h4>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-100 ps-btn"
                disabled={isOrderCreatePending}
                onClick={handleCardPayment}
                style={{
                    color: '#fff',
                    marginTop: '10px',
                }}>
                {!isOrderCreatePending ? (
                    "To'lov qilish"
                ) : (
                    <BeatLoader color="#fff" />
                )}
            </button>
            <SecurePaymentAlert
                bordered={false}
                style={{
                    marginTop: '10px',
                }}
            />
        </div>
    ) : (
        <Tabs
            centered
            style={{
                marginTop: '20px',
                marginBottom: 0,
            }}
            items={items}
            onChange={setType}
        />
    );
};

const ChildrenWithInsufficientBalance = ({ order, balance, isVisible }) => {
    const extraPayment = order?.price - balance;

    if (!isVisible) return null;

    return (
        <>
            <Alert
                message="Balansingizdagi mablag' to'lvoni bir qismini qoplaydi. Qolgan summani karta yoki Click orqali to'lashingiz mumkin."
                type="warning"
                showIcon
                style={{
                    marginBottom: '20px',
                }}
            />
            <div className="service-details-box bg-white border rounded p-3">
                <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                        gap: '10px',
                    }}>
                    <div className="d-flex align-items-center">
                        <div
                            style={{
                                width: '20px',
                            }}>
                            <IoCard
                                fontSize={16}
                                style={{
                                    marginRight: '8px',
                                    marginBottom: '5px',
                                }}
                            />
                        </div>
                        <h5
                            className="mb-1"
                            style={{
                                overflowWrap: 'anywhere',
                                fontWeight: 'normal',
                            }}>
                            {order?.title}
                        </h5>
                    </div>
                    <div className="text-end">
                        <h4
                            className="mb-0"
                            style={{
                                whiteSpace: 'nowrap',
                                fontWeight: 'normal',
                                fontSize: '16px',
                            }}>
                            {formatCurrencyWithSpace(order?.price)} so'm
                        </h4>
                    </div>
                </div>
                <div
                    style={{
                        marginTop: '8px',
                        borderTop: '1px solid #dee2e6',
                    }}></div>
                <div
                    className="d-flex justify-content-between align-items-center"
                    style={{
                        gap: '8px',
                        marginTop: '8px',
                    }}>
                    <div className="d-flex align-items-center">
                        <div
                            style={{
                                width: '20px',
                            }}>
                            <FaWallet
                                style={{
                                    marginRight: '8px',
                                    marginBottom: '5px',
                                }}
                            />
                        </div>
                        <h5
                            style={{
                                overflowWrap: 'anywhere',
                                fontWeight: 'normal',
                                marginBottom: '0px',
                            }}>
                            Balans
                        </h5>
                    </div>
                    <div className="text-end">
                        <h4
                            className=" mb-0"
                            style={{
                                whiteSpace: 'nowrap',
                                fontWeight: 'normal',
                                fontSize: '16px',
                            }}>
                            {formatCurrencyWithSpace(balance)} so'm
                        </h4>
                    </div>
                </div>

                <div
                    style={{
                        marginTop: '8px',
                        borderTop: '1px solid #dee2e6',
                    }}></div>
                <div
                    className="d-flex justify-content-between align-items-center"
                    style={{ marginTop: '9px', fontWeight: 'normal' }}>
                    <h4 className=" mb-0">Qoldiq to'lov</h4>
                    <div className="text-end">
                        <h3
                            className="mb-0 text-primary fw-bold"
                            style={{
                                fontSize: '20px',
                            }}>
                            {formatCurrencyWithSpace(extraPayment)} so'm
                        </h3>
                    </div>
                </div>
            </div>
        </>
    );
};

const VerificationCodeModal = forwardRef(
    (
        {
            isVerificationModalOpen,
            resData,
            order_id,
            onSuccess,
            onClose,
            closeVerificationModal,
            handleCancelVerification,
            handleCardPayment,
        } = props,
        ref
    ) => {
        const queryClient = useQueryClient();
        const { display, left, reset } = useCountdown(120);
        const {
            mutate: mutateVerifyCode,
            reset: resetVerifyCode,
            isPending: isVerifyCodePending,
            isSuccess: isVerifyCodeSuccess,
            isError: isVerifyCodeError,
        } = useVerifyCode();
        const [code, setCode] = useState(null);
        const [resDataCode, setResDataCode] = useState(null);

        // 📌 SMS kodi tasdiqlash
        function handleVerifyCode() {
            setResDataCode(null);
            mutateVerifyCode(
                {
                    transaction_id: resData?.transaction_id,
                    code,
                },
                {
                    onSuccess: async (data) => {
                        await queryClient.invalidateQueries({
                            queryKey: ['orders'],
                        });
                        await queryClient.invalidateQueries({
                            queryKey: ['getCustomBalance'],
                        });
                        setResDataCode(data);
                        closeVerificationModal();
                        if (onSuccess) {
                            onSuccess(data?.order_id, data?.accepted_by_id);
                            return;
                        }
                        if (!order_id) push('/order/my-orders?tab=2');
                        if (onClose) onClose();
                    },
                    onError: (error) => {
                        console.log('❌ Verify code error:', error);
                        const errorMessage = error?.response?.data || {
                            detail: "Noma'lum xato",
                        };
                        setResDataCode(errorMessage);
                    },
                }
            );
        }

        const handleResendCode = async () => {
            await handleCardPayment();
            reset();
            resetVerifyCode();
        };

        useImperativeHandle(
            ref,
            () => ({
                reset,
            }),
            [reset]
        );

        const isLoadingOrSuccess = isVerifyCodePending || isVerifyCodeSuccess;

        const errorMessage =
            isVerifyCodeError &&
            Boolean(left) &&
            (typeof resDataCode?.detail == 'string'
                ? resDataCode?.detail
                : "Noma'lum xato");

        return (
            <Modal
                width={500}
                title="Tez orada!"
                centered
                open={isVerificationModalOpen}
                onOk={handleVerifyCode}
                onCancel={handleCancelVerification}
                destroyOnClose
                confirmLoading={isLoadingOrSuccess}
                okButtonProps={{
                    style: {
                        backgroundColor: 'green',
                        color: 'white',
                    },
                    disabled: isLoadingOrSuccess || !code?.length,
                }}
                okText={"To'lov qilish"}
                cancelText="Orqaga">
                <>
                    <p>
                        Kod quyidagi raqamga yuborildi: {resData?.phone_number}
                    </p>
                    <input
                        onChange={(e) => setCode(e.target.value)}
                        type="tel"
                        placeholder="000000"
                        disabled={isVerifyCodePending || isVerifyCodeSuccess}
                        maxLength={6}
                        className="form-control text-center rounded-3 fs-3"
                    />
                    <strong className="text-danger">
                        {left ? (
                            display
                        ) : (
                            <Button
                                icon={<TbReload />}
                                style={{
                                    padding: '0px 2px',
                                }}
                                type="link"
                                onClick={handleResendCode}>
                                Kodni qayta yuborish
                            </Button>
                        )}
                    </strong>
                    <p className="text-danger">{errorMessage}</p>
                </>
            </Modal>
        );
    }
);

export default ServiceCheckout;
