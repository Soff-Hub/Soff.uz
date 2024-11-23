import React, { useState } from 'react'
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import { useLazyFetchProductDetailQuery } from '~/rtk-store/products/api';
import { setApprovedProductData, setDetailLoader, setDetailModal, setProductData, setProductDeleteId } from '~/rtk-store/products/slice';


export default function SellerProductActions({ content, src }) {
    const [copy, setCopy] = useState(null)
    const [fetchDetail] = useLazyFetchProductDetailQuery()
    const dispatch = useDispatch()

    const copyVideoUrl = () => {
        const videoUrl = `https://soff.uz/product/${src?.name?.slug}`;
        navigator.clipboard
            .writeText(videoUrl)
            .then(() => {
                setCopy(src?.id);
                setTimeout(() => {
                    setCopy(null);
                }, 2500);
            })
            .catch((error) => {
                console.error('Error copying video URL: ', error);
            });
    };

    const handleClickView = async () => {
        dispatch(setDetailModal(true))
        const resp = await fetchDetail(src?.id)
        if (resp.isSuccess) {
            dispatch(setProductData(resp.data))
            dispatch(setDetailLoader(false))
        } else {
            console.log(resp.error);
        }
    }

    const handleDelete = () => {
        dispatch(setProductDeleteId(src.id))
    }

    const handleEdit = () => {
        if (content?.content_type === 'video') {
            Router.push(
                `/account/myproducts/edit-video/${content?.id}`
            );
        }
        // else if (content?.content_type === 'template') {
        //     Router.push(
        //         `/account/upload/template/${content?.id}`
        //     );
        // }
        else {
            Router.push(`/account/myproducts/${content?.id}`);
        }
    }

    const handleEditPrice = async () => {
        dispatch(setDetailLoader(true))
        const resp = await fetchDetail(src?.id)
        dispatch(setApprovedProductData(resp.data))
        dispatch(setDetailLoader(false))
    }


    const editItems = {
        approved: (
            <>
                {
                    (src?.content_type_id?.content_type === "video" && src?.content_type_id?.discount_price === 0) ? <></> :
                        <a
                            data-bs-target="#exampleModalMyProductsPrice"
                            data-bs-toggle="modal"
                            onClick={handleEditPrice}
                        >
                            <i className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"></i>
                        </a>
                }
            </>
        ),
        moderation: (
            <span style={{ cursor: "pointer" }}>
                <i
                    className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"
                    onClick={handleEdit}
                >
                </i>
            </span>
        ),
        cancelled: (
            <span style={{ cursor: 'pointer' }}>
                <i
                    className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"
                    onClick={handleEdit}
                ></i>
            </span>
        ),
    }

    return (
        <div>
            <div>
                {src.data_status?.status === 'approved' ? (
                    <a>
                        {copy === src?.id ? (
                            <i className="fa-solid fa-check mx-2 "></i>
                        ) : (
                            <i
                                className="fa-solid fa-share text-success-emphasis mx-2"
                                onClick={copyVideoUrl}
                            ></i>
                        )}
                    </a>
                ) : (
                    <a>
                        <i
                            style={{ opacity: '0' }}
                            className="fa-solid fa-copy text-success-emphasis mx-2"></i>
                    </a>
                )}

                <a>
                    <i
                        className="fa-solid fa-eye text-success-emphasis mx-2"
                        onClick={handleClickView}
                    ></i>
                </a>

                {editItems[src.data_status?.status]}

                {src.data_status?.status !== 'cancelled' ? <a
                    data-bs-target="#exampleModalToggle"
                    data-bs-toggle="modal">
                    <i
                        className="fa-solid fa-trash-can text-danger mx-2"
                        onClick={handleDelete}
                    >
                    </i>
                </a> : ''}
            </div>
        </div>
    )
}
