import React, { useState } from 'react';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import Link from 'next/link';
import TemplateModuleProductDetailDescription from './modules/TemplateModuleProductDetailDescription';
import { useRouter } from 'next/router';
import { EyeFilled } from '@ant-design/icons';
import { message } from 'antd';
import BuyBtnScroll from './BuyBtnScroll';
import TemplateProductThumbnail from './TemplateProductThumbnail';
import ProductSellerInfo from './ProductSellerInfo';
import useResponsive from '~/utilities/useResponsive';
import ProductShoppingActions from './ProductShoppingActions';
import ProductShoopping from './ProductShopping';

const TemplateProductDetail = ({ product, views }) => {
    const Router = useRouter();
    const [copy, setCopy] = useState(false);
    const [hoverImg, setHoverImg] = useState(false);
    const [hoverImgButton, setHoverImgButton] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const { isMobile } = useResponsive()

    const infoSuccess = (url) => {
        messageApi.success(
            `Soff | Audio mahsulot dan nusxa ko\'chirildi (${url})`
        );
    };
    const infoError = (url) => {
        messageApi.error(
            `Soff | Audio mahsulot dan nusxa ko\'chirilmadi (${url})`
        );
    };

    const copyVideoUrl = () => {
        const videoUrl = `https://soff.uz${Router?.asPath}`;
        navigator.clipboard
            .writeText(videoUrl)
            .then(() => {
                setCopy(true);
                setTimeout(() => {
                    setCopy(false);
                }, 2500);
                infoSuccess(videoUrl);
                //   alert(`Video URL copied to clipboard! ${}`);
            })
            .catch((error) => {
                infoError(error);
                console.error('Error copying video URL: ', error);
                // alert('Error copying video URL!');
            });
    };

    return (
        <div className="ps-product--detail ps-product--fullwidth">
            {contextHolder}
            <div className="row pt-5">
                <h4
                    className='col-md-8 m-0 mb-3'
                    style={{
                        fontFamily: "PolySans, 'Inter', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Fira Sans', 'Helvetica Neue', 'Arial', sans-serif ",
                        fontSize: isMobile ? '20px' : "22px", marginBottom: "10px",
                        fontWeight: 500
                    }}>
                    {product?.title !== undefined ? product?.title : ''}
                </h4>
                <div className="col-md-4 mb-3">
                    <div className={`d-flex ${isMobile ? 'justify-content-start' : 'justify-content-end'} w-100`}>
                        <ProductSellerInfo data={product?.seller} />
                    </div>
                </div>
                <div className='col-md-8 ' id='get-buy'>
                    <div
                        onMouseEnter={() => setHoverImg(true)}
                        onMouseLeave={() => setHoverImg(false)}
                        className='w-100 mb-2 p-0'
                        style={{
                            position: "relative",
                            borderRadius: '8px'
                        }}

                    >
                        <div className='action-box d-flex flex-column gap-2' style={{ position: 'absolute', zIndex: 2, right: 10, display: 'flex', top: 10 }}>
                            <div
                                onClick={() => copyVideoUrl()}
                                className='bg-white d-flex align-items-center justify-content-center'
                                style={{ borderRadius: '50%', overflow: 'hidden', padding: '12px', border: '1px solid #00A44F', width: '35px', height: '35px' }}
                            >
                                {copy ? (
                                    <div className='text-center'>
                                        <i className="fa-solid fa-check"></i>
                                    </div>
                                ) : (
                                    <div style={{ cursor: "pointer" }} className='d-flex justify-content-center align-items-center'>
                                        <i className="fa-solid fa-share-nodes" style={{ marginRight: "5px" }}></i>
                                    </div>
                                )}
                            </div>
                        </div>

                        <TemplateProductThumbnail data={product?.document?.images?.map((el, i) => ({ id: i + 1, url: el?.image_url }))} />
                    </div>
                </div>

                <div className="ps-product__info col-md-4 d-flex flex-column gap-3  ">

                    {/* <TemplateModuleDetailTopInformation product={product} /> */}
                    <ProductShoppingActions product={product} />
                    {/* <TemplateDetails product={product} /> */}

                    <TemplateModuleProductDetailDescription
                        product={product}
                        views={views}
                    />
                    {/* <TemplateModuleDetailShoppingActions
                        product={product}
                        demo={product?.demo_link}
                    /> */}

                    <ProductShoopping product={product} demo={product?.demo_link} />

                    <p className='fw-medium fs-5 m-0' style={{
                        fontFamily: "Work Sans, sans-serif",
                        fontSize: "16px",
                        color: "black",
                        maxWidth: "80px",
                        borderBottom: "2px solid #007bff"
                    }}>
                        Tezkor teglar
                    </p>

                    <div className="mb-2 d-flex justify-content-start align-content-center flex-wrap gap-2">
                        {product?.tag?.length > 0 &&
                            product?.tag.slice(0, 15).map((item, i) => (
                                <div key={i} style={{
                                    borderRadius: "20px",
                                    padding: "2px 8px",
                                    border: "1px solid #ccc",
                                    fontSize: "13px"
                                }}>
                                    <Link href={`/search-page?keyword=${item?.name?.replace(/^#/, '')}`}>
                                        <a
                                        >
                                            {' '}
                                            {item.name}{' '}
                                        </a>
                                    </Link>
                                </div>
                            ))}
                    </div>

                </div>
            </div>

            <DefaultDescription product={product} />


            <BuyBtnScroll />
        </div >

    );
};

export default TemplateProductDetail;
