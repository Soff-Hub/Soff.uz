import React, { useEffect, useState } from 'react';
import { Avatar, List, Modal, Space } from 'antd';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { orginalUrl } from '~/reositoriy-admin/Repository';
import MarketingSellingHistoryChart from './MarketingSellingHistoryChart';
import { formatCurrency } from '~/utilities/product-helper';
import { useRouter } from 'next/router';
import { DollarOutlined, EyeOutlined, CheckCircleOutlined } from '@ant-design/icons';
import ModalDeletePostEdit from '../ModalPostEdit';
import PatchRepository from '~/reositoriy-admin/PatchRepository';
import RejectOfferModal from '../RejectOfferModal';

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


    const [data, setData] = useState([])
    const [price, setPrice] = useState({
        title: 'Mahsulotlar',
        series: [],
        labels: []
    })

    const getData = async () => {
        const resp = await Axios.get(orginalUrl + `seller/marketing/`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            }
        })
        setData(resp.data);
    }

    const getPrice = async () => {
        const resp = await Axios.get(orginalUrl + `seller/marketing/price-chart/`, {
            headers: {
                Authorization: `Bearer ${user?.access}`
            },
            params: { ...query }
        })
        let series = resp.data?.map(el => Math.floor(el.percentage))
        let labels = resp.data?.map(el => `${formatCurrency(el?.min_price)}${el?.max_price >= 1000000 ? ' va undan yuqori' : ' - ' + formatCurrency(el?.max_price)}`)
        setPrice({
            title: price.title,
            series,
            labels
        });
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
        getPrice()
    }, [query])

    return (
        <div className='mt-5'>
            <div className='d-flex gap-5'>
                <div className='p-5 bg-white w-50' style={{ border: '1px solid gold' }}>
                    <div>
                        <h3 className='fw-medium mb-5'>Mahsulotingiz sotuvi oshishi uchun Soff.uz taklifi</h3>
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
                                        title={<Link href={`/product/${item.slug}`}>{item.doc_title}</Link>}
                                        description={item?.title}
                                        style={{ borderBlock: 'none' }}
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
                            <p>Statistikani shakllantirish uchun ma'lumot yetarli emas</p>
                        </div>}
                    </div>
                </div>
                <div className='w-50 p-5 bg-white d-flex flex-column'>
                    <div>
                        <h3 className='fw-medium mb-5'>Sotilgan Mahsulotlarning o'rtacha narxi</h3>
                    </div>
                    <MarketingSellingHistoryChart config={price} />
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