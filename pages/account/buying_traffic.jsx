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
import { formatCurrency } from '~/utilities/product-helper';
import BuyTrafficCard from '~/components/partials/account/BuyTrafficCard';

function BuyingTraffic() {

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: "Video yuklash uchun xotira sotib olish",
        },
    ];

    const { user } = useSelector((state) => state.auth);
    const [trafficList, setTrafficList] = useState([]);
    const [value, setValue] = useState(null)

    async function getTrafficList(token) {
        const ItemsData = await GetRepository.getTrafficListData(token);
        if (ItemsData) {
            setTrafficList(ItemsData);
        }
    }

    const data = trafficList?.map(el => ({ id: el.id, price: el.price_storage, storage: el.size_storage_to_mb }))

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    const add = (id) => {
        const element = data.find(el => el.id === id)
        if (value?.id === element.id) {
            setValue({
                id: element.id,
                count: value?.count + 1
            })
        } else {
            setValue({
                id: element.id,
                count: 1
            })
        }
    }

    const remove = (id) => {
        if (value?.count > 1) {
            setValue({
                id: id,
                count: value?.count - 1
            })
        } else {
            setValue(null)
        }
    }

    const allValue = value ? {
        price: data.find(el => el.id === value?.id).price * value.count,
        storage: data.find(el => el.id === value?.id).storage,
        storageId: data.find(el => el.id === value?.id).id,
        count: value.count,
    } : null


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
                    <div className='py-5' style={{ display: 'flex', justifyContent: 'flex-start', gap: 10, flexWrap: 'wrap' }}>
                        {
                            data.map(el => (
                                <div
                                    key={el.id}
                                    style={{
                                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                        borderRadius: '12px',
                                        padding: '30px 20px 20px',
                                        flex: 0.25,
                                        textAlign: 'center'
                                    }}>
                                    <h3 className='m-0' style={{ fontWeight: 600, color: '#00A44F' }}>{el.price ? `${formatCurrency(el.price)} so'm` : "Tekin"}</h3>
                                    <p style={{ color: 'orange', fontSize: 18, fontWeight: 600 }}>{addPeriodToThousands(el.storage)} MB</p>

                                    <div style={{
                                        display: 'flex',
                                        width: '100%',
                                        outline: 'none',
                                        border: 'none',
                                        justifyContent: 'center',
                                        gap: '4px'
                                    }}>
                                        {
                                            value?.id === el.id ? (
                                                <>
                                                    <button
                                                        style={{
                                                            flex: 0.2,
                                                            border: 'none',
                                                            padding: '10px 0',
                                                            borderRadius: 10,
                                                            fontWeight: 600
                                                        }}
                                                        onClick={() => remove(el.id)}
                                                    >
                                                        <i class="fa-solid fa-minus"></i>
                                                    </button>
                                                    <button
                                                        style={{
                                                            flex: 0.6,
                                                            border: 'none',
                                                            padding: '10px 0',
                                                            borderRadius: 10,
                                                            fontWeight: 600
                                                        }} >
                                                        <span>{value?.count}</span>
                                                    </button>
                                                    <button
                                                        style={{
                                                            flex: 0.2,
                                                            border: 'none',
                                                            padding: '10px 0',
                                                            borderRadius: 10,
                                                            fontWeight: 600
                                                        }}
                                                        onClick={() => add(el.id)}
                                                    >
                                                        <i class="fa-solid fa-plus"></i>
                                                    </button>
                                                </>
                                            ) : <button
                                                style={{
                                                    flex: 1,
                                                    border: 'none',
                                                    padding: '10px 0',
                                                    borderRadius: 10,
                                                    fontWeight: 600,
                                                    minWidth: '100%'
                                                    // color: 'white',
                                                }}
                                                onClick={() => add(el.id)}
                                            >
                                                Sotib Olish
                                            </button>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    {value && <strong className="fs-3">Kalkulyator: {allValue.count}x <span style={{ color: 'orange', fontWeight: 600 }}>{addPeriodToThousands(allValue.storage)} MB </span> = <span style={{ color: 'orange', fontWeight: 600 }}>{addPeriodToThousands(allValue.storage * allValue.count)} MB </span> va <span style={{ color: '#00A44F', fontWeight: 600 }}>{formatCurrency(allValue.price)} so'm </span></strong>}
                    {value && <BuyTrafficCard quantity={allValue.count} traffic={allValue.storageId} />}
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
