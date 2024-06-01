import { DatePicker, Select, Slider } from 'antd';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';


const DealsSidebar = ({ setType, setLifetime, setLifetime2 }) => {
    const { asPath } = useRouter();
    const { user } = useSelector((state) => state.auth);
    const [dealType, setDealType] = useState(null);
    const { RangePicker } = DatePicker;


    const handleChange = (date) => {
        if (date?.[0]) {
            setLifetime(date[0].format('YYYY-MM-DD'));
            setLifetime2(date[1].format('YYYY-MM-DD'));
        } else {
            setLifetime(null);
            setLifetime2(null);
        }
    };


    async function getDealType(token) {
        const data = await GetRepository.getDealType(token);
        if (data?.results) {
            setDealType(data?.results);
        }
    }

    useEffect(() => {
        if (user?.access) {
            getDealType(user?.access);
        }
    }, []);

    const optionType = dealType?.map((e) => ({
        label: e?.name,
        value: e?.id,
    }));





    const sidebarMenu = [
        {
            url: '/account/all-orders',
            label: 'Barcha buyurtmalar',
        },
        {
            url: '/account/deal-applications',
            label: 'Men yuborgan arizlar',
        },
        {
            url: '/account/my-orders',
            label: 'Mening buyurtmalarim',
        }
    ]

    return (
        <div className="w-100 mb-5">
            <div className="p-3 bg-white mb-4">
                <h4 className="d-block p-2 fw-bold">
                    Buyurtmalar
                </h4>
                <div className='sidebar-menu d-flex flex-column ml-2'>
                    {
                        sidebarMenu.map(el => (
                            <div
                                key={el.url}
                                className='py-3 px-3'
                                onClick={() => Router.push(el.url)}
                                style={{
                                    borderLeft: el.url === asPath ? '3px solid #28a745' : '0',
                                    backgroundColor: el.url === asPath ? 'rgba(40, 167, 69, 0.2)' : 'transparent',
                                    cursor: 'pointer'
                                }}>
                                {el.label}
                            </div>
                        ))
                    }
                </div>
            </div>
            {asPath === "/account/all-orders" && <div className="p-3 bg-white">
                <span className="d-block p-2 mt-4 fw-bold ">
                    Buyurtma turlari
                </span>
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

                <span className="d-block p-2 mt-4 fw-bold ">
                    Buyurtma muddati
                </span>
                <RangePicker
                    className="w-100 py-3   rounded-3"
                    onChange={handleChange}
                />


                <span className="d-block p-2 fw-bold mt-4">
                    Buyurtma narxi
                </span>
                <Slider range defaultValue={[20, 50]} disabled={false} />
            </div>}
        </div>
    )
}

export default DealsSidebar
