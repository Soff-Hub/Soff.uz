import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styles from '../styles/detail.module.scss';
import { useSelector } from 'react-redux';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';
import ServiceCheckout from './auth/serviceCheckout';
import AuthModal from '~/components/AuthModal';

const ServiceDescription = ({ description = {}, priceBox = {} }) => {
    const { price, id, days, revisions, title } = priceBox;
    const {
        requirements = '',
        file = '',
        serviceItems = [],
        description: descText = '',
    } = description;

    const [isOpen, setIsOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [openAuth, setOpenAuth] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);

    const handleOrderClick = () => {
        if (isLoggedIn) {
            setIsOpen(true);
        } else {
            setOpenAuth(true);
        }
    }; 
    

    return (
        <div className={styles.serviceDescription}>
            <h2>Xizmat tavsifi</h2>
            {descText && (
                <div
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
                    dangerouslySetInnerHTML={{ __html: descText }}
                />
            )}

            <h3>Boshlash uchun mutaxasisga kerak</h3>
            {requirements && (
                <div
                    style={{ borderBottom: '1px solid rgba(0,0,0,0.1)' }}
                    dangerouslySetInnerHTML={{ __html: requirements }}
                />
            )}
            {file && 
                <>
                    <h3>Xizmat talablari uchun shablon fayl</h3>
                    <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        href={file}
                        target="_blank"
                        download
                        className={styles.downloadBtn}>
                        Fayllarni yuklab olish
                    </Button>
                </>
            }
            {serviceItems?.length > 0 && (
                <div className={styles.serviceBox}>
                    <h3>Bu xizmat ichiga nimalar kiradi</h3>
                    {serviceItems.map((item, idx) => (
                        <p key={idx} className={styles.serviceItem}>
                            {idx + 1}. {item.service_item}
                        </p>
                    ))}
                </div>
            )}

            {/* <div className={styles.pricing}>
                <div className={styles.infoBox}>
                    <p className={styles.info}>
                        <i className="fa-solid fa-clock"></i> {days} kunda
                        yetkazish
                    </p>
                    <p className={styles.info}>
                        <i className="fa-solid fa-pen-to-square"></i>{' '}
                        {revisions} marta tahrirlash huquqi
                    </p>
                </div>
                <div className={styles.btnWrapper}>
                    <Button className={styles.btn} onClick={handleOrderClick}>
                        Buyurtma berish
                    </Button>
                </div>
            </div> */}

            {/* Modal */}
            <Modal
                open={isOpen}
                onCancel={() => {
                    setIsOpen(false);
                    setShowPayment(false);
                }}
                footer={null}
                width={600}>
                <div className="type_payment p-lg-5 p-md-5 p-4">
                    {!showPayment ? (
                        <>
                            <h3 className="type_payment_h3 text-center mb-4">
                                Buyurtma uchun to'lovni amalga oshiring
                            </h3>

                            <div className="security-message mb-4 text-center">
                                <i className="fa-solid fa-shield-halved text-success fs-4 mb-2"></i>
                                <p className="text-muted mb-0">
                                    Sizning to'lovingiz Soff tizimi tomonidan
                                    xavfsiz saqlanadi. Mutaxassisga to'lov faqat
                                    siz ishni ko'rib chiqib, tasdiqlaganingizdan
                                    so'ng amalga oshiriladi.
                                </p>
                            </div>

                            <div className="service-details-box bg-white border rounded p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                        <div>
                                            <h5 className="mb-1 fw-bold">
                                                {title}
                                            </h5>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h4 className="text-primary mb-0 fw-bold">
                                            {formatCurrencyWithSpace(price)}{' '}
                                            so'm
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="px-5 py-2"
                                    style={{
                                        backgroundColor: '#28a745',
                                        borderColor: '#28a745',
                                    }}
                                    onClick={() => setShowPayment(true)}>
                                    Buyurma berish
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="type_payment_h3 mb-0">
                                    {/* To'lov turini tanlang: */}
                                </h3>
                                <Button
                                    type="text"
                                    icon={
                                        <i className="fa-solid fa-arrow-left"></i>
                                    }
                                    onClick={() => setShowPayment(false)}>
                                    Orqaga
                                </Button>
                            </div>
                            <div className="bg-white">
                                <ServiceCheckout document={id} />
                            </div>
                        </>
                    )}
                </div>
            </Modal>

            {/* Auth Modal */}
            <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
        </div>
    );
};

export default ServiceDescription;
