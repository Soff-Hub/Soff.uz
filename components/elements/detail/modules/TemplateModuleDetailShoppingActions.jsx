import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { OneShopDoc } from '~/store/auth/action';
import useCart from '~/hooks/useCart';
import useWishlist from '~/hooks/useWishlist';
import { Modal } from 'antd';
import { audioDownloaderSale } from '~/utilities/common-helpers';
import { EyeFilled } from '@ant-design/icons';


const TemplateModuleDetailShoppingActions = ({ product }) => {

    const { setCartOneItem } = useCart();
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const dispatch = useDispatch();
    const Router = useRouter();
    const [open, setOpen] = useState(false);
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
            Router.push(`/account/register?id=${product?.id}`);
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

                <div className="ps-product__shopping m-0 p-0 ">

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
                        <button
                            className='w-100'
                            onClick={() => Router.push("https://soff.uz/")}
                            style={{
                                backgroundColor: "#00A3FF",
                                padding: "10px 60px",
                                border: "none",
                                color: "#fff",
                                borderRadius: "5px",
                                flexShrink: "0"

                            }}>
                            <strong
                                className='d-flex align-items-center justify-content-center gap-1'>
                                <EyeFilled style={{ fontSize: "17px" }} />Demoni ko'rish</strong>
                        </button>

                        <div className='d-flex gap-4 '>

                            <div style={{
                                borderRadius: "20px",
                                border: "1px solid #00A44F",
                                height: "45px"
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
                                            } `}></i> <strong className={`fs-4 text-secondary ml-2 ${wishlist?.some(
                                                (item) =>
                                                    Number(item.id) ===
                                                    Number(product.id)
                                            ) && "text-danger"}`}>Sevimlilarga qo'shish</strong>
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
