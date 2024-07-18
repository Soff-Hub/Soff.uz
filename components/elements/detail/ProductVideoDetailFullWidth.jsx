import React, { useEffect, useState } from 'react';
import DefaultDescription from '~/components/elements/detail/description/DefaultDescription';
import Link from 'next/link';
import DefaultVideo from './thumbnail/DefaultVideo';
import ModuleVideoDetailTopInformation from './modules/ModuleVideoDetailTopInformation';
import VideoDetailsDescription from './modules/VideoDetails';
import VideoDetailAction from './modules/VideoDetailAction';
import ProductVideoCards from '../products/ProductVideoCards';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { baseUrl } from '~/repositories/Repository';

const ProductVideoDetailFullWidth = ({
    product,
    views,
    admin,
    ActiveTag,
    isPlay,
    setIsPlay,
    similar,
}) => {
    const { user } = useSelector((state) => state.auth);   // user malumotlarini olish uchun reduxdan
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const router = useRouter();
    const { pid } = router.query

    const getPlayLists = async () => {
        const endPoint = `customer/playlist/${pid}/`
        try {
            const response = await Axios.get(baseUrl + endPoint, {
                headers: {
                    Authorization: `Bearer ${user?.access}`,
                }
            });
            setData(response)
        } catch (error) {
            setError(`Xatolik yuz berdi: ${error.message}`)
        }

    }

    useEffect(() => {
        if (user?.access && pid) {
            getPlayLists()
        }

    }, [user?.access, pid]);

    console.log('data=>', data);
    console.log('product=>', product);


    return (
        <>

            <div className="ps-product--detail mt-5 ">
                <div className="row mb-xl-5 mb-lg-5 mb-0 " style={{ alignItems: 'flex-start' }}>
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

                        {admin && ActiveTag}
                        {product?.tag?.length > 0 && (
                            <div className="mb-xl-5 mb-lg-5 ">
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

                    <div className='col-md-4' style={{ overflowY: "auto", }}>
                        {data?.length > 0 && <div className="col-md-12 p-0 border rounded-3">


                            <div className='p-3 pt-4 bg-white rounded-3'>
                                <h4>
                                    Meta Back-End Developer Professional Certificate
                                    Self Taught Courses
                                    1 / 8
                                </h4>
                            </div>

                            <div className=' p-0' style={{ overflowY: "auto", height: "60vh" }}>

                                {
                                    error !== null ? data.map(item => (
                                        <div
                                            key={item?.id}
                                            className={`col-md-12  py-2 `}

                                            style={{
                                                backgroundColor: item?.id === 10009 ? "rgba(221,226,235,0.949)" : ''
                                            }}
                                        >
                                            <ProductVideoCards type="playlists" product={item} isPlay={isPlay} setIsPlay={setIsPlay} />{' '}
                                        </div>
                                    )) :
                                        <div className='d-flex border border-danger rounded-3 justify-content-center align-items-center ' style={{
                                            height: "100%",
                                            width: "100%"
                                        }}>
                                            <p className='text-center fw-medium fs-3 text-danger'>{error}</p>
                                        </div>
                                }
                            </div>

                        </div>}

                        <h4 className='fw-medium fs-3 p-3 bg-body-secondary my-4 rounded-3 text-center'>O'xshash mahsulotlar</h4>

                        {
                            similar?.length > 0 ? similar.map(item => (
                                <div
                                    key={item?.id}
                                    className="col-md-12 my-2">
                                    <ProductVideoCards type={"similler"} product={item} isPlay={isPlay} setIsPlay={setIsPlay} />{' '}
                                </div>
                            )) :
                                <div className='d-flex border border-danger rounded-3 justify-content-center align-items-center ' style={{
                                    height: "100vh"
                                }}>
                                    <p className='text-center fw-bold fs-3 text-danger'>Ma'lumot yo'q</p>
                                </div>
                        }
                    </div>


                </div>




            </div>
        </>
    );
};

export default ProductVideoDetailFullWidth;
