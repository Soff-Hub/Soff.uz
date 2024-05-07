import React from 'react';
import { useSelector } from 'react-redux';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Page404 from '../page/page-404';
import LoginPage from './login';
import Meta from '~/components/shared/headers/Meta';
import { useEffect } from 'react';
import GetRepository from '~/reositoriy-admin/GetRepository';
import { useState } from 'react';
import { Table, Tag } from 'antd';
import CreditCard2 from '~/components/partials/account/CreditCard2';

function BuyingTraffic() {
    const { user } = useSelector((state) => state.auth);
    const [trafficList, setTrafficList] = useState(null);
    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: "Video uchun qo'shimcha joy sotib olish",
        },
    ];

    async function getTrafficList(token) {
        const ItemsData = await GetRepository.getTrafficListData(token);
        if (ItemsData) {
            setTrafficList(ItemsData);
        }
    }

    const columns = [
        {
            title: 'Nomi',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Hajmi',
            dataIndex: 'size_storage_to_mb',
            key: 'size_storage_to_mb',
            render: (size) => (
                <Tag color="red" key={size}>
                    {size} {size ? 'mb' : ''}
                </Tag>
            ),
        },
        {
            title: 'Narxi',
            dataIndex: 'price_storage',
            key: 'price_storage',
            render: (text) => <a>{text} so'm </a>,
        },

        {
            title: 'Harakatlar',
            key: 'id',
            render: (_, id) => (
                <div
                    className="bg-info d-inline p-3 text-white rounded-3"
                    style={{ cursor: 'pointer' }}>
                    Sotib olish <i class="fa-solid fa-plus"></i>
                </div>
            ),
        },
    ];

    useEffect(() => {
        if (user?.access) {
            getTrafficList(user?.access);
        }
    }, [user?.access]);

    return user?.role === 'seller' || user?.role === 'customer' ? (
        <PageContainer
            footer={<FooterDefault />}
            title="Recent Viewed Products">
            <div className="ps-page--my-account">
                <Meta title={'Yangi mahsulot yaratishni tanlash'} />
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container">
                    <div className="py-3">
                        Video uchun qo'shimcha joy sotib oling
                    </div>
                    <Table
                        className="py-5"
                        columns={columns}
                        dataSource={trafficList}
                        pagination={false}
                    />

                    <CreditCard2 document={[1]} />
                </div>
            </div>
        </PageContainer>
    ) : user?.access ? (
        <Page404 />
    ) : (
        <LoginPage />
    );
}

export default BuyingTraffic;
