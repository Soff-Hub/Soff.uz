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

const { Title, Text, Paragraph } = Typography;

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
                <Tag
                    className="w-100 mb-4 p-3 fs-4"
                    color="orange"
                    icon={<ExclamationCircleOutlined />}
                >
                    Ishni boshlash uchun frilanser tanlashingiz kerak
                </Tag>

                <div className={styles.orderCard}>
                    <div className="d-flex align-items-center justify-content-between">
                        <Title style={{ margin: 0 }} level={4}>
                            {order?.order_name}
                        </Title>
                        <Text strong>{formatCurrencyWithSpace(order?.price)} so'm</Text>
                    </div>
                    <Paragraph type="secondary" style={{ margin: "8px 0" }}>
                        {order?.ordered_at} | {orderStatusName[order?.status]}
                    </Paragraph>
                    <Paragraph>{order?.description}</Paragraph>
                </div>

                <div className={styles.sellerList}>
                    {freelancers?.length > 0 ? (
                        freelancers.map((item, index) => (
                            <div key={index} className={styles.sellerCard}>
                                <div className={styles.cardLeft}>
                                    <Avatar
                                        style={{ cursor: "pointer" }}
                                        onClick={() => push(`/seller/${item?.seller?.soff_seller_id}`)}
                                        src={item.seller?.photo_url || "/static/img/ozodbek.png"}
                                        size={64}
                                    />
                                    <div className={styles.info}>
                                        <Title
                                            style={{ cursor: "pointer", margin: 0 }}
                                            onClick={() => push(`/seller/${item?.seller?.soff_seller_id}`)}
                                            level={5}
                                        >
                                            {item.seller?.full_name}
                                        </Title>
                                        <Text type="secondary">
                                            {item.seller?.position || "Kasbi ko‘rsatilmagan"}
                                        </Text>
                                    </div>
                                </div>

                                <div className={styles.cardRight}>
                                    <Text strong>
                                        <TextSlicer bio={item.comment} len={60} />
                                    </Text>
                                    <Title level={4} style={{ margin: 0 }}>
                                        {item.money?.toLocaleString("uz-UZ")} so‘m
                                    </Title>
                                    <Button
                                        onClick={() => setSelectedOffer(item)}
                                        type="primary"
                                        size="small"
                                        style={{ background: "#00a44f" }}
                                    >
                                        Tanlash
                                    </Button>
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
                    Haqiqattanham Siz <strong>{selectedOffer?.seller?.full_name}</strong> ni tanlamoqchimisiz?
                </p>
                <p>Izoh: {selectedOffer?.comment}</p>
            </Modal>
        </>
    );
};

export default SelectOrderDrawer;
