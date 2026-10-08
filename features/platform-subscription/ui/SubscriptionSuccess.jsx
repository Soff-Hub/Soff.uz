import React, { useEffect, useMemo, useState } from 'react';
import { MdCheck, MdDownload, MdAllInclusive, MdAutoAwesome, MdArrowForward } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { SOFFX_PLAN_LABELS } from '../model';
import styles from './SubscriptionSuccess.module.scss';

const REDIRECT_SECONDS = 8;
const CONFETTI_COLORS = ['#00a44f', '#3ddc84', '#b8ecd0', '#f5c542', '#6d3ff5', '#ffffff'];

// Fixed pseudo-random pieces: stable between renders, no Math.random during render.
const CONFETTI = Array.from({ length: 28 }, (_, i) => ({
    left: (i * 37) % 100,
    delay: ((i * 53) % 900) / 1000,
    duration: 1.8 + ((i * 29) % 12) / 10,
    rotate: (i * 47) % 360,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    wide: i % 3 === 0,
}));

/**
 * Celebration step after a successful subscription payment. Counts down and
 * then calls onContinue (which opens /account/subscription); the button skips the wait.
 */
const SubscriptionSuccess = ({ subscription, fallbackTier, onContinue }) => {
    const tier = subscription?.tier || fallbackTier;
    const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

    useEffect(() => {
        const id = setInterval(() => setSecondsLeft((prev) => Math.max(prev - 1, 0)), 1000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (secondsLeft === 0) onContinue();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secondsLeft]);

    const facts = useMemo(() => {
        if (!tier) return [];
        const items = [
            {
                icon: <MdDownload />,
                text: `Bu oy ${subscription?.current_period?.downloads_left ?? tier.monthly_limit} ta fayl`,
            },
            {
                icon: <MdAllInclusive />,
                text:
                    tier.max_document_price == null
                        ? 'Barcha fayllar ochiq'
                        : `${addPeriodToThousands(tier.max_document_price)} so'mgacha fayllar`,
            },
        ];
        const aiLabel = SOFFX_PLAN_LABELS[subscription?.soffx?.plan || tier.soffx_plan];
        if (aiLabel) items.push({ icon: <MdAutoAwesome />, text: aiLabel });
        return items;
    }, [tier, subscription]);

    return (
        <div className={styles.wrap}>
            <div className={styles.hero}>
                <div className={styles.confetti} aria-hidden>
                    {CONFETTI.map((piece, i) => (
                        <span
                            key={i}
                            className={piece.wide ? styles.pieceWide : styles.piece}
                            style={{
                                left: `${piece.left}%`,
                                background: piece.color,
                                animationDelay: `${piece.delay}s`,
                                animationDuration: `${piece.duration}s`,
                                '--rotate': `${piece.rotate}deg`,
                            }}
                        />
                    ))}
                </div>

                <span className={styles.badge} aria-hidden>
                    <MdCheck />
                </span>
                {tier?.title && <span className={styles.tierPill}>{tier.title} obunasi</span>}
            </div>

            <div className={styles.body}>
                <h3 className={styles.title}>Tabriklaymiz!</h3>
                <p className={styles.subtitle}>Obunangiz faollashtirildi — endi fayllarni bir bosishda oling.</p>

                {facts.length > 0 && (
                    <ul className={styles.facts}>
                        {facts.map((fact) => (
                            <li key={fact.text}>
                                <span aria-hidden>{fact.icon}</span>
                                {fact.text}
                            </li>
                        ))}
                    </ul>
                )}

                <button type="button" className={styles.cta} onClick={onContinue}>
                    Obunamga o'tish
                    <MdArrowForward aria-hidden />
                </button>
                <p className={styles.countdown} aria-live="polite">
                    {secondsLeft} soniyadan so'ng avtomatik o'tiladi
                </p>
                <div className={styles.timer} aria-hidden>
                    <span style={{ animationDuration: `${REDIRECT_SECONDS}s` }} />
                </div>
            </div>
        </div>
    );
};

export default SubscriptionSuccess;
