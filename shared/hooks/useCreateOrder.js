import {
    Form,
    Modal,
    Input,
    Select,
    Button,
    DatePicker,
    message,
    InputNumber,
    Popover,
    TimePicker,
} from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { directions } from '../../components/freeleance/constants';
import { useFGet, useFPost } from '~/shared/hooks/useFApi';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { createOrderInfo } from '~/shared/constants/createOrder';
import { Info } from '~/shared/components/modals/CreateOrderModal';
import { priceOptions, options } from '~/shared/constants/createOrder';
import useResponsive from '../utilities/useResponsive';

const direction_content = (
    <div style={{ maxWidth: '300px' }}>
        <p>Buyurtma yo'nalishini tanlang:</p>
        <ul>
            <li>
                <b>Ilmiy ishlar</b> - ilmiy maqolalar, dissertatsiyalar,
                referatlar va boshqa akademik ishlar uchun.
            </li>
            <li>
                <b>Dizayn</b> - logotiplar, brending, veb-dizayn va boshqa
                grafik dizayn xizmatlari uchun.
            </li>
            <li>
                <b>Veb-ishlanmalar</b> - veb-saytlar, mobil ilovalar, botlar va
                boshqa dasturiy ta'minot ishlab chiqish uchun.
            </li>
            <li>
                <b>3D modellashtirish</b> - 3D modellar, animatsiyalar, AR/VR
                loyihalari va boshqa 3D xizmatlari uchun.
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
    const { isDesktop } = useResponsive();
    const [direction, setDirection] = useState('scientific_work');
    const { user } = useSelector(state => state.auth);
    const { push } = useRouter();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const { data: categories } = useFGet(
        direction,
        `categories/?direction=${direction}`,
        { enabled: !!direction }
    );

    useEffect(() => {
        form.setFieldValue('direction', direction);
    }, [direction]);

    const { mutate: createOrder, isPending } = useFPost({
        url: 'order/custom-order',
        token: user?.access,
        onSuccess: data => {
            form.resetFields();
            handleCloseConfirm();
            message.success('Buyurtma muvaffaqiyatli yaratildi!');
            push(`/order/my-orders?orderId=${data?.id}`);
        },
        onError: err => {
            const errorMsg =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                'Noma’lum xato yuz berdi';
            message.error(errorMsg);
        },
    });

    const handleOpenConfirm = () => {
        setConfirmOpen(true);
    };

    const handleCloseConfirm = () => {
        setConfirmOpen(false);
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

        createOrder(fd);
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
                        onChange={val => {
                            setDirection(val);
                            form.resetFields(['category_id']);
                            form.setFieldValue('title', '');
                        }}
                        className="form-element"
                        size="large"
                        options={directions}
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
                                title={createOrderInfo[direction].category.info}
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
                                options[direction](option?.label)
                            );
                        }}
                        placeholder={
                            createOrderInfo[direction].category.placeholder
                        }
                        size="large"
                        options={categories?.map(cat => ({
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
                <Form.Item
                    name="description"
                    label={
                        <div className="d-flex align-items-center align-items-sm-center">
                            <p className="m-0 text-dark">
                                Buyurtma tavsifini kiriting
                            </p>
                            <Info
                                title={
                                    createOrderInfo[direction].description.info
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
                            createOrderInfo[direction].description.placeholder
                        }
                    />
                </Form.Item>
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
                        placeholder={
                            createOrderInfo[direction].lang.placeholder
                        }
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
                                    title={
                                        createOrderInfo[direction].price.info
                                    }
                                />
                            </span>
                        </div>
                    }
                    rules={[{ required: true, message: 'Narx kiriting!' }]}>
                    <InputNumber
                        min={2000}
                        style={{ width: '100%' }}
                        className="form-element"
                        placeholder={
                            createOrderInfo[direction].price.placeholder
                        }
                        size="large"
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
                                size="large"
                                onClick={() => {
                                    form.setFieldValue('budget', option.value);
                                }}>
                                {option.title}
                            </Button>
                        ))}
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
                                disabledDate={current =>
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
                                disabledDate={current =>
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

    console.log({ formItems });

    const formItemsContent = formItems.map(formItem =>
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
    };
}

const withPopover = (item, isDesktop, position) => {
    return isDesktop ? (
        <Popover
            key={item.id}
            placement={position}
            title={item.title}
            content={item.popoverContent}>
            {item.content}
        </Popover>
    ) : (
        <div key={item.key}>{item.content}</div>
    );
};

const definePosition = (index, length) => {
    if (index === 0) return 'rightTop';
    if (index === length - 1) return 'rightBottom';
    return 'right';
};

export default useCreateOrder;
