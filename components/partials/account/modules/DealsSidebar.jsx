import { DatePicker, Select, Slider } from 'antd';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';



const DealsSidebar = ({ setType, setLifetime, setLifetime2, setProgressPrice }) => {
    const { asPath } = useRouter();
    const { user } = useSelector((state) => state.auth);
    const [dealType, setDealType] = useState(null);
    const { RangePicker } = DatePicker;
    const [price, setPrice] = useState(null);
    const [webdata, setWebData] = useState(null);
    const [socket, setSocket] = useState(null);
    const [keyword, setKeyword] = useState('');




    const handleChange = (date) => {
        if (date?.[0]) {
            setLifetime(date[0].format('YYYY-MM-DD'));
            setLifetime2(date[1].format('YYYY-MM-DD'));
        } else {
            setLifetime(null);
            setLifetime2(null);
        }
    };


    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }


    async function getDealType() {
        const data = await GetRepository.getDealType(keyword);
        if (data?.results) {
            setDealType(data?.results);
        }
    }

    const onSearch = async (value) => {
        setKeyword(value)
    };

    function handleChangeCategory(value) {
        for (let i = 0; i < dealType.length; i++) {
            if (dealType[i].name === value) {
                setType(dealType[i].id);
            }
        }
    }



    useEffect(() => {
        getDealType();
    }, [keyword]);

    async function getDealPrice() {
        const data = await GetRepository.getDealTypePriceRange();
        if (data) {
            setPrice(data);
        }
    }

    useEffect(() => {
        getDealPrice()
    }, []);


    const sidebarMenu = [
        {
            url: '/account/all-orders',
            label: 'Barcha buyurtmalar',
        },
        {
            url: '/account/deal-applications',
            label: 'Men yuborgan arizalar',
        },
        {
            url: '/account/my-orders',
            label: 'Mening buyurtmalarim',
        },
        {
            url: '/account/applications-received',
            label: 'Kelib tushgan arizalar',
        }
    ]
    const sidebarMenuToken = [
        {
            url: '/account/all-orders',
            label: 'Barcha buyurtmalar',
        }
    ]



    useEffect(() => {
        const token = user?.access;
        if (token) {
            const ws = new WebSocket(
                `${process.env.NEXT_PUBLIC_WS_BASE_URL}ws/deals?token=${token}`
            );
            setSocket(ws);

            ws.onopen = () => {
                console.log('WebSocket connection established');
            };

            ws.onmessage = (event) => {
                setWebData(JSON.parse(event?.data));
            };

            ws.onclose = () => {
                console.log('WebSocket connection closed');
            };

            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };

            // Clean up on unmount
            return () => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.close();
                }
            };
        }
    }, [user?.access]);


    useEffect(() => {
        if (socket) {
            socket.onmessage = (event) => {
                setWebData(JSON.parse(event?.data));
            };
        }
    }, [socket]);




    return (
        <div className="w-100 ">
            <div className="p-3 bg-white mb-4">
                <h4 className="d-block p-2 fw-bold">
                    Buyurtmalar
                </h4>
                <div className='sidebar-menu d-flex flex-column ml-2'>

                    {
                        user?.access ?
                            sidebarMenu.map(el => (
                                <div
                                    key={el.url}
                                    className='py-3 px-3 d-flex justify-content-between'
                                    onClick={() => Router.push(el.url)}
                                    style={{
                                        borderLeft: (el.url === asPath || asPath === "/account/all-orders?show=modal") ? '3px solid #28a745' : '0',
                                        backgroundColor: el.url === asPath ? 'rgba(40, 167, 69, 0.2)' : 'transparent',
                                        cursor: 'pointer'
                                    }}>
                                    {el.label}
                                    {
                                        (el.url === "/account/deal-applications" && webdata?.sent_applications > 0) ?
                                            <strong
                                                className="text-white bg-warning fs-5"
                                                style={{
                                                    width: "22px",
                                                    height: "22px",
                                                    borderRadius: "50%",
                                                    display: "grid",
                                                    placeContent: "center"
                                                }}
                                            >
                                                {webdata?.sent_applications}
                                            </strong> : <></>
                                    }

                                    {
                                        (el.url === "/account/applications-received" && webdata?.received_applications > 0) ?
                                            <strong
                                                className="text-white bg-warning fs-5"
                                                style={{
                                                    width: "22px",
                                                    height: "22px",
                                                    borderRadius: "50%",
                                                    display: "grid",
                                                    placeContent: "center"
                                                }}
                                            >
                                                {webdata?.received_applications}
                                            </strong> : <></>
                                    }


                                </div>
                            )) :
                            sidebarMenuToken.map(el => (
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
                <span className="d-block px-2 text-success fw-bold ">
                    <i class="fa-solid fa-sliders"></i> Filterlash
                </span>

                <span className="d-block p-2  fw-bold ">
                    Buyurtma turlari
                </span>
                <Select
                    mode="single"
                    showSearch
                    className='p-0 w-100 '
                    allowClear
                    style={{ height: "43px" }}
                    placeholder="Barcha turlar"
                    onSearch={onSearch}
                    onChange={handleChangeCategory}
                >
                    <Option key={""} value={""}>Barcha turlar</Option>
                    {dealType?.map(item => (
                        <Option key={item.id} value={item.name} >{item.name}</Option>
                    ))}
                </Select>

                <span className="d-block p-2 mt-4 fw-bold ">
                    Buyurtma muddati
                </span>
                <RangePicker
                    className="w-100 py-3   rounded-3"
                    onChange={handleChange}
                />


                {
                    (price?.min_price && price?.max_price) &&
                    (
                        <>
                            <span className="d-block p-2 fw-bold mt-4">
                                Buyurtma narxi
                            </span>
                            <Slider
                                range
                                defaultValue={[price?.min_price, price?.max_price]}
                                max={price?.max_price}
                                min={price?.min_price}
                                onChange={(e) => setProgressPrice(e)}
                            />

                            <p>
                                Narx:{' '}
                                {addPeriodToThousands(price?.min_price)}{' '}

                                so'm -{' '}
                                {addPeriodToThousands(price?.max_price)}{' '}
                                so'm
                            </p>


                        </>
                    )

                }
            </div>}
        </div>
    )
}

export default DealsSidebar
