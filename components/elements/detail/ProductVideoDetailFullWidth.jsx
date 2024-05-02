import React, { useEffect, useState } from 'react';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription';
import ModuleDetailShoppingActions from '~/components/elements/detail/modules/ModuleDetailShoppingActions';
import Link from 'next/link';
import Router from 'next/router';
import Meta from '~/components/shared/headers/Meta';
import DefaultVideo from './thumbnail/DefaultVideo';
import ModuleVideoDetailTopInformation from './modules/ModuleVideoDetailTopInformation';
import VideoDetailsDescription from './modules/VideoDetails';
import VideoDetailAction from './modules/VideoDetailAction';

const ProductVideoDetailFullWidth = ({
    product,
    views,
    admin,
    ActiveTag,
}) => {
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
                image={product?.iamges?.map((item) => item?.image_url) || product?.poster_url}
                description={product?.description}

                keywords={product?.tag ? product?.tag?.map((e) => e?.name) : product?.title}

                author={`${product?.seller?.first_name} ${product?.seller?.last_name}`}
            />
            <div className="ps-product--detail ">
                <div className="row">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                        <DefaultVideo product={product} />
                        <ModuleVideoDetailTopInformation
                            product={product}
                            views={views}
                            admin={admin}
                        />
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                        <VideoDetailsDescription
                            product={product}
                            views={views}
                        />
                        <VideoDetailAction
                            product={product}
                            admin={admin}
                        />

                    </div>
                </div>

                {admin && ActiveTag}
                {product?.tag?.length > 0 && (
                    <div className="">
                        <p>Tezkor teglar</p>
                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                            {product?.tag?.length > 0 &&
                                product?.tag.map((item, i) => (
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
                    </div>
                )}


                {product?.description ? (
                    <DefaultDescription product={product} />
                ) : (
                    ''
                )}
            </div>
        </>
    );
};

export default ProductVideoDetailFullWidth;
