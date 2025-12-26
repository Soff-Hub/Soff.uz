import React, { useState } from 'react';
import { SmileOutlined } from '@ant-design/icons';
import { Modal, Button, Rate, Input, message } from 'antd';
import useSubmit, { SubmitPayloadType } from '../model/useSubmit';
import ReactConfetti from 'react-confetti';
import styles from './OrderApproveFiles.module.scss';

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
    res,
    setRes,
    feedbackOpen,
    setFeedbackOpen,
    onSuccess,
}: OrderApproveFilesProps) {
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
                title="Natija bo‘yicha fikringiz"
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
                                    'Kamchiliklarni yozishingiz kerak'
                                );
                                return;
                            } else if (
                                res === 'complected' &&
                                (!text.trim() || !rate)
                            ) {
                                message.error(
                                    'Fikr va bahoni yozishingiz kerak'
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
                                    message.success('Fikringiz yuborildi');
                                    onSuccess();
                                    handleCloseModal();
                                    if (payload.status == 'completed') {
                                        setCongratModal(true);
                                    }
                                },
                                onError: () => {
                                    message.error(
                                        'Fikr yuborishda xatolik yuz berdi'
                                    );
                                },
                            });
                        }}>
                        Yuborish
                    </Button>,
                ]}>
                {res === 'completed' && (
                    <div className={styles.approveContent}>
                        <p className="m-0">
                            Siz natijani qabul qildingiz. <br />
                            Endi xizmat haqida oz fikringizni yozib qoldiring va
                            ishni yakunlang.
                        </p>
                        <Rate
                            allowHalf={false}
                            value={rate}
                            onChange={(val) => setRate(val)}
                        />
                        <TextArea
                            placeholder="Xizmat haqida fikrlaringizni yozib qoldiring"
                            rows={3}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                )}

                {res === 'rejected' && (
                    <>
                        <p>
                            Kamchiliklarni iloji boricha batafsil yozing. Bu
                            sotuvchiga tezroq tuzatish kiritishga yordam beradi.
                        </p>
                        <TextArea
                            placeholder="Ishning aniqlangan kamchiliklarini yozing"
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
                    <h2 className={styles.congratTitle}>🎉 Tabriklaymiz! 🎉</h2>
                    <p className={styles.congratText}>
                        Sizning buyurtmangiz <b> muvaffaqiyatli yakunlandi</b>.
                        Bizning platformamizni tanlaganingiz uchun rahmat 💚
                    </p>

                    <Button
                        type="primary"
                        size="large"
                        className={styles.congratButton}
                        onClick={() => setCongratModal(false)}>
                        Rahmat 🚀
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
