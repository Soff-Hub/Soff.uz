import React from 'react';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import DefaultDescription from './description/DefaultDescription';
import { useState } from 'react';
import Router from 'next/router';
import { useEffect } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Image from 'next/image';
import NextImageCard from '~/components/nextImagecard';

const ProductDetailQuickView = ({ product }) => {
    const [tag, setTag] = useState([]);
    const [img, setImage] = useState(null);
    const [document, setDocument] = useState(null);

    const searchTag = (e) => {
        Router.push(`/search?keyword=${e}`);
    };

    const SellerPage = (e) => {
        Router.push(`/seller/${e}`);
    };

    const getImage = async () => {
        const responsImage = await ProductRepository.getProductImagesSlug(
            product?.slug
        );
        if (responsImage) {
            console.log(responsImage);
            setImage(responsImage.images);
            const { page_count, file_type, file_size } = responsImage;
            setDocument({ page_count, file_type, file_size });
        }
    };

    useEffect(() => {
        getImage();
    }, []);
    console.log('modal image', product);
    return (
        <div className="ps-product--detail ps-product--quickview">
            <div className="ps-product__header">
                <figure>
                    <div className="ps-wrapper">
                        {img?.length > 0
                            ? img?.map((item, i) => (
                                  //   <img
                                  //       key={i}
                                  //       src={item?.image_url}
                                  //       alt="document"
                                  //       className="border mb-3 "
                                  //       style={{ objectFit: 'contain' }}
                                  //   />
                                  <NextImageCard
                                      key={i}
                                      url={item?.image_url}
                                      clasS="border mb-3 objectFitCover "
                                      width="380px"
                                      height="390px"
                                  />
                              ))
                            : ''}
                    </div>
                </figure>

                <div className="ps-product__info">
                    <ModuleDetailTopInformation product={product} />
                    <div>
                        {product?.seller?.first_name && (
                            <div
                                className="document-seller-about mb-3 product_detail__seller_name "
                                onClick={() => SellerPage(product?.seller?.id)}>
                                <div style={{ textAlign: 'center' }}>
                                    {product?.seller?.image_url ? (
                                        <img
                                        alt='soff'
                                            src={`${product?.seller?.image_url}`}
                                            className="profile__image-client"
                                        />
                                    ) : (
                                        <i
                                            className=" fa-2x text-info fa-solid fa-circle-user"
                                            style={{ fontSize: '35px' }}></i>
                                    )}
                                </div>

                                <h4>
                                    {product?.seller?.first_name}{' '}
                                    {product?.seller?.last_name}
                                </h4>
                            </div>
                        )}
                    </div>
                    <ModuleProductDetailDescription
                        product={{ ...product, document }}
                    />
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
            {product?.description ? (
                <DefaultDescription product={product} />
            ) : (
                ''
            )}
        </div>
    );
};

export default ProductDetailQuickView;
