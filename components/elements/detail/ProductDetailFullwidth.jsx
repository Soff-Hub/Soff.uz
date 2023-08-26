import React, { useEffect, useState } from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import ModuleProductDetailSpecification from '~/components/elements/detail/modules/ModuleProductDetailSpecification';
import ModuleProductDetailSharing from '~/components/elements/detail/modules/ModuleProductDetailSharing';
import ModuleDetailActionsMobile from '~/components/elements/detail/modules/ModuleDetailActionsMobile';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ProductRepository from '~/repositories/ProductRepository';
import Link from 'next/link';

const ProductDetailFullwidth = ({ product }) => {

    const [tag, setTag] = useState([])

    const getTagData = async () => {
        const data = await ProductRepository.getTagData()
        if (data) {
            setTag(data)
        }
    }

    useEffect(() => {
        getTagData()
    },[])

    return (
        <div className="ps-product--detail ps-product--fullwidth">
            <div className="ps-product__header">
                <ThumbnailDefault product={product} />
                <div className="ps-product__info">
                    <ModuleDetailTopInformation product={product} />
                    <ModuleProductDetailDescription product={product} />
                    <ModuleDetailShoppingActions product={product} />
                    <div className='d-flex align-content-center'>
                        {
                            tag?.length > 0 &&
                            tag.map((item,i) => (
                                <div key={i} className='mx-4' > <a href='#' > # {item.name} </a> </div>
                            ))
                        }
                    </div>
                    {/* <ModuleProductDetailSpecification /> */}
                    {/* <ModuleProductDetailSharing /> */}
                    <ModuleDetailActionsMobile product={product} />
                </div>
            </div>
            <DefaultDescription product={product} />
        </div>
    );
};

export default ProductDetailFullwidth;
