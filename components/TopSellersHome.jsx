import { Skeleton } from 'antd'
import Axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { orginalUrl } from '~/reositoriy-admin/Repository'
import { formatCurrencyWithSpace } from '~/utilities/product-helper'
import useResponsive from '~/utilities/useResponsive'

export default function TopSellersHome() {
    const [sellers, setSellers] = useState([])
    const [self, setSelf] = useState(null)
    const [full, setFull] = useState(false)
    const { isMobile } = useResponsive()

    const getSellers = async () => {
        const token = localStorage.getItem('user')
        const resp = (await Axios.get(`${orginalUrl}customer/top-sellers/`, {
            headers: {
                Authorization: token ? `Bearer ${JSON.parse(token)?.access}` : ''
            }
        })).data
        setSellers(resp?.data);
        setSelf(resp?.user_data)
    }

    useEffect(() => {
        getSellers()
    }, [])

    return (
        <div>
            <h3 className='l-top-sellers-title'>Top sotuvchilar</h3>
            <div className={`l-top-sellers-list ${full ? '' : 'l-top-sellers-full'}`}>
                {
                    sellers.length > 0 ? sellers.map((el, i) => (
                        <div className="l-top-sellers-item seller-card" key={el.id}>
                            <div className="seller-card-header">
                                <img className='seller-card-img' src={el?.seller?.image || `https://robohash.org/${el?.seller?.id}?bgset=bg1`} alt="top seller" />
                                <div className="seller-card-info">
                                    <h4 className='seller-card-name text-truncate'>
                                        <Link href={`https://soff.uz/seller/${el?.seller?.id}`}>
                                            <a target='blank'>{el?.seller?.full_name}</a>
                                        </Link>
                                    </h4>
                                    <p className='seller-card-text'>{formatCurrencyWithSpace(el?.top_income)} uzs/oy</p>
                                </div>
                            </div>
                            <div className="seller-card-body">
                                <div className="seller-card-subitem">
                                    <p className='seller-card-subtitle'>Umumiy daromad</p>
                                    <p className='seller-card-subtext'>{formatCurrencyWithSpace(el?.total_income)} uzs</p>
                                </div>

                                <div className="seller-card-line"></div>

                                <div className="seller-card-subitem">
                                    <p className='seller-card-subtitle'>Jami mahsulotlari</p>
                                    <p className='seller-card-subtext'>{el?.total_approved_documents} ta</p>
                                </div>

                                <span className='score-of-seller'>{i + 1}</span>
                            </div>
                        </div>
                    )) : Array(9).fill(1).map((el, i) => (
                        <Skeleton
                            key={i * el}
                            className='l-top-sellers-item seller-card'
                            avatar
                            active
                            paragraph={{
                                rows: 2,
                            }}
                        />
                    ))
                }

                {self?.seller && !isMobile ? <div className="l-top-sellers-item seller-card self-seller-seller-card">
                    <div className="seller-card-header">
                        <img className='seller-card-img' src={self?.seller?.image || 'https://soff.uz/static/img/ozodbek.png'} alt="top seller" />
                        <div className="seller-card-info">
                            <h4 className='seller-card-name text-truncate'>{self?.seller?.full_name}</h4>
                            <p className='seller-card-text'>{formatCurrencyWithSpace(self?.top_income)} uzs/oy</p>
                        </div>
                    </div>
                    <div className="seller-card-body">
                        <div className="seller-card-subitem">
                            <p className='seller-card-subtitle'>Umumiy daromad</p>
                            <p className='seller-card-subtext'>{formatCurrencyWithSpace(self?.total_income)} uzs</p>
                        </div>

                        <div className="seller-card-line"></div>
                        <span className='score-of-seller'>{self?.order + 1}</span>
                    </div>
                </div> : ''}

                {!self?.seller && !isMobile ? sellers.length ? <div className="l-top-sellers-item seller-card self-seller-seller-card">
                    <div className="seller-card-header">
                        <img className='seller-card-img' src={self?.seller?.image || 'https://soff.uz/static/img/ozodbek.png'} alt="top seller" />
                        <div className="seller-card-info">
                            <h4 className='seller-card-name'>Top sotuvchilar qatoriga qo'shiling</h4>
                            <p className='seller-card-text'>{formatCurrencyWithSpace(2400100)} uzs/oy</p>
                        </div>
                    </div>
                    <div className="seller-card-body">
                        <div className="seller-card-subitem w-100">
                            <Link href={'/account/register'}>
                                <a className='hero-btn' aria-label='become a seller'>
                                    <span className='btn-inner'>Sotuvchi bo'lish</span>

                                    <span className='right-up-icon'>
                                    </span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div> : <Skeleton
                    className='l-top-sellers-item seller-card self-seller-seller-card'
                    avatar
                    active
                    paragraph={{
                        rows: 2,
                    }}
                /> : ''}

                {!full && <div className="l-top-sellerlist-nav " onClick={() => setFull(true)}>
                    Top 9talikni to'liq ko'rish
                </div>}
            </div>
            <div className="self-seller">
                {self?.seller && isMobile ? <div className="l-top-sellers-item seller-card">
                    <div className="seller-card-header">
                        <img className='seller-card-img' src={self?.seller?.image || 'https://soff.uz/static/img/ozodbek.png'} alt="top seller" />
                        <div className="seller-card-info">
                            <h4 className='seller-card-name text-truncate'>{self?.seller?.full_name}</h4>
                            <p className='seller-card-text'>{formatCurrencyWithSpace(self?.top_income)} uzs/oy</p>
                        </div>
                    </div>
                    <div className="seller-card-body">
                        <div className="seller-card-subitem">
                            <p className='seller-card-subtitle'>Umumiy daromad</p>
                            <p className='seller-card-subtext'>{formatCurrencyWithSpace(self?.total_income)} uzs</p>
                        </div>

                        <div className="seller-card-line"></div>
                        <span className='score-of-seller'>{self?.order + 1}</span>
                    </div>
                </div> : ''}

                {!self?.seller && isMobile ? sellers?.length > 0 ? <div className="l-top-sellers-item seller-card">
                    <div className="seller-card-header">
                        <img className='seller-card-img' src={self?.seller?.image || 'https://soff.uz/static/img/ozodbek.png'} alt="top seller" />
                        <div className="seller-card-info">
                            <h4 className='seller-card-name'>Top sotuvchilar qatoriga qo'shiling</h4>
                            <p className='seller-card-text'>{formatCurrencyWithSpace(2400100)} uzs/oy</p>
                        </div>
                    </div>
                    <div className="seller-card-body">
                        <div className="seller-card-subitem w-100">
                            <Link href={'/account/register'}>
                                <a className='hero-btn' aria-label='become a seller'>
                                    <span className='btn-inner'>Sotuvchi bo'lish</span>

                                    <span className='right-up-icon'>
                                    </span>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div> : <Skeleton
                    className='l-top-sellers-item seller-card'
                    avatar
                    active
                    paragraph={{
                        rows: 2,
                    }}
                /> : ''}
            </div>
        </div>
    )
}
