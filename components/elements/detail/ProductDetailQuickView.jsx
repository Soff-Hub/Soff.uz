import React from 'react';
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import DefaultDescription from './description/DefaultDescription';
import { useState } from 'react';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import ProductRepository from '~/repositories/ProductRepository';
import NextImageCard from '~/components/nextImagecard';
import PostRepository from '~/repositories/PostRepository';
import { BeatLoader } from 'react-spinners';
import { v4 as uuidv4 } from 'uuid';
import ProductVideoDetailFullWidth from './ProductVideoDetailFullWidth';
import Link from 'next/link';
import ProductAudioDetailFullWidth from './ProductAudioDetailFullWidth';

const ProductDetailQuickView = ({ product }) => {
    const [tag, setTag] = useState([]);
    const [img, setImage] = useState(null);
    const [document, setDocument] = useState(null);
    const router = useRouter();
    const { pid } = router.query;
    const [views, setViews] = useState(null);

    const searchTag = (e) => {
        Router.push(`/search-page?keyword=${e}`);
    };

    const getImage = async () => {
        const responsImage = await ProductRepository.getProductImagesSlug(
            product?.slug
        );
        if (responsImage) {

            setImage(responsImage.images);
            const { page_count, file_type, file_size } = responsImage;
            setDocument({ page_count, file_type, file_size });
        }
    };

    async function getUUID(uuid) {
        const respons = await PostRepository.postProductUUID(
            pid ? pid : product?.slug,
            uuid
        );
        if (respons) {
            setViews(respons);
        }
    }
    useEffect(() => {
        setTag(product?.tag);
        localStorage.getItem('uuid')
            ? ''
            : localStorage.setItem('uuid', uuidv4());
        getImage();
        getUUID(
            localStorage.getItem('uuid')
                ? localStorage.getItem('uuid')
                : uuidv4()
        );
    }, []);


    return (
        <>
            {product?.document?.content_type === 'video' ? (
                <ProductVideoDetailFullWidth
                    product={product}
                    document={document}
                    views={views}
                    quek={true}
                />
            ) : product?.document?.content_type === 'audio' ? (
                <ProductAudioDetailFullWidth
                    product={product}
                    views={views}
                />
            ) : (
                <div className="ps-product--detail ps-product--quickview">
                    <div className="ps-product__header">
                        {product?.document?.content_type === 'video' ? (
                            <div className="ps-wrapper">
                                <div className="product__video--container">
                                    <video className="product__video" controls>
                                        <source
                                            src={
                                                product?.document
                                                    ?.short_content_url
                                            }
                                            type={`video/${product?.document?.file_type?.replace(
                                                '.',
                                                ''
                                            )}`}
                                        />
                                    </video>
                                </div>
                                <div className="views">
                                    {' '}
                                    <i className="fa-solid fa-eye"></i>{' '}
                                    <span>
                                        {document?.views
                                            ? document?.views
                                            : views?.view_count}
                                    </span>
                                </div>
                            </div>
                        ) : product?.document?.content_type === 'file' || product?.document?.content_type === 'template' ? (
                            <figure className="figure">
                                <div className="ps-wrapper">
                                    {img?.length > 0
                                        ? img?.map((item, i) => (
                                            <NextImageCard
                                                key={i}
                                                url={item?.image_url}
                                                className="border mb-3 objectFitCover "
                                                width="380px"
                                                height="390px"
                                            />
                                        ))
                                        : ''}
                                </div>
                                <div className="views view-quik">
                                    {' '}
                                    <i className="fa-solid fa-eye"></i>{' '}
                                    <span>
                                        {document?.views
                                            ? document?.views
                                            : views?.view_count}
                                    </span>
                                </div>
                            </figure>
                        ) : product?.document?.content_type === 'audio' ? (
                            <div className="audio-ramka">
                                <div className="ps-wrapper">


                                    <div
                                        className="audio_ramka"
                                        style={{
                                            display: 'flex',
                                            height: '100%',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            gap: '15px',
                                        }}>
                                        <h1 className="product__name">
                                            {product?.title !== undefined
                                                ? product?.title
                                                : ''}
                                        </h1>
                                        <audio
                                            controls
                                            src={
                                                product?.document
                                                    ?.short_content_url
                                            }></audio>
                                    </div>


                                    <div className="views_audio">
                                        {' '}
                                        <i className="fa-solid fa-eye"></i>{' '}
                                        <span>
                                            {document?.views
                                                ? document?.views
                                                : views?.view_count}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <figure>
                                <div className="ps-wrapper">
                                    {product?.document?.images?.length > 0
                                        ? product?.document?.images?.map(
                                            (item, i) => (
                                                <NextImageCard
                                                    key={i}
                                                    url={item?.image_url}
                                                    className="border mb-3"
                                                    width="270px"
                                                    height="350px"
                                                    style={{
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                            )
                                        )
                                        : ''}
                                </div>
                                <div className="views">
                                    {' '}
                                    <i className="fa-solid fa-eye"></i>{' '}
                                    <span>
                                        {document?.views
                                            ? document?.views
                                            : views?.view_count}
                                    </span>
                                </div>
                            </figure>
                        )}

                        <div className="ps-product__info">
                            {product && (
                                <ModuleDetailTopInformation product={product} />
                            )}
                            {product ? (
                                <ModuleProductDetailDescription
                                    product={{ ...product, document }}
                                />
                            ) : (
                                <div
                                    style={{
                                        height: '100%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <BeatLoader />
                                </div>
                            )}
                            {product && (
                                <>
                                    <ModuleDetailShoppingActions
                                        product={product}
                                        extended={true}
                                    />
                                    <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                        {product.tag?.length > 0 &&
                                            tag.map((item, i) => (
                                                <div
                                                    key={i}
                                                    className="m-2 tag-product">
                                                    <Link href="#" as="#">
                                                        <a
                                                            onClick={() =>
                                                                searchTag(
                                                                    item?.name
                                                                )
                                                            }>
                                                            {' '}
                                                            {item.name}{' '}
                                                        </a>
                                                    </Link>
                                                </div>
                                            ))}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    {product?.description ? (
                        <DefaultDescription product={product} />
                    ) : (
                        ''
                    )}
                </div>
            )}
        </>
    );
};

export default ProductDetailQuickView;
