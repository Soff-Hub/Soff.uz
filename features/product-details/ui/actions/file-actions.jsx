import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, message } from 'antd';
import {
    DownloadOutlined,
    HeartOutlined,
    ShoppingCartOutlined,
    DeleteOutlined,
    ShareAltOutlined,
} from '@ant-design/icons';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import useWishlist from '~/shared/hooks/useWishlist';
import useCart from '~/shared/hooks/useCart';
import { useSelector } from 'react-redux';
import useResponsive from '~/shared/utilities/useResponsive';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import AuthModal from '~/features/auth/ui/auth-modal';
import { api } from '~/repositories/api';
import FileDownloadLink from '~/shared/ui/file-download-link';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaFileWord } from 'react-icons/fa6';
import { FaFileExcel } from 'react-icons/fa6';
import { FaFilePowerpoint } from 'react-icons/fa6';
import { FaFilePdf } from 'react-icons/fa6';
import { FaFileVideo } from 'react-icons/fa6';
import { FaFileAudio } from 'react-icons/fa6';
import { FaFileCode } from 'react-icons/fa6';
import { FaFileArchive } from 'react-icons/fa';
import { FaFileImage } from 'react-icons/fa6';
import Icon from '~/shared/ui/Icon';
import { FaBagShopping } from 'react-icons/fa6';
import { FaStopwatch } from 'react-icons/fa6';
import { PiFilesFill } from 'react-icons/pi';
import { FaDatabase } from 'react-icons/fa';
import { FaCube } from 'react-icons/fa';
import { FaRulerVertical } from 'react-icons/fa6';
import { FaRulerHorizontal } from 'react-icons/fa6';
import { FaArrowsAltH } from 'react-icons/fa';
import { FaPalette } from 'react-icons/fa6';
import { FaLayerGroup } from 'react-icons/fa6';
import { FaShapes } from 'react-icons/fa6';
import { HiSparkles } from 'react-icons/hi2';
import styles from './file-actions.module.scss';

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
    '.rar': '#9B59B6',
    '.psd': '#0053BD',
    '.pptx': '#DD7657',
    '.mov': '#6EB5E9',
};

export const fileReactIcons = {
    '.docx': FaFileWord, // Word yangi format
    '.doc': FaFileWord, // Word hujjati
    '.xls': FaFileExcel, // Excel eski format
    '.xlsx': FaFileExcel, // Excel yangi format
    '.ppt': FaFilePowerpoint, // PowerPoint
    '.pptx': FaFilePowerpoint, // PowerPoint yangi format
    '.pdf': FaFilePdf, // PDF
    '.avi': FaFileVideo, // Video format
    '.mp4': FaFileVideo, // Video format
    '.mp3': FaFileAudio, // Audio format
    '.html': FaFileCode, // Kod (html)
    '.zip': FaFileArchive, // Zip arxiv
    '.rar': FaFileArchive, // RAR arxiv
    '.psd': FaFileImage, // PSD - rasm/foto format
    '.png': FaFileImage, // PNG - rasm/foto format
    '.jpg': FaFileImage, // JPG - rasm/foto format
    '.jpeg': FaFileImage, // JPEG - rasm/foto format
    '.gif': FaFileImage, // GIF - rasm/foto format
    '.bmp': FaFileImage, // BMP - rasm/foto format
    '.tiff': FaFileImage, // TIFF - rasm/foto format
    '.svg': FaFileImage, // SVG - rasm/foto format
    '.ps': FaFileImage, // PS - rasm/foto format
    '.mov': FaFileVideo, // MOV video format
};

function FileActions({ product }) {
    const { addSavedItem, wishlist, removeSavedItem } = useWishlist();
    const [authModal, setAuthModal] = useState(false);
    const Router = useRouter();
    const pid = Router.asPath;
    const { setCartOneItem, removeCartOneItem, cartItems } = useCart();
    const isAddedToCart = cartItems?.some(
        (item) => Number(item.id) === Number(product?.id)
    );
    const [messageApi, contextHolder] = message.useMessage();
    const { activePromotion } = useSelector((state) => state.ecomerce);
    const state = useSelector((state) => state.auth.user?.access);

    function handleAddItemToCart(e) {
        e.preventDefault();
        if (isAddedToCart) {
            removeCartOneItem(product.id);
        } else {
            setCartOneItem(product.id);
        }
    }

    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item) => item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    }

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
        const telegramUrl = `https://telegram.me/share/url?url=${encodeURIComponent(
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
                        ) : activePromotion?.discount_percent > 0 ? (
                            <div className="d-flex gap-3 align-items-center">
                                <h2 className="mb-0">
                                    {addPeriodToThousands(
                                        Math.round(product.price * (1 - activePromotion.discount_percent / 100))
                                    )}{' '}
                                    so'm
                                </h2>
                                <del style={{ color: '#999', fontSize: '1.2rem' }}>
                                    {addPeriodToThousands(product?.price || 0)}{' '}
                                    so'm
                                </del>
                                <span style={{ fontSize: '1.2rem', color: '#fff', padding: '0.5rem', borderRadius: '5px', fontWeight: 'bold' }} className="badge bg-success ">-{activePromotion.discount_percent}%</span>
                            </div>
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
                        {product?.seller?.id === 69 && (
                            <div className={styles.aiBadge}>
                                <HiSparkles className={styles.aiIcon} />
                                <span className='text-black'>AI orqali yaratilgan</span>
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
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaBagShopping className={styles.infoKeyIcon} />{' '}
                                Mahsulotni sotilgan soni:{' '}
                            </div>
                            <span>{product?.sold_count} ta</span>
                        </li>
                    )}
                    {product?.document?.content_duration && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaStopwatch className={styles.infoKeyIcon} />
                                Video davomiyligi:
                            </div>{' '}
                            <span> {product?.document?.content_duration}</span>
                        </li>
                    )}
                    {product?.document?.page_count && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <PiFilesFill className={styles.infoKeyIcon} />{' '}
                                Betlar soni:
                            </div>
                            <span>{product?.document?.page_count} ta</span>
                        </li>
                    )}
                    {product?.document?.file_size && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaDatabase className={styles.infoKeyIcon} />
                                Fayl hajmi :
                            </div>
                            <span>{product?.document?.file_size}</span>
                        </li>
                    )}
                    {product?.document?.file_type && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <Icon
                                    icon={
                                        fileReactIcons[
                                        product?.document?.file_type
                                        ] || FaFileVideo
                                    }
                                    className={styles.infoKeyIcon}
                                />
                                Fayl turi:
                            </div>
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
                                {product?.document?.file_type}
                            </span>
                        </li>
                    )}
                    {product?.three_d_features?.style?.name && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaCube className={styles.infoKeyIcon} />
                                Uslub:
                            </div>
                            <span>{product.three_d_features?.style.name}</span>
                        </li>
                    )}

                    {product?.three_d_features?.height_value &&
                        product?.three_d_features?.height_unit && (
                            <li className={styles.infoRow}>
                                <div className={styles.infoKey}>
                                    <FaRulerVertical
                                        className={styles.infoKeyIcon}
                                    />
                                    Balandlik:
                                </div>
                                <span>
                                    {product.three_d_features?.height_value}{' '}
                                    {product.three_d_features?.height_unit}
                                </span>
                            </li>
                        )}

                    {product?.three_d_features?.width_value &&
                        product?.three_d_features?.width_unit && (
                            <li className={styles.infoRow}>
                                <div className={styles.infoKey}>
                                    <FaArrowsAltH
                                        className={styles.infoKeyIcon}
                                    />
                                    Eni:
                                </div>
                                <span>
                                    {product.three_d_features?.width_value}{' '}
                                    {product.three_d_features?.width_unit}
                                </span>
                            </li>
                        )}

                    {product?.three_d_features?.length_value &&
                        product?.three_d_features?.length_unit && (
                            <li className={styles.infoRow}>
                                <div className={styles.infoKey}>
                                    <FaRulerHorizontal
                                        className={styles.infoKeyIcon}
                                    />
                                    Uzunlik:
                                </div>
                                <span>
                                    {product.three_d_features?.length_value}{' '}
                                    {product.three_d_features?.length_unit}
                                </span>
                            </li>
                        )}

                    {product?.three_d_features?.colors?.length > 0 && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaPalette className={styles.infoKeyIcon} />
                                Rang:
                            </div>
                            <span>
                                {product.three_d_features?.colors?.map(
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
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaLayerGroup className={styles.infoKeyIcon} />
                                Materiallar:
                            </div>
                            <span>
                                {product.three_d_features?.materials
                                    .map((m) => m.name)
                                    .join(', ')}
                            </span>
                        </li>
                    )}

                    {product?.three_d_features?.product_form?.icon && (
                        <li className={styles.infoRow}>
                            <span className={styles.infoKey}>
                                <FaShapes className={styles.infoKeyIcon} />
                                Shakl:
                            </span>
                            <span>
                                <img
                                    width="20px"
                                    src={
                                        product.three_d_features?.product_form
                                            ?.form_image
                                    }
                                    alt="icon"
                                />
                            </span>
                        </li>
                    )}

                    {product?.three_d_features?.render_obj?.length > 0 && (
                        <li className={styles.infoRow}>
                            <span className={styles.infoKey}>
                                <FaShapes className={styles.infoKeyIcon} />
                                Render:
                            </span>

                            <div className="d-flex gap-2 flex-wrap">
                                {product.three_d_features?.render_obj?.map(
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
                        <li className={styles.infoRow}>
                            <span className={styles.infoKey}>
                                <FaCube className={styles.infoKeyIcon} />
                                Platforma:
                            </span>
                            <span>{product.three_d_features?.platform}</span>
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
                                    type={isAddedToCart ? "primary" : "text"}
                                    danger={isAddedToCart}
                                    className={`w-100 button_hover ${isAddedToCart
                                        ? ''
                                        : 'border-2 border-success text-success'
                                        }`}
                                    icon={isAddedToCart ? <DeleteOutlined /> : <ShoppingCartOutlined />}
                                    size={'large'}>
                                    {isAddedToCart ? "Savatdan olib tashlash" : "Savatga qo’shish"}
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
    const { activePromotion } = useSelector((state) => state.ecomerce);
    const [telegramLoading, setTelegramLoading] = useState(false);

    const displayPrice = activePromotion?.discount_percent > 0
        ? Math.round(product?.price * (1 - activePromotion.discount_percent / 100))
        : product?.price;

    const handleDownloadThroughTelegram = async () => {
        if (!product?.id) return;

        try {
            setTelegramLoading(true);
            const { data } = await api.get(
                `seller/return-telegram-link/${product.id}/`
            );

            if (data?.link) {
                window.open(data.link, '_blank');
                return;
            }

            message.error('Telegram havolasi topilmadi');
        } catch (error) {
            console.error('Telegram download error:', error);
            message.error('Telegram orqali yuklab olishda xatolik yuz berdi');
        } finally {
            setTelegramLoading(false);
        }
    };

    const renderPurchasedActions = () => (
        <>
            <FileDownloadLink
                url={product?.document?.file_url}
                filename={product?.title}
                className={styles.downloadLink}>
                <Button
                    iconPosition="end"
                    style={{ height: '58px', fontSize: '20px' }}
                    type="primary"
                    className="w-100 bg-success"
                    icon={<DownloadOutlined />}
                    size={'large'}>
                    Yuklab olish
                </Button>
            </FileDownloadLink>
            <Button
                onClick={handleDownloadThroughTelegram}
                loading={telegramLoading}
                style={{ height: '58px', fontSize: '20px' }}
                type="default"
                className={styles.telegramButton}
                size={'large'}>
                <img
                    src="/static/img/telegram.png"
                    alt="Telegram"
                    height={24}
                />
                <span>Telegram orqali olish</span>
            </Button>
        </>
    );

    return (
        <>
            <div
                className={`d-flex flex-column gap-3 ${isMobile ? 'sticky-bottom-btn' : ''}`}>
                {product?.document?.file_url ? (
                    renderPurchasedActions()
                ) : (
                    <Button
                        onClick={(e) => handleBuynow(e)}
                        iconPosition="end"
                        style={{ height: '58px', fontSize: '20px' }}
                        type="primary"
                        className="w-100 bg-success text-truncate"
                        icon={<DownloadOutlined />}
                        size={'large'}>
                        Hoziroq xarid qilish (
                        {formatCurrencyWithSpace(displayPrice)} so'm)
                    </Button>
                )}
            </div>
            {isMobile && (
                <div className={`d-flex flex-column gap-3 `}>
                    {product?.document?.file_url ? (
                        renderPurchasedActions()
                    ) : (
                        <Button
                            onClick={(e) => handleBuynow(e)}
                            iconPosition="end"
                            style={{ height: '58px', fontSize: '20px' }}
                            type="primary"
                            className="w-100 bg-success"
                            icon={<DownloadOutlined />}
                            size={'large'}>
                            {`Hoziroq xarid qilish ${size >= 360
                                ? `(${formatCurrencyWithSpace(displayPrice)} so'm)`
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
