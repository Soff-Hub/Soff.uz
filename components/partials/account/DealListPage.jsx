import { DatePicker, Select, Slider, Space } from 'antd';
import React from 'react';
import DealCart from './modules/DealCart';

export default function DealListPage() {
    return (
        <div className="container">
            <div className="row my-4">
            <h3 className='p-4' >Buyurtmalar ro'yxati</h3>
                <div className="col-md-3">
                    <div className="border border-3 p-3">
                        <span className="d-block p-2 fw-bold ">
                            Buyurtmalar
                        </span>
                        <Select
                            defaultValue="jack"
                            style={{
                                width: '100%',
                            }}
                            size="large"
                            className="w-100"
                            // onChange={handleChange}
                            options={[
                                {
                                    value: 'jack',
                                    label: 'Barchasi',
                                },
                                {
                                    value: 'lucy',
                                    label: 'Ariza topshirilganlar',
                                },
                            ]}
                        />
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
                        <Slider defaultValue={30} disabled={false} />
                    </div>
                </div>
                <div className="col-md-9">
                    <div className=" px-3">
                       
                        <div className="row pb-5">
                            <div className="col-md-12">
                                <DealCart type='apply' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
