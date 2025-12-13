import React, { useState } from 'react';
import { Avatar, Badge, Button } from 'antd';
import { FaStar, FaRegCommentDots, FaEye } from 'react-icons/fa';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import styles from '../style/select-order-drawer.module.scss';

const OfferCard = ({ offer, onSelect, onCreateChat }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const checkIsOnline = (lastActive) => {
        if (!lastActive) return false;
        const lastActiveTime = new Date(lastActive);
        const now = new Date();
        const diffMinutes = (now - lastActiveTime) / 1000 / 60;
        return diffMinutes <= 5;
    };

    const isOnline = checkIsOnline(offer?.seller?.last_active);

    // Add fake data for testing
    const fakeRating = offer?.seller?.avg_rating;
    const fakeFeedbackCount = offer?.seller?.feedback_count;
    const extendedComment = offer.comment;

    const MAX_COMMENT_LENGTH = 150;
    const isLongComment = extendedComment.length > MAX_COMMENT_LENGTH;
    const displayComment =
        isExpanded || !isLongComment
            ? extendedComment
            : extendedComment.substring(0, MAX_COMMENT_LENGTH) + '...';

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);
    };

    return (
        <div key={offer?.id} className={styles.offerCard}>
            <div className={styles.cardHeader}>
                <a
                    href={`/seller/${offer?.seller?.soff_seller_id}`}
                    target="_blank"
                    rel="noopener noreferrer">
                    <Badge
                        dot
                        color={isOnline ? 'green' : 'gray'}
                        offset={[-12, 55]}
                        className={styles.badge}>
                        <Avatar
                            src={
                                offer?.seller?.photo_url ||
                                '/static/img/ozodbek.png'
                            }
                            size={64}
                            style={{
                                minWidth: '64px',
                            }}
                            className={styles.avatar}
                        />
                    </Badge>
                </a>
                <div className={styles.profileInfo}>
                    <a
                        href={`/seller/${offer?.seller?.soff_seller_id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <h3 className={styles.name}>
                            {offer?.seller?.full_name}
                        </h3>
                    </a>
                    <span className={styles.position}>
                        {offer?.seller?.position?.title}
                    </span>
                    <div className={styles.ratingBox}>
                        {fakeRating ? (
                            <>
                                <FaStar className={styles.star} />
                                <span className={styles.ratingValue}>
                                    {offer?.seller?.avg_rating || fakeRating}
                                </span>
                            </>
                        ) : null}
                        {fakeFeedbackCount ? (
                            <span className={styles.reviewCount}>
                                ({fakeFeedbackCount} ta izoh)
                            </span>
                        ) : null}
                    </div>
                </div>
            </div>
            <div
                className={`${styles.commentWrapper} ${
                    isLongComment && !isExpanded ? styles.collapsed : ''
                }`}>
                <p className={styles.comment}>
                    <span className={styles.commentInlineWrapper}>
                        <span className={styles.commentText}>
                            {displayComment}
                        </span>
                        {isLongComment && !isExpanded && (
                            <span className={styles.commentGradient} />
                        )}
                        {isLongComment && (
                            <button
                                onClick={toggleExpand}
                                className={styles.expandButton}
                                style={{
                                    marginLeft: isExpanded ? '4px' : '0',
                                }}>
                                {isExpanded ? ' Yopish' : ' Batafsil'}
                            </button>
                        )}
                    </span>
                </p>
            </div>
            <div className={styles.cardFooter}>
                <div className={styles.priceSection}>
                    <div className={styles.priceLabel}>
                        <i
                            style={{
                                fontSize: '14px',
                                color: 'rgba(0,0,0,0.6)',
                            }}
                            className="fa-solid fa-sack-dollar"></i>
                        <span>Taklif narxi:</span>
                    </div>
                    <span className={styles.priceValue}>
                        {formatCurrencyWithSpace(offer?.money)} so'm
                    </span>
                </div>
                <div className={styles.actionButtons}>
                    <Button
                        onClick={() =>
                            onCreateChat(offer?.seller?.soff_seller_id)
                        }
                        className={styles.chatButton}>
                        <FaRegCommentDots className={styles.chatIcon} />
                        Chat
                    </Button>
                    <Button
                        onClick={() => onSelect(offer)}
                        type="primary"
                        className={styles.selectButton}>
                        <FaEye className={styles.selectIcon} />
                        Tanlash
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default OfferCard;
