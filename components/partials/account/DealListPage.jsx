import { DatePicker, Select, Slider, Tabs } from 'antd';
import React, { useState } from 'react';
import DealCart from './modules/DealCart';
import MyDealCart from './modules/MyDealCart';

export default function DealListPage() {
    const [type, setType] = useState('all');

    const showModal = () => {
        setIsModalOpen(true);
    };
    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: <span className="pr-4 fw-bolder fs-3 text-info ">Qabul qilingan</span>,
            children: (
                <>
                    <MyDealCart/>
                </>
            ),
        },
        {
            key: '2',
            label: <span className="pr-4 fw-bolder fs-3 text-warning ">Jarayonda</span>,
            children: 'Content of Tab Pane 2',
        },
        {
            key: '3',
            label: <span className="pr-4 fw-bolder fs-3 text-success ">Topshirilgan</span>,
            children: 'Content of Tab Pane 2',
        },
    ];


    return (
        <div className="container">
            <div className="row my-4">
                <h3 className="p-4">Buyurtmalar ro'yxati</h3>
                <div className="col-md-3">
                    <div className="border border-3 p-3">
                        <span className="d-block p-2 fw-bold ">
                            Buyurtmalar
                        </span>
                        <Select
                            defaultValue="Barchasi"
                            style={{
                                width: '100%',
                            }}
                            size="large"
                            className="w-100"
                            onChange={(e) => setType(e)}
                            options={[
                                {
                                    value: 'all',
                                    label: 'Barchasi',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Mening takliflarim',
                                },
                            ]}
                        />
                        {
                            type === "all" ?
                            <>
                            <span className="d-block p-2 mt-4 fw-bold ">
                            Buyurtma turlari
                        </span>
                        <Select
                            defaultValue="lucy"
                            style={{
                                width: '100%',
                            }}
                            size="large"
                            className="w-100"
                            // onChange={handleChange}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Fayl materiallar',
                                },
                                {
                                    value: 'lucy',
                                    label: ' Audio materiallar',
                                },
                                {
                                    value: 'Yiminghe',
                                    label: 'Shablon materiallar',
                                },
                                {
                                    value: 'Yiminghe',
                                    label: 'Video materiallar',
                                },
                            ]}
                        />
                        <span className="d-block p-2 mt-4 fw-bold ">
                            Buyurtma muddati
                        </span>
                        <DatePicker className="w-100  p-2" placement="" />
                        <span className="d-block p-2 fw-bold mt-4">
                            Buyurtma narxi
                        </span>
                        <Slider defaultValue={30} disabled={false} /></> : ''
                        }
                    </div>
                </div>
                <div className="col-md-9">
                    <div className=" px-3">
                        <div className="row pb-5">
                            {type === 'all' ? (
                                <div className="col-md-12">
                                    <DealCart type="apply" />
                                </div>
                            ) : (
                                <div className="col-md-12">
                                     <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                                   
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
