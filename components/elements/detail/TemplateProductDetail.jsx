import React, { useState } from 'react';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import Link from 'next/link';
import TemplateModuleProductDetailDescription from './modules/TemplateModuleProductDetailDescription';
import TemplateModuleDetailShoppingActions from './modules/TemplateModuleDetailShoppingActions';
import { useRouter } from 'next/router';
import { EyeFilled } from '@ant-design/icons';
import { message } from 'antd';
import BuyBtnScroll from './BuyBtnScroll';
import TemplateProductThumbnail from './TemplateProductThumbnail';
import ProductSellerInfo from './ProductSellerInfo';
import useResponsive from '~/utilities/useResponsive';
import ProductShoppingActions from './ProductShoppingActions';
import TemplateDetails from './TemplateDetails';

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
                        <ProductSellerInfo />
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

                        <TemplateProductThumbnail />

                        {/* <div className="views">
                            {' '}
                            <i className="fa-solid fa-eye"></i> <span>{product?.views}</span>
                        </div> */}

                        {hoverImg && product?.demo_link && <div className='rounded-3' style={{
                            position: "absolute",
                            inset: 0,
                            backgroundColor: "#333",
                            opacity: "0.7",
                        }}
                        >

                        </div>}
                        {hoverImg && product?.demo_link && <button
                            onClick={() => Router.push(product?.demo_link)}
                            onMouseEnter={() => setHoverImgButton(true)}
                            onMouseLeave={() => setHoverImgButton(false)}
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                backgroundColor: !hoverImgButton ? "transparent" : "#fff",
                                color: !hoverImgButton ? "#fff" : "#000",
                                border: "2px solid #dde3e6",
                                padding: "10px 30px",
                                borderRadius: "5px",
                                fontWeight: "600",



                            }}

                        > <strong
                            className='d-flex align-items-center justify-content-center gap-1'>
                                <EyeFilled style={{ fontSize: "17px" }} />Demoni ko'rish</strong></button>}

                    </div>
                </div>

                <div className="ps-product__info col-md-4 d-flex flex-column gap-3  ">

                    {/* <TemplateModuleDetailTopInformation product={product} /> */}
                    <ProductShoppingActions />
                    <TemplateDetails product={product} />

                    <TemplateModuleProductDetailDescription
                        product={product}
                        views={views}
                    />
                    <TemplateModuleDetailShoppingActions
                        product={product}
                        demo={product?.demo_link}
                    />

                </div>

                <p className=' fw-medium  p-0 ml-3 pb-2 mt-4 mt-md-5 ' style={{
                    fontFamily: "Work Sans, sans-serif",
                    fontSize: "16px",
                    color: "black",
                    maxWidth: "110px",
                    borderBottom: "2px solid #007bff"
                }}>Tezkor teglar</p>
                <div className="mb-4 d-flex justify-content-start align-content-center flex-wrap">
                    {product?.tag?.length > 0 &&
                        product?.tag.slice(0, 15).map((item, i) => (
                            <div key={i} className="m-2 " style={{
                                borderRadius: "20px",
                                padding: "8px 16px",
                                border: "1px solid #999",
                                fontSize: "15px"
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

            <DefaultDescription product={product} />


            <BuyBtnScroll />
        </div >

    );
};

export default TemplateProductDetail;
