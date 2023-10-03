import React, { useEffect, useState } from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import Link from 'next/link';
import Router from 'next/router';
import Meta from '~/components/shared/headers/Meta';

const ProductDetailFullwidth = ({ product }) => {
    const [tag, setTag] = useState([]);

    const searchTag = (e) => {
        Router.push(`/search?keyword=${e}`);
    };

    const SellerPage = (e) => {
        Router.push(`/seller/${e}`);
    };

    useEffect(() => {
        setTag(product?.tag);
    }, []);
    return (
        <>
        <Meta  title={product?.title} image={product?.iamges[0]?.image_url}/>
        <div className="ps-product--detail ps-product--fullwidth">
            <div className="ps-product__header ">
                <ThumbnailDefault product={product} />
                <div className="ps-product__info">
                    <ModuleDetailTopInformation product={product} />
                    <div>
                        {product?.seller?.first_name && (
                            <h4
                                style={{
                                    cursor: 'pointer',
                                }}
                                onClick={() =>
                                    SellerPage(product?.seller?.id)
                                }>
                                Muallif : {product?.seller?.first_name}  {product?.seller?.last_name} 
                            </h4>
                        )}
                    </div>
                    <ModuleProductDetailDescription product={product} />
                    <ModuleDetailShoppingActions product={product} />
                    <div className=" d-flex justify-content-start align-content-center flex-wrap">
                        {tag?.length > 0 &&
                            tag.map((item, i) => (
                                <div key={i} className="mx-2">
                                    <Link href="#" as="#">
                                        <a
                                            onClick={() =>
                                                searchTag(item?.name)
                                            }>
                                            {' '}
                                            # {item.name}{' '}
                                        </a>
                                    </Link>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
            <DefaultDescription product={product} />
        </div>
        </>

    );
};

export default ProductDetailFullwidth;
