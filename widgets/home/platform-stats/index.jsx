import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'motion/react';
import styles from './style.module.scss';

const AnimatedValue = ({ value, suffix = "+" }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => {
        return Math.floor(latest).toLocaleString() + suffix;
    });

    useEffect(() => {
        if (inView) {
            animate(count, value, {
                duration: 2,
                ease: "easeOut",
            });
        }
    }, [inView, value, count]);

    return <motion.span style={{ fontWeight: 600 }} ref={ref}>{rounded}</motion.span>;
};

const PlatformStats = () => {
    return (
        <section className={styles.platformStats}>
            <div className="container">
                <span className={styles.statsLabel}>Minglab kreatorlar ishongan platforma</span>
                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.val}>
                            <AnimatedValue value={1000000} />
                        </span>
                        <span className={styles.name}>Raqamli mahsulotlar</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>
                            <AnimatedValue value={600000} />
                        </span>
                        <span className={styles.name}>Oylik faol foydalanuvchilar</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>
                            <AnimatedValue value={200000} />
                        </span>
                        <span className={styles.name}>Tranzaksiyalar</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.val}>
                            <AnimatedValue value={30000} />
                        </span>
                        <span className={styles.name}>Mutaxassislar soni</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PlatformStats;