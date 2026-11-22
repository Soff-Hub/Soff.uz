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
    RiCpuLine,
    RiFlashlightFill,
    RiCoinsLine,
    RiArrowRightLine,
} from 'react-icons/ri';
import {
    AGENT_APP_URL,
    AGENT_CHAT_URL,
    SOFFX_PLANS,
    agentImage,
    agentPath,
} from '~/entities/ai-agent/model';
import styles from './style.module.scss';

const AgentDetail = ({ agent }) => {
    const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' | 'yearly'
    const [selectedPlanId, setSelectedPlanId] = useState('pro');
    const [activeStyle, setActiveStyle] = useState(agent.styles?.[0] || 'Dinamik');
    const [activeSample, setActiveSample] = useState(null);

    const plans = agent.plans || SOFFX_PLANS;
    const currentPlan = plans.find((p) => p.id === selectedPlanId) || plans[1] || plans[0];
    const currentPrice =
        billingPeriod === 'yearly'
            ? currentPlan.yearlyPriceUSD || 119
            : currentPlan.monthlyPriceUSD || 149;

    return (
        <div className={styles.page}>
            <div className="container">
                {/* Modern Breadcrumbs */}
                <nav aria-label="Breadcrumb" className={styles.crumbs}>
                    <Link href="/">
                        <a>Bosh sahifa</a>
                    </Link>
                    <span className={styles.crumbSep}>/</span>
                    <a href={AGENT_APP_URL}>SoffX AI Agentlar</a>
                    <span className={styles.crumbSep}>/</span>
                    <span>{agent.category}</span>
                    <span className={styles.crumbSep}>/</span>
                    <span aria-current="page">{agent.title || agent.name}</span>
                </nav>

                {/* Main 2-Column Marketplace Layout */}
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
                                        width={80}
                                        height={80}
                                        className={styles.agentAvatar}
                                    />
                                    <span className={styles.onlineDot} title="AI Onlayn 24/7" />
                                </div>
                                <div className={styles.headerInfo}>
                                    <div className={styles.badgeRow}>
                                        <span
                                            className={styles.catBadge}
                                            style={{
                                                backgroundColor: `${agent.badgeColor || '#00a44f'}18`,
                                                color: agent.badgeColor || '#00a44f',
                                            }}>
                                            <RiSparklingFill aria-hidden="true" />
                                            {agent.badges?.[0] || agent.category}
                                        </span>
                                        {agent.badges?.[1] && (
                                            <span className={styles.subBadge}>{agent.badges[1]}</span>
                                        )}
                                        {agent.costPerTask && (
                                            <span className={styles.costBadge}>
                                                <RiCoinsLine aria-hidden="true" />
                                                {agent.costPerTask}
                                            </span>
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
                                            {agent.stats?.avgTime || 'O‘rtacha 2 daqiqa'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* SoffX Engine & Architecture Strip */}
                            <div className={styles.engineStrip}>
                                <div className={styles.engineMeta}>
                                    <div className={styles.engineIconWrap}>
                                        <RiCpuLine className={styles.engineIcon} />
                                    </div>
                                    <div className={styles.engineDetails}>
                                        <div className={styles.engineNameRow}>
                                            <span className={styles.engineName}>
                                                {agent.engine?.name || 'SoffX Neural Core v2.4'}
                                            </span>
                                            <span className={styles.engineUptime}>
                                                {agent.engine?.uptime || '99.9% Uptime'}
                                            </span>
                                        </div>
                                        <span className={styles.engineDesc}>
                                            Model: {agent.engine?.model || 'Gemini 4 & Claude 3.5 Sonnet'} ·{' '}
                                            Tezlik: {agent.engine?.responseTime || '< 1 daqiqa'}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.engineActions}>
                                    <a
                                        href={`${AGENT_CHAT_URL}?agent=${agent.id}`}
                                        className={styles.enginePrimaryBtn}>
                                        <RiFlashlightFill aria-hidden="true" />
                                        Agent bilan ishlash
                                    </a>
                                    <a
                                        href={`${AGENT_CHAT_URL}?agent=${agent.id}&demo=true`}
                                        className={styles.engineSecondaryBtn}>
                                        Demo suhbat
                                    </a>
                                </div>
                            </div>
                        </section>

                        {/* 2. Namuna natijalar (Showcase) */}
                        <section className={styles.card}>
                            <div className={styles.sectionHeader}>
                                <div>
                                    <h2 className={styles.sectionTitle}>Namuna natijalar</h2>
                                    <span className={styles.sectionSubtitle}>
                                        SoffX AI tomonidan real bizneslar uchun generatsiya qilingan
                                    </span>
                                </div>
                                <span className={styles.creditTip}>
                                    Kredit faqat tayyor natija uchun yechiladi
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
                                            {sample.credits && (
                                                <span className={styles.sampleCreditsBadge}>
                                                    <RiCoinsLine aria-hidden="true" />
                                                    {sample.credits}
                                                </span>
                                            )}
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

                        {/* 3. Can Do vs Cannot Do (Split Grid) */}
                        <div className={styles.splitGrid}>
                            <section className={`${styles.card} ${styles.canDoCard}`}>
                                <h3 className={styles.splitTitle}>SoffX AI nima qila oladi</h3>
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
                                    <p className={styles.customOrderText}>
                                        {agent.guaranteeNote ||
                                            'Kreditlar faqat yakuniy natija ma’qul kelganda yechiladi. Qayta tahrirlash bepul.'}
                                    </p>
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
                                            'O‘zbek, rus, ingliz — subtitr va matnlar uchun'}
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
                                <h2 className={styles.sectionTitle}>Mijozlar fikri va tajribasi</h2>
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
                                                        [{rev.plan} tarifi]
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

                        {/* 7. SoffX Hamkor Agentlar Jamoasi */}
                        <section className={styles.relatedSection}>
                            <div className={styles.relatedHead}>
                                <div>
                                    <h2 className={styles.sectionTitle}>
                                        SoffX Agentlar Jamoasi
                                    </h2>
                                    <p className={styles.relatedSubtitle}>
                                        Bitta obunadagi kreditlar bilan butun jamoa xizmatidan foydalanasiz
                                    </p>
                                </div>
                                <a href={AGENT_APP_URL} className={styles.viewAllLink}>
                                    Barcha 6 ta agent →
                                </a>
                            </div>

                            <div className={styles.relatedGrid}>
                                {(agent.relatedTeam || []).map((item) => (
                                    <Link key={item.id} href={agentPath(item.id)}>
                                        <a className={styles.relatedCard}>
                                            <div className={styles.relatedCardTop}>
                                                <img
                                                    src={agentImage(item.id, 'bust')}
                                                    alt={item.name}
                                                    width={40}
                                                    height={40}
                                                    className={styles.relatedAvatar}
                                                />
                                                <div>
                                                    <span className={styles.relatedCategory}>
                                                        {item.category}
                                                    </span>
                                                    <h4 className={styles.relatedTitle}>
                                                        {item.name}
                                                    </h4>
                                                </div>
                                            </div>
                                            <p className={styles.relatedDesc}>{item.desc}</p>
                                            <div className={styles.relatedFoot}>
                                                <span className={styles.relatedCost}>
                                                    <RiCoinsLine aria-hidden="true" />
                                                    {item.cost}
                                                </span>
                                                <span className={styles.relatedRating}>
                                                    ★ {item.rating}
                                                </span>
                                            </div>
                                        </a>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    </main>

                    {/* Right Sticky Sidebar: Pricing & Plans in USD */}
                    <aside className={styles.sidebar}>
                        <div className={styles.stickyWrap}>
                            <div className={`${styles.card} ${styles.pricingCard}`}>
                                <div className={styles.pricingHead}>
                                    <div>
                                        <h3 className={styles.pricingTitle}>Tarifni tanlang</h3>
                                        <span className={styles.pricingSub}>
                                            Barcha 6 ta agent uchun yagona balans
                                        </span>
                                    </div>
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

                                {/* Plan Options (USD) */}
                                <div className={styles.plansList}>
                                    {plans.map((p) => {
                                        const isSelected = selectedPlanId === p.id;
                                        const price =
                                            billingPeriod === 'yearly'
                                                ? p.yearlyPriceUSD || 119
                                                : p.monthlyPriceUSD || 149;

                                        return (
                                            <div
                                                key={p.id}
                                                onClick={() => setSelectedPlanId(p.id)}
                                                className={`${styles.planOption} ${
                                                    isSelected ? styles.planOptionSelected : ''
                                                }`}>
                                                <div className={styles.planOptionHead}>
                                                    <div className={styles.planNameWrap}>
                                                        <span className={styles.planName}>
                                                            {p.name}
                                                        </span>
                                                        <span className={styles.creditsPill}>
                                                            <RiCoinsLine aria-hidden="true" />
                                                            {p.credits}
                                                        </span>
                                                    </div>
                                                    {p.isPopular && (
                                                        <span className={styles.popularBadge}>
                                                            Ommabop
                                                        </span>
                                                    )}
                                                </div>

                                                <div className={styles.planPriceRow}>
                                                    <span className={styles.planDollar}>$</span>
                                                    <span className={styles.planPrice}>
                                                        {price}
                                                    </span>
                                                    <span className={styles.planUnit}>/ oy</span>
                                                    {p.tasksEstimate && (
                                                        <span className={styles.planTasksEstimate}>
                                                            ({p.tasksEstimate})
                                                        </span>
                                                    )}
                                                </div>

                                                <p className={styles.planFeatures}>{p.features}</p>
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* CTA Actions */}
                                <div className={styles.planActions}>
                                    <a
                                        href={`${AGENT_CHAT_URL}?agent=${agent.id}&plan=${selectedPlanId}&period=${billingPeriod}`}
                                        className={styles.ctaPrimary}>
                                        {currentPlan.name} tarifiga ulanish (${currentPrice}/oy)
                                        <RiArrowRightLine aria-hidden="true" />
                                    </a>

                                    <a
                                        href={`${AGENT_CHAT_URL}?agent=${agent.id}&trial=true`}
                                        className={styles.ctaSecondary}>
                                        100 bepul kredit bilan sinab ko‘rish
                                    </a>
                                </div>

                                {/* Guarantees */}
                                <ul className={styles.guaranteeList}>
                                    <li>Kredit faqat tasdiqlangan natija uchun yechiladi</li>
                                    <li>Istalgan vaqtda tarifni o‘zgartirish yoki bekor qilish</li>
                                    <li>Xavfsiz to‘lov: Visa · Mastercard · Uzcard · Humo · Click</li>
                                </ul>
                            </div>

                            {/* SoffX Unified Balance Box */}
                            <div className={`${styles.card} ${styles.soffBox}`}>
                                <div className={styles.soffBoxHead}>
                                    <RiCoinsLine className={styles.soffBoxIcon} />
                                    <h4 className={styles.soffBoxTitle}>Yagona kredit balansi</h4>
                                </div>
                                <p className={styles.soffBoxText}>
                                    Bitta obuna bilan barcha 6 ta agentdan (Marketolog, Kopirayter,
                                    Dizayner, SMM, Montajor, Targetolog) umumiy kredit hisobidan
                                    erkin foydalanasiz. Alohida obuna shart emas.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Interactive Sample Preview Modal */}
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
                            <div className={styles.modalMetaRow}>
                                <span className={styles.modalCategory}>
                                    {activeSample.category} · {activeSample.duration}
                                </span>
                                {activeSample.credits && (
                                    <span className={styles.modalCredits}>
                                        <RiCoinsLine aria-hidden="true" />
                                        {activeSample.credits}
                                    </span>
                                )}
                            </div>
                            <p className={styles.modalDesc}>
                                Ushbu namuna SoffX {agent.name} tomonidan real mijoz topshirig‘i
                                asosida avtomatik tarzda yaratilgan.
                            </p>
                            <div className={styles.modalActions}>
                                <a
                                    href={`${AGENT_CHAT_URL}?agent=${agent.id}&prompt=${encodeURIComponent(
                                        activeSample.title
                                    )}`}
                                    className={styles.ctaPrimary}>
                                    Xuddi shunday natija tayyorlash
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
