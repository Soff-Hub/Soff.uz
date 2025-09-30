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
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { directions } from '../../../components/freeleance/constants';
import { useFGet, useFPost } from '../../hooks/useFApi';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { createOrderInfo } from '~/shared/constants/createOrder';

const { TextArea } = Input;

const options = {
    scientific_work: title => `${title} tayyorlash kerak.`,
    dizayn: title => `${title} tayyorlash kerak.`,
    web: title => `${title} uchun dastur tayyorlash kerak.`,
    three_d: title => `${title} uchun dizayn tayyorlash kerak.`,
};

const priceOptions = [
    { title: '10 000', value: 10000 },
    { title: '20 000', value: 20000 },
    { title: '50 000', value: 50000 },
    { title: '100 000', value: 100000 },
    { title: '200 000', value: 200000 },
];

const CreateOrderModal = ({ open, onClose, id, seller, sellerInfo }) => {
    const [form] = Form.useForm();
    const budget = Form.useWatch('budget', form);
    const [direction, setDirection] = useState('scientific_work');
    const { user } = useSelector(state => state.auth);
    const { push } = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);

    useEffect(() => {
        form.setFieldValue('direction', direction);
    }, [direction]);

    const { data: categories } = useFGet(
        direction,
        `categories/?direction=${direction}`,
        { enabled: !!direction }
    );

    const { mutate: createOrder, isPending } = useFPost({
        url: 'order/custom-order',
        token: user?.access,
        onSuccess: () => {
            form.resetFields();
            onClose();
            message.success('Buyurtma muvaffaqiyatli yaratildi!');
            push('/order/my-orders');
            setConfirmOpen(false);
        },
        onError: err => {
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
            form.resetFields();
            onClose();
            message.success('Buyurtma muvaffaqiyatli yuborildi!');
            push(`/order/${data?.id}`);
            setConfirmOpen(false);
        },
        onError: err => {
            const errorMsg =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                'Noma’lum xato yuz berdi';
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
        if (id) {
            createDirectOrder(fd);
        } else {
            createOrder(fd);
        }
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
                                            alt="seller-image"
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
                            onChange={val => {
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
                                            createOrderInfo[direction].category
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
                                        options[direction](option?.label)
                                    );
                                    // setTitlePlacehoder(options[direction](option?.label))
                                }}
                                placeholder={
                                    createOrderInfo[direction].category
                                        .placeholder
                                }
                                options={categories?.map(cat => ({
                                    label: cat?.title,
                                    value: cat?.id,
                                }))}
                            />
                        </Form.Item>
                    )}
                    <Form.Item
                        name="description"
                        label={
                            <div className="d-flex align-items-center align-items-sm-center">
                                <p className="m-0 text-dark">
                                    Buyurtma tavsifini kiriting
                                </p>
                                <Info
                                    title={
                                        createOrderInfo[direction].description
                                            .info
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
                                createOrderInfo[direction].description
                                    .placeholder
                            }
                        />
                    </Form.Item>
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
                                createOrderInfo[direction].lang.placeholder
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
                                            createOrderInfo[direction].price
                                                .info
                                        }
                                    />
                                </span>
                            </div>
                        }
                        rules={[{ required: true, message: 'Narx kiriting!' }]}>
                        <InputNumber
                            min={2000}
                            style={{ width: '100%' }}
                            placeholder={
                                createOrderInfo[direction].price.placeholder
                            }
                            formatter={value =>
                                value
                                    ? `${value}`.replace(
                                          /\B(?=(\d{3})+(?!\d))/g,
                                          ' '
                                      )
                                    : ''
                            }
                            parser={value =>
                                value.replace(/\s/g, '').replace(/[^\d]/g, '')
                            }
                            value={budget}
                            onChange={val => form.setFieldValue('budget', val)}
                        />
                        <div className="d-flex flex-wrap my-2 gap-2">
                            {priceOptions.map(option => (
                                <Button
                                    key={option.value}
                                    variant="solid"
                                    className="option-price-btn"
                                    type="default"
                                    onClick={() => {
                                        form.setFieldValue(
                                            'budget',
                                            option.value
                                        );
                                    }}>
                                    {option.title}
                                </Button>
                            ))}
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
                                disabledDate={current =>
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
                                disabledDate={current =>
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
                        loading={isPending}
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
        </>
    );
};

export default CreateOrderModal;

export const Info = ({ title }) => {
    return (
        <Tooltip title={title} className="d-flex align-items-center">
            <div
                className="d-flex align-items-center justify-content-center ml-2"
                style={{ width: '15px', height: '15px', cursor: 'pointer' }}>
                <QuestionCircleOutlined />
            </div>
        </Tooltip>
    );
};
