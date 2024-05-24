import React from 'react';
import { Tabs, Button, Modal, Select } from 'antd';
import { useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

export default function OrderProductListPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [type, setType] = useState('all');
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const items = [
        {
            key: '1',
            label: <span className="pr-4 fw-bolder fs-3 ">Yangi</span>,
            children: (
                <>
                    <div
                        onClick={showModal}
                        className="border border-3 rounded-3 px-3 py-3 align-items-center bg-white">
                        <div className="d-flex justify-content-between aligin-items-center">
                            <div className="d-flex ">
                                <img
                                    className="d-block"
                                    width={60}
                                    src="/static/img/docCopy.jpg"
                                    alt="sca"
                                />
                                <div>
                                    <div className="text-start">
                                        <span className="fw-medium ">
                                            Jasur Baxtiyarov
                                        </span>
                                    </div>
                                    <div className="text-start">
                                        <span className="fw-medium ">
                                            17-iyul 2025-yil
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <h3 className="d-flex aligin-items-end text-success fs-2 ">
                                200$
                            </h3>
                        </div>
                        <main className="px-3">
                            <p className="text-truncate">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Perspiciatis, sint animi
                                libero unde architecto totam itaque fugiat
                                impedit
                            </p>
                        </main>
                    </div>
                </>
            ),
        },
        {
            key: '2',
            label: <span className="pr-4 fw-bolder fs-3 px-3">Jarayonda</span>,
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: <span className="pr-4 fw-bolder fs-3 ">Tugatilgan</span>,
            children: 'Content of Tab Pane 2',
        },
    ];

    const showDeleteConfirm = () => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const showOkConfirm = () => {
        confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleFilled />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const onChange = (key) => {
        console.log(key);
    };
    return (
        <div className="container-deal my-5 ">
            <div className="row">
                <Tabs
                    defaultActiveKey="1"
                    items={items}
                    onChange={onChange}
                    className="col-md-8"
                />
                <div className="col-md-4">
                    <div className="bg-white rounded rounded-5  px-3 pt-5 pb-3 mt-5">
                        <h3>Loyiha rivojiga hissa qo'shing</h3>
                        <p>Yordam miqdorini kiriting</p>
                        <input
                            type="number"
                            className="form-control mb-4 h-75 py-3"
                            placeholder="Miqdorini kiriting"
                        />
                        <div className="btn btn-success w-100 fs-4 p-2 ">
                            Qo'llab quvvatlash
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="Buyurtma qabul qiluvchi tavsiloti"
                width={800}
                centered
                open={isModalOpen}
                onOk={handleOk}
                okText="Yopish"
                cancelButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                okButtonProps={{
                    style: {
                        display: 'none',
                    },
                }}
                onCancel={handleCancel}>
                <div className="d-flex justify-content-between aligin-items-center">
                    <div className="d-flex ">
                        <img
                            className="d-block"
                            width={60}
                            src="/static/img/docCopy.jpg"
                            alt="sca"
                        />
                        <div>
                            <div className="text-start">
                                <span className="fw-medium ">
                                    Jasur Baxtiyarov
                                </span>
                            </div>
                            <div className="text-start">
                                <span className="fw-medium ">
                                    17-iyul 2025-yil
                                </span>
                            </div>
                        </div>
                    </div>
                    <h3 className="d-flex aligin-items-end text-success ">
                        200$
                    </h3>
                </div>
                <p className="p-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. A
                    quia enim, repellat at voluptatum minima fugiat possimus
                    esse fuga totam corrupti et ipsam iure ipsa, adipisci
                    nesciunt culpa? Quisquam, dignissimos.
                </p>
                <span className="fw-bold p-3">
                    Arizani statusini o'zgartirish
                </span>
                <div className="d-flex gap-3 p-3">
                    {/* <Button onClick={showOkConfirm} type="dashed">
                        Qabul qilish
                    </Button>
                    <Button onClick={showDeleteConfirm} type="dashed">
                        Jarayonga o'tkazish
                    </Button> */}

                    <Select
                        defaultValue="Jarayonga o'tkazish"
                        style={{
                            width: '100%',
                        }}
                        size="large"
                        className="w-50"
                        onChange={(e) => setType(e)}
                        options={[
                            {
                                value: 'alll',
                                label: 'Jarayonga o\'tkazish',
                            },
                            {
                                value: 'lucy',
                                label: 'Qabul qilish',
                            },
                        ]}
                    />
                    {
                        type != 'all' &&
                        <div className='btn btn-success fs-4 my-auto' >Saqlash</div>
                    }
                </div>
            </Modal>
        </div>
    );
}
