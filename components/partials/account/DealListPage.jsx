import { DatePicker, Slider } from 'antd';
import React from 'react';
import DealCart from './modules/DealCart';

export default function DealListPage() {
    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-md-4">
                    <div className="border border-3 p-3">
                        <ul className="p-0 m-0">
                            <li className="list-unstyled border border-3 rounded-3 px-3 py-2 fs-3 my-3">
                                Fayl materiallar
                            </li>
                            <li className="list-unstyled border border-3 rounded-3 px-3 py-2 fs-3 my-3">
                                Audio materiallar
                            </li>
                            <li className="list-unstyled border border-3 rounded-3 px-3 py-2 fs-3 my-3">
                                Shablon materiallar
                            </li>
                            <li className="list-unstyled border border-3 rounded-3 px-3 py-2 fs-3 my-3">
                                Video materiallar
                            </li>
                        </ul>
                        <DatePicker className="w-100 my-4 p-4" placement="" />
                        <Slider defaultValue={30} disabled={false} />
                    </div>
                </div>
                <div className="col-md-8">
                    <div className=" p-3">
                        <h3>Buyurtmalar listi</h3>
                        <div className="row py-3 pb-5">
                            <div className="col-md-12">
                                <DealCart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
