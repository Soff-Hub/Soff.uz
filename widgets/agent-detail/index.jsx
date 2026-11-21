import React from 'react';
import Link from 'next/link';
import {
    RiArrowRightUpLine,
    RiArrowRightSLine,
    RiCheckboxCircleFill,
    RiTimeLine,
    RiTeamFill,
} from 'react-icons/ri';
import {
    AGENT_APP_URL,
    AGENT_CHAT_URL,
    AI_AGENTS,
    agentImage,
    agentPath,
} from '~/entities/ai-agent/model';
import styles from './style.module.scss';

const AgentDetail = ({ agent }) => {
    const others = AI_AGENTS.filter((a) => a.id !== agent.id);

    return (
        <div className={styles.page}>
            <div className="container">
                <nav aria-label="Breadcrumb" className={styles.crumbs}>
                    <Link href="/">
                        <a>Bosh sahifa</a>
                    </Link>
                    <RiArrowRightSLine aria-hidden="true" />
                    {/* SoffX lives outside this app (rewrite), so a plain link, not next/link */}
                    <a href={AGENT_APP_URL}>AI agentlar</a>
                    <RiArrowRightSLine aria-hidden="true" />
                    <span aria-current="page">{agent.name}</span>
                </nav>

                {/* Hero */}
                <section className={styles.hero}>
                    <div className={styles.photo}>
                        <img
                            src={agentImage(agent.id, 'full')}
                            alt={`${agent.name} — SoffX AI agenti`}
                            width={640}
                            height={800}
                        />
                        <span className={styles.status}>
                            <span className={styles.dot} />
                            Onlayn · 24/7
                        </span>
                    </div>

                    <div className={styles.intro}>
                        <span className={styles.category}>{agent.category}</span>
                        <h1 className={styles.name}>{agent.name}</h1>
                        <p className={styles.role}>{agent.role}</p>
                        <p className={styles.about}>{agent.about}</p>

                        <ul className={styles.skills}>
                            {agent.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                            ))}
                        </ul>

                        <div className={styles.actions}>
                            <a href={AGENT_CHAT_URL} className={styles.primary}>
                                Agent bilan ishlash
                                <RiArrowRightUpLine aria-hidden="true" />
                            </a>
                            <a href={AGENT_APP_URL} className={styles.secondary}>
                                SoffX haqida
                            </a>
                        </div>
                        <p className={styles.note}>
                            Telegram orqali kirasiz. Kredit faqat tayyor natija uchun yechiladi.
                        </p>
                    </div>
                </section>

                {/* What it does + example */}
                <section className={styles.split}>
                    <div className={styles.panel}>
                        <h2 className={styles.h2}>Nima qila oladi</h2>
                        <ul className={styles.abilities}>
                            {agent.abilities.map((item) => (
                                <li key={item}>
                                    <RiCheckboxCircleFill aria-hidden="true" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className={`${styles.panel} ${styles.example}`}>
                        <h2 className={styles.h2}>Namuna vazifa</h2>
                        <div className={styles.chat}>
                            <div className={styles.you}>
                                <span className={styles.who}>Siz</span>
                                {agent.example.prompt}
                            </div>
                            <div className={styles.reply}>
                                <img
                                    src={agentImage(agent.id, 'bust')}
                                    alt=""
                                    width={40}
                                    height={40}
                                    className={styles.avatar}
                                />
                                <div>
                                    <span className={styles.who}>{agent.name}</span>
                                    <span className={styles.result}>
                                        <RiCheckboxCircleFill aria-hidden="true" />
                                        {agent.example.result}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <span className={styles.eta}>
                            <RiTimeLine aria-hidden="true" />
                            Javob: {agent.example.eta}
                        </span>
                    </div>
                </section>

                {/* How it works */}
                <section className={styles.section}>
                    <h2 className={styles.h2}>Qanday ishlaydi</h2>
                    <ol className={styles.steps}>
                        {agent.steps.map((step, i) => (
                            <li key={step}>
                                <span className={styles.stepNo}>{i + 1}</span>
                                {step}
                            </li>
                        ))}
                    </ol>
                </section>

                {/* Team */}
                <section className={styles.team}>
                    <div className={styles.teamHead}>
                        <span className={styles.teamIcon}>
                            <RiTeamFill aria-hidden="true" />
                        </span>
                        <div>
                            <h2 className={styles.h2}>Butun jamoa bitta suhbatda</h2>
                            <p className={styles.teamText}>
                                Siz Marketolog bilan gaplashasiz — u vazifani bo‘lib, kerakli
                                agentlarga taqsimlaydi va natijani yig‘ib beradi. Hammasi bitta
                                obunada.
                            </p>
                        </div>
                    </div>

                    <ul className={styles.others}>
                        {others.map((a) => (
                            <li key={a.id}>
                                <Link href={agentPath(a.id)}>
                                    <a className={styles.other}>
                                        <span className={styles.otherPhoto}>
                                            <img
                                                src={agentImage(a.id, 'bust')}
                                                alt=""
                                                width={72}
                                                height={72}
                                                loading="lazy"
                                            />
                                        </span>
                                        <span className={styles.otherText}>
                                            <span className={styles.otherName}>{a.name}</span>
                                            <span className={styles.otherRole}>{a.role}</span>
                                        </span>
                                        <RiArrowRightSLine
                                            aria-hidden="true"
                                            className={styles.otherArrow}
                                        />
                                    </a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default AgentDetail;
