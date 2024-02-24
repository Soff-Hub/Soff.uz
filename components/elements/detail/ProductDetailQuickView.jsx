import React from 'react';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import DefaultDescription from './description/DefaultDescription';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import Image from 'next/image';
import NextImageCard from '~/components/nextImagecard';
import PostRepository from '~/repositories/PostRepository';
import { BeatLoader } from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';

const ProductDetailQuickView = ({ product }) => {
    const [tag, setTag] = useState([]);
    const [img, setImage] = useState(null);
    const [document, setDocument] = useState(null);
    const router = useRouter();
    const { pid } = router.query;
    const [views, setViews] = useState(null)

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

    async function getUUID(uuid) {
        const respons = await PostRepository.postProductUUID (
            pid ||  product?.slug,
            uuid,
        );
        if (respons) {
            setViews(respons)
        }
    }
    useEffect(() => {
        localStorage.getItem("uuid") ? '' : localStorage.setItem("uuid", uuidv4())
        getImage();
        getUUID(localStorage.getItem("uuid") ? localStorage.getItem("uuid") : uuidv4())
    }, []);

    console.log("views", views);
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
                    <div className='views view-quik' >  <i class="fa-solid fa-eye"></i> <span>{views?.count}</span></div>
                </figure>

                <div className="ps-product__info">
                   {
                    product &&  <ModuleDetailTopInformation product={product} />
                   }
                  {
                    product ?   <ModuleProductDetailDescription
                    product={{ ...product, document }}
                /> : 
                <div style={{height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}} ><BeatLoader /></div>
                  }
                   {
                    product &&
                    <>
                     <ModuleDetailShoppingActions
                        product={product}
                        extended={true}
                    />
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
                                            # {item.name}{' '}
                                        </a>
                                    </Link>
                                </div>
                            ))}
                    </div>
                    </>
                   }
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
