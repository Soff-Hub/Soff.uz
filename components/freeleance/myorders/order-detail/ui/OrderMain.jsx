import {
    Breadcrumb,
    Button,
    Modal,
    message,
    Input,
    Rate,
    Collapse,
} from 'antd';
import { DownloadOutlined, SmileOutlined } from '@ant-design/icons';
import React, { useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/uz-latn';
import ReactConfetti from 'react-confetti';
import styles from '../style/style.module.scss';
import RequirementModal from './modals/RequirementModal';
import ServiceCheckout from '~/components/freeleance/services/service-deatail/ui/auth/serviceCheckout';
import { formatCurrencyWithSpace } from '~/utilities/product-helper';
import { getDate, getRemainingDays } from '~/utilities/calculateTime';
import useGetFile from '../api/useGetFile';
import useSubmit from '../api/useSubmit';
import { useQueryClient } from '@tanstack/react-query';

dayjs.locale('uz-latn');

const STATUS_CONFIG = {
    pending: {
        title: "To'lov kutilmoqda",
        description:
            'Buyurtma yaratildi, lekin hozirda mutahasisdan yashirilgan. Buyurtmani moliyalashtiring va mutahasis ishga kirishishi uchun buyurtma talablarini yuboring.',
        buttonText: "To'lash",
        onClick: setIsOpen => () => setIsOpen(true),
    },
    approved: {
        title: 'Buyurtma talablari kutilmoqda',
        description:
            'Siz to‘lovni amalga oshirdingiz. Endi mutahasis ishni boshlashi uchun kerakli materiallar va ko‘rsatmalarni yuboring.',
        buttonText: 'Talablarni yuborish',
        onClick: setOpen => () => setOpen(true),
    },
    requirement_file_rejected: {
        title: 'Buyurtma talablari kutilmoqda',
        description:
            'Siz yuborgan materiallar yoki ko‘rsatmalar yetarli emasligi sababli mutahasis ularni rad etdi. Iltimos, ishni boshlash uchun barcha kerakli fayllar va aniq ko‘rsatmalarni qayta yuboring.',
        buttonText: 'Talablarni yuborish',
        onClick: setOpen => () => setOpen(true),
    },
    order_file_sent: {
        title: 'Ishni qabul qilish',
        description:
            'Mutahasis buyurtmani yakunladi va natijani sizga jo‘natdi. Natijani yuklab olib ko‘rib chiqing va tasdiqlang yoki rad eting.',
        buttons: [
            {
                text: 'Faylni yuklab olish',
                icon: <DownloadOutlined />,
                onClick: file => () => window.open(file?.file, '_blank'),
            },
            {
                text: 'Natijani baholash',
                type: 'primary',
                onClick: setFeedbackOpen => () => setFeedbackOpen(true),
            },
        ],
    },
};

const OrderMain = ({ order }) => {
    const [open, setOpen] = useState(false);
    const [congratModal, setCongratModal] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [text, setText] = useState('');
    const [res, setRes] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [rate, setRate] = useState(null);
    const { data: file } = useGetFile(order?.id);
    const submit = useSubmit();
    const queryClient = useQueryClient();

    const { TextArea } = Input;

    const handleClose = useCallback(() => {
        setIsOpen(false);
        queryClient.invalidateQueries(['order']);
    }, [queryClient]);

    const handleFeedbackSubmit = useCallback(() => {
        if (res === 'rejected' && !text.trim()) {
            message.error('Kamchiliklarni yozishingiz kerak');
            return;
        }
        if (res === 'complected' && (!text.trim() || !rate)) {
            message.error('Fikr va bahoni yozishingiz kerak');
            return;
        }

        const payload = {
            id: order?.id,
            status: res === 'rejected' ? 'rejected' : 'completed',
        };
        if (res === 'rejected' && text) payload.reason = text;
        if (res === 'complected' && rate) payload.rating = rate;
        if (res === 'complected' && text) payload.comment = text;

        submit.mutate(payload, {
            onSuccess: () => {
                message.success('Fikringiz yuborildi');
                setFeedbackOpen(false);
                setRes('');
                setText('');
                setRate(null);
                setCongratModal(true);
            },
            onError: () => {
                message.error('Fikr yuborishda xatolik yuz berdi');
            },
        });
    }, [res, text, rate, order?.id, submit]);

    const breadcrumbItems = useMemo(
        () => [
            {
                title: (
                    <Link href="/order/my-orders">Mening buyurtmalarim</Link>
                ),
            },
            { title: `#${order?.id}` },
        ],
        [order?.id]
    );

    const renderStatusCard = () => {
        const status = order?.order_status_doing?.status;
        const config = STATUS_CONFIG[status];
        if (!config) return null;

        return (
            <div className={styles.orderPayCard}>
                <div>
                    <h3 className={styles.orderNameLink}>{config.title}</h3>
                    <p>{config.description}</p>
                </div>
                {config.buttons ? (
                    <div style={{ display: 'flex', gap: 12 }}>
                        {config.buttons.map((btn, index) => (
                            <Button
                                key={index}
                                type={btn.type || 'default'}
                                icon={btn.icon}
                                style={
                                    btn.type === 'primary'
                                        ? {
                                              backgroundColor: '#00a44f',
                                              borderColor: '#00a44f',
                                          }
                                        : {}
                                }
                                onClick={btn.onClick(
                                    status === 'order_file_sent'
                                        ? file
                                        : setFeedbackOpen
                                )}>
                                {btn.text}
                            </Button>
                        ))}
                    </div>
                ) : (
                    <Button
                        type="primary"
                        style={{
                            backgroundColor: '#00a44f',
                            borderColor: '#00a44f',
                            padding: '16px 28px',
                        }}
                        onClick={config.onClick(
                            status === 'pending' ? setIsOpen : setOpen
                        )}>
                        {config.buttonText}
                    </Button>
                )}
            </div>
        );
    };

    const renderOrderDetails = () => (
        <div className={styles.order}>
            <div className={styles.order_info}>
                <img
                    src={order?.service?.poster || '/static/img/doc.png'}
                    width={100}
                    height={100}
                    alt="service"
                />
                <a
                    className={styles.titleSize}
                    target="_blank"
                    href={`/service/${order?.service?.slug}` || '#'}
                    rel="noopener noreferrer">
                    {order?.service?.title || 'Noma’lum xizmat'}
                </a>
            </div>

            <div className={styles.order_date}>
                <Breadcrumb items={breadcrumbItems} />
                <span>
                    Buyurtma yaratilgan vaqt:{' '}
                    {order?.created_at ? getDate(order.created_at) : '-'}
                </span>
            </div>

            <div className="d-flex justify-content-end align-items-center">
                {order?.service?.delivery_days &&
                order?.order_status_doing?.accepted_date ? (
                    <p style={{ marginTop: 8, fontWeight: 500 }}>
                        {`Yetkazib berish muddati tugashiga ${getRemainingDays(
                            order?.order_status_doing?.accepted_date,
                            order?.service?.delivery_days
                        )} kun qoldi`}
                    </p>
                ) : (
                    <p style={{ marginTop: 8, fontWeight: 500 }}>
                        {`Yetkazib berish muddati: ${order?.service
                            ?.delivery_days ||
                            0} kun, Buyurtma hali qabul qilinmadi`}
                    </p>
                )}
            </div>

            <Collapse
                accordion
                items={[
                    {
                        label: 'Buyurtma tafsilotlari',
                        key: '1',
                        children: (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 12,
                                        marginBottom: 12,
                                    }}>
                                    <img
                                        src={
                                            order?.service?.poster ||
                                            '/static/img/default-service.png'
                                        }
                                        alt="service"
                                        style={{
                                            width: 60,
                                            height: 60,
                                            objectFit: 'cover',
                                            borderRadius: 8,
                                        }}
                                    />
                                    <span>
                                        <b>Xizmat:</b>{' '}
                                        {order?.service?.title || '-'}
                                    </span>
                                </div>
                                <p>
                                    <b>Yetkazish:</b>{' '}
                                    {order?.service?.delivery_days || 0} kun
                                </p>
                                <p>
                                    <b>Narx:</b>{' '}
                                    {(
                                        order?.service?.price || 0
                                    ).toLocaleString('uz-UZ')}{' '}
                                    so'm
                                </p>
                                {order?.order_requirement && (
                                    <div>
                                        <p>
                                            <b>Xizmat Talablar:</b>
                                            <br />
                                            <div
                                                dangerouslySetInnerHTML={{
                                                    __html:
                                                        order
                                                            ?.order_requirement[0]
                                                            ?.order_requirement_description,
                                                }}
                                            />
                                        </p>
                                    </div>
                                )}
                                {order?.order_requirement?.[0]
                                    ?.order_requirement_file && (
                                    <p className="d-flex align-items-center gap-2">
                                        <Button
                                            type="primary"
                                            icon={<DownloadOutlined />}
                                            href={
                                                order?.order_requirement[0]
                                                    ?.order_requirement_file
                                            }
                                            target="_blank"
                                            download
                                            className={styles.downloadBtn}>
                                            Fayllarni yuklab olish
                                        </Button>
                                    </p>
                                )}
                            </>
                        ),
                    },
                ]}
            />
        </div>
    );

    const renderFeedbackModal = () => (
        <Modal
            title="Natija bo‘yicha fikringiz"
            open={feedbackOpen}
            onCancel={() => {
                setFeedbackOpen(false);
                setRes('');
                setText('');
                setRate(null);
            }}
            footer={
                res === ''
                    ? [
                          <Button
                              key="rejected"
                              danger
                              onClick={() => setRes('rejected')}>
                              Kamchilik aniqlandi
                          </Button>,
                          <Button
                              key="complected"
                              type="primary"
                              onClick={() => setRes('complected')}>
                              Qabul qilish
                          </Button>,
                      ]
                    : [
                          <Button
                              key="submit"
                              type="primary"
                              loading={submit.isPending}
                              onClick={handleFeedbackSubmit}>
                              Yuborish
                          </Button>,
                      ]
            }>
            {res === '' && (
                <p>
                    Natijani diqqat bilan ko‘rib chiqing. Agar hammasi siz
                    kutgandek bo‘lsa — <b>“Qabul qilish”</b> tugmasini bosing.
                    Agar muammolar bo‘lsa yoki to‘liq bo‘lmasa —{' '}
                    <b>“Kamchilik aniqlandi”</b> tugmasini bosing.
                </p>
            )}
            {res === 'complected' && (
                <div className="d-flex flex-column gap-4">
                    <p className="m-0">
                        Siz natijani qabul qildingiz. <br />
                        Endi xizmat haqida oz fikringizni yozib qoldiring va
                        ishni yakunlang.
                    </p>
                    <Rate
                        allowHalf={false}
                        value={rate}
                        onChange={val => setRate(val)}
                    />
                    <TextArea
                        placeholder="Xizmat haqida fikrlaringizni yozib qoldiring"
                        rows={3}
                        value={text}
                        onChange={e => setText(e.target.value)}
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
                        onChange={e => setText(e.target.value)}
                    />
                </>
            )}
        </Modal>
    );

    const renderPaymentModal = () => (
        <Modal
            open={isOpen}
            onCancel={() => {
                setIsOpen(false);
                setShowPayment(false);
            }}
            footer={null}
            width={600}>
            <div className="type_payment p-lg-5 p-md-5 p-4">
                {!showPayment ? (
                    <>
                        <h3 className="type_payment_h3 text-center mb-4">
                            Buyurtma uchun to'lovni amalga oshiring
                        </h3>
                        <div className="security-message mb-4 text-center">
                            <i className="fa-solid fa-shield-halved text-success fs-4 mb-2"></i>
                            <p className="text-muted mb-0">
                                Sizning to'lovingiz Soff tizimi tomonidan
                                xavfsiz saqlanadi. Mutaxassisga to'lov faqat siz
                                ishni ko'rib chiqib, tasdiqlaganingizdan so'ng
                                amalga oshiriladi.
                            </p>
                        </div>
                        <div className="service-details-box bg-white border rounded p-3 mb-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                    <div>
                                        <p className="text-muted mb-0 small">
                                            {order?.service?.title}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-end">
                                    <h4 className="text-primary mb-0 fw-bold">
                                        {formatCurrencyWithSpace(
                                            order?.service?.price
                                        )}{' '}
                                        so'm
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <Button
                                type="primary"
                                size="large"
                                className="px-5 py-2"
                                style={{
                                    backgroundColor: '#28a745',
                                    borderColor: '#28a745',
                                }}
                                onClick={() => setShowPayment(true)}>
                                Buyurma berish
                                <i className="fa-solid fa-arrow-right ms-2"></i>
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h3 className="type_payment_h3 mb-0">
                                To'lov turini tanlang:
                            </h3>
                            <Button
                                type="text"
                                icon={
                                    <i className="fa-solid fa-arrow-left"></i>
                                }
                                onClick={() => setShowPayment(false)}>
                                Orqaga
                            </Button>
                        </div>
                        <div className="bg-white">
                            <ServiceCheckout
                                onClose={handleClose}
                                document={order?.service?.id}
                                order_id={order?.id}
                            />
                        </div>
                    </>
                )}
            </div>
        </Modal>
    );

    const renderCongratModal = () => (
        <>
            {congratModal && (
                <ReactConfetti recycle={false} numberOfPieces={300} />
            )}
            <Modal
                open={congratModal}
                centered
                footer={null}
                onCancel={() => setCongratModal(false)}
                bodyStyle={{
                    textAlign: 'center',
                    padding: '2rem',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, #d4f7d4, #ffffff)',
                }}>
                <div className="text-center">
                    <SmileOutlined
                        style={{ fontSize: '48px', color: '#28a745' }}
                    />
                    <h2
                        style={{
                            color: '#28a745',
                            fontSize: '24px',
                            marginTop: '1rem',
                        }}>
                        🎉 Tabriklaymiz! 🎉
                    </h2>
                    <p style={{ fontSize: '16px', marginTop: '0.5rem' }}>
                        Sizning buyurtmangiz <b> muvaffaqiyatli yakunlandi</b>.
                        Bizning platformamizni tanlaganingiz uchun rahmat 💚
                    </p>
                    <Button
                        type="primary"
                        size="large"
                        style={{
                            marginTop: '1.5rem',
                            backgroundColor: '#28a745',
                            borderColor: '#28a745',
                            borderRadius: '8px',
                        }}
                        onClick={() => setCongratModal(false)}>
                        Rahmat 🚀
                    </Button>
                </div>
            </Modal>
        </>
    );

    return (
        <div className="col-lg-9 col-12 mb-5 rounded-2">
            <div className={styles.orderDetailMain}>
                {renderStatusCard()}
                {renderOrderDetails()}
                {order?.order_status_doing?.status === 'completed' && (
                    <div className="d-flex justify-content-end align-items-center mt-3">
                        <Button
                            icon={<DownloadOutlined />}
                            onClick={() => window.open(file?.file, '_blank')}>
                            Faylni yuklab olish
                        </Button>
                    </div>
                )}
            </div>
            <RequirementModal
                visible={open}
                onClose={() => setOpen(false)}
                orderId={order?.id}
            />
            {renderFeedbackModal()}
            {renderPaymentModal()}
            {renderCongratModal()}
        </div>
    );
};

export default OrderMain;
