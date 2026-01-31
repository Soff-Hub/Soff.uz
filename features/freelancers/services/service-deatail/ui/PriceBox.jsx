import React, { useEffect, useState } from 'react';
import styles from '../styles/detail.module.scss';
import { Button } from 'antd';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import ServiceOrderModal from './ServiceOrderModal';
import { sleep } from '~/shared/utilities/sleep';
import { FaMoneyBillWave } from 'react-icons/fa6';
import { FaClock } from 'react-icons/fa6';
import { FaPenToSquare } from 'react-icons/fa6';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

const PriceBox = ({ priceBox, requirements }) => {
    const { price, days, revisions, user } = priceBox;
    const isBlocked = user[0]?.is_blocked;
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn } = useSelector((state) => state.auth);
    const { query, pathname, replace } = useRouter();

    const handleClick = ({ setModalOpen, setAuthOpen }) => {
        if (isLoggedIn) {
            setModalOpen(true);
        } else {
            safeLocalStorage.setItem('openPaymentModal', 'true');
            setAuthOpen(true);
        }
    };

    useEffect(() => {
        if (!isLoggedIn || isBlocked) return;
        if (query?.paymodal === 'open') {
            setIsOpen(true);
            const newQuery = { ...query };
            delete newQuery.paymodal;
            replace({ pathname, query: newQuery }, undefined, {
                shallow: true,
            });
        }
    }, [query?.paymodal, isLoggedIn, pathname, replace]);

    useEffect(() => {
        if (isLoggedIn) {
            const shouldOpenModal =
                safeLocalStorage.getItem('openPaymentModal');
            if (shouldOpenModal === 'true') {
                setIsOpen(true);
                safeLocalStorage.removeItem('openPaymentModal');
            }
        }
    }, [isLoggedIn]);

    const handleAuthSuccess = async ({ setModalOpen }) => {
        await sleep(200);
        setModalOpen(true);
    };

    return (
        <div className={styles.priceBox}>
            <div className={styles.infoBox}>
                {/* --- Narx --- */}
                <div className={styles.infoRow}>
                    <div className={styles.key}>
                        <FaMoneyBillWave className={styles.icon} />
                        <span>Narx</span>
                    </div>
                    <div className={styles.value}>
                        {formatCurrencyWithSpace(price)} so'm
                    </div>
                </div>

                {/* --- Yetkazish --- */}
                <div className={styles.infoRow}>
                    <div className={styles.key}>
                        <FaClock className={styles.icon} />
                        <span>Yetkazish</span>
                    </div>
                    <div className={styles.value}>{days} kunda</div>
                </div>

                {/* --- Tahrirlash --- */}
                <div className={styles.infoRow}>
                    <div className={styles.key}>
                        <FaPenToSquare className={styles.icon} />
                        <span>Tahrirlash</span>
                    </div>
                    <div className={styles.value}>{revisions} marta</div>
                </div>
            </div>
            <ServiceOrderModal
                requirements={requirements}
                handleAuthSuccess={handleAuthSuccess}
                order={priceBox}
                externalOpenModal={isOpen}>
                {({ setAuthOpen, setModalOpen }) => (
                    <Button
                        onClick={() =>
                            handleClick({
                                setModalOpen,
                                setAuthOpen,
                            })
                        }
                        className={!isBlocked && styles.btn}
                        disabled={isBlocked}>
                        Buyurtma berish ({formatCurrencyWithSpace(price)} so'm)
                    </Button>
                )}
            </ServiceOrderModal>
        </div>
    );
};

export default PriceBox;
