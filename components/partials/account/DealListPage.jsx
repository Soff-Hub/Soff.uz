import { DatePicker, Modal, Select, Slider, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import DealCart from './modules/DealCart';
import MyDealCart from './modules/MyDealCart';
import { useRouter } from 'next/router';
import axios from 'axios'
import { baseDomain } from '~/repositories/NewRepository';
import DealsList from './DealsList';


function DealListPage({ deals, tab }) {
    const [type, setType] = useState('all');
    const [data, setData] = useState(deals)
    const [open, setOpen] = useState(false)

    const { query, push } = useRouter()

    const sidebarMenu = [
        {
            tab: 'list',
            label: 'Barcha buyurtmalar',
        },
        {
            tab: 'my',
            label: 'Men yuborgan arizlar',
        },
        {
            tab: 'published',
            label: 'Mening buyurtmalarim',
        }
    ]


    const onChange = (key) => {
        console.log(key);
    };

    const items = [
        {
            key: '1',
            label: <span className="pr-4 fw-bolder fs-3 text-info ">Qabul qilingan</span>,
            children: (
                <>
                    <MyDealCart />
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

    let clearTextView,
        loadingView
    if (true) {

        clearTextView = <span className="ps-form__action position-absolute" style={{ right: '15px' }}>
            <i className='fa-solid fa-search button_search_icon text-success' ></i>
        </span>
    }

    const getList = async () => {
        const resp = await axios.get(`${baseDomain}deals/`)
        setData(resp.data)
    }

    useEffect(() => {
        getList()
    }, [])


    return (
        <div className="container">
           <div class="animated-border"></div>

            <div className="row my-4">
                <h3 className="my-4 px-4">{sidebarMenu.find(el => el.tab === tab)?.label}</h3>
                <div className='col-12 d-flex justify-content-between gap-4 mb-4'>
                    <div className={'ps-form__input d-flex align-items-center position-relative'} style={{ flex: 1 }}>
                        <input
                            className={'form-control input2 bg-white rounded-3 '}
                            type="text"
                            placeholder="Qidiruv..."
                        />
                        {clearTextView}
                        {loadingView}
                    </div>
                    <button className='col-md-2  btn btn-success rounded-3 fs-4'
                        onClick={() => setOpen(true)} >
                        Buyurtma yaratish
                    </button>
                </div>
                <div className="col-md-3">
                    <div className="p-3 bg-white mb-4">
                        <h4 className="d-block p-2 fw-bold">
                            Buyurtmalar
                        </h4>
                        <div className='sidebar-menu d-flex flex-column ml-2'>
                            {
                                sidebarMenu.map(el => (
                                    <div
                                        key={el.tab}
                                        className='py-3 px-3'
                                        onClick={() => push(`/account/deal-list/${el.tab}`)}
                                        style={{
                                            borderLeft: el.tab === tab ? '3px solid #28a745' : '0',
                                            backgroundColor: el.tab === tab ? 'rgba(40, 167, 69, 0.2)' : 'transparent',
                                            cursor: 'pointer'
                                        }}>
                                        {el.label}
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    {tab === "list" && <div className="p-3 bg-white">
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
                        <Slider range defaultValue={[20, 50]} disabled={false} />
                    </div>}
                </div>
                <div className="col-md-9">
                    <div className=" px-3">
                        <div className="row pb-5 g-4">
                            {tab === 'list' ? (
                                data?.results?.map(el => (
                                    <div className="col-md-12" key={el.id}>
                                        <DealCart {...el} type="apply" deal_type={el.type} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-md-12">
                                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                title="Buyurtma yaratish"
                width={550}
                centered
                open={open}
                onOk={() => setOpen(false)}
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

                onCancel={() => setOpen(false)}>

                <DealsList />
            </Modal>

        </div>
    );
}



export default DealListPage