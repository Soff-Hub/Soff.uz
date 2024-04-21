import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import GetRepository from '~/reositoriy-admin/GetRepository';
var parse = require('html-react-parser');

export default function DonateList() {
    const [donate, setDonate] = useState(null);
    const { user } = useSelector((state) => state.auth);

    const getDonate = async (token) => {
        const respons = await GetRepository.getDonateList(token);
        if (respons) {
            setDonate(respons);
        }
    };

    useEffect(() => {
        if (user?.access) {
            getDonate(user?.access);
        }
    }, [user?.access]);

    console.log('donate list', donate);

    // const columnsOrdersSeller = [
    //     {
    //         title: 'Buyurtmachi',
    //         dataIndex: 'customer_info',
    //         key: 'age',
    //         render: (customer_info) => (
    //             <div className="d-flex flex-column">
    //                 <span className="truncate whitespace-nowrap">
    //                     {' '}
    //                     {customer_info.name}
    //                 </span>
    //                 {/* <span className="truncate whitespace-nowrap"> {customer_info.email_or_phone}</span> */}
    //             </div>
    //         ),
    //     },
    //     {
    //         title: 'Buyurtma nomi',
    //         dataIndex: 'document',
    //         key: 'age',
    //         width: 300,
    //         render: (document) => (
    //             <Link href={`/product/${document.slug}`}>
    //                 <a>{document.title}</a>
    //             </Link>
    //         ),
    //     },
    //     {
    //         title: 'Buyurtma sanasi',
    //         dataIndex: 'created_at',
    //         key: 'address',
    //         render: (created_at) => (
    //             <span>
    //                 {' '}
    //                 <i className="fa-solid fa-clock text-info-emphasis"></i>{' '}
    //                 <CalculateTimeDifference targetDate={created_at} />
    //             </span>
    //         ),
    //     },
    //     {
    //         title: 'Narx',
    //         dataIndex: 'price',
    //         key: 'address',
    //         render: (price) => (
    //             <span>
    //                 <i className="fa-solid fa-coins text-warning"></i>{' '}
    //                 {addPeriodToThousands(price)}
    //             </span>
    //         ),
    //     },
    //     {
    //         title: 'Holat',
    //         dataIndex: 'status',
    //         key: 'address',
    //         render: (status) => (
    //             <span>
    //                 {status === 'approved' ? (
    //                     <span>
    //                         <i className="fa-solid text-success fa-circle-check"></i>{' '}
    //                         tasdiqlangan
    //                     </span>
    //                 ) : (
    //                     <span>
    //                         <i className="fa-solid fa-circle-xmark text-danger"></i>{' '}
    //                         tasdiqlanganmagan
    //                     </span>
    //                 )}
    //             </span>
    //         ),
    //     },
    // ];

    return (
        <div className="ps-section--shopping ps-whishlist">
            <div className="container">
                <div className="ps-section__header">
                    <h1>Qo'llab quvvatlaganlar</h1>
                </div>
                <div className="ps-section__content">
                    <div className="alert alert-danger" role="alert">
                        Qo'llab quvvatlaganlar hozircha yo'q!
                    </div>

                    {/* <Table
                        scroll={{ x: 1150 }}
                        dataSource={dataOrders}
                        columns={columnsOrdersSeller}
                        pagination={false}
                    /> */}
                </div>
            </div>
        </div>
    );
}
