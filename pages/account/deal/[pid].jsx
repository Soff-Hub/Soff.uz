import { Button, Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '~/pages/page/page-404';
import GetRepository from '~/reositoriy-admin/GetRepository';
import Selection from '../selection';
import { useSelector } from 'react-redux';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { ClockLoader } from 'react-spinners';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
const { TextArea } = Input;

export default function DealOrderEdit() {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lifetime, setLifetime] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [pageType, setPageType] = useState(true);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [dealItem, setDealItem] = useState(null);
    const [dealType, setDealType] = useState(null);
    const [dealDeadlines, setDeadlines] = useState(null);
    const router = useRouter();
    const pid = router.query.pid;

    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: 'Buyurtmalar nazorati',
        },
    ];

    async function getDealList(id, token) {
        const data = await GetRepository.getDealItems(id, token);
        if (data) {
            setDealItem(data);
        }
    }

    async function getDealType() {
        const data = await GetRepository.getDealType();
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

    async function patchOrder() {
        setLoading(true);
        const formData = new FormData();
        name && formData.append('title', name);
        description && formData.append('description', description);
        price && formData.append('price', price);
        lifetime && formData.append('deadline', lifetime);
        type && formData.append('type', type);
        status && formData.append('status', status);

        const ItemsData = await PatchRepository.patchDealadmin(
            pid,
            formData,
            user?.access
        );
        if (ItemsData?.status == 200) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: ` ${
                    ItemsData?.data?.msg
                        ? ItemsData?.data?.msg
                        : "Siz buyurtmani o'zgartirdingiz"
                } `,
            });
            modal.update;
            setPageType(true);
            form.resetFields();
            getDealList(pid, user?.access);
            Router.push('/account/dealOrder');
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

    useEffect(() => {
        getDealType();
        if (user?.access && pid) {
            getDeadLines(user?.access);
            getDealList(pid, user?.access);
        }
    }, [pid]);

    const optionType = dealType?.map((e) => ({
        label: e?.name,
        value: e?.id,
    }));
    const optiondeadline = dealDeadlines?.map((e) => ({
        label: e?.title,
        value: e?.id,
    }));

    console.log('type', type);

    return user?.role === 'admin' ? (
        <PageContainer footer={<FooterDefault />} title="Invoices">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="ps-my-account ps-page--account">
                    <div className="container-deal">
                        {dealItem ? (
                            <div className="border border-3 rounded rounded-3 px-5 bg-white">
                                <div className="d-md-flex justify-content-between gap-4 ">
                                    <div className="d-flex justify-content-start gap-3 pt-4 ">
                                        {dealItem?.user_info?.image ? (
                                            <img
                                                className="d-block"
                                                width={80}
                                                src={dealItem?.user_info?.image}
                                                alt="sca"
                                            />
                                        ) : (
                                            <div className=" d-flex align-items-center border rounded rounded-3 px-3 ">
                                                <i
                                                    style={{ fontSize: '35px' }}
                                                    class="fa-solid fa-circle-user d-block"></i>
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-start">
                                                <Link href="#">
                                                    <a className="fw-medium fw-bold">
                                                        {
                                                            dealItem?.user_info
                                                                ?.full_name
                                                        }
                                                    </a>
                                                </Link>
                                            </div>
                                            {dealItem?.status === 'active' ? (
                                                <div className="bg-success rounded-3 d-flex justify-content-center align-items-center gap-2 p-1  mt-3 ">
                                                    {' '}
                                                    <span className="text-white fs-3 fw-medium d-block">
                                                        <i class="fa-solid fa-circle-check"></i>
                                                    </span>{' '}
                                                    <span className="fw-medium text-white  d-block">
                                                        tasdiqlangan
                                                    </span>
                                                </div>
                                            ) : dealItem?.status === 'new' ? (
                                                <div className="bg-warning rounded-3 d-flex justify-content-center align-items-center gap-2 p-1 mt-3 ">
                                                    {' '}
                                                    <span className="text-success fs-3 fw-medium d-block">
                                                        <i class="fa-regular fa-clock"></i>
                                                    </span>{' '}
                                                    <span className="fw-medium text-success  d-block">
                                                        moderatsiya
                                                    </span>
                                                </div>
                                            ) : (
                                                <div className="bg-danger rounded-3 d-flex justify-content-center align-items-center gap-2 px-1 mt-3 ">
                                                    {' '}
                                                    <span className="text-white fs-3 fw-medium d-block">
                                                        <i class="fa-solid fa-circle-xmark"></i>
                                                    </span>{' '}
                                                    <span className="fw-medium text-white  d-block">
                                                        bekor qilingan
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <Form
                                    form={form}
                                    onFinish={patchOrder}
                                    className="row  py-4 ">
                                    <Form.Item
                                        className="col-md-12 p-0"
                                        name="title">
                                        <span className="fw-bold py-3 px-2 ">
                                            Nomi
                                        </span>
                                        <Input
                                            defaultValue={dealItem?.title}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Buyurtma nomi"></Input>
                                    </Form.Item>
                                    <Form.Item
                                        className="col-md-12 p-0 mb-3 "
                                        name="description">
                                        <span className="fw-bold py-3 px-2 ">
                                            Tavsif
                                        </span>
                                        <TextArea
                                            defaultValue={dealItem?.description}
                                            rows={4}
                                            placeholder="Buyurtma uchun tavsif"
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        className="col-md-6 p-0 my-3 "
                                        name="userRole">
                                        <span className="fw-bold py-3 px-2 ">
                                            Muddati
                                        </span>
                                        <Select
                                            defaultValue={dealItem?.deadline_date}
                                            onChange={(e) => setLifetime(e)}
                                            style={{
                                                width: '100%',
                                                height: '45px',
                                            }}
                                            placeholder="Muddati"
                                            options={optiondeadline}></Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="col-md-6 p-0 my-3 "
                                        name="type">
                                        <span className="fw-bold py-3 px-2 ">
                                            Turi
                                        </span>
                                        <Select
                                            defaultValue={dealItem?.type?.id}
                                            onChange={(e) => setType(e)}
                                            style={{
                                                width: '100%',
                                                height: '45px',
                                            }}
                                            placeholder="Buyurtma turi"
                                            options={optionType}></Select>
                                    </Form.Item>
                                    <Form.Item
                                        className="col-md-12 p-0 my-3"
                                        name="price">
                                        <span className="fw-bold py-3 px-2 ">
                                            Narxi
                                        </span>
                                        <Input
                                            defaultValue={JSON.parse(
                                                dealItem?.price
                                            )}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                            placeholder="Narxi"></Input>
                                    </Form.Item>
                                    <Form.Item className="col-md-12 p-0 mt-3">
                                        <span className="fw-bold py-3 px-2 ">
                                            Arizani statusini o'zgartirish
                                        </span>
                                        <div className="d-flex gap-3 py-3 px-2">
                                            <Select
                                                defaultValue={dealItem?.status}
                                                style={{
                                                    width: '100%',
                                                }}
                                                size="large"
                                                className="w-50"
                                                onChange={(e) => setStatus(e)}
                                                options={[
                                                    {
                                                        value: 'new',
                                                        label: 'Moderatsiya',
                                                    },
                                                    {
                                                        value: 'active',
                                                        label: 'Tasdiqlash',
                                                    },
                                                    {
                                                        value: 'archived',
                                                        label: 'Bekor qilish',
                                                    },
                                                ]}
                                            />
                                        </div>
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
                                                    fontSize: '16px',
                                                }}>
                                                SAQLASH
                                            </span>
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        ) : (
                            <div
                                style={{ minHeight: '300px' }}
                                className="d-flex justify-content-center align-items-center">
                                <ClockLoader color="#36d7b7" />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <Selection />
    );
}
