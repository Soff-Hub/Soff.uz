import React  from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import Link from 'next/link';

const ProductDetailFullwidth = ({ product, views }) => {
   


    return (
        <>
            <div className="ps-product--detail ps-product--fullwidth">
                <div className="ps-product__header ">
                    <ThumbnailDefault product={product} views={views?.view_count} />
                    <div className="ps-product__info">
                        <ModuleDetailTopInformation product={product} />

                        <ModuleProductDetailDescription
                            product={product}
                            views={views}
                        />
                        <ModuleDetailShoppingActions
                            product={product}
                        />
                        <p>Tezkor teglar</p>
                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                            {product?.tag?.length > 0 &&
                                product?.tag.slice(0, 15).map((item, i) => (
                                    <div key={i} className="m-2 tag-product">
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
                </div>
         
                    <DefaultDescription product={product} />
             
            </div >
        </>
    );
};

export default ProductDetailFullwidth;
