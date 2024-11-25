import React from 'react'
import Router from 'next/router';
import { useDispatch } from 'react-redux';

import { useLazyFetchAdminProductDetailQuery } from '~/rtk-store/products/api';
import { setDetailLoader, setDetailModal, setProductData } from '~/rtk-store/products/slice';


export default function SellerProductActions({ content, src }) {
    const [fetchDetail] = useLazyFetchAdminProductDetailQuery()
    const dispatch = useDispatch()

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

    const handleEdit = () => {
        Router.push(`/account/products/${content?.id}`);
    }

    const editItems = {
        approved: (
            <>
                {
                    (src?.content_type_id?.content_type === "video" && src?.content_type_id?.discount_price === 0) ? <></> :
                        <span
                            onClick={handleEdit}
                        >
                            <i className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"></i>
                        </span>
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
        deleted: (
            <span>
                <i
                    className="fa-solid fa-pen-to-square mx-3  text-success-emphasis"
                    onClick={handleEdit}
                ></i>
            </span>
        )
    }

    return (
        <div>
            <div>
                <a>
                    <i
                        className="fa-solid fa-eye text-success-emphasis mx-2"
                        onClick={handleClickView}
                    ></i>
                </a>

                {editItems[src.data_status?.status]}
            </div>
        </div>
    )
}
