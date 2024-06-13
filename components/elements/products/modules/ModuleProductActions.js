import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { connect, useSelector } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import Router from 'next/router';
import { baseUrl } from '~/repositories/Repository';
import axios from 'axios';
import Axios from 'axios';

const ModuleProductActions = ({ product, audio }) => {
    const [isQuickView, setIsQuickView] = useState(false);
    const { setCartOneItem } = useCart();
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const [productView, setProduct] = useState([]);
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);

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
        showModal();
        e.preventDefault();
        setCartOneItem(product.id);
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    }

    async function getProducts(e) {
        e.preventDefault();
        try {
            const token = user?.access;
            const response = await axios.get(
                baseUrl + `customer/documents/${product?.slug}/`,
                {
                    headers: {
                        Authorization: token ? `Bearer ${token}` : '',
                    },
                }
            );

            setProduct(response?.data);
            setIsQuickView(true);
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    }

    const handleHideQuickView = async (e) => {
        e.preventDefault();

        setIsQuickView(false);
    };



      const audioDownloaderSale = async (filee, product) => {
        const file = filee.includes('?AWSAccessKeyId') ? filee.split('?')[0] : filee
        try {
            setLoading(true);
            const response = await axios.get(file, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
             a.download =
            'soff.uz -' + product?.title  +
            '.' +
            file?.split('.')[
                file?.split('.').length - 1
            ];
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            const apiResponse = await Axios.post(
                baseUrl + `seller/upload-count/${product.id}`
            );

        } catch (error) {
            console.error('Error downloading file: ', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal
                title="Muvaffaqqiyatli"
                open={open}
                onOk={hideModalOk}
                onCancel={hideModal}
                okText="Savatga o'tish"
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
                cancelText="Xaridlarni davom etirish">
                <p></p>
                <p>Mahsulotingizni savatga qo'shdingiz!</p>
                <p></p>
            </Modal>
            <ul
                className={`ps-product__actions ${
                    audio
                        ? 'd-flex gap-5 justify-content-center align-content-center audio-list-icons'
                        : ''
                } `}>
                <li className={`${audio ? 'audio-list-action' : ''}`}>
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Savatga qo'shish"
                        onClick={handleAddItemToCart}>
                        <i className="icon-bag2"></i>
                    </a>
                </li>

                <li className={`${audio ? 'audio-list-action' : ''}`}>
                    {audio ? (
                        <a
                            href={`/product/${product?.slug}`}
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Ko'proq ko'rish">
                            <i className="icon-eye"></i>
                        </a>
                    ) : (
                        <a
                            href="#"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Ko'proq ko'rish"
                            onClick={getProducts}>
                            <i className="icon-eye"></i>
                        </a>
                    )}
                </li>

                <li className={`${audio ? 'audio-list-action' : ''}`}>
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Tanlanganlarga qo'shish"
                        onClick={handleAddItemToWishlist}>
                        <i
                            className={`${
                                wishlist?.some(
                                    (item) =>
                                        Number(item.id) === Number(product?.id)
                                )
                                    ? 'fa-solid fa-heart  text-danger '
                                    : 'icon-heart'
                            } `}></i>
                    </a>
                </li>

                {audio ? (
                    product?.discount_price === 0 ? (
                        <li className={`${audio ? 'audio-list-action' : ''}`}>
                            <span
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Yuklab olish"
                                onClick={() =>
                                    audioDownloaderSale(
                                        product?.document?.short_content_url
                                    )
                                }>
                                <i
                                    className={`${
                                        loading
                                            ? 'fa-regular fa-circle fa-beat-fade'
                                            : 'fa-solid fa-download'
                                    } `}></i>
                            </span>
                        </li>
                    ) : (
                        <li className={`${audio ? 'audio-list-action' : ''}`}>
                            <a
                                href={`${
                                    user?.access === undefined ||
                                    user?.access === ''
                                        ? `account/register-user?id=${product?.id}`
                                        : `account/checkout-one?id=${product?.id}`
                                } `}
                                data-toggle="tooltip"
                                data-placement="top"
                                title="Yuklab olish">
                                <i className={`${'fa-solid fa-download'} `}></i>
                            </a>
                        </li>
                    )

                ) : (
                    <></>
                )}

                <Modal
                    centeredwishlist
                    footer={null}
                    width={1024}
                    onCancel={(e) => handleHideQuickView(e)}
                    open={isQuickView}
                    closeIcon={<i className="icon icon-cross2"></i>}>
                    <h3>Tezkor ko'rish</h3>
                    <ProductDetailQuickView product={productView} />
                </Modal>
            </ul>
        </>
    );
};

export default connect((state) => state)(ModuleProductActions);
