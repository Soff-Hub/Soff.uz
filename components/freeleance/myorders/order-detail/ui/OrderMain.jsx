import { Breadcrumb, Button, Modal, message, Input, Rate, Alert } from 'antd';
import {
    DownloadOutlined,
    SmileOutlined,
    WarningOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import styles from '../style/style.module.scss';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/uz-latn';
import RequirementModal from './modals/RequirementModal';
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper';
import ServiceCheckout from '~/components/freeleance/services/service-deatail/ui/auth/serviceCheckout';
import useGetFile from '../api/useGetFile';
import useSubmit from '../api/useSubmit';
import { useQueryClient } from '@tanstack/react-query';
import ReactConfetti from 'react-confetti';
import { useRouter } from 'next/router';
import OrderCard from '~/entities/order/order-card';
import useResponsive from '~/shared/utilities/useResponsive';
import { useDispatch } from 'react-redux';
import { setShowFastDownload, setShowSearch } from '~/store/fast-dowload/slice';
dayjs.locale('uz-latn');

const OrderMain = ({ order }) => {
    const [open, setOpen] = useState(false);
    const [congratModal, setCongratModal] = useState(false);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [text, setText] = useState('');
    const [res, setRes] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [showPayment, setShowPayment] = useState(false);
    const [rate, setRate] = useState();
    const { data: file } = useGetFile(order?.id);
    const submit = useSubmit();
    const queryClient = useQueryClient();
    const { query, push } = useRouter();
    const { isDesktop } = useResponsive();
    const dispatch = useDispatch();

    const items = [
        { title: <Link href={'/order/my-orders'}>Mening buyurtmalarim</Link> },
        { title: `#${order?.id}` },
    ];

    const { TextArea } = Input;

    const onClose = () => {
        setIsOpen(false);
        queryClient.invalidateQueries({ queryKey: ['order'] });
    };

    useEffect(() => {
        if (query?.isOpen === 'true' && !isOpen) {
            setIsOpen(true);
            push(`/order/${query?.id}`);
        }
    }, [query?.isOpen]);

    useEffect(() => {
        if (order?.order_status_doing?.status === 'pending') {
            setIsOpen(true);
        }
    }, [setIsOpen, order]);

    useEffect(() => {
        dispatch(setShowSearch(false));
        dispatch(setShowFastDownload(false));

        return () => {
            dispatch(setShowSearch(true));
            dispatch(setShowFastDownload(true));
        };
    }, [dispatch]);
    return (
        <div className="col-lg-9 col-12 rounded-2">
            <div className={styles.orderDetailMain}>
                {order?.order_status_doing?.status === 'pending' && (
                    <div className={styles.orderPayCard}>
                        <div className="w-100">
                            <h4
                                className={`mb-0 ${
                                    !isDesktop && 'text-center'
                                }`}>
                                Frilanser ishni boshlashi uchun to'lovni amalga
                                oshiring
                            </h4>
                        </div>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#00a44f',
                                borderColor: '#00a44f',
                                padding: '16px 36px',
                            }}
                            onClick={() => setIsOpen(true)}>
                            <i class="fa-solid fa-credit-card"></i> To'lovni
                            amalga oshiring
                        </Button>
                    </div>
                )}

                {order?.order_status_doing?.status === 'order_accepted' && (
                    <div className={styles.orderPayCard}>
                        <div>
                            <h4
                                style={{
                                    color: 'yellowgreen',
                                    marginBottom: 0,
                                }}
                                className={styles.orderNameLink}>
                                Buyurtma qabul qilindi va Frilanser ishni
                                boshlaydi. Ish tugallangach, tayyor faylni shu
                                yerda yuklab olishingiz mumkin bo‘ladi. Istalgan
                                vaqtda chat orqali frilanser bilan muloqot
                                qilishingiz mumkin.
                            </h4>
                        </div>
                    </div>
                )}

                {(order?.order_status_doing?.status === 'approved' ||
                    order?.order_status_doing?.status ===
                        'requirement_file_rejected') && (
                    <div className={styles.orderPayCard}>
                        <div>
                            <h3 className={styles.orderNameLink}>
                                Buyurtma talablari kutilmoqda
                            </h3>
                            {order?.order_status_doing?.status ===
                                'approved' && (
                                <p>
                                    Siz to‘lovni amalga oshirdingiz. Endi
                                    mutahasis ishni boshlashi uchun kerakli
                                    materiallar va ko‘rsatmalarni yuboring.
                                </p>
                            )}
                            {order?.order_status_doing?.status ===
                                'requirement_file_rejected' && (
                                <p>
                                    Siz yuborgan materiallar yoki ko‘rsatmalar
                                    yetarli emasligi sababli mutahasis ularni
                                    rad etdi. Iltimos, ishni boshlash uchun
                                    barcha kerakli fayllar va aniq
                                    ko‘rsatmalarni qayta yuboring.
                                </p>
                            )}
                        </div>
                        <Button
                            type="primary"
                            style={{
                                backgroundColor: '#00a44f',
                                borderColor: '#00a44f',
                                padding: '16px 28px',
                            }}
                            onClick={() => setOpen(true)}>
                            Talablarni yuborish
                        </Button>
                    </div>
                )}

                {order?.order_status_doing?.status == 'order_file_sent' && (
                    <>
                        <Alert
                            icon={<WarningOutlined />}
                            message="Buyurtma 24 soat ichida ko'rib chiqilmasa avtomatik ravishta qabul qilingan deb hisoblanadi."
                            type="warning"
                        />
                        <div className={styles.orderPayCard}>
                            <div>
                                <h3 className={styles.orderNameLink}>
                                    Ishni qabul qilish
                                </h3>
                                <p>
                                    Mutahasis buyurtmani yakunladi va natijani
                                    sizga jo‘natdi. Natijani yuklab olib ko‘rib
                                    chiqing va tasdiqlang yoki rad eting.
                                </p>
                            </div>
                            <div
                                className="d-flex w-100 flex-column justify-content-end flex-sm-row"
                                style={{ display: 'flex', gap: 12 }}>
                                <Button
                                    icon={<DownloadOutlined />}
                                    onClick={() =>
                                        window.open(file?.file, '_blank')
                                    }>
                                    Faylni yuklab olish
                                </Button>
                                <Button
                                    type="primary"
                                    style={{
                                        backgroundColor: '#00a44f',
                                        borderColor: '#00a44f',
                                    }}
                                    onClick={() => setFeedbackOpen(true)}>
                                    Natijani baholash
                                </Button>
                            </div>
                        </div>
                    </>
                )}
                <Breadcrumb items={items} className="mb-2" />
                <OrderCard order={order} />
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

            <Modal
                title="Natija bo‘yicha fikringiz"
                open={feedbackOpen}
                onCancel={() => {
                    setFeedbackOpen(false);
                    setRes('');
                    setText('');
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
                                  onClick={() => {
                                      setRes('complected');
                                  }}>
                                  Qabul qilish
                              </Button>,
                          ]
                        : [
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

                                      const payload = { id: order?.id };

                                      payload.status =
                                          res === 'rejected'
                                              ? 'rejected'
                                              : 'completed';

                                      if (res === 'rejected' && text) {
                                          payload.reason = text;
                                      }
                                      if (res === 'complected' && rate) {
                                          payload.rating = rate;
                                      }
                                      if (res === 'complected' && text) {
                                          payload.comment = text;
                                      }

                                      submit.mutate(payload, {
                                          onSuccess: () => {
                                              message.success(
                                                  'Fikringiz yuborildi'
                                              );
                                              setFeedbackOpen(false);
                                              setRes('');
                                              queryClient.invalidateQueries({
                                                  queryKey: ['order'],
                                              });
                                              setText('');
                                              setRate(undefined);
                                              if (
                                                  payload.status == 'completed'
                                              ) {
                                                  setCongratModal(true);
                                              }
                                              console.log('payload', payload);
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
                          ]
                }>
                {res === '' && (
                    <p>
                        Natijani diqqat bilan ko‘rib chiqing. Agar hammasi siz
                        kutgandek bo‘lsa — <b>“Qabul qilish”</b> tugmasini
                        bosing. Agar muammolar bo‘lsa yoki to‘liq bo‘lmasa —{' '}
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
                                    xavfsiz saqlanadi. Mutaxassisga to'lov faqat
                                    siz ishni ko'rib chiqib, tasdiqlaganingizdan
                                    so'ng amalga oshiriladi.
                                </p>
                            </div>

                            <div className="service-details-box bg-white border rounded p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                        <div>
                                            {/* <h5 className="mb-1 fw-bold">{title}</h5> */}
                                            <p className="text-muted mb-0 small">
                                                {order?.service?.title ||
                                                    order?.title}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h4 className="text-primary mb-0 fw-bold">
                                            {formatCurrencyWithSpace(
                                                order?.service?.price ||
                                                    order?.budget
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
                                    Buyurtma berish
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
                                    onClose={onClose}
                                    document={order?.service?.id}
                                    order_id={order?.id}
                                />
                            </div>
                        </>
                    )}
                </div>
            </Modal>
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
        </div>
    );
};

export default OrderMain;
