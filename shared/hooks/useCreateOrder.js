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
import { useDispatch, useSelector } from 'react-redux';
import { useFGet, useFPost } from '~/shared/hooks/useFApi';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { Info } from '~/shared/components/modals/CreateOrderModal';
import {
    inputInfoToCreateOrder,
    titleDescription,
} from '~/shared/constants/createOrder';
import useResponsive from '../utilities/useResponsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs } from 'swiper/modules';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { setShowSearch } from '~/store/fast-dowload/slice';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useTimeManager } from './useTimeManager';

// import Editor from '~/components/Editor';

const direction_content = (
    <div style={{ maxWidth: '300px' }}>
        <p>Buyurtma yo'nalishini tanlang:</p>
        <ul>
            <li>
                Buyurtmangizga mos keladigan yo'nalishni tanlang, bu sizning
                talablaringizga mos mutaxassislarni topishga yordam beradi.
            </li>
            <li>
                Har bir yo'nalish o'z sohasida ixtisoslashgan mutaxassislar
                guruhiga ega bo'lib, sizning loyihangiz xususiyatlariga qarab
                eng mos variantni tanlash muhim.
            </li>
            <li>
                To'g'ri yo'nalish tanlovi buyurtmangizning sifatli va o'z
                vaqtida bajarilishini ta'minlaydi.
            </li>
        </ul>
    </div>
);

const popover_content = (
    <div style={{ maxWidth: '300px' }}>
        <p>Buyurtma kategoriyasini tanlang:</p>
        <ul>
            <li>
                Har bir yo'nalish uchun mavjud kategoriyalar ro'yxatidan
                tanlang.
            </li>
            <li>
                To'g'ri kategoriya tanlovi sizning buyurtmangizni mos
                mutaxassisga yo'naltirishga yordam beradi.
            </li>
        </ul>
    </div>
);

const description_content = (
    <div style={{ maxWidth: '300px' }}>
        <p>Buyurtma tavsifini yozish bo'yicha maslahatlar:</p>
        <ul>
            <li>Buyurtmangizning asosiy talablarini aniq yozing.</li>
            <li>
                Muhim tafsilotlar, muddatlar va byudjet haqida ma'lumot bering.
            </li>
            <li>
                Iloji bo'lsa, oldingi ishlaringiz yoki namunalarni ulashing.
            </li>
        </ul>
    </div>
);

const language_content = (
    <div style={{ maxWidth: '300px' }}>
        <p>Buyurtma bajarilish tilini tanlang:</p>
        <ul>
            <li>O'zbekcha, Ruscha yoki Inglizcha tillaridan birini tanlang.</li>
            <li>Tanlangan til buyurtma matni va muloqot uchun ishlatiladi.</li>
        </ul>
    </div>
);

const budget_content = (
    <div style={{ maxWidth: '300px' }}>
        <p>Byudjet haqida maslahatlar:</p>
        <ul>
            <li>
                Byudjetingizni realistik belgilang, bu sizga mos mutaxassislarni
                jalb qiladi.
            </li>
            <li>
                Agar byudjetingiz cheklangan bo'lsa, bu haqda ochiq bo'ling va
                mutaxassislar bilan muhokama qiling.
            </li>
        </ul>
    </div>
);

const deadline_content = (
    <div style={{ maxWidth: '300px' }}>
        <p>Buyurtma muddati haqida maslahatlar:</p>
        <ul>
            <li>
                Muddatingizni realistik belgilang, bu sizga sifatli ishni
                ta'minlaydi.
            </li>
            <li>
                Agar buyurtma tezroq bajarilishi kerak bo'lsa, bu haqda
                mutaxassis bilan oldindan kelishib oling.
            </li>
        </ul>
    </div>
);

const { TextArea } = Input;

function useCreateOrder() {
    const [form] = Form.useForm();
    const budget = Form.useWatch('budget', form);
    const categoryId = Form.useWatch('category_id', form);
    const { isDesktop } = useResponsive();
    const [direction, setDirection] = useState(null);
    const [files, setFiles] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const { push, query, replace, pathname } = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);
    const { data: directions } = useGetDirectionsQuery();
    const [showLeftGradient, setShowLeftGradient] = useState(false);
    const [showRightGradient, setShowRightGradient] = useState(true);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const dispatch = useDispatch();
    const { startTimeout } = useTimeManager();
    const onfirstRender = useRef(true);
    const [phoneModalOpen, setPhoneModalOpen] = useState(false);
    const [pendingOrderData, setPendingOrderData] = useState(null);

    useEffect(() => {
        dispatch(setShowSearch(false));

        return () => {
            dispatch(setShowSearch(true));
        };
    }, [dispatch]);

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
        form.setFieldValue('direction', direction);
        if (onfirstRender.current) return;
        replace(
            {
                pathname: pathname,
                query: { ...query, direction: direction },
            },
            undefined,
            { shallow: true }
        );
    }, [direction]);

    useEffect(() => {
        if (onfirstRender.current) {
            onfirstRender.current = false;

            // if (!query?.direction) {
            //     replace(
            //         {
            //             pathname: pathname,
            //             query: { ...query, direction: 'scientific_work' },
            //         },
            //         undefined,
            //         { shallow: true }
            //     );
            // }

            if (query?.direction) {
                setDirection(query?.direction);
            }
        }
    }, [query?.direction]);

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
    };

    const { mutate: createOrder, isPending } = useFPost({
        url: 'order/custom-order',
        token: user?.access,
        onSuccess: (data) => {
            form.resetFields();
            handleCloseConfirm();
            setPhoneModalOpen(false);
            setPendingOrderData(null);
            message.success('Buyurtma muvaffaqiyatli yaratildi!');
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

            const errorMsg = errorDetail || "Noma'lum xato yuz berdi";
            message.error(errorMsg);
        },
    });

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

        const fd = new FormData();

        for (const [key, value] of Object.entries(order)) {
            fd.append(key, value);
        }

        if (files && files.length > 0) {
            fd.append('file', files[0].originFileObj);
        }

        createOrder(fd);
    };

    const handlePhoneSubmit = (phoneNumber) => {
        if (!pendingOrderData) return;

        const fd = new FormData();

        // Use pending order data
        for (const [key, value] of Object.entries(pendingOrderData.order)) {
            fd.append(key, value);
        }

        // Add phone number
        fd.append('contact_phonenumber', phoneNumber);

        // Add file if exists
        if (pendingOrderData.files && pendingOrderData.files.length > 0) {
            fd.append('file', pendingOrderData.files[0].originFileObj);
        }

        setPhoneModalOpen(false);
        createOrder(fd);
    };

    const handlePhoneModalCancel = () => {
        setPhoneModalOpen(false);
        setPendingOrderData(null);
    };

    const handleDirectionChange = (val) => {
        setDirection(val);
        form.resetFields(['category_id']);
        form.setFieldValue('title', '');
        // form.setFieldValue('direction', direction);
    };

    const formItems = [
        {
            id: 'direction',
            title: "Yo'nalish tanlash bo'yicha ma'lumot",
            content: (
                <Form.Item
                    name="direction"
                    label={
                        <div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                            <p className="m-0 text-dark">Yo’nalishni tanlang</p>
                        </div>
                    }
                    rules={[{ required: true, message: "Yo'nalish tanlang!" }]}>
                    <Select
                        onChange={handleDirectionChange}
                        className="form-element"
                        size="large"
                        options={directions}
                        placeholder="Yo'nalishni tanlang"
                    />
                </Form.Item>
            ),
            popoverContent: direction_content,
        },
        {
            id: 'category_id',
            title: 'Kategoriya tanlang',
            content: (
                <Form.Item
                    name="category_id"
                    label={
                        <div className="d-flex align-items-center">
                            <p className="m-0 text-dark">Kategoriya tanlang</p>
                            <Info
                                title={inputInfoToCreateOrder.category.info}
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
                        className="form-element"
                        onSelect={(_, option) => {
                            form.setFieldValue(
                                'title',
                                titleDescription(option?.label)
                            );
                        }}
                        placeholder={inputInfoToCreateOrder[
                            'category'
                        ].placeholder(directions)}
                        size="large"
                        options={categories?.map((cat) => ({
                            label: cat?.title,
                            value: cat?.id,
                        }))}
                    />
                </Form.Item>
            ),
            popoverContent: popover_content,
        },
        {
            id: 'description',
            title: 'Buyurtma tafsilotlari',
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
                                    Buyurtma tavsifini kiriting
                                </p>
                                <Info
                                    title={
                                        inputInfoToCreateOrder['description']
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
                            rows={4}
                            name="description"
                            placeholder={
                                inputInfoToCreateOrder['description']
                                    .placeholder
                            }
                        />
                        {/* <Editor
                        onChange={(value) => {
                            form.setFieldValue('description', value);
                        }}
                        value={form.getFieldValue('description') || ''}
                        name="description"
                        placeholder={
                            inputInfoToCreateOrder['description'].placeholder
                        }
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
                                        "Fayl 50 MB dan katta bo'lishi mumkin emas"
                                    );
                                    return;
                                }
                                setFiles(fileList);
                            }
                        }}
                        onRemove={() => setFiles(null)}>
                        <Button
                            icon={<i className="fa-solid fa-paperclip"></i>}>
                            Fayl yuklash (ixtiyoriy)
                        </Button>
                    </Upload>
                </>
            ),
            popoverContent: description_content,
        },
        {
            id: 'language',
            title: 'Buyurtma tili',
            content: (
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
                        className="form-element"
                        placeholder={inputInfoToCreateOrder['lang'].placeholder}
                        size="large"
                        options={[
                            { label: "O'zbekcha", value: 'uzb' },
                            { label: 'Ruscha', value: 'rus' },
                            { label: 'Ingilizcha', value: 'eng' },
                        ]}
                    />
                </Form.Item>
            ),
            popoverContent: language_content,
        },
        {
            id: 'budget',
            title: 'Byudjet',
            content: (
                <Form.Item
                    name="budget"
                    label={
                        <div className="d-flex align-items-center">
                            <p className="m-0 text-dark">
                                Byudjetingizni kiriting
                            </p>
                            <span>
                                <Info
                                    title={inputInfoToCreateOrder['price'].info}
                                />
                            </span>
                        </div>
                    }
                    rules={[{ required: true, message: 'Narx kiriting!' }]}>
                    <InputNumber
                        min={minPrice}
                        style={{ width: '100%' }} // height'ni olib tashlang, CSS'dan keladi
                        className="form-element"
                        placeholder={inputInfoToCreateOrder.price.placeholder}
                        size="large"
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
            popoverContent: budget_content,
        },
        {
            id: 'deadline',
            title: 'Buyurtma muddati',
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
                                className="form-element"
                                placeholder="Buyurtma tayyor bo‘lish sanasi va soatini tanlang"
                                size="large"
                                disabledDate={(current) =>
                                    current && current < dayjs().startOf('day')
                                }
                            />
                        </Form.Item>
                        <Form.Item
                            name="deadline_time"
                            size="large"
                            rules={[{ required: true, message: '' }]}>
                            <TimePicker
                                format="HH:mm"
                                placeholder="Soat"
                                size="large"
                                className="ant-picker-time-panel-column form-element"
                                disabledDate={(current) =>
                                    current && current < dayjs().startOf('day')
                                }
                            />
                        </Form.Item>
                    </div>
                </div>
            ),
            popoverContent: deadline_content,
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
    return 'right';
};
export default useCreateOrder;
