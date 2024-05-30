import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useEffect } from 'react';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
import { Router } from 'next/router';
const { TextArea } = Input;

export default function DealsList() {
    const [form] = Form.useForm();
    const { user } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lifetime, setLifetime] = useState('');
    const [type, setType] = useState('');
    const [loading, setLoading] = useState(false);

    const [dealType, setDealType] = useState(null);
    const [dealDeadlines, setDeadlines] = useState(null);

    async function postOrder() {
        form.resetFields();
        setLoading(true);

        const data = {
            title: name,
            description: description,
            price: price,
            deadline: lifetime,
            type: type,
        };
        const ItemsData = await PostsRepository.postDeal(data, user?.access);
        if (ItemsData?.status == 201) {
         Router.push("/account/deal-list/published")
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xato!',
                content: `Nimadir xato ketdi `,
            });
            modal.update;
        }

        setLoading(false);
    }

    async function getDealType(token) {
        const data = await GetRepository.getDealType(token);
        if (data?.results) {
            setDealType(data?.results);
        }
    }
    async function getDeadLines(token) {
        const data = await GetRepository.getDeadline(token);
        if (data?.results) {
            setDeadlines(data?.results);
        }
    }
    useEffect(() => {
        if (user?.access) {
            getDealType(user?.access);
            getDeadLines(user?.access);
        }
    }, []);


    const optionType = dealType?.map((e) => ({
        label: e?.name,
        value: e?.id,
    }));
    const optiondeadline = dealDeadlines?.map((e) => ({
        label: e?.name,
        value: e?.id,
    }));


    return (
        <div className="row " style={{ alignItems: 'flex-start' }}>
            <div className="col-lg-12  mx-auto">
                <div className="ps-page__content">
                    <div className=" bg-white">
                        <div>
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
                                    className="row  pt-4 ">
                                    <Form.Item
                                        className="col-md-12   mx-auto mb-3"
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
                                    <Form.Item
                                        className="col-md-12 mb-3"
                                        name="price"
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

                                    <Form.Item
                                        className="col-md-12 mb-3 "
                                        name="userRole"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Buyurtma muddatini kiritish majburiy',
                                            },
                                        ]}>
                                        <Select
                                            onChange={(e) =>
                                                setLifetime(e)
                                            }
                                            style={{
                                                width: '100%',
                                                height: '45px',
                                            }}
                                            placeholder="Muddati"
                                            options={
                                                optiondeadline
                                            }></Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="col-md-12 mb-3"
                                        name="type"
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Buyurtma turini kiritish majburiy',
                                            },
                                        ]}>
                                        <Select
                                            onChange={(e) =>
                                                setType(e)
                                            }
                                            style={{
                                                width: '100%',
                                                height: '45px',
                                            }}
                                            placeholder="Buyurtma turi"
                                            options={
                                                optionType
                                            }></Select>
                                    </Form.Item>


                                    <Form.Item
                                        name="description"
                                        className='col-md-12 mb-3'
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Buyurtma tavsifini kiritish majburiy',
                                            },
                                        ]}>
                                        <TextArea

                                            rows={4}
                                            placeholder="Buyurtma uchun tavsif"
                                            onChange={(e) =>
                                                setDescription(
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item className="col-md-12 d-flex justify-content-end m-0  mt-3">
                                        <Button
                                            loading={loading}
                                            htmlType="submit"
                                            style={{
                                                width: '100%',
                                                height: '37px',
                                                padding: "1px 30px"
                                            }}
                                            className="btn-primary btn-send-email">
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
                    </div>
                </div>
            </div>
        </div>
    );
}
