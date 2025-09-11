import { Form, Modal, Input, Select, Button, DatePicker, message, InputNumber } from "antd";
import React, { useState } from "react";
import { directions } from "../../constants";
import { useFGet, useFPost } from "../../api/useFApi";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const { TextArea } = Input;

const CreateOrderModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [direction, setDirection] = useState(null)
    const { user } = useSelector(state => state.auth)
    const { push } = useRouter()

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
        const fd = new FormData();

        for (const [key, value] of Object.entries(values)) {
            if (key === "deadline_date" && value) {
                fd.append(key, dayjs(value).format("YYYY-MM-DD HH:mm"));
            } else {
                fd.append(key, value);
            }
        }

        createOrder(fd);
    };

    return (
        <Modal width={600} styles={{
            content: {
                padding: "15px"
            }
        }} title="Maxsus buyurtma yaratish" open={open} onCancel={onClose} footer={null} destroyOnClose>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    name="title"

                    label={<div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">

                        <p className="m-0 text-dark">Buyurtmangiz haqida qisqacha tavsif.</p>
                        <span style={{ fontSize: '11px' }} className="text-info  ml-2">(Misol uchun: Logo dizayn tayyorlash)</span>
                    </div>}
                    rules={[{ required: true, message: "Buyurtma nomini kiriting!" }]}
                >
                    <Input style={{height: '32px'}} placeholder="" />
                </Form.Item>

                <Form.Item
                    name="direction"
                    label={
                        <div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                            <p className="m-0 text-dark">Qanday turdagi xizmat kerak?</p>
                            <span style={{ fontSize: '11px' }} className="text-info  ml-2">(Misol uchun: Grafik dizayn)</span>
                        </div>
                    }
                    rules={[{ required: true, message: "Yo'nalish tanlang!" }]}
                >
                    <Select
                        onChange={(val) => {
                            setDirection(val)
                            form.resetFields(['category_id'])
                        }}
                        placeholder=""
                        options={directions}
                    />
                </Form.Item>
                {direction &&
                    <Form.Item
                        name="category_id"
                        label={<div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                            <p className="m-0 text-dark">Aniq xizmat turi</p>
                            <span style={{ fontSize: '11px' }} className="text-info ml-2">(Misol uchun: Logo dizayn)</span>
                        </div>}
                        rules={[{ required: true, message: "Kategoriya tanlang!" }]}
                    >
                        <Select

                            placeholder=""
                            options={categories?.map(cat => ({
                                label: cat?.title,
                                value: cat?.id
                            }))}
                        />
                    </Form.Item>
                }

                <Form.Item
                    name="language"
                    label={<div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                        <p className="m-0 text-dark">Qaysi tilda bajarilsin?</p>
                        <span style={{ fontSize: '11px' }} className="text-info ml-2">(Misol uchun: O'zbekcha)</span>
                    </div>}
                    rules={[{ required: true, message: "Bajarilish tilini tanlang!" }]}
                >
                    <Select
                        placeholder=""
                        options={[
                            { label: "O'zbekcha", value: "uzb" },
                            { label: "Ruscha", value: "rus" },
                            { label: "Ingilizcha", value: "eng" },
                        ]}
                    />
                </Form.Item>
                <Form.Item
                    name="budget"

                    label={<div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                        <p className="m-0 text-dark">Siz bermoqchi bo'lgan summa</p>
                        <span style={{ fontSize: '11px' }} className="text-info ml-2">(Misol uchun: 200 000 so’m)</span>
                    </div>}
                    rules={[{ required: true, message: "Narx kiriting!" }]}
                >
                    <InputNumber
                        min={2000}
                        style={{ width: "100%" }}
                        placeholder=""
                        formatter={(value) =>
                            value ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : ""
                        }
                        parser={(value) => value.replace(/\s/g, "").replace(/[^\d]/g, "")}
                    />
                </Form.Item>

                <Form.Item
                    name="deadline_date"
                    label={<div className="d-flex align-items-start text-wrap flex-column flex-sm-row align-items-sm-center">
                        <p className="m-0 text-dark">Qachongacha tayyor bo‘lishi kerak?</p>
                        <span style={{ fontSize: '11px' }} className="text-info ml-2">(Misol uchun: Sep 4, 2025)</span>
                    </div>}
                    rules={[{ required: true, message: "Yetkazib berish sanasini tanlang!" }]}
                >
                    <DatePicker
                        format="MMM DD, YYYY"
                        style={{ width: "100%", height: "32px" }}
                        placeholder=""
                        size="small"
                        disabledDate={(current) => current && current < dayjs().startOf("day")}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Buyurtma haqida batafsil yozing"
                    rules={[{ required: true, message: "Buyurtma tavsifini yozing!" }]}
                >
                    <TextArea style={{ resize: "none" }} rows={4} placeholder="Ishlab chiraqish korxonasi uchun logo dizayn tayyorlash kerak" />
                </Form.Item>



                <Form.Item>
                    <Button loading={isPending} type="primary" htmlType="submit" className="mt-3 py-4 fs-4" block>
                        Yuborish
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrderModal;
