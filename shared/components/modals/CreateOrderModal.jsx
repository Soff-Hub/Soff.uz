import {
    Form,
    Modal,
    Input,
    Select,
    Button,
    DatePicker,
    message,
    InputNumber,
    Tooltip,
    TimePicker,
    Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { useFGet, useFPost } from '../../hooks/useFApi';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
    titleDescription,
    inputInfoToCreateOrder,
} from '~/shared/constants/createOrder';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { useTelegram } from '~/shared/hooks/useTelegram';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import PhoneNumberModal from '~/features/orders/ui/PhoneNumberModal';

const { TextArea } = Input;

const CreateOrderModal = ({
    open,
    onClose,
    id,
    seller,
    sellerInfo,
    defaultDirection,
    onSuccess,
}) => {
    const [form] = Form.useForm();
    const { tg } = useTelegram();
    const budget = Form.useWatch('budget', form);
    const categoryId = Form.useWatch('category_id', form);
    const [direction, setDirection] = useState('scientific_work');
    const { user } = useSelector((state) => state.auth);
    const { push } = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(true);
    const [files, setFiles] = useState(null);
    const [phoneModalOpen, setPhoneModalOpen] = useState(false);
    const [pendingOrderData, setPendingOrderData] = useState(null);

    useEffect(() => {
        form.setFieldValue('direction', direction);
    }, [direction]);

    useEffect(() => {
        if (defaultDirection) {
            setDirection(defaultDirection);
            form.setFieldValue('direction', defaultDirection);
        }
    }, [defaultDirection]);

    const { data: directions } = useGetDirectionsQuery();

    const { data: categories } = useFGet(
        ['direction-categories', direction],
        `categories/?direction=${direction}`,
        { enabled: !!direction }
    );

    const { data: priceData } = useFGet(
        ['price-range', direction, categoryId],
        `categories/?direction=${direction}&category_id=${categoryId}`,
        {
            enabled: !!direction && !!categoryId,
        }
    );

    const priceList =
        priceData?.[0]?.service_delivery_price_options?.[0]?.price?.slice(0, 5);

    const minPrice = priceList ? priceList[0]?.amount : 2000;

    const { mutate: createOrder, isPending } = useFPost({
        url: 'order/custom-order',
        token: user?.access,
        onSuccess: (data) => {
            form.resetFields();
            onClose();
            message.success('Buyurtma muvaffaqiyatli yaratildi!');
            tg?.close();
            push(`/order/my-orders?orderId=${data?.id}`);
            setConfirmOpen(false);
        },
        onError: (err) => {
            const errorMsg =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                'Noma’lum xato yuz berdi';
            message.error(errorMsg);
        },
    });

    const { mutate: createDirectOrder, isPending: createPending } = useFPost({
        url: 'order/direct-order',
        token: user?.access,
        onSuccess: (data) => {
            message.success('Buyurtma muvaffaqiyatli yuborildi!');
            if (onSuccess) {
                onSuccess({
                    id: data?.id,
                    price: form.getFieldValue('budget'),
                    title: form.getFieldValue('title'),
                });
            } else {
                push(`/order/${data?.id}`);
            }
            form.resetFields();
            onClose();
            setConfirmOpen(false);
        },
        onError: (err) => {
            setConfirmOpen(false);

            const errorData = err?.response?.data;
            const errorDetail =
                errorData?.detail || errorData?.message || err.message;
            if (errorDetail.includes('telefon raqam')) {
                const values = form.getFieldsValue();
                const order = {
                    direction: direction,
                    category_id: values.category_id,
                    title: form.getFieldValue('title'),
                    description: values.description,
                    language: values.language,
                    budget: values.budget,
                    deadline_date: `${dayjs(values.deadline_date).format(
                        'YYYY-MM-DD'
                    )} ${dayjs(values.deadline_time).format('HH:mm')}`,
                };
                setPendingOrderData({ order, files });
                setPhoneModalOpen(true);
            }
            const errorMsg = errorDetail || "Noma'lum xato yuz berdi";
            message.error(errorMsg);
        },
    });

    const handleFinish = () => {
        setConfirmOpen(true);
    };

    const handleConfirm = () => {
        const values = form.getFieldsValue();
        const order = {
            direction: direction,
            category_id: values.category_id,
            title: form.getFieldValue('title'),
            description: values.description,
            language: values.language,
            budget: values.budget,
            deadline_date: `${dayjs(values.deadline_date).format(
                'YYYY-MM-DD'
            )} ${dayjs(values.deadline_time).format('HH:mm')}`,
        };

        if (id) order.seller_id = id;

        const fd = new FormData();

        for (const [key, value] of Object.entries(order)) {
            fd.append(key, value);
        }

        if (files && files.length > 0) {
            fd.append('file', files[0].originFileObj);
        }

        if (id) {
            createDirectOrder(fd);
        } else {
            createOrder(fd);
        }
    };

    const handlePhoneSubmit = (phoneNumber) => {
        if (!pendingOrderData) return;

        const fd = new FormData();

        // Use pending order data
        for (const [key, value] of Object.entries(pendingOrderData.order)) {
            fd.append(key, value);
        }

        if (id) fd.append('seller_id', id);
        // Add phone number
        fd.append('contact_phonenumber', phoneNumber);

        // Add file if exists
        if (pendingOrderData.files && pendingOrderData.files.length > 0) {
            fd.append('file', pendingOrderData.files[0].originFileObj);
        }

        setPhoneModalOpen(false);
        createDirectOrder(fd);
    };

    const handlePhoneModalCancel = () => {
        setPhoneModalOpen(false);
        setPendingOrderData(null);
    };

    const handleThumbProgress = (swiper) => {
        const progress = swiper.progress;
        const isBeginning = swiper.isBeginning;
        const isEnd = swiper.isEnd;

        setShowLeftGradient(!isBeginning);
        setShowRightGradient(!isEnd);
    };

    return (
        <>
            <Modal
                width={600}
                title={
                    seller
                        ? `${seller} uchun maxsus buyurtma berish`
                        : 'Maxsus buyurtma yaratish'
                }
                open={open}
                onCancel={onClose}
                footer={null}
                style={{
                    zIndex: 11100,
                }}
                centered>
                {seller && sellerInfo && (
                    <div
                        className="user-card mb-3 p-3 rounded-4"
                        style={{
                            background:
                                'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            border: '1px solid #e8e8e8',
                        }}>
                        <div className="d-flex align-items-center gap-1 justify-content-between">
                            <div className="d-flex align-items-center gap-3">
                                <div
                                    className="user-avatar d-flex align-items-center justify-content-center rounded-circle"
                                    style={{
                                        width: '50px',
                                        overflow: 'hidden',
                                        aspectRatio: '1/1',
                                        background: '#fff',
                                        fontSize: '20px',
                                        fontWeight: 'bold',
                                        color: '#667eea',
                                    }}>
                                    {sellerInfo?.image ? (
                                        <img
                                            className={
                                                'rounded-circle object-fit-cover'
                                            }
                                            style={{
                                                width: '50px',
                                                aspectRatio: '1/1',
                                            }}
                                            src={sellerInfo.image}
                                            alt="No"
                                        />
                                    ) : (
                                        seller?.charAt(0)?.toUpperCase()
                                    )}
                                </div>
                                <div>
                                    <div className="d-flex align-items-center gap-2">
                                        <h6 className="m-0 text-white fw-bold">
                                            {seller}
                                        </h6>
                                        <span
                                            className="verified-badge"
                                            style={{
                                                color: '#4CAF50',
                                                fontSize: '16px',
                                            }}>
                                            ✓
                                        </span>
                                    </div>
                                    <div
                                        className="d-flex align-items-center gap-1 position-relative text-white-50 small"
                                        style={{
                                            bottom: '3px',
                                        }}>
                                        {sellerInfo?.position ||
                                            'No profession'}
                                    </div>
                                </div>
                            </div>
                            <div className="text-end">
                                {/*NOTE: this will be implemented soon*/}
                                {/* <div
                                    className="d-flex align-items-center gap-1 position-relative text-white fw-bold justify-content-end"
                                    style={{
                                        bottom: '3px',
                                    }}>
                                    <span
                                        style={{
                                            color: '#FFD700',
                                            fontSize: '14px',
                                        }}>
                                        ★
                                    </span>
                                    <span>10/10</span>
                                </div>
                                <div className="text-white-50 small">
                                    65 дней, предоплата 25%
                                </div> */}
                            </div>
                        </div>
                    </div>
                )}
                <Form form={form} layout="vertical" onFinish={handleFinish}>
                    <Form.Item
                        name="direction"
                        label={
                            <div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                                <p className="m-0 text-dark">
                                    Yo’nalishni tanlang
                                </p>
                            </div>
                        }
                        rules={[
                            { required: true, message: "Yo'nalish tanlang!" },
                        ]}>
                        <Select
                            onChange={(val) => {
                                setDirection(val);
                                form.resetFields(['category_id']);
                                form.setFieldValue('title', '');
                            }}
                            placeholder=""
                            options={directions}
                        />
                    </Form.Item>
                    {direction && (
                        <Form.Item
                            name="category_id"
                            label={
                                <div className="d-flex align-items-center">
                                    <p className="m-0 text-dark">
                                        Kategoriya tanlang
                                    </p>
                                    <Info
                                        title={
                                            inputInfoToCreateOrder['category']
                                                .info
                                        }
                                    />
                                </div>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Kategoriya tanlang!',
                                },
                            ]}>
                            <Select
                                onSelect={(_, option) => {
                                    form.setFieldValue(
                                        'title',
                                        titleDescription(option?.label)
                                    );
                                }}
                                placeholder={inputInfoToCreateOrder[
                                    'category'
                                ].placeholder(directions)}
                                options={categories?.map((cat) => ({
                                    label: cat?.title,
                                    value: cat?.id,
                                }))}
                            />
                        </Form.Item>
                    )}
                    <div
                        style={{
                            marginBottom: '20px',
                        }}>
                        <Form.Item
                            name="description"
                            style={{ marginBottom: '15px' }}
                            label={
                                <div className="d-flex align-items-center align-items-sm-center">
                                    <p className="m-0 text-dark">
                                        Buyurtma tavsifini kiriting
                                    </p>
                                    <Info
                                        title={
                                            inputInfoToCreateOrder[
                                                'description'
                                            ].info
                                        }
                                    />
                                </div>
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Buyurtma tavsifini yozing!',
                                },
                            ]}>
                            <TextArea
                                style={{ resize: 'none' }}
                                rows={6}
                                placeholder={
                                    inputInfoToCreateOrder['description']
                                        .placeholder
                                }
                            />
                        </Form.Item>
                        <Upload
                            fileList={files}
                            multiple={false}
                            listType="picture"
                            className="custom-order-file-upload"
                            name="file"
                            maxCount={1}
                            beforeUpload={() => {
                                return false;
                            }}
                            onChange={(e) => {
                                const { file, fileList } = e;
                                if (file) {
                                    const maxSize = 50 * 1024 * 1024;
                                    if (file.size > maxSize) {
                                        message.error(
                                            "Fayl 50 MB dan katta bo'lishi mumkin emas"
                                        );
                                        return;
                                    }
                                    setFiles(fileList);
                                }
                            }}
                            onRemove={() => setFiles(null)}>
                            <Button
                                icon={
                                    <i className="fa-solid fa-paperclip"></i>
                                }>
                                Fayl yuklash (ixtiyoriy)
                            </Button>
                        </Upload>
                    </div>
                    <Form.Item
                        name="language"
                        label={
                            <div className="d-flex align-items-center text-wrap  align-items-sm-center">
                                <p className="m-0 text-dark">Buyurtma tili</p>
                            </div>
                        }
                        rules={[
                            {
                                required: true,
                                message: 'Bajarilish tilini tanlang!',
                            },
                        ]}>
                        <Select
                            placeholder={
                                inputInfoToCreateOrder['lang'].placeholder
                            }
                            options={[
                                { label: "O'zbekcha", value: 'uzb' },
                                { label: 'Ruscha', value: 'rus' },
                                { label: 'Ingilizcha', value: 'eng' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        name="budget"
                        label={
                            <div className="d-flex align-items-center">
                                <p className="m-0 text-dark">
                                    Byudjetingizni kiriting
                                </p>
                                <span>
                                    <Info
                                        title={
                                            inputInfoToCreateOrder['price'].info
                                        }
                                    />
                                </span>
                            </div>
                        }
                        rules={[{ required: true, message: 'Narx kiriting!' }]}
                        style={{ position: 'relative' }}>
                        <InputNumber
                            min={minPrice}
                            style={{ width: '100%' }}
                            placeholder={
                                inputInfoToCreateOrder['price'].placeholder
                            }
                            formatter={(value) =>
                                value
                                    ? `${value}`.replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ' '
                                      )
                                    : ''
                            }
                            parser={(value) =>
                                value.replace(/\s/g, '').replace(/[^\d]/g, '')
                            }
                            value={budget}
                            onChange={(val) =>
                                form.setFieldValue('budget', val)
                            }
                        />
                        <div className="my-3 position-relative">
                            <div className="position-relative">
                                {/* Left Gradient Indicator */}
                                {showLeftGradient && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: '30px',
                                            background:
                                                'linear-gradient(to right, rgba(255,255,255,0.9), transparent)',
                                            zIndex: 5,
                                            pointerEvents: 'none',
                                        }}
                                    />
                                )}

                                {/* Right Gradient Indicator */}
                                {showRightGradient && priceList?.length > 7 && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            right: 0,
                                            top: 0,
                                            bottom: 0,
                                            width: '30px',
                                            background:
                                                'linear-gradient(to left, rgba(255,255,255,0.9), transparent)',
                                            zIndex: 5,
                                            pointerEvents: 'none',
                                        }}
                                    />
                                )}

                                <Swiper
                                    modules={[Thumbs]}
                                    spaceBetween={8}
                                    slidesPerView="auto"
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    centeredSlides={false}
                                    allowTouchMove={true}
                                    className="thumbs-swiper mt-2"
                                    style={{
                                        width: '100%',
                                        overflow: 'hidden',
                                        paddingLeft: '5px',
                                        paddingRight: '5px',
                                    }}
                                    onProgress={handleThumbProgress}
                                    onSlideChange={handleThumbProgress}
                                    onReachBeginning={() =>
                                        setShowLeftGradient(false)
                                    }
                                    onReachEnd={() =>
                                        setShowRightGradient(false)
                                    }>
                                    {priceList?.map((option, index) => (
                                        <SwiperSlide
                                            key={`thumb-${option.amount}-${index}`}
                                            style={{
                                                width: 'fit-content',
                                                height: '35px',
                                                flexShrink: 0,
                                            }}>
                                            <Button
                                                key={option.amount}
                                                variant="solid"
                                                className="option-price-btn"
                                                type="default"
                                                onClick={() => {
                                                    form.setFieldValue(
                                                        'budget',
                                                        option.amount
                                                    );
                                                }}>
                                                {formatCurrencyWithSpace(
                                                    option.amount
                                                )}
                                            </Button>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </div>
                    </Form.Item>

                    <div className="d-flex align-items-start mb-2">
                        <span
                            style={{
                                marginRight: '5px',
                                width: '5px',
                                height: '5px',
                            }}
                            className="text-danger fs-6">
                            *
                        </span>
                        <p className="m-0 text-dark">
                            Buyurtma tayyor bo‘lish muddatini belgilang
                        </p>
                    </div>
                    <div className="d-flex gap-2 mb-3">
                        <Form.Item
                            name="deadline_date"
                            style={{ flex: 1, margin: 0, width: '100%' }}
                            className="flex-fill"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        'Yetkazib berish sanasini va vaqtini tanlang!',
                                },
                            ]}>
                            <DatePicker
                                format="MMM DD, YYYY"
                                placement="bottom"
                                style={{ width: '100%', height: '32px' }}
                                placeholder="Buyurtma tayyor bo‘lish sanasi va soatini tanlang"
                                size="small"
                                disabledDate={(current) =>
                                    current && current < dayjs().startOf('day')
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="deadline_time"
                            rules={[{ required: true, message: '' }]}>
                            <TimePicker
                                format="HH:mm"
                                style={{ height: '32px' }}
                                placeholder="Soat"
                                size="small"
                                className="ant-picker-time-panel-column"
                                disabledDate={(current) =>
                                    current && current < dayjs().startOf('day')
                                }
                            />
                        </Form.Item>
                    </div>

                    <Form.Item className="mb-2">
                        {id ? (
                            <Button
                                loading={createPending}
                                type="primary"
                                htmlType="submit"
                                className="mt-3 py-4 fs-4"
                                block>
                                {createPending ? (
                                    <div className="d-flex align-items-center gap-3">
                                        Buyurtmani yuborilmoqda...
                                    </div>
                                ) : (
                                    'Buyurtmani yuborish'
                                )}
                            </Button>
                        ) : (
                            <Button
                                loading={isPending}
                                type="primary"
                                htmlType="submit"
                                className="mt-3 py-4 fs-4"
                                block>
                                {isPending ? (
                                    <div className="d-flex align-items-center gap-3">
                                        Buyurtmani joylashtirilmoqda...
                                    </div>
                                ) : (
                                    'Buyurtmani joylashtirish'
                                )}
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Modal>
            <Modal
                title="Buyurtmani tasdiqlash"
                open={confirmOpen}
                onCancel={() => setConfirmOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setConfirmOpen(false)}>
                        Yo‘q
                    </Button>,
                    <Button
                        key="ok"
                        type="primary"
                        loading={isPending || createPending}
                        onClick={handleConfirm}>
                        Ha, buyurtmani yubor
                    </Button>,
                ]}
                centered>
                {seller ? (
                    <p>
                        Rostdan ham {seller} uchun buyurtma berishni
                        xohlaysizmi?
                    </p>
                ) : (
                    <p>
                        Rostdan ham buyurtma berishni xohlaysizmi? Buyurtmangiz
                        10 000 dan ortiq frilanserlarga yuboriladi, ular siz
                        bilan hamkorlik qilish uchun taklif yuborishadi.
                    </p>
                )}
            </Modal>
            <PhoneNumberModal
                open={phoneModalOpen}
                onCancel={handlePhoneModalCancel}
                onSubmit={handlePhoneSubmit}
                loading={isPending}
            />
        </>
    );
};

export default CreateOrderModal;

export const Info = ({ title }) => {
    return (
        <Tooltip title={title} className="d-flex align-items-center">
            <div
                className="d-flex align-items-center justify-content-center ms-2"
                style={{ width: '15px', height: '15px', cursor: 'pointer' }}>
                <QuestionCircleOutlined />
            </div>
        </Tooltip>
    );
};
