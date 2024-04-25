import Router, { useRouter } from 'next/router';
import React from 'react';
import { message } from 'antd';
import { useState } from 'react';
import useWishlist from '~/hooks/useWishlist';

const ModuleAudioDetailTopInformation = ({ product, views, admin }) => {
    const router = useRouter();
    const pid = router.asPath;
    const [copy, setCopy] = useState(false);
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();

    const SellerPage = (e) => {
        if (pid !== '/account/myproducts') {
            Router.push(`/seller/${e}`);
        }
    };

    const handleAddItemToWishlist = async (e) => {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    };

    function addPeriodToThousands(number) {
        const numStr = String(number);

        const [integerPart, decimalPart] = numStr.split('.');

        const formattedIntegerPart = integerPart.replace(
            /\B(?=(\d{3})+(?!\d))/g,
            ' '
        );

        const formattedNumber =
            decimalPart !== undefined
                ? `${formattedIntegerPart}.${decimalPart}`
                : formattedIntegerPart;

        return formattedNumber;
    }

    // Views
    let priceView;

    if (product?.is_sale) {
        priceView = (
            <div className="ps-product__price sale">
                {+product?.discount_price === 0 ? (
                    <p>Bepul</p>
                ) : product?.discount === 0 ? (
                    <p>{addPeriodToThousands(product?.discount_price)} so'm</p>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product?.price)} so'm</del>
                        <p>
                            {addPeriodToThousands(product?.discount_price)}
                            so'm
                        </p>
                    </>
                )}
            </div>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price " style={{minWidth:"120px"}}>
                {+product.discount_price === 0 ? (
                    <p>Bepul</p>
                ) : product.discount === 0 ? (
                    <p>{addPeriodToThousands(product?.discount_price)} so'm</p>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product.price)} so'm</del>
                        <p>
                            {addPeriodToThousands(product.discount_price)}
                            so'm
                        </p>
                    </>
                )}
            </h4>
        );
    }

    const [messageApi, contextHolder] = message.useMessage();
    const infoSuccess = (url) => {
        messageApi.success(
            `Soff | Audio mahsulot dan nusxa ko\'chirildi (${url})`
        );
    };
    const infoError = (url) => {
        messageApi.error(
            `Soff | Audio mahsulot dan nusxa ko\'chirilmadi (${url})`
        );
    };

    const copyVideoUrl = () => {
        const videoElement = document.getElementById('audioPlayer');
        if (videoElement) {
            const videoUrl = `https://soff.uz${pid}`;
            navigator.clipboard
                .writeText(videoUrl)
                .then(() => {
                    setCopy(true);
                    setTimeout(() => {
                        setCopy(false);
                    }, 2500);
                    infoSuccess(videoUrl);
                    //   alert(`Video URL copied to clipboard! ${}`);
                })
                .catch((error) => {
                    infoError(error);
                    console.error('Error copying video URL: ', error);
                    // alert('Error copying video URL!');
                });
        }
    };

    return (
        <header>
            {contextHolder}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '15px',
                    margin: '8px 5px',
                }}>
            </div>
            <div
                className={`product__top-information ${
                    product?.document?.content_type === 'video'
                        ? 'video_user_information'
                        : product?.document?.content_type === 'audio'
                        ? 'video_user_information'
                        : ''
                } `}
                style={{ width: '100%' }}>
                <div>
                    <div
                        className="product__top-information-account"
                        style={{ cursor: 'pointer' }}
                        onClick={() => SellerPage(product?.seller?.id)}>
                        <div>
                            {product?.seller?.image ? (
                                <img
                                    alt="soff"
                                    src={product?.seller?.image}
                                    className="profile__image-client"
                                />
                            ) : (
                                <i
                                    className=" fa-2x text-info fa-solid fa-circle-user"
                                    style={{
                                        fontSize: '30px',
                                    }}></i>
                            )}
                        </div>
                        {product?.seller?.first_name && (
                            <p>
                                {product?.seller?.first_name}{' '}
                                {product?.seller?.last_name}
                            </p>
                        )}
                    </div>
                </div>
                <div
                    className={`${
                        product?.document?.content_type === 'video'
                            ? 'video_send_container'
                            : product?.document?.content_type === 'audio'
                            ? 'video_send_container'
                            : ''
                    }`}>
                    <div className={`ps-product__actions heart_video `}>
                        <a
                            href="#"
                            onClick={(e) => handleAddItemToWishlist(e)}
                            style={{
                                cursor: `${admin ? 'not-allowed' : 'pointer'}`,
                            }}>
                            <i
                                className={`${
                                    wishlist?.some(
                                        (item) =>
                                            Number(item.id) ===
                                            Number(product.id)
                                    )
                                        ? 'fa-solid fa-heart text-danger'
                                        : 'icon-heart'
                                } `}></i>
                        </a>
                    </div>
                    <div className=" views_video  mt-1">
                        {' '}
                        <i className="fa-solid fa-eye"></i>{' '}
                        <span>
                            {product?.view ? product?.view : views?.count}
                        </span>
                    </div>
                    <div className="video_send" onClick={() => copyVideoUrl()}>
                        {copy ? (
                            <i className="fa-solid fa-check"></i>
                        ) : (
                            <>
                                <i className="fa-solid fa-share-nodes"></i>
                                ulashish 
                            </>
                        )}
                    </div>
                    

                    <div className="product__top-information--price">
                        {priceView}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ModuleAudioDetailTopInformation;
