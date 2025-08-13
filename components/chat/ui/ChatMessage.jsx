import { EllipsisOutlined, DeleteOutlined, EditOutlined, CopyOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "../style/message.module.scss";
import { Dropdown, message as AntMessage, Modal } from "antd";
import useDeleteMessage from "../api/useDeleteMessage";
import dayjs from "dayjs"; // vaqt formatlash uchun

const { confirm } = Modal;

const ChatMessage = ({ msg, chat, onEdit }) => {
    const isMyMessage = msg.sender_id !== chat.opponent_id;
    const { mutate: deleteMsg } = useDeleteMessage();

    const handleEdit = () => {
        onEdit(msg);
    };

    const handleDeleteConfirm = () => {
        confirm({
            title: "Xabarni o‘chirishni tasdiqlang",
            icon: <ExclamationCircleOutlined />,
            content: "Rostdan ham ushbu xabarni o‘chirmoqchimisiz?",
            okText: "Ha, o‘chirish",
            okType: "danger",
            cancelText: "Bekor qilish",
            onOk() {
                deleteMsg(msg.id);
            }
        });
    };

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                AntMessage.success("Xabar nusxalandi");
            })
            .catch(() => {
                AntMessage.error("Nusxalashda xatolik yuz berdi");
            });
    };

    const myMenuItems = [
        { key: "edit", label: "Tahrirlash", icon: <EditOutlined />, onClick: handleEdit },
        { key: "copy", label: "Nusxalash", icon: <CopyOutlined />, onClick: () => handleCopy(msg.content) },
        { key: "delete", label: "O'chirish", icon: <DeleteOutlined />, danger: true, onClick: handleDeleteConfirm }
    ];

    const opponentMenuItems = [
        { key: "copy", label: "Nusxalash", icon: <CopyOutlined />, onClick: () => handleCopy(msg.content) }
    ];

    return (
        <div
            key={msg.id}
            className={`${styles.messageRow} ${isMyMessage ? styles.myRow : styles.otherRow}`}
        >
            {!isMyMessage && (
                <img
                    className={styles.avatar}
                    src={msg.sender_photo || "/static/img/ozodbek.png"}
                    alt="avatar"
                />
            )}

            <div className={`${styles.chat_message} ${isMyMessage ? styles.my_message : styles.other_message}`}>
                <span>{msg.content}</span>

                {/* Vaqt ko‘rsatish */}
                <div style={{ fontSize: "11px", color: isMyMessage ? "white" : "black", marginTop: "4px", textAlign: isMyMessage ? "right" : "left" }}>
                    {dayjs(msg.created_at).format("HH:mm")}
                </div>

                <div
                    style={isMyMessage ? { left: "-20px" } : { right: "-20px" }}
                    className={styles.moreWrapper}
                >
                    <Dropdown
                        menu={isMyMessage ? { items: myMenuItems } : { items: opponentMenuItems }}
                        trigger={['click']}
                        placement={isMyMessage ? "bottomRight" : "bottomLeft"}
                    >
                        <EllipsisOutlined className={styles.moreIcon} />
                    </Dropdown>
                </div>
            </div>

            {isMyMessage && (
                <img
                    className={styles.avatar}
                    src={msg.sender_photo || "/static/img/ozodbek.png"}
                    alt="avatar"
                />
            )}
        </div>
    );
};

export default ChatMessage;
