import React from 'react';
import { Tabs, Button, Modal } from 'antd';
import { useState } from 'react';
import { ExclamationCircleFilled } from '@ant-design/icons';
const { confirm } = Modal;

export default function OrderProductListPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                    <div className="border border-3 rounded-3 px-4 py-4 d-flex justify-content-between align-items-center">
                        <div className="d-flex justify-content-start align-items-center gap-3 ">
                            {' '}
                            {false ? (
                                <img src="" alt="" />
                            ) : (
                                <i class="fa-solid fa-circle-user fs-2"></i>
                            )}{' '}
                            <p className="fw-bold fs-4 m-0">
                                {' '}
                                Ismatova Farangiz{' '}
                            </p>{' '}
                        </div>
                        <div className="d-flex justify-content-end aligin-items-center gap-3">
                            <h3 className="m-0 text-warning"> 200$ </h3>{' '}
                            <div
                                onClick={showModal}
                                className="btn btn-success fs-5 ">
                                Ko'rish
                            </div>{' '}
                        </div>
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
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            <Modal
                title="Buyurtma qabul qiluvchi tavsiloti"
                width={800}
                centered
                open={isModalOpen}
                onOk={handleOk}
                okText="Yopish"
                cancelButtonProps={{style: {
                    display:'none'
                }}}
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
                                <span className="text-success fs-3 fw-medium">
                                    <i class="fa-solid fa-user"></i>
                                </span>{' '}
                                <span className="fw-medium ">
                                    Jasur Baxtiyarov
                                </span>
                            </div>
                            <div className="text-start">
                                <span className="text-success fs-3 fw-medium">
                                    <i class="fa-solid fa-calendar-days"></i>
                                </span>{' '}
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
                <span className='fw-bold p-3' >Arizani statusini o'zgartirish</span>
                <div className='d-flex gap-3 p-3' >
                    <Button onClick={showOkConfirm} type="dashed"  >
                        Qabul qilish
                    </Button>
                    <Button onClick={showDeleteConfirm} type="dashed">
                        Jarayonga o'tkazish
                    </Button>
                </div>
            </Modal>
        </div>
    );
}
