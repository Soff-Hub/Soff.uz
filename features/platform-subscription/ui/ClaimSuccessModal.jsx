import React from 'react';
import Link from 'next/link';
import { Modal } from 'antd';
import { MdCheck, MdDownload } from 'react-icons/md';
import FileDownloadLink from '~/shared/ui/file-download-link';
import { MY_SUBSCRIPTION_URL } from '../model';
import styles from './ClaimSuccessModal.module.scss';

/**
 * Shown after a successful claim. `result` is the claim response plus the product
 * title, or null when closed.
 */
const ClaimSuccessModal = ({ result, onClose }) => {
    const left = result?.downloads_left;

    return (
        <Modal open={Boolean(result)} onCancel={onClose} footer={null} centered width={420} className={styles.modal}>
            {result && (
                <div className={styles.body}>
                    <span className={styles.check} aria-hidden>
                        <MdCheck />
                    </span>

                    <h3 className={styles.title}>{result.claimed ? 'Fayl sizniki!' : 'Bu fayl allaqachon sizda'}</h3>
                    <p className={styles.fileName}>{result.title}</p>

                    {left != null && (
                        <p className={styles.meta}>
                            Bu oy yana <strong>{left} ta</strong> fayl olishingiz mumkin
                        </p>
                    )}

                    <FileDownloadLink url={result.file_url} filename={result.title} className={styles.downloadLink}>
                        <span className={styles.download}>
                            <MdDownload aria-hidden />
                            Yuklab olish
                        </span>
                    </FileDownloadLink>

                    <Link href={MY_SUBSCRIPTION_URL}>
                        <a className={styles.claimsLink} onClick={onClose}>
                            Obuna orqali olingan fayllarim
                        </a>
                    </Link>
                </div>
            )}
        </Modal>
    );
};

export default ClaimSuccessModal;
