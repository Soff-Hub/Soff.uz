import React, { useState } from 'react';
import styles from './style.module.scss';
import CreateOrderModal from '../../shared/components/modals/CreateOrderModal';
import AuthModal from '~/components/AuthModal';
import { useSelector } from 'react-redux';

const GrayCard = ({
    title = '',
    btn = '',
    goProducts = () => {},
    link = '',
}) => {
    const [open, setOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { isLoggedIn } = useSelector(state => state.auth);

    const handleOrder = e => {
        e.preventDefault();
        if (isLoggedIn) {
            setOpen(true);
        } else {
            setIsOpen(true);
        }
    };
    return (
        <section className={styles.readyProducts}>
            <div className={styles.block}>
                <h1 className={styles.title}>{title}</h1>
                <a
                    onClick={handleOrder}
                    href={link}
                    target="_blank"
                    className={styles.catalogSeeAll}>
                    {btn}{' '}
                    <i
                        style={{ marginLeft: '12px' }}
                        className="fa-solid fa-arrow-right"></i>
                </a>
            </div>
            <AuthModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onSuccess={() => {
                    setOpen(true);
                }}
            />
            <CreateOrderModal open={open} onClose={() => setOpen(false)} />
        </section>
    );
};

export default GrayCard;
