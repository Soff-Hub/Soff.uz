import React, { useState } from "react";
import { Drawer, Avatar, Typography, Button, Tag, message, Modal, Empty } from "antd";
import styles from "../style/SelectOrderDrawer.module.scss";
import { formatCurrencyWithSpace } from "~/utilities/product-helper";
import TextSlicer from "~/utilities/TextSlicer";
import useResponsive from "~/utilities/useResponsive";
import { orderStatusName } from "~/components/freeleance/constants";
import { useFGet, useFPost } from "~/components/freeleance/api/useFApi";
import { useSelector } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";


const SelectOrderDrawer = ({ open, onClose, order }) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const { isDesktop } = useResponsive();
    const { push } = useRouter();

    const { data: freelancers } = useFGet(
        order?.key,
        `offer/${order?.key}/`,
        { enabled: !!order?.key, token: user?.access }
    );

    const { mutate: selectOffer, isPending } = useFPost({
        url: "offer/select-offer",
        token: user?.access,
        onSuccess: () => {
            message.success("Frilanser tanlandi!");
            setSelectedOffer(null);
            push(`/order/${order?.key}?isOpen=true`)
            onClose();
        },
        onError: () => {
            message.error("Frilanser tanlanmadi. Iltimos qayta urinib ko‘ring!");
        },
    });

    const handleSelect = () => {
        if (!selectedOffer) return;
        const fd = new FormData();
        fd.append("offer_id", selectedOffer.id);
        selectOffer(fd);
    };

    return (
        <>
            <Drawer
                title="Frilanser takliflari"
                placement="right"
                width={isDesktop ? "70%" : "80%"}
                onClose={onClose}
                open={open}
            >


                <div className={styles.orderCard}>
                    <div className="d-flex align-items-center justify-content-between">
                        <Typography.Title style={{ margin: 0 }} level={4}>
                            {order?.order_name}
                        </Typography.Title>
                        <Typography.Title level={4} strong>{formatCurrencyWithSpace(order?.price)} so'm</Typography.Title>
                    </div>
                    <Typography.Paragraph type="secondary" style={{ margin: "8px 0" }}>
                        {order?.ordered_at} | {orderStatusName[order?.status] || ""}
                    </Typography.Paragraph>
                    <Typography.Paragraph>{order?.description}</Typography.Paragraph>
                </div>

                <Tag
                    className="w-100 mb-4 fs-4 text-wrap"
                    style={{ color: "orange", background: "transparent", border: "none" }}
                    icon={<ExclamationCircleOutlined />}
                >
                    Ishni boshlash uchun frilanser tanlashingiz kerak
                </Tag>

                <div className={styles.sellerList}>
                    {freelancers?.length > 0 ? (
                        freelancers?.map((item, index) => (
                            <div key={index} className={styles.sellerCard}>
                                <div className={styles.cardLeft}>
                                    <Avatar
                                        style={{ cursor: "pointer" }}
                                        onClick={() => push(`/seller/${item?.seller?.soff_seller_id}`)}
                                        src={item?.seller?.photo_url || "/static/img/ozodbek.png"}
                                        size={64}
                                    />
                                    <div className={styles.info}>
                                        <Typography.Title
                                            style={{ cursor: "pointer", margin: 0 }}
                                            onClick={() => push(`/seller/${item?.seller?.soff_seller_id}`)}
                                            level={5}
                                        >
                                            {item?.seller?.full_name}
                                        </Typography.Title>
                                        <Typography.Text type="secondary">
                                            {item?.seller?.position?.title || "Kasbi ko‘rsatilmagan"}
                                        </Typography.Text>
                                    </div>
                                </div>
                                <div className={styles.cardCenter}>
                                    <Typography.Title type="secondary" level={5}>
                                        Narxi:
                                    </Typography.Title>
                                    <Typography.Title level={4} style={{ margin: 0 }}>
                                        {item.money?.toLocaleString("uz-UZ")} so‘m
                                    </Typography.Title>
                                </div>
                                <div className={styles.cardRight}>
                                    <Typography.Text strong>
                                        <Typography.Title type="secondary" level={5}>
                                            Taklif izohi:
                                        </Typography.Title>
                                        <TextSlicer bio={item.comment} len={60} />
                                    </Typography.Text>
                                    <div className="d-flex justify-content-end w-100">
                                        <Button
                                            onClick={() => setSelectedOffer(item)}
                                            type="primary"
                                            size="small"
                                            style={{ background: "#00a44f", textAlign: "end" }}
                                        >
                                            Tanlash
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <Empty description="Hozircha hech qanday frilanser taklif yubormagan" />
                    )}
                </div>
            </Drawer>

            <Modal
                title="Frilanserni tanlash"
                open={!!selectedOffer}
                onCancel={() => setSelectedOffer(null)}
                onOk={handleSelect}
                okText="Ha, tanlayman"
                cancelText="Bekor qilish"
                confirmLoading={isPending}
                zIndex={20000}
            >
                <p>
                    Haqiqatan ham Siz <strong>{selectedOffer?.seller?.full_name}</strong> ni tanlamoqchimisiz?
                </p>
                <p><TextSlicer title={'izoh:'} bio={selectedOffer?.comment} /></p>
            </Modal>
        </>
    );
};

export default SelectOrderDrawer;
