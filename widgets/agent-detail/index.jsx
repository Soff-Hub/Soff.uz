import React, { useState } from 'react';
import Link from 'next/link';
import {
    RiArrowRightSLine,
    RiArrowRightUpLine,
    RiCheckLine,
    RiCloseLine,
    RiStarFill,
    RiPlayFill,
    RiTimeLine,
    RiShieldCheckLine,
    RiSparklingFill,
    RiUserLine,
    RiMessage3Line,
} from 'react-icons/ri';
import {
    AGENT_APP_URL,
    AGENT_CHAT_URL,
    AI_AGENTS,
    agentImage,
    agentPath,
} from '~/entities/ai-agent/model';
import styles from './style.module.scss';

function formatNumber(n) {
    if (!n) return '0';
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

const AgentDetail = ({ agent }) => {
    const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' | 'yearly'
    const [selectedPlanId, setSelectedPlanId] = useState('pro');
    const [activeStyle, setActiveStyle] = useState(agent.styles?.[0] || 'Dinamik');
    const [activeSample, setActiveSample] = useState(null);

    const plans = agent.plans || [
        {
            id: 'start',
            name: 'Start',
            monthlyPrice: 129000,
            yearlyPrice: 103200,
            features: '10 ta vazifa/oy · Standart sifat · Har biriga 2 ta tuzatish',
        },
        {
            id: 'pro',
            name: 'Pro',
            isPopular: true,
            monthlyPrice: 249000,
            yearlyPrice: 199200,
            features: '30 ta vazifa/oy · Yuqori aniqlik · Brend shablon · 5 ta tuzatish',
        },
        {
            id: 'biznes',
            name: 'Biznes',
            monthlyPrice: 499000,
            yearlyPrice: 399200,
            features: '60 ta vazifa/oy · Ustuvor navbat · 2 jamoa a’zosi',
        },
    ];

    const currentPlan = plans.find((p) => p.id === selectedPlanId) || plans[1] || plans[0];
    const related = agent.relatedStyles || [
        {
            author: 'Soff agent',
            title: 'Standart uslub',
            desc: 'Tez va sifatli natija',
            rating: 4.8,
            subscribers: 120,
            price: '99 000 so‘m/oy dan',
        },
    ];

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Breadcrumbs */}
                <nav aria-label="Breadcrumb" className={styles.crumbs}>
                    <Link href="/">
                        <a>Bosh sahifa</a>
                    </Link>
                    <span className={styles.crumbSep}>/</span>
                    <a href={AGENT_APP_URL}>AI Agentlar</a>
                    <span className={styles.crumbSep}>/</span>
                    <span>{agent.category}</span>
                    <span className={styles.crumbSep}>/</span>
                    <span aria-current="page">{agent.title || agent.name}</span>
                </nav>

                {/* Main 2-column marketplace layout */}
                <div className={styles.layout}>
                    {/* Left Column */}
                    <main className={styles.mainContent}>
                        {/* 1. Header Card */}
                        <section className={styles.card}>
                            <div className={styles.headerTop}>
                                <div className={styles.agentAvatarWrap}>
                                    <img
                                        src={agentImage(agent.id, 'bust')}
                                        alt={agent.name}
                                        width={72}
                                        height={72}
                                        className={styles.agentAvatar}
                                    />
                                    <span className={styles.onlineDot} title="Onlayn 24/7" />
                                </div>
                                <div className={styles.headerInfo}>
                                    <div className={styles.badgeRow}>
                                        <span
                                            className={styles.catBadge}
                                            style={{
                                                backgroundColor: `${agent.badgeColor || '#00a44f'}15`,
                                                color: agent.badgeColor || '#00a44f',
                                            }}>
                                            {agent.badges?.[0] || agent.category}
                                        </span>
                                        {agent.badges?.[1] && (
                                            <span className={styles.subBadge}>{agent.badges[1]}</span>
                                        )}
                                    </div>
                                    <h1 className={styles.title}>{agent.title || agent.name}</h1>
                                    <p className={styles.about}>{agent.about}</p>

                                    {/* Stats Bar */}
                                    <div className={styles.statsBar}>
                                        <span className={styles.statItem}>
                                            <RiStarFill className={styles.starIcon} />
                                            <strong>{agent.stats?.rating || '4.9'}</strong>
                                            <span className={styles.mutedText}>
                                                ({agent.stats?.reviewsCount || '312'} sharh)
                                            </span>
                                        </span>
                                        <span className={styles.statDot}>·</span>
                                        <span className={styles.statItem}>
                                            {agent.stats?.activeSubscribers || '188'} faol obunachi
                                        </span>
                                        <span className={styles.statDot}>·</span>
                                        <span className={styles.statItem}>
                                            {agent.stats?.completedTasks || '3 100+'} bajarilgan vazifa
                                        </span>
                                        <span className={styles.statDot}>·</span>
                                        <span className={styles.statItem}>
                                            {agent.stats?.avgTime || 'O‘rtacha 8 daqiqa'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Author Row */}
                            <div className={styles.authorRow}>
                                <div className={styles.authorMeta}>
                                    <div className={styles.authorAvatar}>
                                        {agent.author?.initials || 'SK'}
                                    </div>
                                    <div className={styles.authorDetails}>
                                        <span className={styles.authorLabel}>Agent muallifi:</span>
                                        <span className={styles.authorName}>
                                            {agent.author?.name || 'Sardor K.'} ·{' '}
                                            <span className={styles.authorRole}>
                                                {agent.author?.role || 'Mutaxassis'},{' '}
                                                {agent.author?.experience || '5 yil tajriba'}
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.authorActions}>
                                    <a href={AGENT_CHAT_URL} className={styles.authorBtn}>
                                        <RiUserLine aria-hidden="true" />
                                        Profil
                                    </a>
                                    <a
                                        href={`${AGENT_CHAT_URL}?author=${encodeURIComponent(agent.author?.name || agent.name)}`}
                                        className={styles.authorBtn}>
                                        <RiMessage3Line aria-hidden="true" />
                                        Xabar
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* 2. Namuna natijalar (Showcase / Samples) */}
                        <section className={styles.card}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Namuna natijalar</h2>
                                <span className={styles.sectionSubtitle}>
                                    agent tomonidan haqiqiy vazifalarda yaratilgan
                                </span>
                            </div>

                            <div className={styles.samplesGrid}>
                                {(agent.samples || []).map((sample) => (
                                    <div
                                        key={sample.id}
                                        className={styles.sampleCard}
                                        onClick={() => setActiveSample(sample)}>
                                        <div
                                            className={styles.sampleThumb}
                                            style={{ background: sample.gradient }}>
                                            <button
                                                type="button"
                                                className={styles.playButton}
                                                aria-label="Play sample">
                                                <RiPlayFill />
                                            </button>
                                            <span className={styles.sampleDuration}>
                                                {sample.duration}
                                            </span>
                                        </div>
                                        <span className={styles.sampleCaption}>{sample.title}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Can Do vs Cannot Do (2-column split) */}
                        <div className={styles.splitGrid}>
                            <section className={`${styles.card} ${styles.canDoCard}`}>
                                <h3 className={styles.splitTitle}>Agent nima qila oladi</h3>
                                <ul className={styles.checkList}>
                                    {(agent.canDo || agent.abilities || []).map((item, idx) => (
                                        <li key={idx} className={styles.checkItem}>
                                            <span className={styles.checkIcon}>
                                                <RiCheckLine />
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className={`${styles.card} ${styles.cannotDoCard}`}>
                                <h3 className={styles.splitTitle}>Nima qila olmaydi</h3>
                                <ul className={styles.crossList}>
                                    {(agent.cannotDo || []).map((item, idx) => (
                                        <li key={idx} className={styles.crossItem}>
                                            <span className={styles.crossIcon}>
                                                <RiCloseLine />
                                            </span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className={styles.customOrderBox}>
                                    <span className={styles.customOrderText}>
                                        Murakkab loyiha bormi?{' '}
                                        <a href={AGENT_CHAT_URL} className={styles.customOrderLink}>
                                            Muallifning o‘ziga buyurtma bering →
                                        </a>
                                    </span>
                                </div>
                            </section>
                        </div>

                        {/* 4. Uslub va formatlar */}
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Uslub va formatlar</h2>
                            <div className={styles.stylePills}>
                                {(agent.styles || ['Dinamik', 'Boshqacha', 'Barchasi']).map((style) => (
                                    <button
                                        key={style}
                                        type="button"
                                        onClick={() => setActiveStyle(style)}
                                        className={`${styles.stylePill} ${
                                            activeStyle === style ? styles.stylePillActive : ''
                                        }`}>
                                        {style}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.specsGrid}>
                                <div className={styles.specBox}>
                                    <span className={styles.specHeading}>Siz yuborasiz</span>
                                    <p className={styles.specDesc}>
                                        {agent.specs?.input ||
                                            'Vazifa tavsifi, xom materiallar va ko‘rsatmalar'}
                                    </p>
                                </div>
                                <div className={styles.specBox}>
                                    <span className={styles.specHeading}>Siz olasiz</span>
                                    <p className={styles.specDesc}>
                                        {agent.specs?.output ||
                                            'To‘liq tayyor formatdagi natija va tahrirlash imkoniyati'}
                                    </p>
                                </div>
                                <div className={styles.specBox}>
                                    <span className={styles.specHeading}>Tillar</span>
                                    <p className={styles.specDesc}>
                                        {agent.specs?.languages ||
                                            'O‘zbek, rus — subtitr va matnlar uchun'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Ish jarayoni */}
                        <section className={styles.card}>
                            <h2 className={styles.sectionTitle}>Ish jarayoni</h2>
                            <div className={styles.workflowGrid}>
                                {(agent.processSteps || []).map((step) => (
                                    <div key={step.step} className={styles.workflowStep}>
                                        <span className={styles.stepBadge}>{step.tag}</span>
                                        <h4 className={styles.stepTitle}>{step.title}</h4>
                                        <p className={styles.stepDesc}>{step.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 6. Sharhlar */}
                        <section className={styles.card}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Sharhlar</h2>
                                <span className={styles.ratingSummary}>
                                    <strong>{agent.reviewsSummary?.rating || '4.9'}</strong> ·{' '}
                                    {agent.reviewsSummary?.count || '312'} sharh ·{' '}
                                    {agent.reviewsSummary?.successRate || '98%'} muvaffaqiyat darajasi
                                </span>
                            </div>

                            <div className={styles.reviewsList}>
                                {(agent.reviews || []).map((rev, idx) => (
                                    <div key={idx} className={styles.reviewItem}>
                                        <div className={styles.reviewHead}>
                                            <div className={styles.reviewUser}>
                                                <strong>{rev.name}</strong>
                                                {rev.plan && (
                                                    <span className={styles.userPlanBadge}>
                                                        [{rev.plan}]
                                                    </span>
                                                )}
                                                <span className={styles.reviewTime}>· {rev.time}</span>
                                            </div>
                                            <div className={styles.reviewRating}>
                                                <RiStarFill className={styles.reviewStar} />
                                                <span>{rev.rating.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <p className={styles.reviewBody}>{rev.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 7. Shu vazifa uchun boshqa uslublar */}
                        <section className={styles.relatedSection}>
                            <div className={styles.relatedHead}>
                                <h2 className={styles.sectionTitle}>
                                    Shu vazifa uchun boshqa uslublar
                                </h2>
                                <a href={AGENT_APP_URL} className={styles.viewAllLink}>
                                    Barcha {agent.category.toLowerCase()} agentlari →
                                </a>
                            </div>

                            <div className={styles.relatedGrid}>
                                {related.map((item, idx) => (
                                    <a
                                        key={idx}
                                        href={AGENT_CHAT_URL}
                                        className={styles.relatedCard}>
                                        <span className={styles.relatedAuthor}>{item.author}</span>
                                        <h4 className={styles.relatedTitle}>{item.title}</h4>
                                        <p className={styles.relatedDesc}>{item.desc}</p>
                                        <div className={styles.relatedFoot}>
                                            <span className={styles.relatedRating}>
                                                ★ {item.rating} · {item.subscribers} obunachi
                                            </span>
                                            <span className={styles.relatedPrice}>{item.price}</span>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    </main>

                    {/* Right Sticky Sidebar: Pricing & Plans */}
                    <aside className={styles.sidebar}>
                        <div className={styles.stickyWrap}>
                            <div className={`${styles.card} ${styles.pricingCard}`}>
                                <div className={styles.pricingHead}>
                                    <h3 className={styles.pricingTitle}>Tarifni tanlang</h3>
                                    <div className={styles.periodToggle}>
                                        <button
                                            type="button"
                                            onClick={() => setBillingPeriod('monthly')}
                                            className={`${styles.toggleBtn} ${
                                                billingPeriod === 'monthly'
                                                    ? styles.toggleBtnActive
                                                    : ''
                                            }`}>
                                            Oylik
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setBillingPeriod('yearly')}
                                            className={`${styles.toggleBtn} ${
                                                billingPeriod === 'yearly'
                                                    ? styles.toggleBtnActive
                                                    : ''
                                            }`}>
                                            Yillik <span className={styles.discountBadge}>-20%</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Plan Radios */}
                                <div className={styles.plansList}>
                                    {plans.map((p) => {
                                        const isSelected = selectedPlanId === p.id;
                                        const price =
                                            billingPeriod === 'yearly'
                                                ? p.yearlyPrice
                                                : p.monthlyPrice;

                                        return (
                                            <div
                                                key={p.id}
                                                onClick={() => setSelectedPlanId(p.id)}
                                                className={`${styles.planOption} ${
                                                    isSelected ? styles.planOptionSelected : ''
                                                }`}>
                                                <div className={styles.planOptionHead}>
                                                    <span className={styles.planName}>
                                                        {p.name}
                                                    </span>
                                                    {p.isPopular && (
                                                        <span className={styles.popularBadge}>
                                                            Ommabop
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={styles.planPriceRow}>
                                                    <span className={styles.planPrice}>
                                                        {formatNumber(price)}
                                                    </span>
                                                    <span className={styles.planUnit}>so‘m/oy</span>
                                                </div>
                                                <p className={styles.planFeatures}>{p.features}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Actions */}
                                <div className={styles.planActions}>
                                    <a
                                        href={`${AGENT_CHAT_URL}?agent=${agent.id}&plan=${selectedPlanId}&period=${billingPeriod}`}
                                        className={styles.ctaPrimary}>
                                        {currentPlan.name} tarifiga obuna bo‘lish
                                    </a>

                                    <a
                                        href={`${AGENT_CHAT_URL}?agent=${agent.id}&trial=true`}
                                        className={styles.ctaSecondary}>
                                        1 ta vazifa bepul sinab ko‘rish
                                    </a>
                                </div>

                                {/* Benefits / Guarantee */}
                                <ul className={styles.guaranteeList}>
                                    <li>100% pul qaytarish kafolati (3 kun, keyingi oylik bekor qilinadi)</li>
                                    <li>Ishlatilmagan limit keyingi oyga o‘tmaydi</li>
                                    <li>To‘lov: Click · Payme · Uzum</li>
                                </ul>
                            </div>

                            {/* Soff Ecosystem Box */}
                            <div className={`${styles.card} ${styles.soffBox}`}>
                                <h4 className={styles.soffBoxTitle}>Soff obunasi bilan</h4>
                                <p className={styles.soffBoxText}>
                                    Soff obunachilari Soff agentlaridan bepul limit bilan
                                    foydalanadi. Boshqa agentlarni alohida obuna qilmaydi.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Sample Preview Modal (optional interaction) */}
            {activeSample && (
                <div className={styles.modalOverlay} onClick={() => setActiveSample(null)}>
                    <div
                        className={styles.modalContent}
                        onClick={(e) => e.stopPropagation()}>
                        <div
                            className={styles.modalThumb}
                            style={{ background: activeSample.gradient }}>
                            <RiPlayFill className={styles.modalPlayIcon} />
                        </div>
                        <div className={styles.modalBody}>
                            <h3 className={styles.modalTitle}>{activeSample.title}</h3>
                            <span className={styles.modalCategory}>
                                {activeSample.category} · {activeSample.duration}
                            </span>
                            <p className={styles.modalDesc}>
                                Ushbu namuna {agent.name} tomonidan haqiqiy mijoz buyurtmasi asosida
                                generatsiya qilingan.
                            </p>
                            <div className={styles.modalActions}>
                                <a
                                    href={`${AGENT_CHAT_URL}?agent=${agent.id}&prompt=${encodeURIComponent(
                                        activeSample.title
                                    )}`}
                                    className={styles.ctaPrimary}>
                                    Shunday natija tayyorlash
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setActiveSample(null)}
                                    className={styles.ctaSecondary}>
                                    Yopish
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentDetail;
