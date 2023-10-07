import React from 'react';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import DefaultDescription from './description/DefaultDescription';
import { useState } from 'react';
import  Router  from 'next/router';
import { useEffect } from 'react';
import ProductRepository from '~/repositories/ProductRepository';

const ProductDetailQuickView = ({ product }) => {
    const [tag, setTag] = useState([]);
    const [img, setImage] = useState(null)

    const searchTag = (e) => {
        Router.push(`/search?keyword=${e}`);
    };

    const SellerPage = (e) => {
        Router.push(`/seller/${e}`);
    };

   const getImage = async () => {
    const responsImage = await ProductRepository.getProductImagesSlug(product?.slug)
    if (responsImage) {
        setImage(responsImage?.[0]?.image)
    }
   }

   useEffect(() => {
        getImage()
   }, [])



    return (
        <div className="ps-product--detail ps-product--quickview">
            <div className="ps-product__header">
            <figure>
                <div className="ps-wrapper">
                    {img?.length > 0 ? (
                        img?.map((item, i) => (
                            <img
                            key={i}
                                src={item?.image_url}
                                alt="document"
                                className="border mb-3 "
                                style={{ objectFit: 'contain' }}
                            />
                        ))
                    ) : (
                        ''
                    )}
                </div>
            </figure>
                
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
                                {' '}
                                Muallif : {product?.seller?.first_name}   {product?.seller?.last_name}
                            </h4>
                        )}
                    </div>
                    <ModuleProductDetailDescription product={product} />
                    <ModuleDetailShoppingActions
                        product={product}
                        extended={true}
                    />
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
            {
                product?.description ?
                <DefaultDescription product={product} /> :
                ''
            }
        </div>
    );
};

export default ProductDetailQuickView;
