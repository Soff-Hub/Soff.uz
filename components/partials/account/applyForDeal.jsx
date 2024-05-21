import React, { useState } from 'react';
import DealCart from './modules/DealCart';
import { Button, DatePicker, Form, Input } from 'antd';
const { TextArea } = Input;

export default function ApplyForDeal() {
    const [form] = Form.useForm();
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lifetime, setDLifetime] = useState('');

    // async function postOrder() {
    //     if (true) {
    //         form.resetFields();
    //         setLoading(true);
    //         setEmail(null);
    //         setText(null);
    //         setSubject(null);

    //         if (userRole) {
    //             const data = {
    //                 user_type: userRole,
    //                 title: title,

    //                 body_text: text,
    //             };
    //             const ItemsData = await PostsRepository.EmailSend(
    //                 data,
    //                 user?.access,
    //                 dataFormat
    //             );
    //             if (ItemsData?.status == 201) {
    //                 const modal = Modal.success({
    //                     centered: true,
    //                     title: 'Muvaffaqqiyatli!',
    //                     content: ` ${
    //                         ItemsData?.data?.msg
    //                             ? ItemsData?.data?.msg
    //                             : 'Sizning xabaringiz yuborildi'
    //                     } `,
    //                 });
    //                 modal.update;
    //             } else {
    //                 const modal = Modal.error({
    //                     centered: true,
    //                     title: 'Xato!',
    //                     content: `Nimadir xato ketdi `,
    //                 });
    //                 modal.update;
    //             }
    //         } else {
    //             const data = {
    //                 users: email ? email : [],
    //                 title: title,
    //                 body_text: text,
    //             };
    //             const ItemsData = await PostsRepository.EmailSend(
    //                 data,
    //                 user?.access,
    //                 dataFormat
    //             );
    //             if (ItemsData?.status == 201) {
    //                 const modal = Modal.success({
    //                     centered: true,
    //                     title: 'Muvaffaqqiyatli!',
    //                     content: ` ${
    //                         ItemsData?.data?.msg
    //                             ? ItemsData?.data?.msg
    //                             : 'Sizning xabaringiz yuborildi'
    //                     } `,
    //                 });
    //                 modal.update;
    //             } else {
    //                 const modal = Modal.error({
    //                     centered: true,
    //                     title: 'Xato!',
    //                     content: `Nimadir xato ketdi `,
    //                 });
    //                 modal.update;
    //             }
    //         }
    //     } else {
    //         const modal = Modal.error({
    //             centered: true,
    //             title: 'Xato!',
    //             content: `Malumot to'g'ri kiritilmadi`,
    //         });
    //         modal.update;
    //     }
    //     setLoading(false);
    // }

    return (
        <div className="container">
            <div className="my-5">
                <DealCart />
            </div>
            <h3 className="mb-4">
                {' '}
                <u>Mahsulot uchun ariza topshirish</u>{' '}
            </h3>
            <Form
                form={form}
                // onFinish={postOrder}
                className="row  py-4 border border-3 rounded-3 px-4 mb-5 ">
                <div className="col-md-12 p-0 mb-3">
                    <span className="d-block p-2 fw-bold ">
                        Buyurtma qabul qilish uchun tavsif
                    </span>
                    <TextArea
                        rows={6}
                        placeholder="Buyurtma uchun tavsif"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className=" col-md-6 my-3 p-0 w-100 ">
                    {' '}
                    <span className="d-block p-2 fw-bold">
                        Buyurtma qabul qilish uchun sana
                    </span>
                    <DatePicker
                        className="w-100 py-3 col-md-6 my-3 rounded-3"
                        onChange={(e) => setDLifetime(e)}
                    />
                </div>

                <div className="col-md-6 p-0 my-3 ">
                    <span className="d-block p-2 fw-bold -100">
                        Buyurtma qabul qilish uchun narx
                    </span>
                    <Form.Item
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Buyurtma narxini kiritish majburiy',
                            },
                        ]}>
                        <Input
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Narxi"></Input>
                    </Form.Item>
                </div>

                <Form.Item className="col-md-2 p-0 mt-3">
                    <Button
                        // loading={loading}
                        htmlType="submit"
                        style={{
                            width: '100%',
                            height: '45px',
                        }}
                        className="btn-success btn-send-email">
                        <span
                            style={{
                                color: '#fff',
                                fontSize: '16px',
                            }}>
                            Yuborish
                        </span>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
