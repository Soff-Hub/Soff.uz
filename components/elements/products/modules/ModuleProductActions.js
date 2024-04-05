import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { connect, useSelector } from 'react-redux';
import ProductDetailQuickView from '~/components/elements/detail/ProductDetailQuickView';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import Router from 'next/router';
import { baseUrl } from '~/repositories/Repository';
import axios from 'axios'

const ModuleProductActions = ({ product }) => {
    const [isQuickView, setIsQuickView] = useState(false);
    const { setCartOneItem } = useCart();
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const [productView, setProduct] = useState([]);
    const { user } = useSelector((state) => state.auth);

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
        // const modal = Modal.success({
        //     centered: true,
        //     title: 'Muvaffaqqiyatli!',
        //     content: "Siz  malumotlarni o'zgartirdingiz ",
        // });
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
            <ul className="ps-product__actions">
                <li>
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Savatga qo'shish"
                        onClick={handleAddItemToCart}>
                        <i className="icon-bag2"></i>
                    </a>
                </li>
                <li>
                    <a
                        href="#"
                        data-toggle="tooltip"
                        data-placement="top"
                        title="Ko'proq ko'rish"
                        onClick={getProducts}>
                        <i className="icon-eye"></i>
                    </a>
                </li>
                <li>
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
