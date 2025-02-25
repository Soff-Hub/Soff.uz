'use client'
import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { Modal } from 'antd';
import { audioDownloaderSale } from '~/utilities/common-helpers';
import { setOneShopDoc } from '~/store/auth/slice';


const ModuleAudioDetailShoppingActions = ({ product, admin }) => {

    const { setCartOneItem } = useCart();
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const dispatch = useDispatch();
    const Router = useRouter();
    const statee = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const hideModal = () => {
        setOpen(false);
    };
    const hideModalOk = () => {
        setOpen(false);
        Router.push('/account/shopping-cart');
    };

    function handleAddItemToCart(e) {
        e.preventDefault();
        setCartOneItem(product.id);
        showModal();
    }

    const state = useSelector((state) => state.auth.user?.access);

    function handleBuynow(e) {
        e.preventDefault();
        if (state) {
            dispatch(setOneShopDoc(product));
            Router.push(`/account/checkout-one?id=${product?.id}`);
        } else {
            Router.push(`/auth/login?id=${product?.id}`);
        }
    }

    const handleAddItemToWishlist = async (e) => {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    };

    if (true) {
        return (
            <>
                <Modal
                    title="Muvaffaqqiyatli"
                    open={open}
                    onOk={hideModalOk}
                    onCancel={hideModal}
                    cancelButtonProps={{
                        style: {
                            color: '#000',
                        },
                    }}
                    okButtonProps={{
                        style: {
                            color: '#fff',
                        },
                    }}
                    okText="Savatga o'tish"
                    cancelText="Xaridlarni davom etirish">
                    <p></p>
                    <p>Mahsulotingizni savatga qo'shdingiz!</p>
                    <p></p>
                </Modal>
                <div
                    className={`ps-product__shopping ${product?.document?.content_type === 'video'
                        ? 'video_action quek_video_button '
                        : 'audio_action'
                        }  `}>
                    <div
                        className={`btn--container ${product?.document?.content_type === 'audio'
                            ? 'audio_btn'
                            : ''
                            } `}>
                        {product?.discount_price > 0 ? (
                            <>
                                {product?.document?.file_url ? (
                                    (
                                        <a
                                            style={{
                                                cursor: `${admin
                                                    ? 'not-allowed'
                                                    : 'pointer'
                                                    }`,
                                                minWidth: "150px"
                                            }}
                                            className="ps-btn ps-btn--black max-class"
                                            href="#"
                                            onClick={async (e) => {
                                                e.preventDefault();
                                                setLoading(true);
                                                console.log('Loading state set to true');
                                                try {
                                                    await audioDownloaderSale(product, product);
                                                } catch (error) {
                                                    console.error('Error in audioDownloaderSale:', error);
                                                } finally {
                                                    setLoading(false);
                                                    console.log('Loading state set to false');
                                                }
                                            }}>
                                            {!loading ? "Yuklab olish" :
                                                <div>
                                                    <div
                                                        className="spinner-border"
                                                        role="status">
                                                        <span className="visually-hidden">
                                                            Loading...
                                                        </span>
                                                    </div>
                                                </div>
                                            }
                                        </a>
                                    )
                                ) : (
                                    <>
                                        <a
                                            style={{
                                                cursor: `${admin
                                                    ? 'not-allowed'
                                                    : 'pointer'
                                                    }`,
                                            }}
                                            className="ps-btn max-clas buystep-2"
                                            href="#"
                                            onClick={(e) => handleBuynow(e)}>
                                            Hoziroq xarid qilish
                                        </a>
                                        <a
                                            style={{
                                                cursor: `${admin
                                                    ? 'not-allowed'
                                                    : 'pointer'
                                                    }`,
                                            }}
                                            className="ps-btn ps-btn--black max-clas buystep-1"
                                            href="#"
                                            onClick={(e) =>
                                                handleAddItemToCart(e)
                                            }>
                                            Savatga qo'shish
                                        </a>
                                    </>
                                )}
                            </>
                        ) : (
                            <a
                                style={{
                                    cursor: `${admin || loading
                                        ? 'not-allowed'
                                        : 'pointer'
                                        }`,
                                    minWidth: "172px"
                                }}
                                className="ps-btn ps-btn--black max-class"
                                href="#"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    setLoading(true);
                                    console.log('Loading state set to true');
                                    try {
                                        await audioDownloaderSale(product, product);
                                    } catch (error) {
                                        console.error('Error in audioDownloaderSale:', error);
                                    } finally {
                                        setLoading(false);
                                        console.log('Loading state set to false');
                                    }
                                }}>
                                {!loading ? "Bepul yuklab olish" :
                                    <div>
                                        <div
                                            className="spinner-border"
                                            role="status">
                                            <span className="visually-hidden">
                                                Loading...
                                            </span>
                                        </div>
                                    </div>
                                }
                            </a>


                        )}
                    </div>
                    {product?.document?.content_type === 'audio' && (
                        <div className="d-none">
                            <div className="ps-product__actions">
                                <a
                                    href="#"
                                    onClick={(e) => handleAddItemToWishlist(e)}
                                    style={{
                                        cursor: `${admin ? 'not-allowed' : 'pointer'
                                            }`,
                                    }}>
                                    <i
                                        className={`${wishlist?.some(
                                            (item) =>
                                                Number(item.id) ===
                                                Number(product.id)
                                        )
                                            ? 'fa-solid fa-heart text-danger'
                                            : 'icon-heart'
                                            } `}></i>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </>
        );
    }
};

export default connect((state) => state)(ModuleAudioDetailShoppingActions);
