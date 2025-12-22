import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IoClose } from 'react-icons/io5';
import styles from './VideoModal.module.scss';

type VideModalProps = {
    isOpen: boolean;
    onClose: () => void;
    videoId?: string;
};

function VideoModal({ isOpen, onClose, videoId }: VideModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, videoId]);

    if (!isOpen) return null;

    const modalContent = (
        <div className={styles.overlay} onClick={onClose} ref={modalRef}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className={styles.closeButton}
                    aria-label="Close video">
                    <IoClose className={styles.closeIcon} />
                </button>

                <div className={styles.videoWrapper}>
                    <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.iframe}
                    />
                </div>
            </div>
        </div>
    );

    return typeof document !== 'undefined'
        ? createPortal(modalContent, document.body)
        : null;
}

export default VideoModal;
