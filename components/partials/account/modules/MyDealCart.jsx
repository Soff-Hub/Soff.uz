import { Modal } from 'antd';
import React, { useState } from 'react';


export default function MyDealCart() {
    const [type, setType] = useState('false');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="border border-2 rounded-3 p-4">
                <div className="d-md-flex justify-content-between  ">
                    <h3 className="text-success">Mustaqil ish kerak </h3>
                    <div>
                        {' '}
                        <span className="fw-medium">narxi:</span>{' '}
                        <span className="text-success fs-3 fw-bold">
                            23 000 so'm{' '}
                        </span>
                    </div>
                </div>
                <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Libero cupiditate quaerat amet minima vel at! Quaerat, enim?
                    Repellendus provident saepe, repellat iusto odio veritatis
                    voluptas animi numquam ea officiis ad!
                </p>
                <div>
                    <div className="d-md-flex justify-content-between gap-4 ">
                        <div className="d-flex ">
                            <img
                                className="d-block"
                                width={80}
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
                                <div className="text-start">
                                    <span className="text-success fs-3 fw-medium">
                                        arizalar :{' '}
                                    </span>{' '}
                                    <span className="fw-medium "> 2</span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div
                                style={{ cursor: 'pointer' }}
                                className=" h-25 fs-4 p-3 text-success fw-bold text-center"
                                onClick={showModal}>
                                Arizani ko'rish
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {type === true ? (
                <div
                    onBlur={() => setType(false)}
                    className="border border-2 rounded-3 p-4 my-4 d-flex justify-content-start">
                    <img
                        className="d-block"
                        width={100}
                        height={80}
                        src="/static/img/docCopy.jpg"
                        alt="sca"
                    />
                    <div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3 className="text-success">
                                    Mustaqil ish kerak{' '}
                                </h3>
                                <p>
                                    {' '}
                                    <span className="fw-bold fs-3">0</span>{' '}
                                    ko'rishlar soni{' '}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between gap-5">
                                <h3 className="text-success">
                                    {' '}
                                    30-iyun, 2025-yil{' '}
                                </h3>
                                <h3 className="text-success">20$ </h3>
                            </div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Libero cupiditate quaerat amet minima vel at!
                            Quaerat, enim? Repellendus provident saepe, repellat
                            iusto odio veritatis voluptas animi numquam ea
                            officiis ad!
                        </p>
                    </div>
                </div>
            ) : (
                ''
            )}

            <Modal
                title="Ariza"
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
                onCancel={handleCancel}>
               <div className='border border-2 rounded-3 p-4 my-4' >
               <div className=" d-flex justify-content-start">
                    <img
                        className="d-block"
                        width={100}
                        height={80}
                        src="/static/img/docCopy.jpg"
                        alt="sca"
                    />
                    <div>
                        <div className="d-flex justify-content-between">
                            <div>
                                <h3 className="text-success">
                                    Mustaqil ish kerak{' '}
                                </h3>
                                <p>
                                    {' '}
                                    <span className="fw-bold fs-3">0</span>{' '}
                                    ko'rishlar soni{' '}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between gap-5">
                                <h3 className="text-success">
                                    {' '}
                                    30-iyun, 2025-yil{' '}
                                </h3>
                                <h3 className="text-success">20$ </h3>
                            </div>
                        </div>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit. Libero cupiditate quaerat amet minima vel at!
                            Quaerat, enim? Repellendus provident saepe, repellat
                            iusto odio veritatis voluptas animi numquam ea
                            officiis ad!
                        </p>
                    </div>
                </div>
                <p className='p-2 fw-bold fs-4 m-0 mt-5' >Ko'rildi <i class="fa-solid fa-eye"></i> </p>
               </div>
                   
            </Modal>
        </div>
    );
}
