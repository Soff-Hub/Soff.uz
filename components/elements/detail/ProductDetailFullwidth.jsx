import React, { useEffect, useState } from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import Link from 'next/link';
import Router from 'next/router';

const ProductDetailFullwidth = ({ product }) => {
    const [tag, setTag] = useState([]);

    const searchTag = (e) => {
        Router.push(`/search?keyword=${e}`);
    };

    useEffect(() => {
        setTag(product?.tag);
    }, []);
    return (
        <div className="ps-product--detail ps-product--fullwidth">
         <div className="ps-product__header ">
            <ThumbnailDefault product={product} />
                <div className="ps-product__info">
                    <ModuleDetailTopInformation product={product} />
                    <div>
                        <h4> Muallif : {product?.seller?.first_name}</h4>
                    </div>
                    <ModuleProductDetailDescription product={product } />
                    <ModuleDetailShoppingActions product={product} />
                    <div className=" row d-flex justify-content-center">
                        {tag?.length > 0 &&
                            tag.map((item, i) => (
                                <div
                                    key={i}
                                    className="mx-4 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-xs-4 col-5">
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
                    <ModuleDetailActionsMobile product={product} />
                </div>
            </div>
            <DefaultDescription product={product} />
        </div>
    );
};

export default ProductDetailFullwidth;
