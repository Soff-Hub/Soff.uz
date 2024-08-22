import React from 'react';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import Link from 'next/link';
import TemplateModuleDetailTopInformation from './modules/TemplateModuleDetailTopInformation';
import TemplateModuleProductDetailDescription from './modules/TemplateModuleProductDetailDescription';
import TemplateModuleDetailShoppingActions from './modules/TemplateModuleDetailShoppingActions';

const TemplateDetailFullwidth = ({ product, views }) => {



    return (

        <div className="ps-product--detail ps-product--fullwidth">
            <div className="row mt-5">
                <div className='col-md-8 '>
                    <div className='w-100 d-flex justify-content-end mb-3 align-items-center'>
                        <button style={{
                            backgroundColor: "#00A3FF",
                            padding: "10px 60px",
                            border:"none",
                            color:"#fff",
                            borderRadius:"5px"
                        }}>
                            <strong><i className="fa-solid fa-eye"></i> Jonli demo</strong>
                        </button>
                    </div>

                    <img
                        className='w-100 mb-4'
                        src={"https://img.freepik.com/free-psd/landing-page-template-creative-event_23-2150273639.jpg"}
                        alt={"url"}

                    />

                </div>

                <div className="ps-product__info col-md-4 d-flex flex-column gap-3  ">

                    <TemplateModuleDetailTopInformation product={product} />

                    <TemplateModuleProductDetailDescription
                        product={product}
                        views={views}
                    />
                    <TemplateModuleDetailShoppingActions
                        product={product}
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
                                <Link href={`/search?keyword=${item?.name?.replace(/^#/, '')}`}>
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

        </div >

    );
};

export default TemplateDetailFullwidth;
