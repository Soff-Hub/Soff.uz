import React from 'react';
import TemplateModuleProductDetailDescription from './modules/TemplateModuleProductDetailDescription';
import useResponsive from '~/utilities/useResponsive';
import TemplateProductThumbnail from './TemplateProductThumbnail';
import ProductSellerInfo from './ProductSellerInfo';
import ProductShoppingActions from './ProductShoppingActions';
import ProductShoopping from './ProductShopping';
import DefaultDescription from './description/DefaultDescription';
import { useSelector } from 'react-redux';

const TemplateProductDetail = ({ product = {}, views }) => {
    const { isMobile } = useResponsive()
    const { profile } = useSelector(state => state.ecomerce)
    console.log(product);

    return (
        <div className="ps-product--detail ps-product--fullwidth">
            <div className="row pt-">
                <h4
                    className='col-md-8 m-0 mb-3'
                    style={{
                        fontFamily: "PolySans, 'Inter', -apple-system, 'BlinkMacSystemFont', 'Segoe UI', 'Fira Sans', 'Helvetica Neue', 'Arial', sans-serif ",
                        fontSize: isMobile ? '20px' : "22px", marginBottom: "10px",
                        fontWeight: 500
                    }}>
                    {product?.title !== undefined ? product?.title : 'Mahsulot nomi'}
                </h4>
                <div className="col-md-4 mb-3">
                    <div className={`d-flex ${isMobile ? 'justify-content-start' : 'justify-content-end'} w-100`}>
                        <ProductSellerInfo data={product?.seller || profile} />
                    </div>
                </div>
                <div className='col-md-8 ' id='get-buy'>
                    <div
                        className='w-100 mb-2 p-0'
                        style={{
                            position: "relative",
                            borderRadius: '8px'
                        }}

                    >
                        <div className='action-box d-flex flex-column gap-2' style={{ position: 'absolute', zIndex: 2, right: 10, display: 'flex', top: 10 }}>
                            <div
                                className='bg-white d-flex align-items-center justify-content-center'
                                style={{ borderRadius: '50%', overflow: 'hidden', padding: '12px', border: '1px solid #00A44F', width: '35px', height: '35px' }}
                            >
                                <div style={{ cursor: "pointer" }} className='d-flex justify-content-center align-items-center'>
                                    <i className="fa-solid fa-share-nodes" style={{ marginRight: "5px" }}></i>
                                </div>
                            </div>
                        </div>

                        <TemplateProductThumbnail data={product?.images?.map((el, index) => ({ id: index, url: el?.url || el?.thumbUrl }))} posterUrl={product?.poster ? { id: 0, url: product?.poster[0]?.thumbUrl } : {}} />
                    </div>
                </div>

                <div className="ps-product__info col-md-4 d-flex flex-column gap-3  ">

                    <ProductShoppingActions product={product} />

                    <TemplateModuleProductDetailDescription
                        product={{
                            document: {
                                file_size: '0. MB',
                                file_type: ".zip"
                            },
                            category: {
                                name: product?.category
                            }
                        }}
                        views={views}
                    />

                    <ProductShoopping product={product} demo={product?.demo_link} />

                    {product?.technologies ? <>
                        <p className='fw-medium fs-5 m-0' style={{
                            fontFamily: "Work Sans, sans-serif",
                            fontSize: "16px",
                            color: "black",
                            maxWidth: "180px",
                            borderBottom: "2px solid #00A44F"
                        }}>
                            Foydalanilgan texnologiyalar
                        </p>

                        <div className="mb-4 d-flex justify-content-start align-content-center flex-wrap gap-2">
                            {product?.technologies &&
                                product?.technologies.map((item, i) => (
                                    <div key={i} style={{
                                        borderRadius: "20px",
                                        padding: "2px 8px",
                                        border: "1px solid #00A44F",
                                        fontSize: "13px"
                                    }}>
                                        {item}{' '}
                                    </div>
                                ))}
                        </div>
                    </> : ''}

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
                        {product?.tags &&
                            product?.tags.map((item, i) => (
                                <div key={i} style={{
                                    borderRadius: "20px",
                                    padding: "2px 8px",
                                    border: "1px solid #ccc",
                                    fontSize: "13px"
                                }}>
                                    {item}{' '}
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <DefaultDescription product={product} />
        </div >

    );
};

export default TemplateProductDetail;