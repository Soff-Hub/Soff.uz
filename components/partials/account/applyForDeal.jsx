import React, { useState } from 'react';
import DealCart from './modules/AllOrders';
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
            <div className="my-5 row">
                <h4 className='mt-3' > Buyurtma tavsifi </h4>
                <DealCart type="apply_detail" />  
            </div>
            <h4 className="mb-4">
                {' '}
               Buyurtma uchun taklif yuborish {' '}
            </h4>
            <Form
                form={form}
                // onFinish={postOrder}
                className="row  py-4 border border-3 rounded-3 px-4 mb-5 bg-white ">
                    <div >
                        <h4> Интегрировать платежную систему на сайт ларавел </h4>
                        <p>1.сайт интернет магазин чтобы показавилось на фронте как платежный метнод , также показала статус платежа</p>
                        <p>2.сайт интернет магазин чтобы показавилось на фронте как айт интернет магазин чтобы показавилось на фронте  платежный метнод , также показала статус платежа</p>
                        <p>3.сайт интернет магазин чтобы показавилось на фронте как платежный метнод , также показала статус платежа</p>
                        <p>4.сайт интернет магазин чтобы показавилось на фронте как айт интернет магазин чтобы показавилось на фронте  платежный метнод , также показала статус платежа</p>
                    </div>
                <div className="col-md-12 p-0 mb-3">
                    <span className="d-block p-2 fw-bold ">
                        Taklif
                    </span>
                    <TextArea
                        rows={6}
                        placeholder="Taklif"
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="col-md-6 mb-3 pl-0">
                    {' '}
                    <span className="d-block p-2 fw-bold">
                        Bajarilish muddati
                    </span>
                    <DatePicker
                        className="w-100 py-3  rounded-3"
                        onChange={(e) => setDLifetime(e)}
                    />
                </div>

                <div className="col-md-6 mb-3  pr-0 ">
                    <span className="d-block p-2 fw-bold ">
                        Narx
                    </span>
                    <Form.Item
                    className='m-0'
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

                <Form.Item className="col-md-12 d-flex justify-content-end ">
                    <Button
                        // loading={loading}
                        htmlType="submit"
                        
                        style={{
                            width: '100%',
                            height: '40px',
                            padding:"1px 30px"
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
