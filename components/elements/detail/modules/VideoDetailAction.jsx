import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { OneShopDoc } from '~/store/auth/action';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { Modal } from 'antd';
import { message } from 'antd';
import Axios from 'axios';

const VideoDetailShoppingActions = ({ product }) => {
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

    const audioDownloaderSale = async (file) => {
        const filee = 'http://192.168.1.14/media/Images/new__Abdurahimov_Ahmad.zip';
        try {
            const response = await Axios.get(filee, {
                responseType: 'blob',
            });
    
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download =
                'soff.uz -' +
                file +
                '.' +
                filee?.split('.')[filee?.split('.').length - 1];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('Faylni yuklab olishda xatolik: ', error);
            return Promise.reject(error);
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
                    className={` ${product?.document?.images?.length > 0 ? '' : 'ps-product__shopping'} `}>
                    <div className="w-100 d-flex justify-content-between m-0">
                        {product?.discount_price > 0 ? (
                            <>
                                {product?.file_url !== 'No' ? (
                                    ''
                                ) : (
                                    <>
                                        <a
                                            className="ps-btn text-white py-3 mb-4"
                                            href="#"
                                            style={{ fontSize: '14px' }}
                                            onClick={(e) =>
                                                handleAddItemToCart(e)
                                            }>
                                            Savatga qo'shish
                                        </a>
                                        <a
                                            className="ps-btn py-3 me-0 mb-4"
                                            href="#"
                                            style={{ fontSize: '14px' }}
                                            onClick={(e) => handleBuynow(e)}>
                                            1 klikda sotib oling
                                        </a>
                                    </>
                                )}
                            </>
                        ) : (

                            ''
                        )}
                    </div>

    
                </div>
                <div className="ps-product__shopping w-100 d-flex justify-content-between m-0 p-0">
                    {product?.document?.images?.length > 0 && (
                        <div className='w-full p-0'>
                            <p
                                className="fw-bold fs-4 rounded-1 border py-2 px-4 hover-extra-file w-full"
                                style={{ backgroundColor: '#F1F1F1' }}>
                                Qo'shimcha fayllarni yuklab olish uchun{' '}
                                {product?.document?.images?.map((e) => (
                                    <span
                                        className="pl-2"
                                        onClick={async (e) => {
                                            e.preventDefault();
                                            setLoading(true);
                                            await audioDownloaderSale(
                                                e?.image_url
                                            );
                                            setLoading(false);
                                        }}>
                                        {!loading ? (
                                            <i class="fa-solid fa-download"></i>
                                        ) : (
                                            
                                                <div
                                                    className="spinner-border"
                                                    role="status">
                                                    <span className="visually-hidden">
                                                        Loading...
                                                    </span>
                                                </div>
                                            
                                        )}
                                    </span>
                                ))}
                            </p>
                        </div>
                    )}
                </div>
            </>
        );
    }
};

export default connect((state) => state)(VideoDetailShoppingActions);
