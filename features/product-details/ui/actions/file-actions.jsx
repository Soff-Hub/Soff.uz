import React, { useState } from 'react';
import { Button, message, Modal } from 'antd';
import {
    DownloadOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons';
import ShareAltOutlined from '@ant-design/icons/ShareAltOutlined';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import useWishlist from '~/shared/hooks/useWishlist';
import useCart from '~/shared/hooks/useCart';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import useResponsive from '~/shared/utilities/useResponsive';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import AuthModal from '~/features/auth/ui/auth-modal';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';

export const fileColors = {
    '.docx': '#007DFF',
    '.doc': '#007DFF',
    '.xls': '#509C62',
    '.xlsx': '#509C62',
    '.ppt': '#DC8452',
    '.pdf': '#E22C2F',
    '.avi': '#6EB5E9',
    '.mp3': '#88549E',
    '.html': '#6D96A',
    '.zip': '#E4BD3E',
    '.psd': '#0053BD',
    '.pptx': '#DD7657',
};

export const fileIcons = {
    '.docx': 'fa-file-word', // Word yangi format
    '.doc': 'fa-file-word', // Word hujjati
    '.xls': 'fa-file-excel', // Excel eski format
    '.xlsx': 'fa-file-excel', // Excel yangi format
    '.ppt': 'fa-file-powerpoint', // PowerPoint
    '.pdf': 'fa-file-pdf', // PDF
    '.avi': 'fa-file-video', // Video format
    '.mp3': 'fa-file-audio', // Audio format
    '.html': 'fa-file-code', // Kod (html)
    '.zip': 'fa-file-archive', // Zip arxiv
    '.psd': 'fa-file-image', // PSD - rasm/foto format
    '.pptx': 'fa-file-powerpoint', // PowerPoint yangi format
    '.mp4': 'fas fa-file-video',
};

function FileActions({ product }) {
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [open, setOpen] = useState(false);
    const [authModal, setAuthModal] = useState(false);
    const Router = useRouter();
    const pid = Router.asPath;
    const { setCartOneItem, removeCartOneItem } = useCart();
    const [basket, setBasket] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const state = useSelector((state) => state.auth.user?.access);

    function handleAddItemToCart(e) {
        showModal();
        e.preventDefault();
        if (basket) {
            removeCartOneItem(product.id);
        } else {
            setCartOneItem(product.id);
        }

        setBasket((prev) => !prev);
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
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
        messageApi.success(`Nusxa ko\'chirildi (${url})`);
    };
    const infoError = (url) => {
        messageApi.error(`Nusxa ko\'chirilmadi (${url})`);
    };

    const copyVideoUrl = () => {
        if (!pid) {
            infoError('Video ID topilmadi.');
            return;
        }

        const videoUrl = `https://soff.uz${pid}`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
            videoUrl
        )}`;

        window.open(telegramUrl, '_blank');
    };

    //  Hoziroq xarid qilish
    function handleBuynow(e) {
        e.preventDefault();
        setCartOneItem(product.id);
        if (state) {
            Router.push(`/account/checkout?id=${product?.id}`);
        } else {
            // Router.push(`/auth/login?id=${product?.id}`);
            setAuthModal(true);
        }
    }
    return (
        <>
            {contextHolder}
            <div className="seller_products_actions product-price-section">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="price_container">
                        {product?.discount_price === 0 ? (
                            <h2>Bepul</h2>
                        ) : product?.discount === 0 ? (
                            <h2>
                                {addPeriodToThousands(
                                    product?.discount_price || 0
                                )}{' '}
                                so'm
                            </h2>
                        ) : (
                            <div className="d-flex gap-3">
                                <h2>
                                    {addPeriodToThousands(
                                        product?.discount_price || 0
                                    )}{' '}
                                    so'm
                                </h2>
                                <del>
                                    {addPeriodToThousands(product?.price || 0)}{' '}
                                    so'm
                                </del>
                            </div>
                        )}
                    </div>

                    <div
                        className="icon_hover text-success"
                        onClick={() => copyVideoUrl()}>
                        <ShareAltOutlined style={{ fontSize: '30px' }} />
                    </div>
                </div>
                <ul
                    className="fs-2 p-0 d-flex flex-column gap-3"
                    style={{ listStyle: 'none' }}>
                    {product?.sold_count > 0 && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span>
                                <i
                                    className="fas fa-shopping-bag"
                                    style={{ color: '#00a44f' }}></i>{' '}
                                Mahsulotni sotilgan soni:
                            </span>{' '}
                            <span>{product?.sold_count} ta</span>
                        </li>
                    )}
                    {product?.document?.content_duration && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span>
                                <i
                                    className="fas fa-stopwatch"
                                    style={{ color: '#00a44f' }}></i>{' '}
                                Video davomiyligi:
                            </span>{' '}
                            <span> {product?.document?.content_duration}</span>
                        </li>
                    )}
                    {product?.document?.page_count && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span>
                                <i
                                    className="fas fa-copy"
                                    style={{ color: '#00a44f' }}></i>{' '}
                                Betlar soni:
                            </span>{' '}
                            <span>{product?.document?.page_count} ta</span>
                        </li>
                    )}
                    {product?.document?.file_size && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span>
                                {' '}
                                <i
                                    className="fas fa-database"
                                    style={{ color: '#00a44f' }}></i>{' '}
                                Fayl hajmi :
                            </span>{' '}
                            <span>{product?.document?.file_size}</span>
                        </li>
                    )}
                    {product?.document?.file_type && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span>
                                <i
                                    className={`fas ${
                                        fileIcons[
                                            product?.document?.file_type
                                        ] || 'fa-file-archive'
                                    }`}
                                    style={{ color: '#00a44f' }}></i>{' '}
                                Fayl turi:
                            </span>{' '}
                            <span
                                style={{
                                    color: 'white',
                                    padding: '4px 9px',
                                    borderRadius: '4px',
                                    backgroundColor:
                                        fileColors[
                                            product?.document?.file_type
                                        ] || '#007DFF',
                                }}>
                                {' '}
                                {product?.document?.file_type}
                            </span>
                        </li>
                    )}
                    {product?.three_d_features?.style?.name && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span>
                                <i
                                    className="fas fa-cube"
                                    style={{ color: '#00a44f' }}></i>{' '}
                                Uslub:
                            </span>
                            <span>{product.three_d_features.style.name}</span>
                        </li>
                    )}

                    {product?.three_d_features?.height_value &&
                        product?.three_d_features?.height_unit && (
                            <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                                <span>
                                    <i
                                        className="fas fa-ruler-vertical"
                                        style={{ color: '#00a44f' }}></i>{' '}
                                    Balandlik:
                                </span>
                                <span>
                                    {product.three_d_features.height_value}{' '}
                                    {product.three_d_features.height_unit}
                                </span>
                            </li>
                        )}

                    {product?.three_d_features?.width_value &&
                        product?.three_d_features?.width_unit && (
                            <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                                <span>
                                    <i
                                        className="fas fa-arrows-alt-h"
                                        style={{ color: '#00a44f' }}></i>{' '}
                                    Eni:
                                </span>
                                <span>
                                    {product.three_d_features.width_value}{' '}
                                    {product.three_d_features.width_unit}
                                </span>
                            </li>
                        )}

                    {product?.three_d_features?.length_value &&
                        product?.three_d_features?.length_unit && (
                            <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                                <span>
                                    <i
                                        className="fas fa-ruler-horizontal"
                                        style={{ color: '#00a44f' }}></i>{' '}
                                    Uzunlik:
                                </span>
                                <span>
                                    {product.three_d_features.length_value}{' '}
                                    {product.three_d_features.length_unit}
                                </span>
                            </li>
                        )}

                    {product?.three_d_features?.colors?.length > 0 && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span>
                                <i
                                    className="fas fa-palette"
                                    style={{ color: '#00a44f' }}></i>{' '}
                                Rang:
                            </span>
                            <span>
                                {product.three_d_features.colors.map(
                                    (color, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                display: 'inline-block',
                                                width: '16px',
                                                height: '16px',
                                                backgroundColor:
                                                    color.exec_code,
                                                borderRadius: '50%',
                                                marginRight: '4px',
                                            }}></span>
                                    )
                                )}
                            </span>
                        </li>
                    )}

                    {product?.three_d_features?.materials?.length > 0 && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span>
                                <i
                                    className="fas fa-layer-group"
                                    style={{ color: '#00a44f' }}></i>{' '}
                                Materiallar:
                            </span>
                            <span>
                                {product.three_d_features.materials
                                    .map((m) => m.name)
                                    .join(', ')}
                            </span>
                        </li>
                    )}

                    {product?.three_d_features?.product_form?.icon && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span className="d-flex align-items-center gap-2">
                                <i
                                    className="fas fa-shapes"
                                    style={{ color: '#00a44f' }}></i>
                                Shakl:
                            </span>
                            <span>
                                <img
                                    width="20px"
                                    src={
                                        product.three_d_features.product_form
                                            .form_image
                                    }
                                    alt="icon"
                                />
                            </span>
                        </li>
                    )}

                    {product?.three_d_features?.render_obj?.length > 0 && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span className="d-flex align-items-center gap-2">
                                <i
                                    className="fas fa-shapes"
                                    style={{ color: '#00a44f' }}></i>
                                Render:
                            </span>

                            <div className="d-flex gap-2 flex-wrap">
                                {product.three_d_features.render_obj.map(
                                    (r) => (
                                        <span
                                            key={r.id}
                                            className="d-flex align-items-center gap-2 px-2 rounded"
                                            style={{
                                                backgroundColor:
                                                    r.color || '#f0f0f0',
                                            }}>
                                            {r.logo && (
                                                <img
                                                    src={r.logo}
                                                    alt={r.title}
                                                    style={{
                                                        width: 20,
                                                        height: 20,
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                            )}
                                            <span>{r.title}</span>
                                        </span>
                                    )
                                )}
                            </div>
                        </li>
                    )}

                    {product?.three_d_features?.platform && (
                        <li className="w-100 d-flex align-items-center justify-content-between gap-3">
                            <span className="d-flex align-items-center gap-2">
                                <i
                                    className="fas fa-cube"
                                    style={{ color: '#00a44f' }}></i>
                                Platforma:
                            </span>
                            <span>{product.three_d_features.platform}</span>
                        </li>
                    )}
                </ul>

                <div className="d-flex flex-column gap-3 ">
                    {!product?.document?.file_url ? (
                        <div className=" d-flex align-items-center gap-3 justify-content-end">
                            {product?.discount_price !== 0 && (
                                <Button
                                    onClick={handleAddItemToCart}
                                    iconPosition="end"
                                    style={{ height: '58px', fontSize: '20px' }}
                                    type="text"
                                    variant="solid"
                                    className="w-100 border-2 border-success text-success button_hover"
                                    icon={<ShoppingCartOutlined />}
                                    size={'large'}>
                                    Savatga qo’shish
                                </Button>
                            )}
                            <Button
                                iconPosition="end"
                                onClick={handleAddItemToWishlist}
                                style={{
                                    height: '58px',
                                    width: '80px',
                                    fontSize: '28px',
                                }}
                                type="text"
                                variant="solid"
                                className="border-2 border-success text-success button_hover"
                                aria-label="Wishlistga qo'shish"
                                icon={
                                    wishlist?.some(
                                        (item) =>
                                            Number(item.id) ===
                                            Number(product?.id)
                                    ) ? (
                                        <FaHeart />
                                    ) : (
                                        <FaRegHeart />
                                    )
                                }
                                size={'large'}></Button>
                        </div>
                    ) : null}

                    <CustomResponsiveLayout
                        handleBuynow={handleBuynow}
                        product={product}
                    />
                </div>
            </div>

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
            <AuthModal
                open={authModal}
                onClose={() => setAuthModal(false)}
                onGoogleSuccessNavigateTo={'/account/checkout'}
                onSuccess={() => {
                    Router.push('/account/checkout');
                }}
            />
        </>
    );
}

const CustomResponsiveLayout = ({ product, handleBuynow }) => {
    const { isMobile, size } = useResponsive();
    return (
        <>
            <div
                className={`d-flex flex-column gap-3 ${
                    isMobile ? 'sticky-bottom-btn' : ''
                }`}>
                {product?.document?.file_url ? (
                    <a href={product?.document?.file_url} target="_blank">
                        <Button
                            iconPosition="end"
                            style={{ height: '58px', fontSize: '20px' }}
                            type="primary"
                            className="w-100 bg-success"
                            icon={<DownloadOutlined />}
                            size={'large'}>
                            Yuklab olish
                        </Button>
                    </a>
                ) : (
                    <Button
                        onClick={(e) => handleBuynow(e)}
                        iconPosition="end"
                        style={{ height: '58px', fontSize: '20px' }}
                        type="primary"
                        className="w-100 bg-success truncate-text text-truncate"
                        icon={<DownloadOutlined />}
                        size={'large'}>
                        Hoziroq xarid qilish (
                        {formatCurrencyWithSpace(product?.price)} so'm)
                    </Button>
                )}
            </div>
            {isMobile && (
                <div className={`d-flex flex-column gap-3 `}>
                    {product?.document?.file_url ? (
                        <a href={product?.document?.file_url} target="_blank">
                            <Button
                                iconPosition="end"
                                style={{
                                    height: '58px',
                                    fontSize: '20px',
                                }}
                                type="primary"
                                className="w-100 bg-success"
                                icon={<DownloadOutlined />}
                                size={'large'}>
                                Yuklab olish
                            </Button>
                        </a>
                    ) : (
                        <Button
                            onClick={(e) => handleBuynow(e)}
                            iconPosition="end"
                            style={{ height: '58px', fontSize: '20px' }}
                            type="primary"
                            className="w-100 bg-success"
                            icon={<DownloadOutlined />}
                            size={'large'}>
                            {`Hoziroq xarid qilish ${
                                size >= 360
                                    ? `(${formatCurrencyWithSpace(
                                          product?.price
                                      )} so'm)`
                                    : ''
                            }`}
                        </Button>
                    )}
                </div>
            )}
        </>
    );
};

export default FileActions;
