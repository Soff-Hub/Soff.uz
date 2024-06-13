import { Button, Form, Input, InputNumber, Modal, Select } from 'antd';
import React from 'react';
import { useEffect, useState } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
const { TextArea } = Input;

export default function DealOrderEdit({ dealItem, setIsModalOpenUpdate }) {
    const [form] = Form.useForm();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [lifetime, setLifetime] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.auth);
    const [dealType, setDealType] = useState(null);
    const router = useRouter();
    const pid = router.query.pid;

    async function getDealType() {
        const data = await GetRepository.getDealType();
        if (data?.results) {
            setDealType(data?.results);
        }
    }


    async function patchOrder() {
        setLoading(true);
        form.resetFields();
        const data = {
            title: name ? name : dealItem?.title,
            description: description ? description : dealItem?.description,
            price: price ? price : Number(dealItem?.price),
            deadline_date: lifetime ? lifetime : dealItem?.deadline_date,
            type: type ? type : dealItem?.type,
            status: status ? status : dealItem?.status,
            reason: reason ? reason : dealItem?.reason,
        };

        const ItemsData = await PatchRepository.patchDealadmin(
            dealItem?.id,
            data,
            user?.access
        );

        if (ItemsData?.status === 200) {
            const modal = Modal.success({
                centered: true,
                title: 'Muvaffaqqiyatli!',
                content: `Buyurtma ma'lumotlari o'zgartirildi`,
            });
        } else {
            const modal = Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: ItemsData?.status + ' ' + ItemsData?.statusText,
            });
        }
        setIsModalOpenUpdate(false)
        setLoading(false);
    }

    useEffect(() => {
        getDealType();
        if (user?.access && pid) {
            getDeadLines(user?.access);
        }
    }, [pid]);

    const optionType = dealType?.map((e) => ({
        label: e?.name,
        value: e?.id,
    }));



    return (
        <div className="border-top rounded rounded-3  bg-white">
            <div className="d-md-flex justify-content-between gap-4 ">
                <div className="d-flex justify-content-start gap-3 pt-4 ">
                    {dealItem?.user_info?.image_url ? (
                        <img
                            className="d-block"
                            width={80}
                            src={dealItem?.user_info?.image_url}
                            alt="sca"
                        />
                    ) : (
                        <div className=" d-flex align-items-center ">
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
                            <span className="fw-medium  text-start text-success fs-5  ">Aloqa: <span className="text-secondary fs-5 fw-medium ">
                                {dealItem?.user_info?.contact_info ? dealItem?.user_info?.contact_info : '+998 (91) 008 67 89'}
                            </span> </span>{' '}

                        {dealItem?.status === 'active' ? (
                            <div className="rounded-3 d-flex justify-content-start align-items-center gap-2 p-1 ">
                                {' '}
                                <span className="text-success fs-5 fw-medium d-block">
                                    <i class="fa-solid fa-circle-check"></i>
                                </span>{' '}
                                <span className="fw-medium text-success  d-block">
                                    tasdiqlangan
                                </span>
                            </div>
                        ) : dealItem?.status === 'new' ? (
                            <div className="rounded-3 d-flex justify-content-start align-items-center gap-2 p-1  ">
                                {' '}
                                <span className="text-warning fs-5 fw-medium d-block">
                                    <i class="fa-regular fa-clock"></i>
                                </span>{' '}
                                <span className="fw-medium text-warning  d-block">
                                    moderatsiya
                                </span>
                            </div>
                        ) : (
                            <div className="rounded-3 d-flex justify-content-start align-items-center gap-2 px-1  ">
                                {' '}
                                <span className="text-danger fs-5 fw-medium d-block">
                                    <i class="fa-solid fa-circle-xmark"></i>
                                </span>{' '}
                                <span className="fw-medium text-danger  d-block">
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
                className="row mt-4">
                <Form.Item
                    className="col-md-12 mb-3"
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
                    className="col-md-6 mb-3 "
                    name="userRole">
                    <span className="fw-bold py-3 px-2 ">
                        Muddati
                    </span>
                    <Input type='date' onChange={(e) => setLifetime(e.target.value)}
                        defaultValue={dealItem?.deadline_date} />

                </Form.Item>
                <Form.Item
                    className="col-md-6 mb-3 "
                    name="type">
                    <span className="fw-bold py-3 px-2 ">
                        Turi
                    </span>
                    <Select
                        defaultValue={dealItem?.type}
                        onChange={(e) => setType(e)}
                        style={{
                            width: '100%',
                            height: '42px',
                        }}
                        placeholder="Buyurtma turi"
                        options={optionType}></Select>
                </Form.Item>
                <Form.Item
                    className="col-md-6 mb-3"
                    name="price">
                    <span className="fw-bold py-3 px-2 ">
                        Narxi
                    </span>
                    <InputNumber
                        defaultValue={Number(dealItem?.price)}
                        placeholder="Narxi"
                        className='w-100 py-2'
                        formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                        onChange={(e) => setPrice(e)}
                        onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                                e.preventDefault();
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item className="col-md-6 mb-3">
                    <span className="fw-bold  px-2 ">
                        Arizani statusini o'zgartirish
                    </span>
                    <div className="d-flex gap-3 ">
                        <Select
                            defaultValue={dealItem?.status}
                            style={{
                                width: '100%',
                                height: "44px"
                            }}
                            size="large"
                            className="w-100"
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
                                    value: 'cancelled',
                                    label: 'Bekor qilish',
                                },
                            ]}
                        />
                    </div>
                </Form.Item>
                {
                    (status === "cancelled" || dealItem?.status === "cancelled") ?
                        <Form.Item
                            className="col-md-12 mb-3"
                            name="description">
                            <span className="fw-bold py-3 px-2 ">
                                Bekor qilinganligi haqida sabab
                            </span>
                            <TextArea
                                defaultValue={dealItem?.reason}
                                rows={4}
                                placeholder="Bekor qilinganligi haqida sabab..."
                                onChange={(e) =>
                                    setReason(e.target.value)
                                }
                            />
                        </Form.Item>
                        : <></>
                }

                <Form.Item
                    className="col-md-12 mb-3"
                    name="description">
                    <span className="fw-bold py-3 px-2 ">
                        Tavsif
                    </span>
                    <TextArea
                        defaultValue={dealItem?.description}
                        rows={10}
                        placeholder="Buyurtma uchun tavsif"
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />
                </Form.Item>

                <Form.Item className="col-md-12 mb-0 mt-3 d-flex justify-content-end">
                    <Button
                        loading={loading}
                        htmlType="submit"
                        style={{
                            width: '100%',
                            height: '37px',
                        }}
                        className="btn-success btn-send-email">
                        <span
                            style={{
                                color: '#fff',
                                fontSize: '14px',
                            }}>
                            Saqlash
                        </span>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}
