import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { message } from 'antd';
import Meta from '~/components/shared/headers/Meta';
import useWishlist from '~/shared/hooks/useWishlist';
import { checkIfUserIsOnline } from '~/components/partials/homepage/electronic/TopSellersTable';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';

const ModuleVideoDetailTopInformation = ({ product, views, admin }) => {
    const router = useRouter();
    const pid = router.asPath;
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [copy, setCopy] = useState(false);
    const SellerPage = e => {
        if (pid !== '/account/myproducts') {
            router.push(
                {
                    pathname: `/seller/[pid]`,
                    query: { pid: sellerId },
                },
                `/seller/${sellerId}`,
                { shallow: true }
            );
        }
    };

    // Views
    let priceView;

    if (product?.is_sale) {
        priceView = (
            <div className="ps-product__price sale">
                {+product.discount_price === 0 ? (
                    <p>Bepul mahsulot</p>
                ) : product.discount === 0 ? (
                    <p>{addPeriodToThousands(product.discount_price)} so'm</p>
                ) : (
                    <>
                        <del>{addPeriodToThousands(product.price)} so'm</del>
                        <p>
                            {addPeriodToThousands(product.discount_price)}
                            so'm
                        </p>
                    </>
                )}
            </div>
        );
    } else {
        priceView = (
            <h4 className="ps-product__price">
                {+product.discount_price === 0 ? (
                    <p>Bepul mahsulot</p>
                ) : product.discount === 0 ? (
                    <p>{addPeriodToThousands(product.discount_price)} so'm</p>
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
    const infoSuccess = url => {
        messageApi.success(
            `Soff | Video mahsulot dan nusxa ko\'chirildi (${url})`
        );
    };
    const infoError = url => {
        messageApi.error(
            `Soff | Video mahsulot dan nusxa ko\'chirilmadi (${url})`
        );
    };

    const handleAddItemToWishlist = async e => {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    };

    const copyVideoUrl = () => {
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
            .catch(error => {
                infoError(error);
                console.error('Error copying video URL: ', error);
                // alert('Error copying video URL!');
            });
    };

    return (
        <header>
            <Meta title={`${product?.title}`} image={product?.poster_url} />
            {contextHolder}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '15px',
                    margin: '8px 5px',
                }}>
                <h1
                    style={{ margin: '0' }}
                    className="product__name"
                    id="get-buy">
                    {product?.title !== undefined ? product?.title : ''}
                </h1>
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
                        <div style={{ position: 'relative' }}>
                            <img
                                alt="soff"
                                src={
                                    product?.seller?.image_url
                                        ? product?.seller?.image_url
                                        : '/static/img/ozodbek.png'
                                }
                                className="profile__image-client-top-seller"
                            />
                            {
                                <span>
                                    {checkIfUserIsOnline(
                                        product?.seller?.last_login
                                    ) ? (
                                        <i
                                            className="fa-solid fa-circle text-success fs-5"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-12%',
                                                right: '3%',
                                            }}></i>
                                    ) : (
                                        <i
                                            className="fa-solid fa-circle text-secondary  fs-5"
                                            style={{
                                                position: 'absolute',
                                                bottom: '-12%',
                                                right: '3%',
                                            }}></i>
                                    )}
                                </span>
                            }
                        </div>

                        {product?.seller?.first_name && (
                            <div className="d-flex gap-2">
                                <p>{product?.seller?.first_name} </p>
                                <p> {product?.seller?.last_name}</p>
                            </div>
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
                    } d-flex align-items-center gap-4`}>
                    <div className={`ps-product__actions heart_video `}>
                        <a
                            href="#"
                            onClick={e => handleAddItemToWishlist(e)}
                            style={{
                                cursor: `${admin ? 'not-allowed' : 'pointer'}`,
                            }}>
                            <i
                                className={`${
                                    wishlist?.some(
                                        item =>
                                            Number(item.id) ===
                                            Number(product.id)
                                    )
                                        ? 'fa-solid fa-heart text-danger'
                                        : 'icon-heart'
                                } `}></i>
                        </a>
                    </div>
                    <div className="views_video mt-1">
                        {' '}
                        <i className="fa-solid fa-eye"></i>{' '}
                        <span>{views?.view_count}</span>
                    </div>
                    <div className="video_send" onClick={() => copyVideoUrl()}>
                        {copy ? (
                            <>
                                <i className="fa-solid fa-check"></i> nusxalandi
                            </>
                        ) : (
                            <>
                                <i className="fa-solid fa-share-nodes mr-2"></i>
                                ulashish
                            </>
                        )}
                    </div>
                    <div
                        className="product__top-information--price buystep-0"
                        style={{ minWidth: 150 }}>
                        {priceView}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default ModuleVideoDetailTopInformation;
