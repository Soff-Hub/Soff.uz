import React from 'react';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import Link from 'next/link';
import DefaultVideo from './thumbnail/DefaultVideo';
import ModuleVideoDetailTopInformation from './modules/ModuleVideoDetailTopInformation';
import VideoDetailsDescription from './modules/VideoDetails';
import VideoDetailAction from './modules/VideoDetailAction';
import ProductVideoCards from '../products/ProductVideoCards';

const ProductVideoDetailFullWidth = ({
    product,
    views,
    admin,
    ActiveTag,
    isPlay,
    setIsPlay,
    similar,
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
                        <div className="col-md-12 mt-5 p-0">
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




                    <div className='col-md-4' style={{ overflowY: "auto", }}>
                        <div className="col-md-12 p-0 border rounded-3">


                            <div className='p-3 pt-4'>
                                <h4>
                                    Meta Back-End Developer Professional Certificate
                                    Self Taught Courses
                                    1 / 8
                                </h4>
                            </div>


                            <div className=' p-0' style={{ overflowY: "auto", height: "60vh" }}>

                                {
                                    similar.map(item => (
                                        <div
                                            key={item?.id}
                                            className={`col-md-12  py-2 `}

                                            style={{
                                                backgroundColor: item?.id === 10009 ? "rgba(221,226,235,0.949)" : ''
                                            }}
                                        >
                                            <ProductVideoCards type="playlists" product={item} isPlay={isPlay} setIsPlay={setIsPlay} />{' '}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <h4 className='fw-medium fs-3 p-3 bg-body-secondary my-4 rounded-3 text-center'>O'xshash mahsulotlar</h4>

                        {
                            similar.map(item => (
                                <div
                                    key={item?.id}
                                    className="col-md-12 my-2">
                                    <ProductVideoCards type={"similler"} product={item} isPlay={isPlay} setIsPlay={setIsPlay} />{' '}
                                </div>
                            ))
                        }
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
