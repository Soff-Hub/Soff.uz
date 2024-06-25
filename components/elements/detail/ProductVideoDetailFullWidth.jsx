import React from 'react';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import Link from 'next/link';
import DefaultVideo from './thumbnail/DefaultVideo';
import ModuleVideoDetailTopInformation from './modules/ModuleVideoDetailTopInformation';
import VideoDetailsDescription from './modules/VideoDetails';
import VideoDetailAction from './modules/VideoDetailAction';

const ProductVideoDetailFullWidth = ({
    product,
    views,
    admin,
    ActiveTag,
    isPlay, setIsPlay
}) => {


    return (
        <>

            <div className="ps-product--detail ">
                <div className="row mb-xl-5 mb-lg-5 mb-0">
                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                        <DefaultVideo product={product} isPlay={isPlay} setIsPlay={setIsPlay} /> 
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
                    <div className="mb-xl-5 mb-lg-5 mb-0">
                        <p>Tezkor teglar</p>
                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                            {product?.tag?.length > 0 &&
                                product?.tag.map((item, i) => (
                                    <div
                                        key={i}
                                        className="m-2 tag-product">
                                        <Link href={`/search?keyword=${item?.name?.replace(/^#/, '')}`} >
                                            <a>
                                                {' '}
                                                {item.name}{' '}
                                            </a>
                                        </Link>
                                    </div>
                                ))}
                        </div>
                    </div>
                )}

                    <DefaultDescription product={product} />
             
            </div>
        </>
    );
};

export default ProductVideoDetailFullWidth;
