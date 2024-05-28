import { Button, DatePicker, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Router from 'next/router';
import DealCart from './modules/DealCart';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useEffect } from 'react';
import PostsRepository from '~/reositoriy-admin/PostsRepository';
const { TextArea } = Input;

export default function DealsList() {
    const [form] = Form.useForm();
    const { accountLinks, user } = useSelector((state) => state.auth);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lifetime, setLifetime] = useState('');
    const [type, setType] = useState('');
    const [pageType, setPageType] = useState(true);
    const [loading, setLoading] = useState(false);

    const [dealList, setDealList] = useState(null);
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
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: ` ${
                    ItemsData?.data?.msg
                        ? ItemsData?.data?.msg
                        : 'Sizning arizangiz yuborildi'
                } `,
            });
            modal.update;
            setPageType(true);
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
    async function getDealList(token) {
        const data = await GetRepository.getDealList(token);
        if (data?.results) {
            setDealList(data?.results);
        }
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
            getDealList(user?.access);
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

    console.log('dealList', dealList);

    return (
        <section className="ps-my-account ps-page--account ">
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
                                                <div className="col-md-12 p-0 mb-3"></div>
                                                <Form.Item
                                                    name="description"
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

                                                <Form.Item
                                                    className="col-md-6 p-0 my-3 "
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
                                                    className="col-md-6 p-0 my-3 "
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
                                                    className="col-md-12 p-0 my-3"
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
                                                <Form.Item className="col-md-2 p-0 mt-3">
                                                    <Button
                                                        loading={loading}
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
                                        <div className="d-flex flex-column gap-2 my-3">
                                            <span className="fs-4">
                                                <i className="text-primary-emphasis fa-solid fa-circle-info"></i>{' '}
                                                <strong>Moderatsiya</strong>{' '}
                                                <em>
                                                    ma'lumotlar ko'rib
                                                    chiqilmoqda...
                                                </em>
                                            </span>
                                            <span className="fs-4">
                                                <i className="fa-solid text-success fa-circle-check"></i>{' '}
                                                <strong>Tasdiqlangan </strong>{' '}
                                                <em>
                                                    ma'lumotlaringiz
                                                    muvaffaqqiyatli tasdiqlandi!
                                                </em>
                                            </span>
                                            <span className="fs-4">
                                                <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
                                                <strong>Bekor qilingan</strong>{' '}
                                                <em>
                                                    ma'lumotlaringiz bekor
                                                    qilindi
                                                </em>
                                            </span>
                                        </div>
                                        <div className="py-4 d-md-flex justify-content-between ">
                                            <h3>Buyurtmalar ro'yxati</h3>
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
                                            {dealList?.map((e) => {
                                                return (
                                                    <div
                                                        key={e?.id}
                                                        className="col-md-12">
                                                        <DealCart application_count={e?.application_count}  description={e?.description} title={e?.title} deadline={e?.deadline} price={e?.price} status={e?.status} deal_type={e?.type}  type="application" />
                                                    </div>
                                                );
                                            })}
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
