import Axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { orginalUrl } from '~/reositoriy-admin/Repository'
import { formatCurrencyWithSpace } from '~/utilities/product-helper'

export default function TopSellersHome() {
    const [sellers, setSellers] = useState([])
    const [self, setSelf] = useState(null)

    const getSellers = async () => {
        const token = localStorage.getItem('user')
        const resp = (await Axios.get(`${orginalUrl}customer/top-sellers/`, {
            headers: {
                Authorization: token ? `Bearer ${JSON.parse(token)?.access}` : ''
            }
        })).data
        setSellers(resp?.slice(0, 9));
        // setSelf(resp[9])
        // setSellers(resp);
    }

    console.log(self);


    useEffect(() => {
        getSellers()
    }, [])

    return (
        <div>
            <h3 className='l-top-sellers-title'>Top sotuvchilar</h3>
            <div className='l-top-sellers-list'>
                {
                    sellers.map((el, i) => (
                        <div className="l-top-sellers-item seller-card" key={el.id}>
                            <div className="seller-card-header">
                                <img className='seller-card-img' src={el?.seller?.image || 'https://soff.uz/static/img/ozodbek.png'} alt="top seller" />
                                <div className="seller-card-info">
                                    <h4 className='seller-card-name text-truncate'>{el?.seller?.full_name}</h4>
                                    <p className='seller-card-text'>{formatCurrencyWithSpace(1200000)} uzs/oy</p>
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
                    ))
                }
            </div>
            <div className="self-seller">
                {self ? <div className="l-top-sellers-item seller-card">
                    <div className="seller-card-header">
                        <img className='seller-card-img' src={self?.seller?.image || 'https://soff.uz/static/img/ozodbek.png'} alt="top seller" />
                        <div className="seller-card-info">
                            <h4 className='seller-card-name text-truncate'>{self?.seller?.full_name}</h4>
                            <p className='seller-card-text'>{formatCurrencyWithSpace(1200000)} uzs/oy</p>
                        </div>
                    </div>
                    <div className="seller-card-body">
                        <div className="seller-card-subitem">
                            <p className='seller-card-subtitle'>Umumiy daromad</p>
                            <p className='seller-card-subtext'>{formatCurrencyWithSpace(self?.total_income)} uzs</p>
                        </div>

                        <div className="seller-card-line"></div>
                        <span className='score-of-seller'>{222}</span>
                    </div>
                </div> : ''}

                {!self ? <div className="l-top-sellers-item seller-card">
                    <div className="seller-card-header">
                        <img className='seller-card-img' src={'https://soff.uz/static/img/ozodbek.png'} alt="top seller" />
                        <div className="seller-card-info">
                            <h4 className='seller-card-name text-truncate'>Buyerda siz bo'ling</h4>
                            <p className='seller-card-text'>{formatCurrencyWithSpace(1200000)} uzs/oy</p>
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
                </div> : ''}
            </div>
        </div>
    )
}
