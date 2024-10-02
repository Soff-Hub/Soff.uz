import React, { useEffect, useState } from 'react';
import { Avatar, List, Modal, Skeleton, Space } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { orginalUrl } from '~/reositoriy-admin/Repository';
import { useRouter } from 'next/router';
import { DollarOutlined, EyeOutlined } from '@ant-design/icons';
import ModalDeletePostEdit from '../ModalPostEdit';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import RejectOfferModal from '../RejectOfferModal';
import MarketingSelledProducts from './MarketingSelledProducts';
import { DotChartOutlined } from '@ant-design/icons';
import useResponsive from '~/utilities/useResponsive';

const IconText = ({ icon, text }) => (
    <Space className='view-count'>
        {React.createElement(icon)}
        {text}
    </Space>
);

const MarketingMyTopProducts = () => {
    const { user } = useSelector(state => state.auth)
    const { query } = useRouter()
    const [viewPriceDiscount, setViewPriceDiscount] = useState(0);
    const [id, setId] = useState(null);
    const [loading, setLoading] = useState(false)
    const { isMobile } = useResponsive()


    const [documents, setDocuments] = useState([])
    const [data, setData] = useState([])

    const getData = async () => {
        const resp = await Axios.get(orginalUrl + `seller/marketing/`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            }
        })
        setData(resp.data);
    }

    const getDocuments = async () => {
        setLoading(true)
        try {
            const resp = await Axios.get(orginalUrl + `seller/marketing/top-documents/`, {
                headers: {
                    Authorization: `Bearer ${user?.access}`
                },
                params: { ...query }
            })
            setDocuments(resp.data);
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    }

    const handleHide = async () => {
        try {
            await Axios.patch(orginalUrl + `seller/marketing/update/${id}/`, {}, {
                headers: {
                    Authorization: `Bearer ${user?.access}`
                }
            })
            await getData()
        } catch (err) {
            console.log(err);
        }
    }

    const updatePrice = async () => {
        const formData = new FormData();
        formData.append('price', viewPriceDiscount);

        await PatchRepository.getMyProductsPatch(
            formData,
            id,
            user?.access
        );
        const modal = Modal.success({
            centered: true,
            title: 'Muvaffaqqiyatli!',
            content: 'Mahsulotingiz narxi yangilandi',
        });
        await getData()
        setViewPriceDiscount(0)
    }

    useEffect(() => {
        getData()
        getDocuments()
    }, [query])

    return (
        <div className='mt-5'>
            <div className={`d-flex gap-5 justify-content-between flex-${isMobile ? 'column' : 'row'}`}>
                <div className={`w-${isMobile ? '100' : '50'} p-3 bg-white`} style={{ border: '1px solid gold' }}>
                    <div>
                        <h4 className='fw-medium mb-5 text-center'>Mahsulotingiz narxini o'zgartirish bo'yicha taklif</h4>
                    </div>
                    <div style={{ position: 'relative' }}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={false}
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                    className='px-0 mb-4'
                                    style={{ position: 'relative', backgroundColor: '#F8EDE3', border: 'none', }}
                                >
                                    <List.Item.Meta
                                        className='mb-3 px-4 pt-3'
                                        avatar={<Avatar style={{ border: '1px solid gray', padding: '5px' }} src={'/static/img/soff logo.png'} />}
                                        title={<Link href={`https://soff.uz/product/${item.slug}`}>
                                            <a target='black'>
                                                {item.doc_title}
                                            </a>
                                        </Link>}
                                        description={item?.title}
                                        style={{ borderBlock: 'none', fontSize: '12px' }}
                                    />
                                    <a
                                        data-bs-target='#exampleModalMyProductsPrice'
                                        data-bs-toggle="modal"
                                        className='offer-close'
                                        style={{ position: 'absolute', top: 5, right: 32, cursor: 'pointer' }}
                                        onClick={() => (setId(item?.id), setViewPriceDiscount(item?.price))}
                                    >
                                        <i class="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <a
                                        data-bs-target='#rejectOfferModal'
                                        data-bs-toggle="modal"
                                        onClick={() => setId(item?.id)}
                                        className='offer-close'
                                        style={{ position: 'absolute', top: 7, right: 9, cursor: 'pointer' }}
                                    >
                                        <i class="fa-solid fa-xmark fs-3"></i>
                                    </a>
                                    {item.content}
                                    <div className='px-4 w-100 d-flex justify-content-end gap-3 text-secondary'>
                                        <IconText icon={EyeOutlined} text={item?.view_count} key="list-vertical-star-o" />
                                        <IconText icon={DollarOutlined} text={`${item?.sold_count} ta sotuv`} key="list-vertical-like-o" />
                                        {/* <IconText icon={CheckCircleOutlined} text={`har ${Math.ceil(item?.view_per_sold)} ta ko'rishda bitta sotuv`} key="list-vertical-like-o" /> */}
                                    </div>
                                </List.Item>
                            )}
                        />
                        {data?.length ? '' : <div className='chart-blur'>
                            <p>Hozircha sizga hech qanday takliflarimiz yo'q</p>
                        </div>}
                    </div>
                </div>
                <div className={`w-${isMobile ? '100' : '50'} py-4 px-3 bg-white d-flex flex-column`}>
                    <div>
                        <h4 className='fw-medium mb-5 text-center'>Soha bo'yicha eng ko'p sotilgan mahsulotlar</h4>
                    </div>
                    {loading ? (
                        <div className='d-flex flex-column gap-4 h-100'>
                            <Skeleton.Node
                                style={{ width: '100%', height: '340px' }}
                                className='mt-2'
                                active={true}>
                                <DotChartOutlined
                                    style={{
                                        fontSize: 40,
                                        color: '#bfbfbf',
                                    }}
                                />
                            </Skeleton.Node>
                        </div>
                    ) : <MarketingSelledProducts data={documents} />}
                </div>

                <ModalDeletePostEdit
                    dataBsTarget="exampleModalMyProductsPrice"
                    onSubmited={updatePrice}
                    formID="products-edit_price">
                    <label htmlFor="discount" className="form-label">
                        Hujjatingizni narxi
                        <input
                            id="discount"
                            onChange={(e) =>
                                setViewPriceDiscount(e.target.value)
                            }
                            value={viewPriceDiscount}
                            type="number"
                            className="form-control rounded-3"
                            placeholder="Hujjatingizni narxi"
                        />
                    </label>
                </ModalDeletePostEdit>

                <RejectOfferModal
                    dataBsTarget="rejectOfferModal"
                    onSubmited={handleHide}
                    formID="products-edit_price">
                    <p className='text-center fs-2'>Taklifni rad etmoqchimisiz?</p>
                </RejectOfferModal>
            </div>
        </div>
    )
}
export default MarketingMyTopProducts;