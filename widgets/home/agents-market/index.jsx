import React from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';
import styles from './style.module.scss';

import { AGENT_APP_URL, AI_AGENTS, agentImage, agentPath } from '~/entities/ai-agent/model';

const AgentsMarket = () => {
    return (
        <section className={styles.section} aria-labelledby="agents-market-title">
            <div className={styles.containerFull}>
                <div className={styles.head}>
                    <div>
                        <h2 id="agents-market-title" className={styles.title}>
                            Biznesingiz uchun tayyor AI jamoa
                        </h2>
                        <p className={styles.subtitle}>
                            SoffX AI Marketolog bilan gaplashasiz — u ishni 6 ta agentga
                            taqsimlaydi: reja, matn, rasm, video va reklama.
                        </p>
                    </div>
                    <a href={AGENT_APP_URL} className={styles.allLink}>
                        Agentni ochish
                        <RiArrowRightUpLine aria-hidden="true" />
                    </a>
                </div>

                <ul className={styles.grid}>
                    {AI_AGENTS.map((agent) => (
                        <li key={agent.id} className={styles.item}>
                            <a
                                href={agentPath(agent.id)}
                                className={styles.card}
                                aria-label={`${agent.name} — ${agent.role}`}>
                                <div className={styles.photo}>
                                    <img
                                        src={agentImage(agent.id)}
                                        alt={agent.name}
                                        width={320}
                                        height={320}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <span className={styles.status}>
                                        <span className={styles.dot} />
                                        Ishga tayyor
                                    </span>
                                </div>
                                <div className={styles.body}>
                                    <span className={styles.name}>{agent.name}</span>
                                    <span className={styles.role}>{agent.role}</span>
                                    <span className={styles.skills}>
                                        {agent.skills.slice(0, 2).map((skill) => (
                                            <span key={skill} className={styles.skill}>
                                                {skill}
                                            </span>
                                        ))}
                                    </span>
                                    <span className={styles.cta}>
                                        Batafsil
                                        <RiArrowRightUpLine aria-hidden="true" />
                                    </span>
                                </div>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default AgentsMarket;
