import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { OneShopDoc } from '~/store/auth/action';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { Modal } from 'antd';
import { audioDownloaderSale } from '~/utilities/common-helpers';
import { message } from 'antd';

const TemplateModuleDetailShoppingActions = ({ product }) => {

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

                <div className="ps-product__shopping m-0 p-0 ">
                    {contextHolder}
                    <div className='d-flex flex-column gap-4 w-100 m-0' >

                        {product?.discount_price > 0 ? (
                            <>
                                {product?.document?.file_url ? (
                                    <a
                                        style={{
                                            cursor: 'pointer',
                                            minWidth: "150px",
                                            fontSize: "14px"

                                        }}
                                        className="ps-btn ps-btn--black py-3 "
                                        href="#"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            setLoading(true);

                                            try {
                                                await audioDownloaderSale(product, product);
                                            } catch (error) {
                                                console.error('Error in audioDownloaderSale:', error);
                                            } finally {
                                                setLoading(false);

                                            }
                                        }}
                                    >
                                        {!loading ?
                                            "Yuklab olish" :
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
                                            className="ps-btn ps-btn--black  buystep-1 m-0 w-100"
                                            href="#"
                                            style={{ fontSize: "16px" }}
                                            onClick={(e) => handleAddItemToCart(e)}>
                                            Savatga qo'shish
                                        </a>
                                        <a
                                            className="ps-btn  buystep-2 m-0 w-100"
                                            href="#"
                                            style={{ fontSize: "16px" }}
                                            onClick={(e) => handleBuynow(e)}>
                                            Hoziroq xarid qilish
                                        </a>
                                    </>
                                )}
                            </>
                        ) : (
                            <a
                                style={{ cursor: loading ? 'not-allowed' : 'pointer', minWidth: "212px", height: "40px", fontSize: "16px" }}
                                className="ps-btn py-3 buystep-2  ps-btn--black w-100 "
                                href="#"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    setLoading(true)
                                    await audioDownloaderSale(product, product);
                                    setLoading(false)
                                }}>
                                {!loading ? 'Bepul yuklab olish' :
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
                        <div className='d-flex gap-4 '>


                            <div className="p-3 px-5 rounded-3 " style={{
                                backgroundColor: "#fff", width: "100%", borderRadius: "20px",
                                border: "1px solid #00A44F",
                            }} onClick={() => copyVideoUrl()}>
                                {copy ? (
                                    <div className='text-center'>
                                        <i className="fa-solid fa-check mr-3"></i> nusxalandi
                                    </div>
                                ) : (
                                    <div style={{ cursor: "pointer" }} className='w-100 d-flex justify-content-center align-items-center'>
                                        <i className="fa-solid fa-share-nodes mr-3" style={{ marginRight: "5px" }}></i>
                                        ulashish
                                    </div>
                                )}
                            </div>

                            <div style={{
                                borderRadius: "20px",
                                border: "1px solid #00A44F",
                            }} className="ps-product__actions  w-100 rounded-3 bg-white d-flex align-items-center justify-content-center ">
                                <a
                                    className='d-flex align-items-center'
                                    href="#" onClick={(e) => handleAddItemToWishlist(e)}>
                                    <i
                                        className={`${wishlist?.some(
                                            (item) =>
                                                Number(item.id) ===
                                                Number(product.id)
                                        )
                                            ? 'fa-solid fa-heart text-danger'
                                            : 'icon-heart text-black'
                                            } `}></i>
                                </a>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
};

export default connect((state) => state)(TemplateModuleDetailShoppingActions);
