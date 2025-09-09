import { Form, Modal, Input, Select, Button, DatePicker, message } from "antd";
import React, { useState } from "react";
import { directions } from "../../constants";
import { useFGet, useFPost } from "../../api/useFApi";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const CreateOrderModal = ({ open, onClose }) => {
    const [form] = Form.useForm();
    const [direction, setDirection] = useState(null)
    const { user } = useSelector(state => state.auth)

    const { data: categories } = useFGet("categories", `categories/?direction=${direction}`, { enabled: !!direction })

    const { mutate: createOrder, isPending } = useFPost({
        url: "order/custom-order",
        token: user?.access,
        onSuccess: () => {
            form.resetFields();
            onClose();
            message.success("Buyurtma muvaffaqiyatli yaratildi!");
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
        console.log("Form values:", values);

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
        <Modal width={600} title="Maxsus buyurtma yaratish" open={open} onCancel={onClose} footer={null} destroyOnClose>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
            >
                <Form.Item
                    name="title"
                    label="Buyurtma nomi"
                    rules={[{ required: true, message: "Buyurtma nomini kiriting!" }]}
                >
                    <Input placeholder="Buyurtma nomi" />
                </Form.Item>

                <Form.Item
                    name="direction"
                    label="Yo'nalish"
                    rules={[{ required: true, message: "Yo'nalish tanlang!" }]}
                >
                    <Select
                        onChange={(val) => setDirection(val)}
                        placeholder="Yo'nalish tanlang"
                        options={directions}
                    />
                </Form.Item>
                {direction &&
                    <Form.Item
                        name="category_id"
                        label="Kategoriya"
                        rules={[{ required: true, message: "Kategoriya tanlang!" }]}
                    >
                        <Select

                            placeholder="Kategoriya tanlang"
                            options={categories?.map(cat => ({
                                label: cat?.title,
                                value: cat?.id
                            }))}
                        />
                    </Form.Item>
                }

                <Form.Item
                    name="language"
                    label="Til"
                    rules={[{ required: true, message: "Tilni tanlang!" }]}
                >
                    <Select
                        placeholder="Tilni tanlang"
                        options={[
                            { label: "O'zbekcha", value: "uzb" },
                            { label: "Ruscha", value: "rus" },
                            { label: "Ingilizcha", value: "eng" },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    name="deadline_date"
                    label="Yetkazib berish sanasi"
                    rules={[{ required: true, message: "Yetkazib berish sanasini tanlang!" }]}
                >
                    <DatePicker
                        showTime={{ format: "HH:mm" }}
                        format="YYYY-MM-DD HH:mm"
                        style={{ width: "100%" }}
                        placeholder="Yetkazib berish sanasini tanlang"
                        disabledDate={(current) => current && current < dayjs().startOf("day")}
                    />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Izoh"
                    rules={[{ required: true, message: "Buyurtma tavsifini yozing!" }]}
                >
                    <TextArea rows={4} placeholder="Buyurtma tavsifini yozing..." />
                </Form.Item>

                <Form.Item
                    name="budget"
                    label="Narx"
                    rules={[{ required: true, message: "Narx kiriting!" }]}
                >
                    <Input
                        type="number"
                        min={2000}
                        style={{ width: "100%" }}
                        placeholder="Narx"
                    />
                </Form.Item>

                <Form.Item>
                    <Button loading={isPending} type="primary" htmlType="submit" block>
                        Yuborish
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateOrderModal;
