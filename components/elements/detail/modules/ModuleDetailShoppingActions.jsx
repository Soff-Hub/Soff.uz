import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { OneShopDoc } from '~/store/auth/action';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { Modal } from 'antd';
import { audioDownloaderSale } from '~/utilities/common-helpers';
import { message } from 'antd';

const ModuleDetailShoppingActions = ({ product }) => {

    const { setCartOneItem } = useCart();
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const dispatch = useDispatch();
    const Router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [copy, setCopy] = useState(false);

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
            dispatch(OneShopDoc(product));
            Router.push(`/account/checkout-one?id=${product?.id}`);
        } else {
            Router.push(`/account/register-user?id=${product?.id}`);
        }
    }

    const handleAddItemToWishlist = async (e) => {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    };

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
        const videoUrl = `https://soff.uz${Router?.asPath}`;
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
                <div className="ps-product__shopping">
                    <div>
                        {product?.discount_price > 0 ? (
                            <>
                                {product?.file_url !== "No" ? (
                                    <a
                                        style={{
                                            cursor: 'pointer',
                                            minWidth: "150px",
                                            fontSize: "14px"

                                        }}
                                        className="ps-btn ps-btn--black py-3"
                                        href="#"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            setLoading(true)
                                            await audioDownloaderSale(product, product);
                                            setLoading(false)
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
                                ) : (
                                    <>
                                        <a
                                            className="ps-btn ps-btn--black py-3"
                                            href="#"
                                            style={{ fontSize: "14px" }}
                                            onClick={(e) => handleAddItemToCart(e)}>
                                            Savatga qo'shish
                                        </a>
                                        <a
                                            className="ps-btn py-3"
                                            href="#"
                                            style={{ fontSize: "14px" }}
                                            onClick={(e) => handleBuynow(e)}>
                                            Hoziroq xarid qilish
                                        </a>
                                    </>
                                )}
                            </>
                        ) : (
                            <a
                                style={{ cursor: 'pointer', minWidth: "212px" }}
                                className="ps-btn ps-btn--black max-class"
                                href="#"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    setLoading(true)
                                    await audioDownloaderSale(product, product);
                                    setLoading(false)
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

                    <div className="p-3 rounded-3 " style={{ backgroundColor: "#F1F1F1", minWidth: "80px" }} onClick={() => copyVideoUrl()}>
                        {copy ? (
                            <div className='text-center'>
                                <i className="fa-solid fa-check "></i>
                            </div>
                        ) : (
                            <div style={{ cursor: "pointer" }} className='w-full d-flex justify-content-center align-items-center'>
                                <i className="fa-solid fa-share-nodes " style={{ marginRight: "5px" }}></i>
                                ulashish
                            </div>
                        )}
                    </div>

                    <div className="ps-product__actions">
                        <a href="#" onClick={(e) => handleAddItemToWishlist(e)}>
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
            </>
        );
    }
};

export default connect((state) => state)(ModuleDetailShoppingActions);
