import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
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
import { useSelector } from 'react-redux';
import useResponsive from '~/shared/utilities/useResponsive';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import AuthModal from '~/features/auth/ui/auth-modal';
import { FaRegHeart } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaFileWord, FaS } from 'react-icons/fa6';
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
    '.psd': '#0053BD',
    '.pptx': '#DD7657',
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
};

function FileActions({ product }) {
    const { t } = useTranslation('product-pages');
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
        messageApi.success(
            `${t('productDetail.fileActions.copySuccess')} (${url})`
        );
    };
    const infoError = (url) => {
        messageApi.error(
            `${t('productDetail.fileActions.copyError')} (${url})`
        );
    };

    const copyVideoUrl = () => {
        if (!pid) {
            infoError(t('productDetail.fileActions.videoIdNotFound'));
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
                            <h2>{t('productDetail.fileActions.free')}</h2>
                        ) : product?.discount === 0 ? (
                            <h2>
                                {addPeriodToThousands(
                                    product?.discount_price || 0
                                )}{' '}
                                {t('productDetail.fileActions.currency')}
                            </h2>
                        ) : (
                            <div className="d-flex gap-3">
                                <h2>
                                    {addPeriodToThousands(
                                        product?.discount_price || 0
                                    )}{' '}
                                    {t('productDetail.fileActions.currency')}
                                </h2>
                                <del>
                                    {addPeriodToThousands(product?.price || 0)}{' '}
                                    {t('productDetail.fileActions.currency')}
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
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaBagShopping className={styles.infoKeyIcon} />{' '}
                                {t('productDetail.fileActions.soldCount')}{' '}
                            </div>
                            <span>
                                {product?.sold_count}{' '}
                                {t('productDetail.fileActions.countUnit')}
                            </span>
                        </li>
                    )}
                    {product?.document?.content_duration && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaStopwatch className={styles.infoKeyIcon} />
                                {t('productDetail.fileActions.videoDuration')}
                            </div>{' '}
                            <span> {product?.document?.content_duration}</span>
                        </li>
                    )}
                    {product?.document?.page_count && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <PiFilesFill className={styles.infoKeyIcon} />{' '}
                                {t('productDetail.fileActions.pageCount')}
                            </div>
                            <span>
                                {product?.document?.page_count}{' '}
                                {t('productDetail.fileActions.countUnit')}
                            </span>
                        </li>
                    )}
                    {product?.document?.file_size && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaDatabase className={styles.infoKeyIcon} />
                                {t('productDetail.fileActions.fileSize')}
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
                                        ]
                                    }
                                    className={styles.infoKeyIcon}
                                />
                                {t('productDetail.fileActions.fileType')}
                            </div>
                            <span
                                style={{
                                    color: 'white',
                                    padding: '4px 9px',
                                    borderRadius: '4px',
                                    backgroundColor:
                                        fileColors[
                                            product?.document?.file_type
                                        ],
                                }}>
                                {product?.document?.file_type}
                            </span>
                        </li>
                    )}
                    {product?.three_d_features?.style?.name && (
                        <li className={styles.infoRow}>
                            <div className={styles.infoKey}>
                                <FaCube className={styles.infoKeyIcon} />
                                {t('productDetail.fileActions.style')}
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
                                    {t('productDetail.fileActions.height')}
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
                                    {t('productDetail.fileActions.width')}
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
                                    {t('productDetail.fileActions.length')}
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
                                {t('productDetail.fileActions.color')}
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
                                {t('productDetail.fileActions.materials')}
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
                                {t('productDetail.fileActions.shape')}
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
                                {t('productDetail.fileActions.render')}
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
                                {t('productDetail.fileActions.platform')}
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
                                    type="text"
                                    variant="solid"
                                    className="w-100 border-2 border-success text-success button_hover"
                                    icon={<ShoppingCartOutlined />}
                                    size={'large'}>
                                    {t('productDetail.fileActions.addToCart')}
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
                                aria-label={t(
                                    'productDetail.fileActions.addToWishlist'
                                )}
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
                title={t('productCard.modal.title')}
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
                okText={t('productCard.modal.goToCart')}
                cancelText={t('productCard.modal.continueShopping')}>
                <p></p>
                <p>{t('productCard.modal.message')}</p>
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
    const { t } = useTranslation('product-pages');
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
                            {t('productDetail.fileActions.download')}
                        </Button>
                    </a>
                ) : (
                    <Button
                        onClick={(e) => handleBuynow(e)}
                        iconPosition="end"
                        style={{ height: '58px', fontSize: '20px' }}
                        type="primary"
                        className="w-100 bg-success text-truncate"
                        icon={<DownloadOutlined />}
                        size={'large'}>
                        {t('productDetail.fileActions.buyNow')}
                        {formatCurrencyWithSpace(product?.price)}{' '}
                        {t('productDetail.fileActions.currency')})
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
                                {t('productDetail.fileActions.download')}
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
                            {`${t('productDetail.fileActions.buyNow').replace(
                                ' (',
                                ''
                            )} ${
                                size >= 360
                                    ? `(${formatCurrencyWithSpace(
                                          product?.price
                                      )} ${t(
                                          'productDetail.fileActions.currency'
                                      )})`
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
