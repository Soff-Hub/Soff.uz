import { Button, Modal, ConfigProvider } from 'antd'
import styles from './style.module.scss'
import { useState } from 'react'
import { formatCurrencyWithSpace } from '~/shared/utilities/product-helper'
import { MessageOutlined } from '@ant-design/icons'
import ServiceCheckout from '../auth/serviceCheckout'
import useCreateChat from '~/components/freeleance/chat/api/useCreateChat'

const StickyBox = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [showPayment, setShowPayment] = useState(false)
    const { mutate: createChat } = useCreateChat()

    return ( 
        <ConfigProvider
            theme={{
                token: {
                    colorPrimary: '#00a44f',
                    borderRadius: 8,
                    colorPrimaryHover: '#009045',
                    colorPrimaryActive: '#007a39',
                },
            }}
        >
            <div className={styles.stickyBox}>
                <div className={styles.wrapper}>
                    <Button
                        type="default"
                        icon={<MessageOutlined />}
                        className={styles.customBtn}
                        onClick={() => createChat(data?.user[0]?.soff_seller_id)}
                    >
                        <span className={styles.chatTitle}>Chat</span>
                    </Button>

                    <Button
                        type="primary"
                        className={`${styles.customBtn} ${styles.customBtnShine} ${styles.customBtnGlow}`}
                        onClick={() => setIsOpen(true)}
                    >
                        Buyurtma berish ({formatCurrencyWithSpace(data?.price)} so'm)
                    </Button>
                </div>
            </div>

            <Modal
                open={isOpen}
                onCancel={() => {
                    setIsOpen(false)
                    setShowPayment(false)
                }}
                footer={null}
                width={600}
            >
                <div className="type_payment p-lg-5 p-md-5 p-4">
                    {!showPayment ? (
                        <>
                            <h3 className="type_payment_h3 text-center mb-4">
                                Buyurtma uchun to'lovni amalga oshiring
                            </h3>

                            <div className="security-message mb-4 text-center">
                                <i className="fa-solid fa-shield-halved text-success fs-4 mb-2"></i>
                                <p className="text-muted mb-0">
                                    Sizning to'lovingiz Soff tizimi tomonidan xavfsiz saqlanadi.
                                    Mutaxassisga to'lov faqat siz ishni ko'rib chiqib,
                                    tasdiqlaganingizdan so'ng amalga oshiriladi.
                                </p>
                            </div>

                            <div className="service-details-box bg-white border rounded p-3 mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex align-items-center">
                                        <i className="fa-solid fa-file-lines text-primary me-3 fs-4"></i>
                                        <div>
                                            <h5 className="mb-1 fw-bold">{data?.title}</h5>
                                        </div>
                                    </div>
                                    <div className="text-end">
                                        <h4 className="text-primary mb-0 fw-bold">
                                            {formatCurrencyWithSpace(data?.price)} so'm
                                        </h4>
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button
                                    type="primary"
                                    size="large"
                                    className="px-5 py-2"
                                    onClick={() => setShowPayment(true)}
                                >
                                    Buyurtma berish
                                    <i className="fa-solid fa-arrow-right ms-2"></i>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="type_payment_h3 mb-0"></h3>
                                <Button
                                    type="text"
                                    icon={<i className="fa-solid fa-arrow-left"></i>}
                                    onClick={() => setShowPayment(false)}
                                >
                                    Orqaga
                                </Button>
                            </div>
                            <div className="bg-white">
                                <ServiceCheckout document={data?.id} />
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </ConfigProvider>
    )
}

export default StickyBox
