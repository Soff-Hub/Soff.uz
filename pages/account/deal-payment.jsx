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
import DealOrderPayment from '~/components/partials/account/DealOrderPayment';

function BuyingTraffic() {

    const breadCrumb = [
        {
            text: 'Asosiy Sahifa',
            url: '/',
        },
        {
            text: 'Barcha buyurtmalar',
            url: '/account/all-orders',
        },

        {
            text: "Buyurtmaga ariza berish uchun urinish sotib olish",
        },
    ];

    const { user } = useSelector((state) => state.auth);
    const [trafficList, setTrafficList] = useState([]);
    const [value, setValue] = useState(null)
    const [loading, setLoading] = useState(false)

    async function getTrafficList(token) {
        setLoading(false)
        const ItemsData = await GetRepository.getDealListData(token);
        if (ItemsData?.results) {
            setTrafficList(ItemsData?.results);
        }
        setLoading(true)
    }

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
                    <div className='py-5' style={{ display: 'flex', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
                        {loading ?
                            trafficList.map(el => (
                                <div
                                    key={el.id}
                                    style={{
                                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                        borderRadius: '12px',
                                        padding: '30px 20px 20px',
                                        flex: 0.25,
                                        textAlign: 'center'
                                    }}>
                                    <span className='text-secondary' style={{ fontSize: 16, fontWeight: 600 }}>Bir umrga</span>
                                    <h3 className='m-0' style={{ fontWeight: 600, color: '#00A44F' }}>{el.amount ? `${formatCurrency(el.amount)} so'm` : "Tekin"}</h3>
                                    <p style={{ color: 'orange', fontSize: 18, fontWeight: 600 }}>{addPeriodToThousands(el.count)} ta</p>

                                    <div style={{
                                        display: 'flex',
                                        width: '100%',
                                        outline: 'none',
                                        border: 'none',
                                        justifyContent: 'center',
                                        gap: '4px'
                                    }}>
                                        {el?.id === value ?
                                            <button
                                                style={{
                                                    flex: 1,
                                                    border: 'none',
                                                    padding: '10px 0',
                                                    borderRadius: 10,
                                                    fontWeight: 600,
                                                    minWidth: '100%'
                                                }}
                                            >
                                                Olindi
                                            </button>
                                            :

                                            <button
                                                style={{
                                                    flex: 1,
                                                    border: 'none',
                                                    padding: '10px 0',
                                                    borderRadius: 10,
                                                    fontWeight: 600,
                                                    minWidth: '100%'
                                                }}
                                                onClick={() => setValue(el.id)}
                                            >
                                                Sotib Olish
                                            </button>}
                                    </div>
                                </div>



                            )) :
                            Array(4).fill(0).map((_, index) => (
                                <div key={index} class="card" aria-hidden="true" style={{
                                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                                    borderRadius: '12px',
                                    padding: '30px 20px 20px',
                                    flex: 0.25,
                                    textAlign: 'center'
                                }}>
                                    <div class="card-body">
                                        <p class="card-text placeholder-glow">
                                            <span class="placeholder col-4"></span>

                                        </p>
                                        <a class="btn btn-secondary py-1 disabled placeholder col-10 mb-2" aria-disabled="true"></a>
                                        <p class="card-text placeholder-glow">
                                            <span class="placeholder col-8"></span>

                                        </p>
                                        <a class="btn btn-secondary py-2 disabled placeholder col-12" aria-disabled="true"></a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                    {value && <DealOrderPayment quantity={value} />}
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
