import React, { useEffect, useState } from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import Link from 'next/link';
import Router from 'next/router';

const ProductDetailFullwidth = ({ product, views }) => {
    const [tag, setTag] = useState([]);

    const searchTag = (e) => {
        Router.push(`/search?keyword=${e}`);
    };

    useEffect(() => {
        setTag(product?.tag);
    }, []);

    

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
                            {tag?.length > 0 &&
                                tag.slice(0, 15).map((item, i) => (
                                    <div key={i} className="m-2 tag-product">
                                        <Link href="#" as="#">
                                            <a
                                                onClick={() =>
                                                    searchTag(item?.name)
                                                }>
                                                {' '}
                                                {item.name}{' '}
                                            </a>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
                {product?.description ? (
                    <DefaultDescription product={product} />
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default ProductDetailFullwidth;
