import React from 'react';
import { Popover } from 'antd';
import { HiSparkles } from 'react-icons/hi2';
import { MdArrowForward, MdInfoOutline } from 'react-icons/md';
import {
    RiAwardFill,
    RiBookOpenFill,
    RiFileList3Fill,
    RiGraduationCapFill,
    RiImageFill,
    RiPresentationFill,
    RiVideoFill,
} from 'react-icons/ri';
import { SOFFX_FEATURES, SOFFX_PLAN_NOTES, SOFFX_URL } from '../model';
import styles from './SoffxBadge.module.scss';

const FEATURE_ICONS = {
    video: RiVideoFill,
    image: RiImageFill,
    presentation: RiPresentationFill,
    coursework: RiFileList3Fill,
    referat: RiBookOpenFill,
    diploma: RiAwardFill,
    lesson: RiGraduationCapFill,
};

const PLAN_SUFFIX = { pro: 'Pro', ultra: 'Max' };

export const SoffxFeatureIcon = ({ name }) => {
    const Icon = FEATURE_ICONS[name] || HiSparkles;
    return <Icon aria-hidden />;
};

// The SoffX wordmark as the home page writes it: "Soff" + a green "x".
export const SoffxMark = ({ plan }) => (
    <span className={styles.mark}>
        Soff<span className={styles.markX}>x</span> AI{PLAN_SUFFIX[plan] ? ` ${PLAN_SUFFIX[plan]}` : ''}
    </span>
);

const SoffxInfo = ({ plan }) => (
    <div className={styles.info}>
        <div className={styles.infoHead}>
            <span className={styles.infoLogo}>
                <HiSparkles aria-hidden />
            </span>
            <div>
                <p className={styles.infoTitle}>
                    <SoffxMark plan={plan} />
                </p>
                <p className={styles.infoText}>Sun'iy intellekt yordamchisi — obunaga qo'shib beriladi</p>
            </div>
        </div>

        <ul className={styles.grid}>
            {SOFFX_FEATURES.map((feature) => (
                <li key={feature.key} className={feature.key === 'video' ? styles.featured : ''}>
                    <SoffxFeatureIcon name={feature.key} />
                    {feature.title}
                </li>
            ))}
        </ul>

        <div className={styles.infoFoot}>
            {SOFFX_PLAN_NOTES[plan] && <span>{SOFFX_PLAN_NOTES[plan]}</span>}
            <a href={SOFFX_URL} target="_blank" rel="noopener noreferrer">
                Batafsil <MdArrowForward aria-hidden />
            </a>
        </div>
    </div>
);

/**
 * "Soffx AI Pro / Max" badge that explains itself: a click opens what SoffX AI can do.
 * People seeing the badge for the first time don't know what SoffX is.
 */
const SoffxBadge = ({ plan, className = '' }) => {
    if (!PLAN_SUFFIX[plan]) return null;

    return (
        <Popover
            content={<SoffxInfo plan={plan} />}
            trigger="click"
            placement="bottom"
            arrow={false}
            overlayClassName={styles.popover}>
            <button
                type="button"
                className={`${styles.badge} ${className}`}
                aria-label={`Soffx AI ${PLAN_SUFFIX[plan]} — bu nima?`}
                onClick={(e) => {
                    // Badges sit inside cards and links: open the explanation only.
                    e.preventDefault();
                    e.stopPropagation();
                }}>
                <HiSparkles aria-hidden className={styles.spark} />
                <SoffxMark plan={plan} />
                <MdInfoOutline aria-hidden className={styles.infoIcon} />
            </button>
        </Popover>
    );
};

export default SoffxBadge;
