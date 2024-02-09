import React, { useEffect, useState } from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import Link from 'next/link';
import Router from 'next/router';
import Meta from '~/components/shared/headers/Meta';

const ProductDetailFullwidth = ({ product, document, views }) => {
    const [tag, setTag] = useState([]);

    const searchTag = (e) => {
        Router.push(`/search?keyword=${e}`);
    };

    useEffect(() => {
        setTag(product?.tag);
    }, []);
    return (
        <>
            <Meta
                title={product?.title}
                image={product?.iamges?.map((item) => item?.image_url)}
            />
            <div className="ps-product--detail ps-product--fullwidth">
                <div className="ps-product__header ">
                    <ThumbnailDefault product={product} views={views} />
                    <div className="ps-product__info">
                        <ModuleDetailTopInformation product={product} />

                        <ModuleProductDetailDescription
                            product={product}
                            views={views}
                        />
                        <ModuleDetailShoppingActions
                            product={product}
                            document={document}
                        />
                        <p>Tezkor teglar</p>
                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                            {tag?.length > 0 &&
                                tag.map((item, i) => (
                                    <div key={i} className="m-2 tag-product">
                                        <Link href="#" as="#">
                                            <a
                                                onClick={() =>
                                                    searchTag(item?.name)
                                                }>
                                                {' '}
                                                #{item.name}{' '}
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
