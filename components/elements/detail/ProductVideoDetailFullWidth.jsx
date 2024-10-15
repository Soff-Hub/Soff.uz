import React, { useEffect, useState } from 'react';
import ProductVideoCards from '../products/ProductVideoCards';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { baseUrl } from '~/repositories/Repository';
import { addPeriodToThousands } from '~/components/partials/account/ProductsLists';
import VideoPlayDetails from './VideoPlayDetails';
import { Modal } from 'antd';

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
    const router = useRouter();
    const { pid } = router.query

    const getPlayLists = async () => {
        const endPoint = `customer/playlist/${pid}/`
        try {
            const response = await Axios.get(baseUrl + endPoint, {
                headers: user?.access ? {
                    Authorization: `Bearer ${user?.access}`,
                } : {}
            });
            setData(response?.data)

        } catch (error) {
            Modal.error({
                centered: true,
                title: 'Xatolik!',
                content: `Xatolik yuz berdi: ${error.message}`,
            });
        }

    }

    const clickPlaylist = (slug, id) => {
        router.push(`/account/checkout-one?type=playlist&slug=${slug}&id=${id}`)
    }

    useEffect(() => {
        getPlayLists()

    }, [user?.access, pid]);



    return (
        <>

            <div className="ps-product--detail mt-5 ">
                <div className="row mb-xl-5 mb-lg-5 mb-0 " style={{ alignItems: 'flex-start' }}>

                    <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">
                        <VideoPlayDetails
                            product={product}
                            views={views}
                            admin={admin}
                            ActiveTag={ActiveTag}
                            isPlay={isPlay}
                            setIsPlay={setIsPlay}
                        />
                    </div>

                    <div className='col-md-4' style={{ overflowY: "auto", }}>
                        {data?.playlist_document?.length > 0 && <div className="col-md-12 p-0 border rounded-3">

                            <div className='p-3 pt-4 bg-white rounded-3' style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div>
                                    <h4>
                                        {data?.title}
                                    </h4>
                                    <p className='m-0'>
                                        {data?.description}
                                    </p>
                                </div>
                                <p className='m-0'>
                                    {`${data?.playlist_document?.findIndex(el => el.id === product.id) + 1} / ${data?.playlist_document?.length}`}
                                </p>
                            </div>

                            <div className='p-0' style={{ overflowY: "auto", margin: '10px 0', maxHeight: '450px' }}>

                                {
                                    data?.playlist_document?.map((item, ind) => (
                                        <div
                                            key={item?.id}
                                            className={`col-md-12  py-2`}

                                            style={{
                                                backgroundColor: item?.id === product.id ? "rgba(221,226,235,0.949)" : '',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px'
                                            }}
                                        >
                                            {item?.id === product.id ? <i className="fa-solid fa-play fs-5"></i> : ind + 1}
                                            <ProductVideoCards type="playlists" product={item} setIsPlay={setIsPlay} isPlay={isPlay} />{' '}
                                        </div>
                                    ))
                                }
                            </div>

                            {(data?.price !== 0 && !data?.is_purchased_playlist) && <div
                                onClick={() => clickPlaylist(data?.playlist_document?.[0]?.slug, data?.id)}
                                className='fw-medium fs-4 p-2 bg-body-primary text-center m-0 mt-4 ps-btn text-white'
                                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px' }}
                            >
                                <i className=''></i>
                                <div className='pr'>
                                    To'plam ni sotib olish <br />
                                    {addPeriodToThousands(data?.price)} so'm
                                </div>
                                <i className='fa-solid fa-angles-right fa-beat-fade'></i>
                            </div>}

                        </div>}

                        <h4
                            className='fw-medium fs-3 p-3 bg-body-secondary my-4 rounded-3 text-center'
                        >
                            O'xshash videolar
                        </h4>

                        {
                            similar?.length > 0 ? similar.map(item => (
                                <div
                                    key={item?.id}
                                    className="col-md-12 my-4">
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
