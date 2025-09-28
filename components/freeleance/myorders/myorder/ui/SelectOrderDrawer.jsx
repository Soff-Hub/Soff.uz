import React, { useState } from "react";
import { Drawer, Avatar, Typography, Button, Tag, message, Modal, Empty } from "antd";
import styles from "../style/SelectOrderDrawer.module.scss";
import TextSlicer from "~/shared/utilities/TextSlicer";
import useResponsive from "~/shared/utilities/useResponsive";
import { useFGet, useFPost } from "~/shared/hooks/useFApi";
import { useSelector } from "react-redux";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import OrderCard from "~/entities/order/order-card";


const SelectOrderDrawer = ({ open, onClose, order }) => {
    const [selectedOffer, setSelectedOffer] = useState(null);
    const { user } = useSelector((state) => state.auth);
    const { isDesktop } = useResponsive();
    const { push } = useRouter();

    const { data: freelancers } = useFGet(
        order?.id,
        `offer/${order?.id}/`,
        { enabled: !!order?.id, token: user?.access }
    );

    const { mutate: selectOffer, isPending } = useFPost({
        url: "offer/select-offer",
        token: user?.access,
        onSuccess: () => {
            message.success("Frilanser tanlandi!");
            setSelectedOffer(null);
            push(`/order/${order?.id}?isOpen=true`)
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
                style={{ height: "100vh", overflow: "auto" }}
                onClose={onClose}
                open={open}
            >
                <OrderCard order={order}/>
                <Tag
                    className="w-100 my-4 fs-4 text-wrap"
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
                                        <Link href={`/seller/${item?.seller?.soff_seller_id}`}>
                                            <Typography.Title
                                                className={styles.hover_link}
                                                style={{ cursor: "pointer", margin: 0, }}
                                                level={5}
                                            >
                                                {item?.seller?.full_name}

                                            </Typography.Title>
                                        </Link>
                                        <Typography.Text type="secondary">
                                            {item?.seller?.position?.title || "Kasbi ko‘rsatilmagan"}
                                        </Typography.Text>
                                    </div>
                                </div>
                                <div className={styles.cardCenter}>
                                    <Typography.Title type="secondary" level={5}>
                                        Narxi:
                                    </Typography.Title>
                                    <Typography.Title level={5} style={{ margin: 0 }}>
                                        {item.money?.toLocaleString("uz-UZ")} so‘m
                                    </Typography.Title>
                                </div>
                                <div className={styles.cardRight}>
                                    <div className="d-flex flex-column align-items-start justify-content-start">
                                        <p className=" m-0 p-0 fs-4 text-secondary">
                                            Taklif izohi:
                                        </p>
                                        <p className={`${styles.recommedation} text-justify`}>
                                            <TextSlicer bio={item.comment} len={60} />
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-end w-100">
                                        <Button
                                            onClick={() => setSelectedOffer(item)}
                                            type="primary"
                                            size="small"
                                            className="px-5 py-4 fs-3"
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
                <p style={{ fontSize: "12px" }}>
                    Haqiqatan ham Siz <strong>{selectedOffer?.seller?.full_name}</strong> ni tanlamoqchimisiz?
                </p>

                <p><TextSlicer title={'Izoh:'} bio={`${selectedOffer?.comment || 'Izoh yo‘q'}`} /></p>
            </Modal>
        </>
    );
};

export default SelectOrderDrawer;
