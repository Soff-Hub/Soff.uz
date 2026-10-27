import React, { useState } from 'react';
import { FaCheck, FaChevronDown } from 'react-icons/fa6';
import { HiGift } from 'react-icons/hi2';
import { MdAllInclusive } from 'react-icons/md';
import { addPeriodToThousands } from '~/features/account/ui/price-formatter';
import { getSoffxPlanFor, useSoffxPlans } from '../model';
import { SoffxFeatureIcon, SoffxMark } from './SoffxBadge';
import styles from './SoffxPlanIncludes.module.scss';

/**
 * What a tier's SoffX plan makes each month, the way SoffX's own pricing card
 * says it (SoffAIGenFrontend PlanIncludes.tsx): things, not tokens.
 *
 * Counts are the plan's own `services[].max_units` from SoffX's catalogue, so
 * they follow SoffX's prices. A service the plan does not list drops its row;
 * without the catalogue (SoffX down) only the models and perks are shown.
 */
const MAKE_ROWS = [
    { key: 'presentation', icon: 'presentation', title: 'Taqdimot', detail: '10 slayd' },
    { key: 'mustaqil_ish', icon: 'referat', title: 'Mustaqil ish', detail: null },
    { key: 'kurs_ishi', icon: 'coursework', title: 'Kurs ishi', detail: '30 bet' },
    { key: 'image_generation', icon: 'image', title: 'Rasm yaratish', detail: 'GPT Image 2.5' },
    { key: 'video', icon: 'video', title: 'Video yaratish', detail: '5 soniya' },
];

// The models every paid SoffX plan reaches. Brand names, never translated.
const MODELS = [
    { name: 'GPT Image 2.5', text: 'Rasm yaratish' },
    { name: 'Seedance 2.5', text: 'Video yaratish' },
    { name: 'Claude Motion', text: 'Motion video' },
];

// SoffX's live services (services.catalog.ts, status 'live').
const SOFFX_SERVICE_COUNT = 20;

// Rows shown before "Batafsil ko'rish": the cards stay short enough to compare.
const PREVIEW_ROWS = 2;

const SoffxPlanIncludes = ({ tier }) => {
    const { data: plans, isLoading } = useSoffxPlans();
    const [expanded, setExpanded] = useState(false);
    const plan = getSoffxPlanFor(tier, plans);

    const units = Object.fromEntries(
        (plan?.services || []).filter((s) => s.included).map((s) => [s.service_key, s.max_units])
    );
    const allRows = MAKE_ROWS.filter((row) => isLoading || units[row.key] > 0);
    const rows = expanded ? allRows : allRows.slice(0, PREVIEW_ROWS);
    const tokens = plan?.quotas?.tokens;

    return (
        <div className={`${styles.includes} ${tier.soffx_plan === 'ultra' ? styles.max : styles.pro}`}>
            {rows.length > 0 && (
                <section className={styles.panel}>
                    <h4>
                        <HiGift aria-hidden />
                        <span>
                            <SoffxMark plan={tier.soffx_plan} /> bilan har oy
                        </span>
                    </h4>
                    {tokens > 0 && <p className={styles.tokens}>{addPeriodToThousands(tokens)} token</p>}
                    <ul>
                        {rows.map((row) => (
                            <li key={row.key}>
                                <span className={styles.icon}>
                                    <SoffxFeatureIcon name={row.icon} />
                                </span>
                                <span className={styles.name}>
                                    {row.title}
                                    {row.detail && <span className={styles.detail}> · {row.detail}</span>}
                                </span>
                                {isLoading ? (
                                    <span className={styles.countSkeleton} />
                                ) : (
                                    <span className={styles.count}>≈ {addPeriodToThousands(units[row.key])} ta</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {expanded && (
                <>
                    <section className={styles.panel}>
                        <h4>
                            <MdAllInclusive aria-hidden />
                            <span>Modellar</span>
                        </h4>
                        <ul>
                            {MODELS.map((model) => (
                                <li key={model.name}>
                                    <FaCheck className={styles.check} aria-hidden />
                                    <span className={styles.name}>
                                        {model.name}
                                        <span className={styles.detail}> · {model.text}</span>
                                    </span>
                                    <span className={styles.included}>Kiritilgan</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <ul className={styles.perks}>
                        <li>
                            <FaCheck aria-hidden /> Barcha {SOFFX_SERVICE_COUNT} ta AI xizmat
                        </li>
                        <li>
                            <FaCheck aria-hidden /> Hujjat, rasm va video uchun bitta balans
                        </li>
                        <li>
                            <FaCheck aria-hidden /> Natijani AI bilan tahrirlash
                        </li>
                    </ul>
                </>
            )}

            <button
                type="button"
                className={styles.toggle}
                aria-expanded={expanded}
                onClick={() => setExpanded((open) => !open)}>
                <FaChevronDown className={expanded ? styles.toggleOpen : undefined} aria-hidden />
                {expanded ? 'Yopish' : "Batafsil ko'rish"}
            </button>
        </div>
    );
};

export default SoffxPlanIncludes;
