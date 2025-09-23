import React, { useEffect, useState } from 'react';
import styles from '../styles/detail.module.scss';
import { Button, Modal } from 'antd';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import AuthModal from '~/components/AuthModal';
import { useSelector } from 'react-redux';
import ServiceCheckout from './auth/serviceCheckout';
import { useRouter } from 'next/router';

const PriceBox = ({ priceBox }) => {
    const { price, id, days, revisions, title, user } = priceBox;
    const [isOpen, setIsOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [open, setOpen] = useState(false)
    const { isLoggedIn } = useSelector(state => state.auth)
    const { query, pathname, replace } = useRouter()

    const handleClick = () => {
        if (isLoggedIn) {
            setIsOpen(true)
        } else {
            setOpen(true)
        }
    }

    useEffect(() => {
        if (query?.modal === "open") {
            setIsOpen(true)

            const newQuery = { ...query }
            delete newQuery.modal
            replace(
                {
                    pathname: pathname,
                    query: newQuery,
                },
                undefined,
                { shallow: true }
            )
        }
    }, [query?.modal])

    return (
        <div className={styles.priceBox}>
            <div className={styles.priceDiv}>
                <h2 className={styles.price}>
                    {formatCurrencyWithSpace(price)} so'm
                </h2>
            </div>
            <div className={styles.infoBox}>
                <p className={styles.info}>
                    <i className="fa-solid fa-clock"></i> {days} kunda yetkazish
                </p>
                <p className={styles.info}>
                    <i className="fa-solid fa-pen-to-square"></i> {revisions} marta
                    tahrirlash huquqi
                </p>
            </div>
            <Button
                onClick={handleClick}
                className={styles.btn}>
                Buyurtma berish
            </Button>
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
                                    Sizning to'lovingiz Soff tizimi tomonidan xavfsiz saqlanadi.
                                    Mutaxassisga to'lov faqat siz ishni ko'rib chiqib, tasdiqlaganingizdan so'ng amalga oshiriladi.
                                </p>
                            </div>

                            <div className="service-details-box bg-white border rounded p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                        <div>
                                            <h5 className="mb-1 fw-bold">{title}</h5>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h4 className="text-primary mb-0 fw-bold">
                                            {formatCurrencyWithSpace(price)} so'm
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="px-5 py-2"
                                    style={{ backgroundColor: '#28a745', borderColor: '#28a745' }}
                                    onClick={() => setShowPayment(true)}>
                                    Buyurtma berish
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="type_payment_h3 mb-0">
                                </h3>
                                <Button
                                    type="text"
                                    icon={<i className="fa-solid fa-arrow-left"></i>}
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
            <AuthModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default PriceBox;
