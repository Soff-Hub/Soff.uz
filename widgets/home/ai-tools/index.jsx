import React from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import {
    RiVideoFill,
    RiImageFill,
    RiGraduationCapFill,
    RiPresentationFill,
    RiFileList3Fill,
    RiBookOpenFill,
    RiAwardFill,
} from 'react-icons/ri';

const AI_TOOLS_DATA = [
    {
        id: 'ai-video',
        title: 'AI Video',
        subtitle: 'Matndan video yaratish',
        tag: 'Video',
        icon: RiVideoFill,
        image: '/static/img/ai-tools/ai-video.jpg',
        video: '/static/img/ai-tools/ai-video.mp4',
        videoWebm: '/static/img/ai-tools/ai-video.webm',
        link: 'https://soffx.com/app/video',
    },
    {
        id: 'ai-image',
        title: 'AI Image',
        subtitle: 'Yuqori sifatli rasmlar',
        tag: 'Rasm',
        icon: RiImageFill,
        image: '/static/img/ai-tools/ai-image.jpg',
        link: 'https://soffx.com/app/image',
    },
    {
        id: 'ai-presentation',
        title: 'AI Taqdimot',
        subtitle: 'Slayd va taqdimotlar',
        tag: 'Taqdimot',
        icon: RiPresentationFill,
        image: '/static/img/ai-tools/tool-presentation.jpg',
        link: 'https://soffx.com/app/create/presentation',
    },
    {
        id: 'ai-coursework',
        title: 'AI Kurs ishi',
        subtitle: 'Kurs ishi va amaliy ish',
        tag: 'Ilmiy',
        icon: RiFileList3Fill,
        image: '/static/img/ai-tools/tool-coursework.jpg',
        link: 'https://soffx.com/app/create/kursIshi',
    },
    {
        id: 'ai-referat',
        title: 'AI Referat',
        subtitle: 'Referat va maqolalar',
        tag: 'Referat',
        icon: RiBookOpenFill,
        image: '/static/img/ai-tools/tool-referat.jpg',
        link: 'https://soffx.com/app/create/report',
    },
    {
        id: 'ai-diploma',
        title: 'AI Diplom ishi',
        subtitle: 'Bitiruv va BMI ishlari',
        tag: 'Diplom',
        icon: RiAwardFill,
        image: '/static/img/ai-tools/tool-diploma.jpg',
        link: 'https://soffx.com/app/create/diplomIshi',
    },
    {
        id: 'ai-lesson',
        title: 'AI Dars ishlanmasi',
        subtitle: 'Dars ishlanmasi yaratish',
        tag: 'Dars',
        icon: RiGraduationCapFill,
        image: '/static/img/ai-tools/tool-academic.jpg',
        link: 'https://soffx.com/app/create/lesson',
    },
];

const AiTools = () => {
    return (
        <section className={styles.aiToolsSection}>
            <div className={styles.containerFull}>
                <h2 className={styles.title}>AI Tools</h2>

                <div className={styles.cardsGrid}>
                    {AI_TOOLS_DATA.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                            <a
                                key={tool.id}
                                href={tool.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.toolCard}>
                                <div className={styles.imageWrapper}>
                                    {tool.video ? (
                                        <video
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            preload="auto"
                                            poster={tool.image}
                                            className={styles.cardVideo}>
                                            {tool.videoWebm && (
                                                <source
                                                    src={tool.videoWebm}
                                                    type="video/webm"
                                                />
                                            )}
                                            <source
                                                src={tool.video}
                                                type="video/mp4"
                                            />
                                        </video>
                                    ) : (
                                        <Image
                                            src={tool.image}
                                            alt={tool.title}
                                            layout="fill"
                                            objectFit="cover"
                                            className={styles.cardImg}
                                            quality={85}
                                        />
                                    )}
                                    <div className={styles.overlay} />
                                </div>

                                {/* Envato-style Floating Badge */}
                                <div className={styles.floatingBadge}>
                                    <div className={styles.badgeIconBox}>
                                        <IconComponent className={styles.badgeIcon} />
                                    </div>
                                    <span className={styles.badgeText}>
                                        {tool.title}
                                    </span>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AiTools;
