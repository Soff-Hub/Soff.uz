import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    message,
    InputNumber,
    Popover,
    TimePicker,
    Upload,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFGet, useFPost } from '~/shared/hooks/useFApi';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { Info } from '~/shared/components/modals/create-order-modal/CreateOrderModal';
import useResponsive from '../utilities/useResponsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useTimeManager } from './useTimeManager';
import { useTranslation } from 'next-i18next';

// import Editor from '~/components/Editor';

const getPopoverContent = (t, type) => {
    const contents = {
        direction: (
            <div style={{ maxWidth: '300px' }}>
                <p>{t('form.direction.info')}</p>
                <ul>
                    <li>{t('form.direction.infoPoint1')}</li>
                    <li>{t('form.direction.infoPoint2')}</li>
                    <li>{t('form.direction.infoPoint3')}</li>
                </ul>
            </div>
        ),
        category: (
            <div style={{ maxWidth: '300px' }}>
                <p>{t('form.category.infoTitle')}:</p>
                <ul>
                    <li>{t('form.category.infoPoint1')}</li>
                    <li>{t('form.category.infoPoint2')}</li>
                </ul>
            </div>
        ),
        description: (
            <div style={{ maxWidth: '300px' }}>
                <p>{t('form.description.infoTitle')}:</p>
                <ul>
                    <li>{t('form.description.infoPoint1')}</li>
                    <li>{t('form.description.infoPoint2')}</li>
                    <li>{t('form.description.infoPoint3')}</li>
                </ul>
            </div>
        ),
        language: (
            <div style={{ maxWidth: '300px' }}>
                <p>{t('form.language.info')}</p>
                <ul>
                    <li>{t('form.language.infoPoint1')}</li>
                    <li>{t('form.language.infoPoint2')}</li>
                </ul>
            </div>
        ),
        budget: (
            <div style={{ maxWidth: '300px' }}>
                <p>{t('form.budget.infoText')}</p>
                <ul>
                    <li>{t('form.budget.infoPoint1')}</li>
                    <li>{t('form.budget.infoPoint2')}</li>
                </ul>
            </div>
        ),
        deadline: (
            <div style={{ maxWidth: '300px' }}>
                <p>{t('form.deadline.info')}</p>
                <ul>
                    <li>{t('form.deadline.infoPoint1')}</li>
                    <li>{t('form.deadline.infoPoint2')}</li>
                </ul>
            </div>
        ),
    };
    return contents[type];
};

const { TextArea } = Input;

function useCreateOrder({
    id,
    size = 'large',
    defaultDirection,
    directOrderOnSuccess,
    directOrderOnClose,
} = {}) {
    const { t } = useTranslation('order-create');
    const [form] = Form.useForm();
    const direction = Form.useWatch('direction', form);
    const budget = Form.useWatch('budget', form);
    const categoryId = Form.useWatch('category_id', form);
    const { isDesktop } = useResponsive();
    const [files, setFiles] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const {
        push,
        query,
        replace,
        pathname,
        isReady: isRouterReady,
    } = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { data: directions } = useGetDirectionsQuery();
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const { startTimeout } = useTimeManager();
    const [phoneModalOpen, setPhoneModalOpen] = useState(false);
    const [pendingOrderData, setPendingOrderData] = useState(null);

    const { data: categories } = useFGet(
        direction,
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
        priceData?.[0]?.service_delivery_price_options?.[0]?.price?.slice(0, 7);

    const minPrice = priceList ? priceList[0]?.amount : 2000;

    useEffect(() => {
        const direction =
            query.direction || defaultDirection || 'scientific_work';
        if (!query.direction && isRouterReady) {
            replace(
                {
                    pathname: pathname,
                    query: { ...query, direction: direction },
                },
                undefined,
                { shallow: true }
            );
        }
        form.setFieldValue('direction', direction);
    }, [isRouterReady, defaultDirection]);

    const { mutate: createOrder, isPending } = useFPost({
        url: 'order/custom-order',
        token: user?.access,
        onSuccess: (data) => {
            form.resetFields();
            handleCloseConfirm();
            setPhoneModalOpen(false);
            setPendingOrderData(null);
            message.success(t('messages.success'));
            startTimeout(() => {
                push(`/order/my-orders?orderId=${data?.order_id}`);
            }, 100);
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

            const errorMsg = errorDetail || t('messages.unknownError');
            message.error(errorMsg);
        },
    });

    const { mutate: createDirectOrder, isPending: isDirectOrderPending } =
        useFPost({
            url: 'order/direct-order',
            token: user?.access,
            onSuccess: (data) => {
                message.success(t('messages.directOrderSuccess'));
                if (directOrderOnSuccess) {
                    directOrderOnSuccess({
                        id: data?.id,
                        price: form.getFieldValue('budget'),
                        title: form.getFieldValue('title'),
                    });
                } else {
                    push(`/order/${data?.id}`);
                }
                form.resetFields();
                directOrderOnClose();
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
                const errorMsg = errorDetail || t('messages.unknownError');
                message.error(errorMsg);
            },
        });

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
    };

    const handleThumbProgress = (swiper) => {
        const progress = swiper.progress;
        const isBeginning = swiper.isBeginning;
        const isEnd = swiper.isEnd;

        setShowLeftGradient(!isBeginning);
        setShowRightGradient(!isEnd);
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

        const formData = new FormData();

        for (const [key, value] of Object.entries(order)) {
            formData.append(key, value);
        }

        if (files && files.length > 0) {
            formData.append('file', files[0].originFileObj);
        }

        if (id) {
            createDirectOrder(formData);
        } else {
            createOrder(formData);
        }
    };

    const handlePhoneSubmit = (phoneNumber) => {
        if (!pendingOrderData) return;

        const formData = new FormData();

        for (const [key, value] of Object.entries(pendingOrderData.order)) {
            formData.append(key, value);
        }

        formData.append('contact_phonenumber', phoneNumber);

        if (pendingOrderData.files && pendingOrderData.files.length > 0) {
            formData.append('file', pendingOrderData.files[0].originFileObj);
        }

        setPhoneModalOpen(false);

        if (id) {
            createDirectOrder(formData);
        } else {
            createOrder(formData);
        }
    };

    const handlePhoneModalCancel = () => {
        setPhoneModalOpen(false);
        setPendingOrderData(null);
    };

    const handleDirectionChange = (val) => {
        replace(
            {
                pathname: pathname,
                query: { ...query, direction: val },
            },
            undefined,
            { shallow: true }
        );
        form.resetFields(['category_id']);
        form.setFieldValue('title', '');
    };

    const formItems = [
        {
            id: 'direction',
            title: t('form.direction.infoTitle'),
            content: (
                <Form.Item
                    name="direction"
                    label={
                        <div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                            <p className="m-0 text-dark">
                                {t('form.direction.label')}
                            </p>
                        </div>
                    }
                    rules={[
                        {
                            required: true,
                            message: t('form.direction.required'),
                        },
                    ]}>
                    <Select
                        onChange={handleDirectionChange}
                        className="form-element"
                        size={size}
                        options={directions}
                        placeholder={t('form.direction.placeholder')}
                    />
                </Form.Item>
            ),
            popoverContent: getPopoverContent(t, 'direction'),
        },
        {
            id: 'category_id',
            title: t('form.category.infoTitle'),
            content: (
                <Form.Item
                    name="category_id"
                    label={
                        <div className="d-flex align-items-center">
                            <p className="m-0 text-dark">
                                {t('form.category.label')}
                            </p>
                            <Info title={t('form.category.info')} />
                        </div>
                    }
                    rules={[
                        {
                            required: true,
                            message: t('form.category.required'),
                        },
                    ]}>
                    <Select
                        className="form-element"
                        onSelect={(_, option) => {
                            form.setFieldValue(
                                'title',
                                t('titleDescription', {
                                    direction: option?.label,
                                })
                            );
                        }}
                        placeholder={t('form.category.placeholder')}
                        size={size}
                        options={categories?.map((cat) => ({
                            label: cat?.title,
                            value: cat?.id,
                        }))}
                    />
                </Form.Item>
            ),
            popoverContent: getPopoverContent(t, 'category'),
        },
        {
            id: 'description',
            title: t('form.description.infoTitle'),
            content: (
                <>
                    <Form.Item
                        name="description"
                        style={{
                            marginBottom: 15,
                        }}
                        label={
                            <div className="d-flex align-items-center align-items-sm-center">
                                <p className="m-0 text-dark">
                                    {t('form.description.label')}
                                </p>
                                <Info title={t('form.description.info')} />
                            </div>
                        }
                        rules={[
                            {
                                required: true,
                                message: t('form.description.required'),
                            },
                        ]}>
                        <TextArea
                            style={{ resize: 'none' }}
                            rows={4}
                            name="description"
                            placeholder={t('form.description.placeholder')}
                        />
                        {/* <Editor
                        onChange={(value) => {
                            form.setFieldValue('description', value);
                        }}
                        value={form.getFieldValue('description') || ''}
                        name="description"
                        placeholder={t('form.description.placeholder')}
                    /> */}
                    </Form.Item>
                    <Upload
                        fileList={files}
                        multiple={false}
                        listType="picture"
                        className="order-file-upload"
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
                                        t('form.fileUpload.maxSizeError')
                                    );
                                    return;
                                }
                                setFiles(fileList);
                            }
                        }}
                        onRemove={() => setFiles(null)}>
                        <Button
                            icon={<i className="fa-solid fa-paperclip"></i>}>
                            {t('form.fileUpload.button')}
                        </Button>
                    </Upload>
                </>
            ),
            popoverContent: getPopoverContent(t, 'description'),
        },
        {
            id: 'language',
            title: t('form.language.infoTitle'),
            content: (
                <Form.Item
                    name="language"
                    label={
                        <div className="d-flex align-items-center text-wrap  align-items-sm-center">
                            <p className="m-0 text-dark">
                                {t('form.language.label')}
                            </p>
                        </div>
                    }
                    rules={[
                        {
                            required: true,
                            message: t('form.language.required'),
                        },
                    ]}>
                    <Select
                        className="form-element"
                        placeholder={t('form.language.placeholder')}
                        size={size}
                        options={[
                            {
                                label: t('form.language.options.uzb'),
                                value: 'uzb',
                            },
                            {
                                label: t('form.language.options.rus'),
                                value: 'rus',
                            },
                            {
                                label: t('form.language.options.eng'),
                                value: 'eng',
                            },
                        ]}
                    />
                </Form.Item>
            ),
            popoverContent: getPopoverContent(t, 'language'),
        },
        {
            id: 'budget',
            title: t('form.budget.infoTitle'),
            content: (
                <Form.Item
                    name="budget"
                    label={
                        <div className="d-flex align-items-center">
                            <p className="m-0 text-dark">
                                {t('form.budget.label')}
                            </p>
                            <span>
                                <Info title={t('form.budget.info')} />
                            </span>
                        </div>
                    }
                    rules={[
                        { required: true, message: t('form.budget.required') },
                    ]}>
                    <InputNumber
                        min={minPrice}
                        style={{ width: '100%' }} // height'ni olib tashlang, CSS'dan keladi
                        className="form-element"
                        placeholder={t('form.budget.placeholder')}
                        size={size}
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
                        onChange={(val) => form.setFieldValue('budget', val)}
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
                                onSwiper={setThumbsSwiper}
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
                                onReachEnd={() => setShowRightGradient(false)}>
                                {priceList?.map((option, index) => (
                                    <SwiperSlide
                                        key={`thumb-${option.amount}-${index}`}
                                        style={{
                                            width: '75px',
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
            ),
            popoverContent: getPopoverContent(t, 'budget'),
        },
        {
            id: 'deadline',
            title: t('form.deadline.infoTitle'),
            content: (
                <div>
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
                            {t('form.deadline.label')}
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
                                    message: t('form.deadline.required'),
                                },
                            ]}>
                            <DatePicker
                                format="MMM DD, YYYY"
                                placement="bottomLeft"
                                className="form-element"
                                placeholder={t('form.deadline.datePlaceholder')}
                                size={size}
                                disabledDate={(current) =>
                                    current && current < dayjs().startOf('day')
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="deadline_time"
                            size={size}
                            rules={[{ required: true, message: '' }]}>
                            <TimePicker
                                format="HH:mm"
                                placeholder={t('form.deadline.timePlaceholder')}
                                size={size}
                                className="ant-picker-time-panel-column form-element"
                                disabledDate={(current) =>
                                    current && current < dayjs().startOf('day')
                                }
                            />
                        </Form.Item>
                    </div>
                </div>
            ),
            popoverContent: getPopoverContent(t, 'deadline'),
        },
    ];

    const formItemsContent = formItems.map((formItem) =>
        withPopover(
            formItem,
            isDesktop,
            definePosition(formItems.indexOf(formItem), formItems.length)
        )
    );

    return {
        form,
        formItemsContent,
        budget,
        isPending,
        isDirectOrderPending,
        confirmOpen,
        handleConfirm,
        handleOpenConfirm,
        handleCloseConfirm,
        phoneModalOpen,
        handlePhoneSubmit,
        handlePhoneModalCancel,
    };
}
const withPopover = (item, isDesktop, position) => {
    return isDesktop ? (
        <Popover
            key={item.id}
            placement={position}
            title={item.title}
            content={item.popoverContent}
            overlayStyle={{
                maxWidth: '300px',
                zIndex: 1050,
            }}
            overlayInnerStyle={{
                boxShadow:
                    '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08)',
            }}
            align={{
                offset:
                    typeof window !== 'undefined' && window.innerWidth < 1400
                        ? [0, 10]
                        : [10, 0],
            }}>
            {item.content}
        </Popover>
    ) : (
        <div key={item.id}>{item.content}</div>
    );
};

const definePosition = (index, length) => {
    if (typeof window !== 'undefined') {
        const screenWidth = window.innerWidth;

        // 1024px dan 1400px oralig'ida - tepada/pastda
        if (screenWidth >= 1024 && screenWidth < 1400) {
            if (index < 2) return 'top';
            if (index >= length - 2) return 'bottom';
            return 'top';
        }

        // 768px dan 1024px oralig'ida - faqat top
        if (screenWidth >= 768 && screenWidth < 1024) {
            return 'top';
        }

        // 768px dan kichik (mobile) - bottomLeft
        if (screenWidth < 768) {
            return 'bottomLeft';
        }
    }

    // 1400px va undan katta - o'ng tomonda
    if (index === 0) return 'rightTop';
    if (index === length - 1) return 'rightBottom';
    return 'rightTop';
};
export default useCreateOrder;
