import React from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import Link from 'next/link';
import TemplateModuleDetailTopInformation from './modules/TemplateModuleDetailTopInformation';
import TemplateModuleProductDetailDescription from './modules/TemplateModuleProductDetailDescription';
import TemplateModuleDetailShoppingActions from './modules/TemplateModuleDetailShoppingActions';

const TemplateDetailFullwidth = ({ product, views }) => {



    return (
        <>
            <div className="ps-product--detail ps-product--fullwidth">
                <div className="row ">
                    <div className='col-md-8 '>
                        <ThumbnailDefault product={product} views={views?.view_count} />
                        <p className='mt-5 pl-3'>Tezkor teglar</p>
                        <div className="mb-5 d-flex justify-content-start align-content-center flex-wrap">
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

                    <div className="ps-product__info col-md-4 ">
                        <TemplateModuleDetailTopInformation product={product} /> 

                        <TemplateModuleProductDetailDescription
                            product={product}
                            views={views}
                        />
                        <TemplateModuleDetailShoppingActions
                            product={product}
                        />
                    </div>

                </div>

                <DefaultDescription product={product} />

            </div >
        </>
    );
};

export default TemplateDetailFullwidth;
