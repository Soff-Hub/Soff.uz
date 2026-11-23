import React, { useEffect, useState } from 'react';
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
    RiInstagramLine,
    RiTelegramLine,
    RiMusic2Line,
    RiFileCopyLine,
    RiBarChartBoxLine,
    RiCalendarLine,
    RiFocus3Line,
    RiUploadCloud2Line,
    RiDownloadCloud2Line,
    RiTranslate2,
    RiPaletteLine,
    RiMagicLine,
    RiForbidLine,
    RiCheckboxCircleLine,
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
    const [activeStep, setActiveStep] = useState(0);
    const [isWorkflowPaused, setIsWorkflowPaused] = useState(false);
    const [activeCanDoIdx, setActiveCanDoIdx] = useState(0);
    const [isCanDoPaused, setIsCanDoPaused] = useState(false);
    const [activeSample, setActiveSample] = useState(null);
    const [activeModalTab, setActiveModalTab] = useState('visual'); // 'visual' | 'text'
    const [activeVariantTab, setActiveVariantTab] = useState('variant1');
    const [copiedKey, setCopiedKey] = useState(null);

    const processSteps = agent.processSteps || [];
    const canDoItems = agent.canDo || agent.abilities || [];

    // Live auto-playing workflow motion (1 -> 2 -> 3 -> 4), pauses on hover/click
    useEffect(() => {
        if (isWorkflowPaused || processSteps.length <= 1) return undefined;
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % processSteps.length);
        }, 1600);
        return () => clearInterval(timer);
    }, [isWorkflowPaused, processSteps.length]);

    // Subtle live spotlight cycling through capabilities so visitors immediately see interactivity
    useEffect(() => {
        if (isCanDoPaused || canDoItems.length <= 1) return undefined;
        const timer = setInterval(() => {
            setActiveCanDoIdx((prev) => (prev + 1) % canDoItems.length);
        }, 1700);
        return () => clearInterval(timer);
    }, [isCanDoPaused, canDoItems.length]);

    const handleCopyText = (text, key) => {
        if (typeof window !== 'undefined' && navigator?.clipboard?.writeText) {
            navigator.clipboard.writeText(text);
            setCopiedKey(key);
            setTimeout(() => setCopiedKey(null), 2000);
        }
    };

    const plans = agent.plans || SOFFX_PLANS;
    const currentPlan = plans.find((p) => p.id === selectedPlanId) || plans[1] || plans[0];
    const currentPrice =
        billingPeriod === 'yearly'
            ? currentPlan.yearlyPriceUSD || 119
            : currentPlan.monthlyPriceUSD || 149;

    const renderSampleCardContent = (sample) => {
        if (sample.type === 'video') {
            return (
                <div className={styles.videoPreviewWrap}>
                    <video
                        src={sample.videoUrl}
                        muted
                        playsInline
                        loop
                        preload="metadata"
                        className={styles.videoElement}
                        onMouseOver={(e) => {
                            try {
                                e.target.play();
                            } catch (err) {}
                        }}
                        onMouseOut={(e) => {
                            try {
                                e.target.pause();
                            } catch (err) {}
                        }}
                    />
                    <div className={styles.videoOverlayGradient} />

                    <div className={styles.sampleTopRow}>
                        <span className={styles.sampleCreditsBadge}>
                            <RiCoinsLine aria-hidden="true" />
                            {sample.credits}
                        </span>
                        <span className={styles.sampleFormatBadge}>9:16 Reels</span>
                    </div>

                    <button
                        type="button"
                        className={styles.playButton}
                        aria-label="Videoni ko‘rish">
                        <RiPlayFill />
                    </button>

                    <div className={styles.videoBottomInfo}>
                        {sample.subtitleSnippet && (
                            <div className={styles.videoSubtitleBadge}>
                                {sample.subtitleSnippet}
                            </div>
                        )}
                        {sample.musicTrack && (
                            <div className={styles.videoMusicRow}>
                                <RiMusic2Line className={styles.musicIcon} />
                                <span className={styles.musicText}>{sample.musicTrack}</span>
                            </div>
                        )}
                        <div className={styles.videoMetaRow}>
                            <span className={styles.sampleCatTag}>{sample.category}</span>
                            <span className={styles.sampleDuration}>{sample.duration}</span>
                        </div>
                    </div>
                </div>
            );
        }

        // Image-based deliverables (design, SMM, copy, strategy, ads with sample image)
        if (sample.imageUrl) {
            return (
                <div className={styles.designImageWrap}>
                    <img
                        src={sample.imageUrl}
                        alt=""
                        aria-hidden="true"
                        className={styles.designImageBackdrop}
                    />
                    <img
                        src={sample.imageUrl}
                        alt={sample.title}
                        className={styles.designImageElement}
                        loading="lazy"
                    />
                    <div className={styles.designImageOverlayGradient} />

                    <div className={styles.sampleTopRow}>
                        <span className={styles.sampleCreditsBadge}>
                            <RiCoinsLine aria-hidden="true" />
                            {sample.credits}
                        </span>
                        <span className={styles.designFormatPill}>
                            {sample.badgeText || sample.duration}
                        </span>
                    </div>

                    <div className={styles.designBottomMeta}>
                        <span className={styles.designAction}>
                            <RiSparklingFill /> Natijani ko‘rish
                        </span>
                    </div>
                </div>
            );
        }

        if (sample.type === 'copy') {
            return (
                <div
                    className={styles.copyPreviewWrap}
                    style={{ background: sample.gradient }}>
                    <div className={styles.postMockInner}>
                        <div className={styles.postMockHeader}>
                            <div className={styles.postMockProfile}>
                                <div className={styles.postMockAvatar}>
                                    {sample.platform === 'instagram' ? (
                                        <RiInstagramLine />
                                    ) : sample.platform === 'telegram' ? (
                                        <RiTelegramLine />
                                    ) : (
                                        <RiSparklingFill />
                                    )}
                                </div>
                                <div className={styles.postMockProfileText}>
                                    <span className={styles.postMockHandle}>
                                        {sample.handle || '@safia_bakery_uz'}
                                    </span>
                                    <span className={styles.postMockBadge}>
                                        {sample.badgeText || sample.category}
                                    </span>
                                </div>
                            </div>
                            <span className={styles.sampleCreditsBadge}>
                                <RiCoinsLine aria-hidden="true" />
                                {sample.credits}
                            </span>
                        </div>

                        <div className={styles.postMockBody}>
                            <h4 className={styles.postMockHeadline}>{sample.headline}</h4>
                            <p className={styles.postMockText}>{sample.bodySnippet}</p>
                            {sample.cta && (
                                <div className={styles.postMockCta}>{sample.cta}</div>
                            )}
                            {sample.hashtags && (
                                <div className={styles.postMockHashtags}>{sample.hashtags}</div>
                            )}
                        </div>

                        <div className={styles.postMockFooter}>
                            <span className={styles.postMockMetrics}>
                                {sample.metrics || '❤️ 1.2k · 💬 86'}
                            </span>
                            <span className={styles.postMockAction}>
                                <RiFileCopyLine /> Matnni ko‘rish
                            </span>
                        </div>
                    </div>
                </div>
            );
        }

        if (sample.type === 'design') {
            return (
                <div className={styles.designImageWrap}>
                    {sample.imageUrl ? (
                        <img
                            src={sample.imageUrl}
                            alt={sample.title}
                            className={styles.designImageElement}
                            loading="lazy"
                        />
                    ) : null}
                    <div className={styles.designImageOverlayGradient} />

                    <div className={styles.sampleTopRow}>
                        <span className={styles.sampleCreditsBadge}>
                            <RiCoinsLine aria-hidden="true" />
                            {sample.credits}
                        </span>
                        <span className={styles.designFormatPill}>
                            {sample.badgeText || sample.duration}
                        </span>
                    </div>

                    <div className={styles.designBottomMeta}>
                        <span className={styles.designAction}>
                            <RiSparklingFill /> Rasmni ko‘rish
                        </span>
                    </div>
                </div>
            );
        }

        if (sample.type === 'strategy') {
            return (
                <div
                    className={styles.strategyPreviewWrap}
                    style={{ background: sample.gradient }}>
                    <div className={styles.strategyTopRow}>
                        <span className={styles.sampleCreditsBadge}>
                            <RiCoinsLine aria-hidden="true" />
                            {sample.credits}
                        </span>
                        <span className={styles.strategyBadgeText}>{sample.badgeText}</span>
                    </div>

                    <div className={styles.strategyCardBody}>
                        <div className={styles.strategyIconRow}>
                            <RiBarChartBoxLine className={styles.strategyIcon} />
                            <span className={styles.strategyCategory}>{sample.category}</span>
                        </div>
                        <h4 className={styles.strategyHeadline}>{sample.headline}</h4>
                        <p className={styles.strategySnippet}>{sample.bodySnippet}</p>
                        <div className={styles.strategyCtaPill}>{sample.cta}</div>
                    </div>

                    <div className={styles.strategyFooter}>
                        <span className={styles.strategyDuration}>{sample.duration}</span>
                        <span className={styles.strategyAction}>Tahlilni ko‘rish →</span>
                    </div>
                </div>
            );
        }

        if (sample.type === 'calendar') {
            return (
                <div
                    className={styles.calendarPreviewWrap}
                    style={{ background: sample.gradient }}>
                    <div className={styles.calendarTopRow}>
                        <span className={styles.sampleCreditsBadge}>
                            <RiCoinsLine aria-hidden="true" />
                            {sample.credits}
                        </span>
                        <span className={styles.calendarDurationBadge}>{sample.duration}</span>
                    </div>

                    <div className={styles.calendarCardBody}>
                        <div className={styles.calendarDaysRow}>
                            <span>Du</span>
                            <span>Se</span>
                            <span className={styles.calendarActiveDay}>Cho</span>
                            <span>Pa</span>
                            <span>Ju</span>
                        </div>
                        <h4 className={styles.calendarHeadline}>{sample.headline}</h4>
                        <p className={styles.calendarSnippet}>{sample.bodySnippet}</p>
                        <div className={styles.calendarStatusPill}>{sample.cta}</div>
                    </div>

                    <div className={styles.calendarFooter}>
                        <span className={styles.calendarBadgeText}>{sample.badgeText}</span>
                        <span className={styles.calendarAction}>Rejani ko‘rish →</span>
                    </div>
                </div>
            );
        }

        // default: ads or general
        return (
            <div
                className={styles.adsPreviewWrap}
                style={{ background: sample.gradient }}>
                <div className={styles.adsTopRow}>
                    <span className={styles.sampleCreditsBadge}>
                        <RiCoinsLine aria-hidden="true" />
                        {sample.credits}
                    </span>
                    <span className={styles.adsLiveBadge}>
                        <span className={styles.adsLiveDot} />
                        Faol Ads
                    </span>
                </div>

                <div className={styles.adsCardBody}>
                    <div className={styles.adsTargetTag}>{sample.badgeText}</div>
                    <h4 className={styles.adsHeadline}>{sample.headline}</h4>
                    <p className={styles.adsSnippet}>{sample.bodySnippet}</p>
                    <div className={styles.adsCtaPill}>{sample.cta}</div>
                </div>

                <div className={styles.adsFooter}>
                    <span className={styles.adsCategory}>{sample.category}</span>
                    <span className={styles.adsAction}>Metrikalar →</span>
                </div>
            </div>
        );
    };

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
                            <div className={styles.headerGrid}>
                                <div className={`${styles.agentAvatarWrap} ${styles.headerAvatarArea}`}>
                                    <img
                                        src={agentImage(agent.id, 'bust')}
                                        alt={agent.name}
                                        width={80}
                                        height={80}
                                        className={styles.agentAvatar}
                                    />
                                    <span className={styles.onlineDot} title="AI Onlayn 24/7" />
                                </div>

                                <div className={styles.headerBadgesArea}>
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
                                </div>

                                <div className={styles.headerTitleArea}>
                                    <h1 className={styles.title}>{agent.title || agent.name}</h1>
                                </div>

                                <p className={`${styles.about} ${styles.headerAboutArea}`}>{agent.about}</p>

                                <div className={styles.headerActionArea}>
                                    <a
                                        href={`${AGENT_CHAT_URL}?agent=${agent.id}`}
                                        className={styles.enginePrimaryBtn}>
                                        <RiFlashlightFill aria-hidden="true" />
                                        Agent bilan ishlash
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
                                        Agent {agent.name} tomonidan real bizneslar uchun tayyorlangan
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
                                        onClick={() => {
                                            setActiveSample(sample);
                                            setActiveVariantTab('variant1');
                                            setActiveModalTab(
                                                sample.type === 'copy' || sample.fullContent
                                                    ? 'text'
                                                    : 'visual'
                                            );
                                        }}>
                                        <div
                                            className={`${styles.sampleCardContent} ${
                                                sample.type === 'video'
                                                    ? styles.aspectVideo
                                                    : styles.aspectImage
                                            }`}>
                                            {renderSampleCardContent(sample)}
                                        </div>
                                        <div className={styles.sampleMetaBelow}>
                                            <span className={styles.sampleCaption}>{sample.title}</span>
                                            <span className={styles.sampleCategorySub}>{sample.category}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Can Do vs Cannot Do (Split Grid) */}
                        <div className={styles.splitGrid}>
                            <section
                                className={`${styles.card} ${styles.canDoCard}`}
                                onMouseEnter={() => setIsCanDoPaused(true)}
                                onMouseLeave={() => setIsCanDoPaused(false)}>
                                <div className={styles.splitHeadRow}>
                                    <span className={styles.splitIconGreen} aria-hidden="true">
                                        <RiCheckboxCircleLine />
                                    </span>
                                    <h3 className={styles.splitTitle}>Agent {agent.name} nima qila oladi</h3>
                                </div>
                                <ul className={styles.checkList}>
                                    {canDoItems.map((item, idx) => (
                                        <li key={idx} className={styles.checkItemInteractive}>
                                            <a
                                                href={`${AGENT_CHAT_URL}?agent=${agent.id}&prompt=${encodeURIComponent(item)}`}
                                                onMouseEnter={() => setActiveCanDoIdx(idx)}
                                                className={`${styles.checkItemLink} ${
                                                    activeCanDoIdx === idx ? styles.checkItemLinkActive : ''
                                                }`}>
                                                <span className={styles.checkIcon}>
                                                    <RiCheckLine />
                                                </span>
                                                <span className={styles.checkItemText}>{item}</span>
                                                <span className={styles.checkTryPill}>
                                                    Sinab ko‘rish
                                                    <RiArrowRightUpLine aria-hidden="true" />
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            <section className={`${styles.card} ${styles.cannotDoCard}`}>
                                <div className={styles.splitHeadRow}>
                                    <span className={styles.splitIconRed} aria-hidden="true">
                                        <RiForbidLine />
                                    </span>
                                    <h3 className={styles.splitTitle}>Nima qila olmaydi</h3>
                                </div>
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
                                    <span className={styles.guaranteeIcon} aria-hidden="true">
                                        <RiShieldCheckLine />
                                    </span>
                                    <p className={styles.customOrderText}>
                                        {agent.guaranteeNote ||
                                            'Kreditlar faqat yakuniy natija ma’qul kelganda yechiladi. Qayta tahrirlash bepul.'}
                                    </p>
                                </div>
                            </section>
                        </div>

                        {/* 4. Uslub va formatlar */}
                        <section className={styles.card}>
                            <div className={styles.sectionHeader}>
                                <div className={styles.splitHeadRow}>
                                    <span className={styles.splitIconBrand} aria-hidden="true">
                                        <RiPaletteLine />
                                    </span>
                                    <div>
                                        <h2 className={styles.sectionTitle}>Uslub va formatlar</h2>
                                        <span className={styles.sectionSubtitle}>
                                            Uslubni tanlang va Agent {agent.name} bilan darhol boshlang
                                        </span>
                                    </div>
                                </div>
                                <a
                                    href={`${AGENT_CHAT_URL}?agent=${agent.id}&style=${encodeURIComponent(activeStyle)}`}
                                    className={styles.styleStartBtn}>
                                    <RiSparklingFill aria-hidden="true" />
                                    «{activeStyle}» bilan boshlash
                                    <RiArrowRightLine aria-hidden="true" />
                                </a>
                            </div>

                            <div className={styles.stylePills}>
                                {(agent.styles || ['Dinamik', 'Boshqacha', 'Barchasi']).map((style) => (
                                    <button
                                        key={style}
                                        type="button"
                                        onClick={() => setActiveStyle(style)}
                                        className={`${styles.stylePill} ${
                                            activeStyle === style ? styles.stylePillActive : ''
                                        }`}>
                                        {activeStyle === style && (
                                            <RiCheckLine className={styles.stylePillCheck} aria-hidden="true" />
                                        )}
                                        {style}
                                    </button>
                                ))}
                            </div>

                            <div className={styles.specsGrid}>
                                <div className={styles.specBox}>
                                    <div className={styles.specHeadRow}>
                                        <span className={`${styles.specIconBadge} ${styles.specIconBlue}`} aria-hidden="true">
                                            <RiUploadCloud2Line />
                                        </span>
                                        <span className={styles.specHeading}>Siz yuborasiz</span>
                                    </div>
                                    <p className={styles.specDesc}>
                                        {agent.specs?.input ||
                                            'Vazifa tavsifi, xom materiallar va ko‘rsatmalar'}
                                    </p>
                                </div>
                                <div className={styles.specBox}>
                                    <div className={styles.specHeadRow}>
                                        <span className={`${styles.specIconBadge} ${styles.specIconGreen}`} aria-hidden="true">
                                            <RiDownloadCloud2Line />
                                        </span>
                                        <span className={styles.specHeading}>Siz olasiz</span>
                                    </div>
                                    <p className={styles.specDesc}>
                                        {agent.specs?.output ||
                                            'To‘liq tayyor formatdagi natija va tahrirlash imkoniyati'}
                                    </p>
                                </div>
                                <div className={styles.specBox}>
                                    <div className={styles.specHeadRow}>
                                        <span className={`${styles.specIconBadge} ${styles.specIconPurple}`} aria-hidden="true">
                                            <RiTranslate2 />
                                        </span>
                                        <span className={styles.specHeading}>Tillar</span>
                                    </div>
                                    <p className={styles.specDesc}>
                                        {agent.specs?.languages ||
                                            'O‘zbek, rus, ingliz — subtitr va matnlar uchun'}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* 5. Ish jarayoni */}
                        <section
                            className={styles.card}
                            onMouseEnter={() => setIsWorkflowPaused(true)}
                            onMouseLeave={() => setIsWorkflowPaused(false)}>
                            <div className={styles.sectionHeader}>
                                <div className={styles.splitHeadRow}>
                                    <span className={styles.splitIconBrand} aria-hidden="true">
                                        <RiMagicLine />
                                    </span>
                                    <div>
                                        <h2 className={styles.sectionTitle}>Ish jarayoni</h2>
                                        <span className={styles.sectionSubtitle}>
                                            Agent {agent.name} qanday ishlashini jonli ko‘ring
                                        </span>
                                    </div>
                                </div>
                                <span className={styles.stepProgressText}>
                                    <span className={styles.livePulseDot} aria-hidden="true" />
                                    {activeStep + 1} / {processSteps.length || 4}-bosqich
                                </span>
                            </div>

                            <div className={styles.workflowProgressTrack} aria-hidden="true">
                                <div
                                    className={styles.workflowProgressFill}
                                    style={{
                                        width: `${
                                            ((activeStep + 1) / Math.max(processSteps.length, 1)) * 100
                                        }%`,
                                    }}
                                />
                            </div>

                            {/* Live Animated Simulation Stage */}
                            {processSteps[activeStep] && (
                                <div key={activeStep} className={styles.workflowMotionStage}>
                                    <div className={styles.motionStageLeft}>
                                        <span className={styles.motionStageBadge}>
                                            {processSteps[activeStep].tag}
                                        </span>
                                        <div className={styles.motionStageCopy}>
                                            <strong className={styles.motionStageTitle}>
                                                {processSteps[activeStep].title}
                                            </strong>
                                            <span className={styles.motionStageDesc}>
                                                {processSteps[activeStep].desc}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.motionWave} aria-hidden="true">
                                        <span />
                                        <span />
                                        <span />
                                        <span />
                                    </div>
                                </div>
                            )}

                            <div className={styles.workflowGrid}>
                                {processSteps.map((step, idx) => {
                                    const StepIcon =
                                        idx === 0
                                            ? RiUploadCloud2Line
                                            : idx === 1
                                            ? RiPaletteLine
                                            : idx === 2
                                            ? RiMagicLine
                                            : RiDownloadCloud2Line;
                                    const isActive = activeStep === idx;
                                    const isCompleted = idx < activeStep;

                                    return (
                                        <button
                                            key={step.step}
                                            type="button"
                                            onClick={() => setActiveStep(idx)}
                                            onMouseEnter={() => setActiveStep(idx)}
                                            className={`${styles.workflowStep} ${
                                                isActive ? styles.workflowStepActive : ''
                                            } ${isCompleted ? styles.workflowStepDone : ''}`}>
                                            <div className={styles.workflowStepTop}>
                                                <span className={styles.stepIconBox} aria-hidden="true">
                                                    <StepIcon />
                                                </span>
                                                <span className={styles.stepBadge}>{step.tag}</span>
                                            </div>
                                            <h4 className={styles.stepTitle}>{step.title}</h4>
                                            <p className={styles.stepDesc}>{step.desc}</p>
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 6. Sharhlar */}
                        <section className={styles.card}>
                            <div className={styles.sectionHeader}>
                                <h2 className={styles.sectionTitle}>Mijozlar fikri va tajribasi</h2>
                                <span className={styles.ratingSummary}>
                                    <strong>0.0</strong> · 0 sharh
                                </span>
                            </div>

                            <div className={styles.emptyReviews}>
                                <p className={styles.emptyReviewsTitle}>Hozircha izohlar yo‘q</p>
                                <p className={styles.emptyReviewsSub}>0 tadan 0 ta ko‘rsatilgan</p>
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
                    <aside id="pricing-section" className={styles.sidebar}>
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

            {/* Mobile Sticky Bottom Conversion Bar (<= 900px) */}
            <div className={styles.mobileStickyBar}>
                <a href="#pricing-section" className={styles.mobileStickyPrice}>
                    <span className={styles.mobileStickyPlanName}>
                        {currentPlan.name} · {currentPlan.credits}
                    </span>
                    <span className={styles.mobileStickyAmount}>
                        <strong>${currentPrice}</strong>/oy
                        <span className={styles.mobileStickyMore}>Tariflar ▾</span>
                    </span>
                </a>
                <a
                    href={`${AGENT_CHAT_URL}?agent=${agent.id}&plan=${selectedPlanId}&period=${billingPeriod}`}
                    className={styles.mobileStickyBtn}>
                    <RiFlashlightFill aria-hidden="true" />
                    Boshlash
                </a>
            </div>

            {/* Interactive Sample Preview Modal */}
            {activeSample && (() => {
                const hasText = activeSample.type === 'copy' || Boolean(activeSample.fullContent);
                const hasVisual = Boolean(activeSample.imageUrl);
                const hasTabs = hasText && hasVisual;

                return (
                    <div className={styles.modalOverlay} onClick={() => setActiveSample(null)}>
                        <div
                            className={styles.modalContent}
                            onClick={(e) => e.stopPropagation()}>
                            {/* Fixed Top Header */}
                            <div className={styles.modalTopHeader}>
                                <div className={styles.modalTopHeaderLeft}>
                                    <h3 className={styles.modalTitle}>{activeSample.title}</h3>
                                    <div className={styles.modalMetaRow}>
                                        <span className={styles.modalCategory}>
                                            {activeSample.category}
                                            {activeSample.duration ? ` · ${activeSample.duration}` : ''}
                                        </span>
                                        {activeSample.credits && (
                                            <span className={styles.modalCredits}>
                                                <RiCoinsLine aria-hidden="true" />
                                                {activeSample.credits}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    className={styles.modalCloseInline}
                                    onClick={() => setActiveSample(null)}
                                    aria-label="Yopish">
                                    <RiCloseLine />
                                </button>
                            </div>

                            {/* Tab Switcher when sample has both Text and Visual */}
                            {hasTabs && (
                                <div className={styles.modalTabsBar}>
                                    <button
                                        type="button"
                                        onClick={() => setActiveModalTab('text')}
                                        className={`${styles.modalTabBtn} ${
                                            activeModalTab === 'text' ? styles.modalTabBtnActive : ''
                                        }`}>
                                        <RiFileCopyLine aria-hidden="true" />
                                        Tayyor matn
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setActiveModalTab('visual')}
                                        className={`${styles.modalTabBtn} ${
                                            activeModalTab === 'visual' ? styles.modalTabBtnActive : ''
                                        }`}>
                                        <RiSparklingFill aria-hidden="true" />
                                        Vizual ko‘rinish
                                    </button>
                                </div>
                            )}

                            {/* Scrollable Body */}
                            <div className={styles.modalScrollBody}>
                                {/* Video Modal Display */}
                                {activeSample.type === 'video' && (
                                    <div className={styles.modalVideoSection}>
                                        <video
                                            src={activeSample.videoUrl}
                                            controls
                                            autoPlay
                                            className={styles.modalVideoPlayer}
                                        />
                                        <div className={styles.modalVideoMeta}>
                                            {activeSample.subtitleSnippet && (
                                                <div className={styles.modalSubtitleBox}>
                                                    <strong>Subtitr:</strong> {activeSample.subtitleSnippet}
                                                </div>
                                            )}
                                            {activeSample.musicTrack && (
                                                <div className={styles.modalMusicBox}>
                                                    <RiMusic2Line />
                                                    <span>{activeSample.musicTrack}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Text / Copy Tab Display */}
                                {hasText && (!hasTabs || activeModalTab === 'text') && (
                                    <div className={styles.modalCopySection}>
                                        {activeSample.fullContent ? (
                                            <div className={styles.modalVariantsWrap}>
                                                <div className={styles.modalVariantsTabs}>
                                                    {Object.keys(activeSample.fullContent).map(
                                                        (variantKey, vIdx) => (
                                                            <button
                                                                key={variantKey}
                                                                type="button"
                                                                onClick={() => setActiveVariantTab(variantKey)}
                                                                className={`${styles.variantTabBtn} ${
                                                                    activeVariantTab === variantKey
                                                                        ? styles.variantTabBtnActive
                                                                        : ''
                                                                }`}>
                                                                Variant {vIdx + 1}
                                                            </button>
                                                        )
                                                    )}
                                                </div>

                                                <div className={styles.modalVariantBox}>
                                                    <div className={styles.modalVariantContent}>
                                                        <pre className={styles.modalVariantText}>
                                                            {activeSample.fullContent[activeVariantTab] ||
                                                                activeSample.fullContent.variant1}
                                                        </pre>
                                                    </div>
                                                    <div className={styles.modalVariantBar}>
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleCopyText(
                                                                    activeSample.fullContent[activeVariantTab] ||
                                                                        activeSample.fullContent.variant1,
                                                                    activeVariantTab
                                                                )
                                                            }
                                                            className={styles.modalCopyBtn}>
                                                            <RiFileCopyLine />
                                                            {copiedKey === activeVariantTab
                                                                ? 'Nusxa olindi! ✅'
                                                                : 'Matndan nusxa olish'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className={styles.modalSingleCopyBox}>
                                                <h4 className={styles.modalCopyHeadline}>
                                                    {activeSample.headline}
                                                </h4>
                                                <p className={styles.modalCopyBody}>
                                                    {activeSample.bodySnippet}
                                                </p>
                                                {activeSample.cta && (
                                                    <div className={styles.postMockCta}>
                                                        {activeSample.cta}
                                                    </div>
                                                )}
                                                {activeSample.hashtags && (
                                                    <div className={styles.postMockHashtags}>
                                                        {activeSample.hashtags}
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Visual / Image Tab Display */}
                                {hasVisual && (!hasTabs || activeModalTab === 'visual') && (
                                    <div className={styles.modalDesignSection}>
                                        <div className={styles.modalDesignImgWrap}>
                                            <img
                                                src={activeSample.imageUrl}
                                                alt={activeSample.title}
                                                className={styles.modalDesignImg}
                                            />
                                        </div>
                                        <div className={styles.modalDesignInfo}>
                                            <p className={styles.modalDesignDesc}>
                                                {activeSample.bodySnippet || activeSample.headline}
                                            </p>
                                            {activeSample.prompt && (
                                                <div className={styles.modalPromptBox}>
                                                    <strong>AI Prompt:</strong> {activeSample.prompt}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Generic Fallback (when neither video, text, nor image) */}
                                {activeSample.type !== 'video' && !hasVisual && !hasText && (
                                    <div className={styles.modalDetailSection}>
                                        <div
                                            className={styles.modalDetailHero}
                                            style={{ background: activeSample.gradient }}>
                                            <h3 className={styles.modalHeroTitle}>
                                                {activeSample.headline}
                                            </h3>
                                            <p className={styles.modalHeroDesc}>
                                                {activeSample.bodySnippet}
                                            </p>
                                            {activeSample.cta && (
                                                <div className={styles.modalHeroCta}>
                                                    {activeSample.cta}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Fixed Bottom Actions */}
                            <div className={styles.modalBodyFooter}>
                                <div className={styles.modalActions}>
                                    <a
                                        href={`${AGENT_CHAT_URL}?agent=${agent.id}&prompt=${encodeURIComponent(
                                            activeSample.prompt || activeSample.headline || activeSample.title
                                        )}`}
                                        className={styles.ctaPrimary}>
                                        SoffX {agent.name} bilan xuddi shunday tayyorlash
                                        <RiArrowRightLine aria-hidden="true" />
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
                );
            })()}
        </div>
    );
};

export default AgentDetail;
