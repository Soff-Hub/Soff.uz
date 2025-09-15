import { Form, Modal, Input, Select, Button, DatePicker, message, InputNumber, Tooltip, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { QuestionCircleOutlined } from '@ant-design/icons'
import { directions } from "../../constants";
import { useFGet, useFPost } from "../../api/useFApi";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { createOrderInfo } from "~/constants/createOrder";
import { ClipLoader } from "react-spinners";
import useResponsive from "~/utilities/useResponsive";

const { TextArea } = Input;


const options = {
    scientific_work: (title) => (`${title} tayyorlash kerak.`),
    dizayn: (title) => (`${title} tayyorlash kerak.`),
    web: (title) => (`${title} uchun dastur tayyorlash kerak.`),
    three_d: (title) => (`${title} uchun dizayn tayyorlash kerak.`),
}



const CreateOrderModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [direction, setDirection] = useState('scientific_work')
    const [category, setCategory] = useState('')
    const { isMobile } = useResponsive()
    const { user } = useSelector(state => state.auth)
    const { push } = useRouter()


    useEffect(() => {
        form.setFieldValue('direction', direction)
    }, [direction])

    const { data: categories } = useFGet(direction, `categories/?direction=${direction}`, { enabled: !!direction })

    const { mutate: createOrder, isPending } = useFPost({
        url: "order/custom-order",
        token: user?.access,
        onSuccess: () => {
            form.resetFields();
            onClose();
            message.success("Buyurtma muvaffaqiyatli yaratildi!");
            push('/order/my-orders')
        },
        onError: (err) => {
            const errorMsg =
                err?.response?.data?.detail ||
                err?.response?.data?.message ||
                "Noma’lum xato yuz berdi";
            message.error(errorMsg);
        },
    });

    const handleFinish = (values) => {
        const order = {
            direction: direction,
            category_id: values.category_id,
            title: form.getFieldValue('title'),
            description: values.description,
            language: values.language,
            budget: values.budget,
            deadline_date: `${dayjs(values.deadline_date).format("YYYY-MM-DD")} ${dayjs(values.deadline_time).format("HH:mm")}`,

        }

        const fd = new FormData();

        for (const [key, value] of Object.entries(order)) {
            fd.append(key, value);
        }
        createOrder(fd);
    };

    return (
        <Modal
            width={600} styles={{
                wrapper: {
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0px',
                    margin: '0px',
                }, 
                content: {
                    padding: "15px",
                    height: isMobile ? '500px' : '700px',
                    overflowY: 'auto'
                }
            }}
            title="Maxsus buyurtma yaratish"
            open={open}
            onCancel={onClose}
            footer={null}
            centered
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    name="direction"
                    label={
                        <div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                            <p className="m-0 text-dark">Yo’nalishni tanlang</p>
                        </div>
                    }
                    rules={[{ required: true, message: "Yo'nalish tanlang!" }]}
                >
                    <Select
                        onChange={(val) => {
                            setDirection(val)
                            form.resetFields(['category_id'])
                            form.setFieldValue('title', '')
                        }}

                        placeholder=""
                        options={directions}
                    />
                </Form.Item>
                {direction &&
                    <Form.Item
                        name="category_id"
                        label={<div className="d-flex align-items-center">
                            <p className="m-0 text-dark">Kategoriya tanlang</p>
                            <Info title={createOrderInfo[direction].category.info} />
                        </div>}
                        rules={[{ required: true, message: "Kategoriya tanlang!" }]}
                    >
                        <Select
                            onSelect={(_, option) => {
                                form.setFieldValue('title', options[direction](option?.label))
                                // setTitlePlacehoder(options[direction](option?.label))
                            }}
                            placeholder={createOrderInfo[direction].category.placeholder}
                            options={categories?.map(cat => ({
                                label: cat?.title,
                                value: cat?.id
                            }))}
                        />
                    </Form.Item>
                }
                <Form.Item
                    name="description"
                    label={<div className="d-flex align-items-center align-items-sm-center">
                        <p className="m-0 text-dark">Buyurtma tavsifini kiriting</p>
                        <Info title={createOrderInfo[direction].description.info} />
                    </div>}
                    rules={[{ required: true, message: "Buyurtma tavsifini yozing!" }]}
                >
                    <TextArea style={{ resize: "none" }} rows={6} placeholder={createOrderInfo[direction].description.placeholder} />
                </Form.Item>
                <div>
                    {/* Title yashirildi */}
                    {/* <Form.Item
                    name="title"

                    label={<div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">

                        <p className="m-0 text-dark">Buyurtmangiz haqida qisqacha tavsif.</p>
                        <span style={{ fontSize: '11px' }} className="text-info  ml-2">(Misol uchun: Logo dizayn tayyorlash)</span>
                    </div>}

                    rules={[{ required: true, message: "Buyurtma nomini kiriting!" }]}
                >
                    <Input allowClear defaultValue={titlePlacehoder} style={{ height: '32px', color: '#000', placeholderColor: '#000' }} />
                </Form.Item> */}
                </div>
                <Form.Item
                    name="language"
                    label={<div className="d-flex align-items-center text-wrap  align-items-sm-center">
                        <p className="m-0 text-dark">Buyurtma tili</p>

                    </div>}
                    rules={[{ required: true, message: "Bajarilish tilini tanlang!" }]}
                >
                    <Select
                        placeholder={createOrderInfo[direction].lang.placeholder}
                        options={[
                            { label: "O'zbekcha", value: "uzb" },
                            { label: "Ruscha", value: "rus" },
                            { label: "Ingilizcha", value: "eng" },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="budget"
                    label={<div className="d-flex align-items-center ">
                        <p className="m-0 text-dark">Byudjetingizni kiriting</p>
                        <span><Info title={createOrderInfo[direction].price.info} /></span>
                    </div>}
                    rules={[{ required: true, message: "Narx kiriting!" }]}
                >
                    <InputNumber
                        min={2000}
                        style={{ width: "100%" }}
                        placeholder={createOrderInfo[direction].price.placeholder}
                        formatter={(value) =>
                            value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : ""
                        }
                        parser={(value) => value.replace(/\s/g, "").replace(/[^\d]/g, "")}
                    />
                </Form.Item>

                <div className="d-flex align-items-start mb-2">
                    <span style={{ marginRight: '5px', width: '5px', height: '5px' }} className="text-danger fs-6">*</span>
                    <p className="m-0 text-dark">Buyurtma tayyor bo‘lish muddatini belgilang</p>
                </div>
                <div className="d-flex gap-2 mb-3">
                    <Form.Item
                        name="deadline_date"
                        style={{ flex: 1, margin: 0, width: '100%' }}
                        className="flex-fill"
                        rules={[{ required: true, message: "Yetkazib berish sanasini va vaqtini tanlang!" }]}
                    >
                        <DatePicker
                            format="MMM DD, YYYY"
                            placement="bottom"
                            style={{ width: "100%", height: "32px" }}
                            placeholder="Buyurtma tayyor bo‘lish sanasi va soatini tanlang"
                            size="small"
                            disabledDate={(current) => current && current < dayjs().startOf("day")}
                        />
                    </Form.Item>
                    <Form.Item
                        name="deadline_time"
                        rules={[{ required: true, message: "" }]}
                    >
                        <TimePicker
                            format="HH:mm"
                            style={{ height: "32px" }}
                            placeholder="Soat"
                            size="small"
                            className="ant-picker-time-panel-column"
                            disabledDate={(current) => current && current < dayjs().startOf("day")}
                        />
                    </Form.Item>
                </div>

                <Form.Item className="mb-2">
                    <Button loading={isPending} type="primary" htmlType="submit" className="mt-3 py-4 fs-4" block>
                        {isPending ? <div className="d-flex align-items-center gap-3">
                            Buyurtmani joylashtirilmoqda...</div> : 'Buyurtmani joylashtirish'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrderModal;


export const Info = ({ title }) => {
    return (
        <Tooltip title={title} className="d-flex align-items-center">
            <div className="d-flex align-items-center justify-content-center ml-2" style={{ width: '15px', height: '15px', cursor: 'pointer' }}><QuestionCircleOutlined /></div>
        </Tooltip>
    )
}
