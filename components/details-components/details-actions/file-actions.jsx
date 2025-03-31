import React, { useState } from 'react'
import { Button, message, Modal } from 'antd'
import { DownloadOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import { addPeriodToThousands } from '~/components/partials/account/price-formatter';
import useWishlist from '~/hooks/useWishlist';
import useCart from '~/hooks/useCart';
import { useRouter } from 'next/router';
import { setOneShopDoc } from '~/store/auth/slice';
import { useDispatch, useSelector } from 'react-redux';

export const fileColors = {
    ".doc": "#007DFF",
    ".xls": "#509C62",
    ".xlsx": "#509C62",
    ".ppt": "#DC8452",
    ".pdf": "#E22C2F",
    ".avi": "#6EB5E9",
    "mp3": "#88549E",
    "html": "#6D96A",
    "zip": "#E4BD3E",
    ".psd": "#0053BD",
    ".pptx": "#DD7657"
};

function FileActions({ product }) {
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const Router = useRouter();
    const pid = Router.asPath;
    const { setCartOneItem, removeCartOneItem } = useCart();
    const [basket, setBasket] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const state = useSelector((state) => state.auth.user?.access);
    const dispatch = useDispatch();

    // Savatga qo'shish
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

    // Wishlistga qo'shish
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

    // Nusxa olish
    const infoSuccess = (url) => {
        messageApi.success(
            `Nusxa ko\'chirildi (${url})`
        );
    };
    const infoError = (url) => {
        messageApi.error(
            `Nusxa ko\'chirilmadi (${url})`
        );
    };

    const copyVideoUrl = () => {
        if (!pid) {
            infoError("Video ID topilmadi.");
            return;
        }

        const videoUrl = `https://soff.uz${pid}`;
        navigator.clipboard
            .writeText(videoUrl)
            .then(() => {
                infoSuccess(videoUrl);
            })
            .catch((error) => {
                infoError(error);
            });

    };

    //  Hoziroq xarid qilish
    function handleBuynow(e) {
        e.preventDefault();
        setCartOneItem(product.id);
        if (state) {
            Router.push(`/account/checkout?id=${product?.id}`);
        } else {
            Router.push(`/auth/login?id=${product?.id}`);
        }
    }


    // content_type colors
    
    return (
        <>
            {contextHolder}
            <div className='seller_products_actions'>
                <div className='d-flex justify-content-between align-items-center'>

                    <div className='price_container'>
                        {
                            product?.discount_price === 0 ? (<h2>Bepul</h2>) :
                                product?.discount === 0 ? (
                                    <h2>{addPeriodToThousands(product?.discount_price || 0)} so'm</h2>
                                ) :
                                    <div className='d-flex gap-3'>
                                        <h2>{addPeriodToThousands(product?.discount_price || 0)} so'm</h2>
                                        <del>{addPeriodToThousands(product?.price || 0)} so'm</del>
                                    </div>
                        }
                    </div>


                    <div className='icon_hover text-success' onClick={() => copyVideoUrl()}>
                        <ShareAltOutlined style={{ fontSize: "30px" }} />
                    </div>
                </div>
                <ul className='fs-2 p-0 d-flex flex-column gap-3' style={{ listStyle: "none" }}>
                    {product?.upload_count > 0 && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Mahsulotni sotilgan soni:</span> <span>{product?.upload_count} ta</span>
                    </li>}
                    {product?.document?.content_duration && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Video davomiyligi:</span> <span>
                            {' '}
                            {product?.document?.content_duration}
                        </span>
                    </li>}
                    {product?.document?.page_count && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Betlar soni:</span> <span>{product?.document?.page_count} ta</span>
                    </li>}
                    {product?.document?.file_size && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Fayl hajmi :</span>  <span>{product?.document?.file_size}</span>
                    </li>}
                    {product?.document?.file_type && <li className='w-100 d-flex align-items-center justify-content-between gap-3'>
                        <span>Fayl turi:</span> <span

                            style={{
                                color: "white",
                                padding: "4px 9px",
                                borderRadius: "4px",
                                backgroundColor: fileColors[product?.document?.file_type] || "#007DFF"
                            }}>
                            {' '}
                            {product?.document?.file_type}
                        </span>
                    </li>}


                </ul>

                <div className='d-flex flex-column gap-3 '>
                    <div className=' d-flex align-items-center gap-3 justify-content-end'>
                        {product?.discount_price !== 0 && <Button onClick={handleAddItemToCart} iconPosition='end' style={{ height: "58px", fontSize: "20px" }} type="text" variant='solid' className='w-100 border-2 border-success text-success button_hover' icon={<ShoppingCartOutlined />} size={"large"}>
                            Savatga qo’shish
                        </Button>}
                        <Button iconPosition='end' onClick={handleAddItemToWishlist} style={{ height: "58px", width: "80px", fontSize: "28px" }} type="text" variant='solid' className='border-2 border-success text-success button_hover'
                            icon={wishlist?.some(
                                item => Number(item.id) === Number(product?.id)
                            ) ?
                                <i className="fa-solid fa-heart"></i>
                                :
                                <i className="fa-regular fa-heart "></i>
                            } size={"large"}>
                        </Button>
                    </div>
                    {product?.document?.file_url ?
                        <a href={product?.document?.file_url} target='_blank'>
                            <Button iconPosition='end' style={{ height: "58px", fontSize: "20px" }} type="primary" className='w-100 bg-success' icon={<DownloadOutlined />} size={"large"}>
                                Yuklab olish
                            </Button>
                        </a> :

                        <Button onClick={(e) => handleBuynow(e)} iconPosition='end' style={{ height: "58px", fontSize: "20px" }} type="primary" className='w-100 bg-success' icon={<DownloadOutlined />} size={"large"}>
                            Hoziroq xarid qilish
                        </Button>}
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

export default FileActions