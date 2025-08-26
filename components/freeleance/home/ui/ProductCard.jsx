import React, { useState } from 'react'
import styles from "../styles/ProductCard.module.scss"
import { useRouter } from 'next/router';
import useWishlist from '~/hooks/useWishlist';
import useCart from '~/hooks/useCart';
import { Modal } from 'antd';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';

const ProductCard = ({ product }) => {
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const Router = useRouter();
    const { setCartOneItem, removeCartOneItem } = useCart();
    const [basket, setBasket] = useState(false);

    const handleNavigate = () => {
        Router.push(`/product/${product?.slug}`)
    }


    // const { content_duration, content_type} = product?.document

    function handleAddItemToCart(e) {
        showModal();
        e.preventDefault();
        if (basket) {
            removeCartOneItem(product.id);
        } else {
            setCartOneItem(product.id);
        }

        setBasket(prev => !prev);
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find(item => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    }

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
    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardHead}>
                    <div className={styles.cardHeadInfo}>
                        <span className={styles.cardType}>{product?.document?.file_type || ".zip"}</span>
                        <div className={styles.cardActions}>
                            <div onClick={handleAddItemToWishlist} className={styles.likeIcon}>
                                {wishlist?.some(item => Number(item.id) === Number(product?.id)) ?
                                    <i style={{color: "#00a44f"}} className="fa-solid fa-heart"></i> : <i className="fa-regular fa-heart"></i>
                                }
                            </div>
                            <div onClick={handleAddItemToCart} className={styles.cartIcon}>
                                {basket ?
                                    <i style={{color: "#00a44f"}} className="fa-solid fa-cart-shopping"></i> : <i className="fa-solid fa-cart-shopping"></i>
                                }
                            </div>
                        </div>
                    </div>
                    <img onClick={handleNavigate} className={styles.cardImg} src={product?.poster_url || '/static/img/not-found.png'} alt="card img" />
                </div>
                <div className={styles.cardBody}>
                    <h2 onClick={handleNavigate} className={styles.cardTitle}>{product?.title}</h2>
                    <h3 className={styles.cardPrice}>{formatCurrencyWithSpace(product?.price)} so’m</h3>
                </div>
                <div className={styles.cardInfo}>
                    {product?.document?.file_size && 
                        <span><i className="fas fa-database"></i>{product?.document?.file_size}</span>
                    }
                    {product?.document?.page_count &&
                        <span><i className="fas fa-copy"></i>{product?.document?.page_count}</span>
                    }
                    {product?.views_count !== 0 &&
                        <span><i className='fa-solid fa-eye'></i>{product?.views_count}</span>
                    }
                </div>
            </div>
            <Modal
                title='Muvaffaqqiyatli'
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
                cancelText='Xaridlarni davom etirish'>
                <p></p>
                <p>Mahsulotingizni savatga qo'shdingiz!</p>
                <p></p>
            </Modal>
        </>
    )
}

export default ProductCard