import { Button, DatePicker, Form, Input, Select } from 'antd';
import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Router from 'next/router';
import DealCart from './modules/DealCart';
const { TextArea } = Input;

export default function DealsList() {
    const [form] = Form.useForm();
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lifetime, setDLifetime] = useState('');
    const [type, setType] = useState('');
    const [pageType, setPageType] = useState(true);

    async function postOrder() {
        if (name) {
            form.resetFields();
            setLoading(true);
            setEmail(null);
            setText(null);
            setSubject(null);

            if (userRole) {
                const data = {
                    user_type: userRole,
                    title: title,

                    body_text: text,
                };
                const ItemsData = await PostsRepository.EmailSend(
                    data,
                    user?.access,
                    dataFormat
                );
                if (ItemsData?.status == 201) {
                    const modal = Modal.success({
                        centered: true,
                        title: 'Muvaffaqqiyatli!',
                        content: ` ${
                            ItemsData?.data?.msg
                                ? ItemsData?.data?.msg
                                : 'Sizning xabaringiz yuborildi'
                        } `,
                    });
                    modal.update;
                } else {
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xato!',
                        content: `Nimadir xato ketdi `,
                    });
                    modal.update;
                }
            } else {
                const data = {
                    users: email ? email : [],
                    title: title,
                    body_text: text,
                };
                const ItemsData = await PostsRepository.EmailSend(
                    data,
                    user?.access,
                    dataFormat
                );
                if (ItemsData?.status == 201) {
                    const modal = Modal.success({
                        centered: true,
                        title: 'Muvaffaqqiyatli!',
                        content: ` ${
                            ItemsData?.data?.msg
                                ? ItemsData?.data?.msg
                                : 'Sizning xabaringiz yuborildi'
                        } `,
                    });
                    modal.update;
                } else {
                    const modal = Modal.error({
                        centered: true,
                        title: 'Xato!',
                        content: `Nimadir xato ketdi `,
                    });
                    modal.update;
                }
            }
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xato!',
                content: `Malumot to'g'ri kiritilmadi`,
            });
            modal.update;
        }
        setLoading(false);
    }

    return (
        <section className="ps-my-account ps-page--account p-0">
            <div className="container">
                <div className="row " style={{ alignItems: 'flex-start' }}>
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8 pb-5">
                        <div className="ps-page__content">
                            <div className=" bg-white">
                                {!pageType ? (
                                    <div className="px-5">
                                        <div className="d-flex justify-content-between align-content-center">
                                            <h3 className="py-4 text-center">
                                                Buyurtma yaratish
                                            </h3>
                                            <div
                                                style={{ cursor: 'pointer' }}
                                                onClick={() =>
                                                    setPageType(true)
                                                }
                                                className="d-flex align-items-center">
                                                <i class="fa-solid fa-x"></i>
                                            </div>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet
                                            consectetur, adipisicing elit.
                                            Itaque nisi, qui optio eum quo
                                            perferendis ipsa debitis quod
                                            veritatis reiciendis?
                                        </p>

                                        <div>
                                            <Form
                                                form={form}
                                                onFinish={postOrder}
                                                className="row  py-4 ">
                                                <Form.Item
                                                    className="col-md-12 p-0"
                                                    name="title"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Buyurtma nomini kirtish majburiy',
                                                        },
                                                    ]}>
                                                    <Input
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Buyurtma nomi"></Input>
                                                </Form.Item>
                                                <div className="col-md-12 p-0 mb-3">
                                                    <TextArea
                                                        rows={4}
                                                        placeholder="Buyurtma uchun tavsif"
                                                        onChange={(e) =>
                                                            setDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <DatePicker
                                                    className="w-100 py-3 col-md-6 my-3 rounded-3"
                                                    onChange={(e) =>
                                                        setDLifetime(e)
                                                    }
                                                />

                                                <Form.Item
                                                    className="col-md-6 p-0 my-3 "
                                                    name="userRole">
                                                    <Select
                                                        onChange={(e) =>
                                                            setType(e)
                                                        }
                                                        style={{
                                                            width: '100%',
                                                            height: '45px',
                                                        }}
                                                        placeholder="Buyurtma turi"
                                                        options={[
                                                            {
                                                                label: 'File materiallar',
                                                                value: 'all',
                                                            },
                                                            {
                                                                label: 'Audio materiallar',
                                                                value: 'seller',
                                                            },
                                                            {
                                                                label: 'Video materiallar',
                                                                value: 'customer',
                                                            },
                                                            {
                                                                label: 'Shablon materiallar',
                                                                value: 'customer',
                                                            },
                                                        ]}></Select>
                                                </Form.Item>

                                                <Form.Item
                                                    className="col-md-12 p-0 my-3"
                                                    name="title"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message:
                                                                'Buyurtma narxini kiritish majburiy',
                                                        },
                                                    ]}>
                                                    <Input
                                                        onChange={(e) =>
                                                            setPrice(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="Narxi"></Input>
                                                </Form.Item>

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
                                                                fontSize:
                                                                    '16px',
                                                            }}>
                                                            Yaratish
                                                        </span>
                                                    </Button>
                                                </Form.Item>
                                            </Form>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="px-5 pt-4">
                                        <div className="py-4 d-md-flex justify-content-between ">
                                            <h3>Buyurtmalar listi</h3>
                                            <button
                                                className="btn btn-success fs-4 "
                                                onClick={() =>
                                                    setPageType(false)
                                                }>
                                                {' '}
                                                + Buyurtma berish{' '}
                                            </button>
                                        </div>
                                        <div className="row py-3 pb-5">
                                            <div className="col-md-12">
                                              <DealCart type='application' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
