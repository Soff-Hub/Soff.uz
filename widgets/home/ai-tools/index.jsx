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
        link: '/labs/app/video',
    },
    {
        id: 'ai-image',
        title: 'AI rasmlar',
        subtitle: 'Yuqori sifatli rasmlar',
        tag: 'Rasm',
        icon: RiImageFill,
        image: '/static/img/ai-tools/ai-image.jpg',
        link: '/labs/app/image',
    },
    {
        id: 'ai-presentation',
        title: 'AI Taqdimot',
        subtitle: 'Slayd va taqdimotlar',
        tag: 'Taqdimot',
        icon: RiPresentationFill,
        image: '/static/img/ai-tools/tool-presentation.jpg',
        link: '/labs/app/create/presentation',
    },
    {
        id: 'ai-coursework',
        title: 'AI Kurs ishi',
        subtitle: 'Kurs ishi va amaliy ish',
        tag: 'Ilmiy',
        icon: RiFileList3Fill,
        image: '/static/img/ai-tools/tool-coursework.jpg',
        link: '/labs/app/create/kursIshi',
    },
    {
        id: 'ai-referat',
        title: 'AI Referat',
        subtitle: 'Referat va maqolalar',
        tag: 'Referat',
        icon: RiBookOpenFill,
        image: '/static/img/ai-tools/tool-referat.jpg',
        link: '/labs/app/create/report',
    },
    {
        id: 'ai-diploma',
        title: 'AI Diplom ishi',
        subtitle: 'Bitiruv va BMI ishlari',
        tag: 'Diplom',
        icon: RiAwardFill,
        image: '/static/img/ai-tools/tool-diploma.jpg',
        link: '/labs/app/create/diplomIshi',
    },
    {
        id: 'ai-lesson',
        title: 'AI Dars ishlanmasi',
        subtitle: 'Dars ishlanmasi yaratish',
        tag: 'Dars',
        icon: RiGraduationCapFill,
        image: '/static/img/ai-tools/tool-academic.jpg',
        link: '/labs/app/create/lesson',
    },
];

const AiTools = () => {
    return (
        <section className={styles.aiToolsSection}>
            <div className={styles.containerFull}>
                <h2 className={styles.title}>AI imkoniyatlar</h2>

                <div className={styles.cardsGrid}>
                    {AI_TOOLS_DATA.map((tool) => {
                        const IconComponent = tool.icon;
                        return (
                            <a
                                key={tool.id}
                                href={tool.link}
                                className={styles.toolCard}>
                                <div className={styles.cardHead}>
                                    <span className={styles.cardTitle}>
                                        <IconComponent className={styles.cardIcon} />
                                        {tool.title}
                                    </span>
                                    <span className={styles.cardSubtitle}>
                                        {tool.subtitle}
                                    </span>
                                </div>

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
