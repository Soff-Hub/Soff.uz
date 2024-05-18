import { Button, DatePicker, Form, Input, Select } from 'antd';
import React from 'react';
import CKeditor from './CKeditor';

export default function DealsList() {
    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;
    return (
        <div className="container">
            <h3 className="py-2">Sotuvchilar bilan bitim tuzing</h3>
            <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque
                nisi, qui optio eum quo perferendis ipsa debitis quod veritatis
                reiciendis?
            </p>

            <Form
                form={form}
                // onFinish={GetItemsEmail}
                className="row  p-4 border-2 border">
                <Form.Item
                    className="col-md-8 p-0"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Xabar mavzusini kiritish majburiy',
                        },
                    ]}>
                    <Input
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Xabar mavzusi"></Input>
                </Form.Item>
                <div className="col-md-12 p-0 mb-3">
                    <CKeditor
                        name="description"
                        onChange={(data) => {
                            setText(data);
                        }}
                        // editorLoaded={editorLoaded}
                        // value={text || ''}
                    />
                </div>
                <RangePicker
                    className="w-100 py-3 col-md-12 my-3 rounded-3"
                    onChange={(e) => setDate(e)}
                />

                <Form.Item className="col-md-3 p-0" name="userRole">
                    <Select
                        // onChange={OnChangeSelectFull}
                        style={{ width: '100%', height: '45px' }}
                        placeholder="Barchasini tanlash"
                        options={[
                            {
                                label: ' Barcha Foydalanuvchilar',
                                value: 'all',
                            },
                            {
                                label: 'Barcha Sotuvchilar',
                                value: 'seller',
                            },
                            {
                                label: 'Barcha Xaridorlar',
                                value: 'customer',
                            },
                        ]}></Select>
                </Form.Item>

                <Form.Item
                    className="col-md-8 p-0"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Xabar mavzusini kiritish majburiy',
                        },
                    ]}>
                    <Input
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Xabar mavzusi"></Input>
                </Form.Item>

                <Form.Item
                    className="col-md-8 p-0"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Xabar mavzusini kiritish majburiy',
                        },
                    ]}>
                    <Input
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="Xabar mavzusi"></Input>
                </Form.Item>

                <Form.Item className="col-md-2 p-0">
                    <Button
                        // loading={loading}
                        htmlType="submit"
                        style={{ width: '100%', height: '45px' }}
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
