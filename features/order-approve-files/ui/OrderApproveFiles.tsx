import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Modal, Button, Rate, Input, message } from 'antd';
import useSubmit, { SubmitPayloadType } from '../model/useSubmit';
import ReactConfetti from 'react-confetti';
import styles from './OrderApproveFiles.module.scss';
import { useTranslation, Trans } from 'next-i18next';

const { TextArea } = Input;

type OrderApproveFilesProps = {
    order: any;
    setRes: React.Dispatch<React.SetStateAction<string>>;
    res: string;
    feedbackOpen: boolean;
    setFeedbackOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSuccess: () => void;
};

function OrderApproveFiles({
    order,
    res = 'completed',
    setRes,
    feedbackOpen,
    setFeedbackOpen,
    onSuccess,
}: OrderApproveFilesProps) {
    const { t } = useTranslation('modals');
    const submit = useSubmit();
    const [text, setText] = useState('');
    const [rate, setRate] = useState<number | undefined>(undefined);
    const [congratModal, setCongratModal] = useState(false);

    const handleClearForm = () => {
        setRes('');
        setText('');
        setRate(undefined);
    };

    const handleCloseModal = () => {
        setFeedbackOpen(false);
        handleClearForm();
    };

    return (
        <>
            <Modal
                title={t('orderApprove.title')}
                open={feedbackOpen}
                onCancel={handleCloseModal}
                footer={[
                    <Button
                        key="submit"
                        type="primary"
                        loading={submit.isPending}
                        onClick={() => {
                            if (res === 'rejected' && !text.trim()) {
                                message.error(
                                    t('orderApprove.errors.reasonRequired')
                                );
                                return;
                            } else if (
                                res === 'complected' &&
                                (!text.trim() || !rate)
                            ) {
                                message.error(
                                    t('orderApprove.errors.feedbackRequired')
                                );
                                return;
                            }

                            const payload = {
                                id: order?.id,
                            } as SubmitPayloadType;

                            payload.status =
                                res === 'rejected' ? 'rejected' : 'completed';

                            if (res === 'rejected' && text) {
                                payload.reason = text;
                            }
                            if (res === 'completed' && rate) {
                                payload.rating = rate;
                            }
                            if (res === 'completed' && text) {
                                payload.comment = text;
                            }

                            submit.mutate(payload, {
                                onSuccess: () => {
                                    message.success(
                                        t('orderApprove.success.submit')
                                    );
                                    onSuccess();
                                    handleCloseModal();
                                    if (payload.status == 'completed') {
                                        setCongratModal(true);
                                    }
                                },
                                onError: () => {
                                    message.error(
                                        t('orderApprove.errors.submitError')
                                    );
                                },
                            });
                        }}>
                        {t('orderApprove.submit')}
                    </Button>,
                ]}>
                {res === 'completed' && (
                    <div className={styles.approveContent}>
                        <p className="m-0" style={{ whiteSpace: 'pre-line' }}>
                            {t('orderApprove.completed.description')}
                        </p>
                        <Rate
                            allowHalf={false}
                            value={rate}
                            onChange={(val) => setRate(val)}
                        />
                        <TextArea
                            placeholder={t(
                                'orderApprove.completed.placeholder'
                            )}
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                )}

                {res === 'rejected' && (
                    <>
                        <p>{t('orderApprove.rejected.description')}</p>
                        <TextArea
                            placeholder={t('orderApprove.rejected.placeholder')}
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </>
                )}
            </Modal>
            <Modal
                open={congratModal}
                centered
                footer={null}
                classNames={{
                    body: styles.congratModalBody,
                }}
                onCancel={() => setCongratModal(false)}>
                <div className="text-center">
                    <SmileOutlined className={styles.congratIcon} />
                    <h2 className={styles.congratTitle}>
                        {t('orderApprove.congratulation.title')}
                    </h2>
                    <p className={styles.congratText}>
                        <Trans
                            i18nKey="orderApprove.congratulation.text"
                            ns="modals"
                            components={{ b: <b /> }}
                        />
                    </p>

                    <Button
                        type="primary"
                        size="large"
                        className={styles.congratButton}
                        onClick={() => setCongratModal(false)}>
                        {t('orderApprove.congratulation.button')}
                    </Button>
                </div>
            </Modal>
            {congratModal && (
                <ReactConfetti recycle={false} numberOfPieces={300} />
            )}
        </>
    );
}

export default OrderApproveFiles;
