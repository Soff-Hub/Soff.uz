import React, { useState } from 'react';
import { Button, Spin } from 'antd';
import {
    CloseOutlined,
    ArrowLeftOutlined,
    CheckOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useConversation } from './Conversation';
import styles from '../../style/chat.module.scss';
import { FAQCategory } from '../../api/useFAQ';

const ChatFAQ: React.FC = () => {
    const {
        isFAQOpen,
        setIsFAQOpen,
        faqData,
        isFAQLoading,
        sendFaqSelect,
        isModerator,
        sendMessage,
    } = useConversation();

    const [view, setView] = useState<'categories' | 'questions' | 'feedback'>('categories');
    const [selectedCategory, setSelectedCategory] =
        useState<FAQCategory | null>(null);

    if (!isModerator || !isFAQOpen) return null;

    const handleCategoryClick = (category: FAQCategory) => {
        setSelectedCategory(category);
        setView('questions');
    };

    const handleBack = () => {
        setView('categories');
        setSelectedCategory(null);
    };

    const handleQuestionClick = (optionId: string) => {
        sendFaqSelect(optionId);
        setView('feedback');
    };

    const handleFeedbackAction = (text: string, isResolved: boolean) => {
        sendMessage(text);
        if (isResolved) {
            // Re-open/Reset to categories if resolved
            setView('categories');
            setSelectedCategory(null);
        } else {
            // Close or keep closed if not resolved
            setIsFAQOpen(false);
            // Optionally reset view for next time it opens
            setTimeout(() => {
                setView('categories');
                setSelectedCategory(null);
            }, 300);
        }
    };

    if (isFAQLoading) {
        return (
            <div className={styles.faq_container}>
                <Spin size="small" />
            </div>
        );
    }

    if (!faqData || faqData.length === 0) return null;

    // Feedback View (Image-based UI)
    if (view === 'feedback') {
        return (
            <div className={styles.faq_feedback_prompt}>
                <p className={styles.faq_feedback_prompt_text}>
                    Ushbu javob yordam berdimi?
                </p>
                <div className={styles.faq_feedback_prompt_btns}>
                    <Button
                        className={styles.faq_feedback_prompt_btn_yes}
                        onClick={() => handleFeedbackAction("✅ Hal bo'ldi", true)}
                        icon={<CheckOutlined />}>
                        Hal bo'ldi
                    </Button>
                    <Button
                        className={styles.faq_feedback_prompt_btn_no}
                        onClick={() => handleFeedbackAction("❓ Yordam kerak", false)}
                        icon={<ExclamationCircleOutlined />}>
                        Yordam kerak
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.faq_container}>
            <div className={styles.faq_header}>
                <div className={`${styles.faq_header_left} ${view !== 'questions' ? styles.centered : ''}`}>
                    {view === 'questions' && (
                        <Button
                            type="text"
                            icon={<ArrowLeftOutlined />}
                            onClick={handleBack}
                            size="small"
                        />
                    )}
                    <span className={styles.faq_title}>
                        {view === 'categories'
                            ? "Qanday yordam bera olamiz?"
                            : selectedCategory?.category}
                    </span>
                </div>
                <Button
                    type="text"
                    icon={<CloseOutlined />}
                    onClick={() => setIsFAQOpen(false)}
                    size="small"
                />
            </div>

            <div className={styles.faq_content}>
                {view === 'categories' ? (
                    <div className={styles.faq_categories_grid}>
                        {faqData.map((cat, idx) => (
                            <div
                                key={idx}
                                className={styles.faq_category_card}
                                onClick={() => handleCategoryClick(cat)}>
                                <span className={styles.faq_category_name}>
                                    {cat.category}
                                </span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.faq_questions_list}>
                        {selectedCategory?.options.map((opt) => (
                            <div
                                key={opt.id}
                                className={styles.faq_question_item}
                                onClick={() => handleQuestionClick(opt.id)}>
                                <span>{opt.question}</span>
                                <ArrowLeftOutlined
                                    style={{
                                        transform: 'rotate(180deg)',
                                        fontSize: '12px',
                                        opacity: 0.5,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatFAQ;
