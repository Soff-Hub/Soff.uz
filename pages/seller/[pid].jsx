import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import { baseUrl } from '~/repositories/Repository';
import Product from '~/components/elements/products/Product';
import Meta from '~/components/shared/headers/Meta';

const SellerPage = ({ seller }) => {
    const breadCrumb = [
        {
            text: 'Asosiy sahifa',
            url: '/',
        },
        {
            text: seller?.results[0]
                ? seller?.results[0]?.seller?.first_name
                : 'Loading...',
        },
    ];
    console.log('seller', seller);
    // let productView = <SkeletonProductDetail />;
    return (
        <PageContainer>
            <BreadCrumb breacrumb={breadCrumb} layout="fullwidth" />
            <Meta
                title={`Soff | Sotuvchi ${seller?.results[0]?.seller?.first_name} ${seller?.results[0]?.seller?.last_name}`}
                description={`Saytimizga o'z mahsulotlarini sotuvga qo'yayotgan ${seller?.results[0]?.seller?.first_name} ${seller?.results[0]?.seller?.last_name}ning barcha mahsulotlarini ko'rishingiz mumkin`}
            />

            <div className="ps-product-list mb-5">
                <div className="container">
                    <div className="document-seller-about my-5 ">
                        <div style={{ textAlign: 'center' }}>
                            {seller?.results[0]?.seller?.image_url ? (
                                <img
                                    alt="soff"
                                    src={`${seller?.results[0]?.seller?.image_url}`}
                                    className="profile__image"
                                />
                            ) : (
                                <i className=" fa-3x text-info fa-solid fa-circle-user"></i>
                            )}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                            <h4>
                                {seller?.results[0]?.seller?.first_name}{' '}
                                {seller?.results[0]?.seller?.last_name}{' '}
                            </h4>
                            <span>
                                Jami mahsulotlar soni -{' '}
                                <h4 style={{ display: 'inline' }}>
                                    {seller?.count}
                                </h4>{' '}
                                ta
                            </span>
                        </div>
                    </div>

                    <div className="row">
                        {seller?.results?.map((item, index) => (
                            <div
                                className="home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6"
                                key={item.id}>
                                {' '}
                                <Product product={item} />{' '}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </PageContainer>
    );
};

export async function getServerSideProps({ query }) {
    const resquest = await fetch(
        baseUrl + `customer/documents/?seller__id=${query.pid}`
    );
    const seller = await resquest.json();

    return {
        props: {
            seller,
        },
    };
}

export default SellerPage;
