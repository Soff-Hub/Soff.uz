import React from 'react'
import Link from 'next/link'

import { useDispatch, useSelector } from 'react-redux'

import { Modal, Tabs } from 'antd'
import DefaultAudioLive from '~/components/elements/detail/thumbnail/DefaultAudioLive'
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault'
import DefaultVideoAdmin from '~/components/elements/detail/thumbnail/DefaultVideoAdmin'
import PartialDescription from '~/components/elements/detail/description/PartialDescription'
import ModuleDetailTopInformation from '~/components/elements/detail/modules/ModuleDetailTopInformation'
import ModuleProductDetailDescription from '~/components/elements/detail/modules/ModuleProductDetailDescription'
import { setDetailModal, setProductData } from '~/rtk-store/products/slice'
import ModuleAudioDetailTopInformationLive from '~/components/elements/detail/modules/ModuleAudioDetailTopInformationLive'
import ModuleAudioDetailShoppingActionsLive from '~/components/elements/detail/modules/ModuleAudioDetailShoppingActionsLive'

const { TabPane } = Tabs;
var parse = require('html-react-parser');

const contentType = {
    video: "Video haqida to’liq ma'lumot",
    audio: "Audio haqida to’liq ma'lumot",
    template: "Shablon haqida to’liq ma'lumot",
    file: "Fayl haqida to’liq ma'lumot"
}

export default function SellerProductView() {
    const { productData: View, detailLoader: loading, detailModal } = useSelector(state => state.products)
    const dispatch = useDispatch()

    const handleClose = () => {
        dispatch(setProductData(null))
        dispatch(setDetailModal(false))
    }

    const items = [
        {
            key: '1',
            label: (
                <span
                    style={{
                        margin: '0 20px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}>
                    Qisqa video ko'rish
                </span>
            ),
            children: (
                <div>
                    <DefaultVideoAdmin product={View} short={false} />
                </div>
            ),
        },
        {
            key: '2',
            label: (
                <span
                    style={{
                        margin: '0 30px',
                        fontSize: '16px',
                        fontWeight: '600',
                    }}>
                    To'liq video
                </span>
            ),
            children: (
                <div>
                    <DefaultVideoAdmin product={View} short={false} />
                </div>
            ),
        },
    ];

    const contentDetail = {
        audio: (
            <div className="row">
                <div className="col-12">
                    <DefaultAudioLive
                        product={
                            View ? View : ''
                        }
                        liveFile={View?.poster_url}
                        title={View?.title}
                        categoryName={
                            View?.category?.name
                        }
                    />
                    <ModuleAudioDetailTopInformationLive
                        product={View ? View : ''}
                        views={View?.view_count}
                        admin={true}
                        taxminiyNarx={
                            View?.price
                        }
                    />
                    <div className="price_and_tag">
                        <ModuleAudioDetailShoppingActionsLive
                            admin={true}
                        />
                        <>
                            {
                                <div className="">
                                    <p>
                                        Tezkor
                                        teglar
                                    </p>
                                    <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                        {View
                                            ?.tag
                                            ?.length >
                                            0 &&
                                            View?.tag?.map(
                                                (
                                                    item,
                                                    i
                                                ) => (
                                                    <div
                                                        key={
                                                            i
                                                        }
                                                        style={{
                                                            borderRadius: "20px",
                                                            padding: "5px 16px",
                                                            border: "1px solid #999",
                                                            fontSize: "15px"
                                                        }}
                                                        className="m-2 tag-product">
                                                        <Link
                                                            href="#"
                                                            as="#">
                                                            <a>
                                                                {' '}
                                                                #
                                                                {
                                                                    item?.name
                                                                }{' '}
                                                            </a>
                                                        </Link>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>
                            }
                        </>
                    </div>
                </div>

                <div className="ps-product__content ps-tab-root mb-5">
                    <Tabs defaultActiveKey="1">
                        <TabPane
                            tab="Mahsulot to’liq tavsifi"
                            key="1">
                            <div className="ps-document">
                                {View?.description
                                    ? parse(
                                        View?.description
                                    )
                                    : "To'ldirilmadi"}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>

                <div className="d-flex justify-content-end p-5 ">
                    <Link href={`${View?.document?.file_url}`}>
                        <a>
                            <button
                                className="btn btn-success p-2 px-5 fs-4 ">
                                <i className="fa-solid fa-download mx-1"></i>{' '}
                                <span className="fs-3">
                                    File ochish
                                </span>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        ),
        video: (
            <div className="row">
                <div className="col-12">

                    <Tabs
                        defaultActiveKey="1"
                        items={items}
                        className="bg-white "
                        onChange={(e) => setShort(e == 1 ? true : false)}
                    />
                    <ModuleAudioDetailTopInformationLive
                        product={View}
                        views={View?.view_count}

                        admin={true}
                        taxminiyNarx={
                            View?.price
                        }
                    />
                    <div className="price_and_tag">
                        <ModuleAudioDetailShoppingActionsLive
                            admin={true}
                        />

                        <>
                            {
                                <div className="">
                                    <p>
                                        Tezkor
                                        teglar
                                    </p>
                                    <div className=" d-flex justify-content-start align-content-center flex-wrap">
                                        {View
                                            ?.tag
                                            ?.length >
                                            0 &&
                                            View?.tag?.map(
                                                (
                                                    item,
                                                    i
                                                ) => (
                                                    <div
                                                        style={{
                                                            borderRadius: "20px",
                                                            padding: "5px 16px",
                                                            border: "1px solid #999",
                                                            fontSize: "15px"
                                                        }}

                                                        key={
                                                            i
                                                        }
                                                        className="m-2 tag-product">
                                                        <Link
                                                            href="#"
                                                            as="#">
                                                            <a>
                                                                {' '}
                                                                #
                                                                {
                                                                    item?.name
                                                                }{' '}
                                                            </a>
                                                        </Link>
                                                    </div>
                                                )
                                            )}
                                    </div>
                                </div>
                            }
                        </>
                    </div>
                </div>

                <div className="ps-product__content ps-tab-root mb-5">
                    <Tabs defaultActiveKey="1">
                        <TabPane
                            tab="Mahsulot to’liq tavsifi"
                            key="1">
                            <div className="ps-document">
                                {View?.description
                                    ? parse(
                                        View?.description
                                    )
                                    : "To'ldirilmadi"}
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        ),
        file: (
            <div className="ps-product--detail ps-product--fullwidth m-0">
                <div className="ps-product__header ">
                    <ThumbnailDefault
                        product={View}
                        views={View?.view_count}
                    />
                    <div className="ps-product__info">
                        {View?.status ===
                            'cancelled' ? (
                            <div className="mb-4">
                                <strong className="text-danger pb-5">
                                    {
                                        View?.reason
                                    }
                                </strong>
                            </div>
                        ) : (
                            ''
                        )}
                        <ModuleDetailTopInformation
                            product={
                                View ? View : ''
                            }
                        />
                        <ModuleProductDetailDescription
                            product={View}
                        />
                        <div className="ps-product__shopping">
                            <div>
                                <button
                                    className="ps-btn ps-btn--black me-2"
                                    style={{
                                        cursor: 'not-allowed',
                                    }}>
                                    Savatga
                                    qo'shish
                                </button>
                                <button
                                    className="ps-btn"
                                    style={{
                                        cursor: 'not-allowed',
                                    }}>
                                    Sotib olish
                                </button>
                            </div>
                            <div className="ps-product__actions">
                                <a
                                    style={{
                                        cursor: 'not-allowed',
                                    }}>
                                    <i
                                        className={`icon-heart`}></i>
                                </a>
                            </div>
                        </div>
                        <p>Tezkor teglar</p>
                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                            {View?.tag?.length >
                                0 &&
                                View?.tag.map(
                                    (
                                        item,
                                        i
                                    ) => (
                                        <div
                                            style={{
                                                borderRadius: "20px",
                                                padding: "5px 16px",
                                                border: "1px solid #999",
                                                fontSize: "15px"
                                            }}

                                            key={
                                                i
                                            }
                                            className="m-2 tag-product">
                                            <Link
                                                href="#"
                                                as="#">
                                                <a>
                                                    {
                                                        item.name
                                                    }{' '}
                                                </a>
                                            </Link>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
                <div className="ps-product__content ps-tab-root">
                    <Tabs defaultActiveKey="1">
                        <TabPane
                            tab={
                                View?.document?.content_type === 'video' ? "Video to’liq tavsifi" :
                                    View?.document?.content_type === 'audio' ? "Audio to’liq tavsifi" :
                                        View?.document?.content_type === 'template' ? "Shablon to’liq tavsifi" :
                                            "Fayl to’liq tavsifi"

                            }
                            key="1">
                            <PartialDescription
                                product={View}
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <div className="d-flex justify-content-end ">
                    <Link href={`${View?.document?.file_url}`}>
                        <a>
                            <button
                                className="btn btn-success p-2 px-5 fs-4 ">
                                <i className="fa-solid fa-download mx-1"></i>{' '}
                                <span className="fs-3">
                                    File ochish
                                </span>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        ),
        template: (
            <div className="ps-product--detail ps-product--fullwidth m-0">
                <div className="ps-product__header ">
                    <ThumbnailDefault
                        product={View}
                        views={View?.view_count}
                    />
                    <div className="ps-product__info">
                        {View?.status ===
                            'cancelled' ? (
                            <div className="mb-4">
                                <strong className="text-danger pb-5">
                                    {
                                        View?.reason
                                    }
                                </strong>
                            </div>
                        ) : (
                            ''
                        )}
                        <ModuleDetailTopInformation
                            product={
                                View ? View : ''
                            }
                        />
                        <ModuleProductDetailDescription
                            product={View}
                        />
                        <div className="ps-product__shopping">
                            <div>
                                <button
                                    className="ps-btn ps-btn--black me-2"
                                    style={{
                                        cursor: 'not-allowed',
                                    }}>
                                    Savatga
                                    qo'shish
                                </button>
                                <button
                                    className="ps-btn"
                                    style={{
                                        cursor: 'not-allowed',
                                    }}>
                                    Sotib olish
                                </button>
                            </div>
                            <div className="ps-product__actions">
                                <a
                                    style={{
                                        cursor: 'not-allowed',
                                    }}>
                                    <i
                                        className={`icon-heart`}></i>
                                </a>
                            </div>
                        </div>
                        <p>Tezkor teglar</p>
                        <div className=" d-flex justify-content-start align-content-center flex-wrap">
                            {View?.tag?.length >
                                0 &&
                                View?.tag.map(
                                    (
                                        item,
                                        i
                                    ) => (
                                        <div
                                            style={{
                                                borderRadius: "20px",
                                                padding: "5px 16px",
                                                border: "1px solid #999",
                                                fontSize: "15px"
                                            }}

                                            key={
                                                i
                                            }
                                            className="m-2 tag-product">
                                            <Link
                                                href="#"
                                                as="#">
                                                <a>
                                                    {
                                                        item.name
                                                    }{' '}
                                                </a>
                                            </Link>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
                <div className="ps-product__content ps-tab-root">
                    <Tabs defaultActiveKey="1">
                        <TabPane
                            tab={
                                View?.document?.content_type === 'video' ? "Video to’liq tavsifi" :
                                    View?.document?.content_type === 'audio' ? "Audio to’liq tavsifi" :
                                        View?.document?.content_type === 'template' ? "Shablon to’liq tavsifi" :
                                            "Fayl to’liq tavsifi"

                            }
                            key="1">
                            <PartialDescription
                                product={View}
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <div className="d-flex justify-content-end ">
                    <Link href={`${View?.document?.file_url}`}>
                        <a>
                            <button
                                className="btn btn-success p-2 px-5 fs-4 ">
                                <i className="fa-solid fa-download mx-1"></i>{' '}
                                <span className="fs-3">
                                    File ochish
                                </span>
                            </button>
                        </a>
                    </Link>
                </div>
            </div>
        ),
    }

    return (
        <div>
            <Modal
                closable
                maskClosable
                onClose={handleClose}
                title={contentType[View?.document?.content_type]}
                open={!!detailModal}
                onOk={handleClose}
                onCancel={handleClose}
                width={1200}
                footer={null}

            >
                <div className="ps-container p-0">
                    {!loading ? contentDetail[View?.document?.content_type] : (
                        <div
                            className="ps-product--detail ps-product--fullwidth"
                            style={{
                                height: '690px',
                                display: 'grid',
                                placeContent: 'center',
                            }}>
                            <div
                                className="spinner-border "
                                role="status"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                }}>
                                <span className="visually-hidden">
                                    Loading...
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    )
}
