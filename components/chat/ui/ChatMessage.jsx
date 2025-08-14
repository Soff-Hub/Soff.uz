import { EllipsisOutlined, DeleteOutlined, EditOutlined, CopyOutlined, ExclamationCircleOutlined, CheckOutlined } from "@ant-design/icons";
import styles from "../style/message.module.scss";
import { Dropdown, message as AntMessage, Modal, Tooltip } from "antd";
import useDeleteMessage from "../api/useDeleteMessage";
import dayjs from "dayjs";

const { confirm } = Modal;

const ChatMessage = ({ msg, onEdit }) => {
    const isMyMessage = msg.is_mine
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

    const renderReadStatus = () => {
        if (!isMyMessage) return null;

        if (msg.is_read) {
            return (
                <Tooltip title="O‘qildi">
                    <CheckOutlined style={{ fontSize: "8px", color: "white", marginLeft: 4 }} />
                    <CheckOutlined style={{ fontSize: "8px", color: "white", marginLeft: -4 }} />
                </Tooltip>
            );
        }
        return (
            <Tooltip title="Yetib bordi">
                <CheckOutlined style={{ fontSize: "8px", color: "white", marginLeft: 4 }} />
            </Tooltip>
        );
    };

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
                <span style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    gap: "6px"
                }}>
                    <span>{msg.content}</span>
                    <span style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "9.5px",
                        color: isMyMessage ? "white" : "black",
                        opacity: 0.7,
                        whiteSpace: "nowrap"
                    }}>
                        {dayjs(msg.created_at).format("HH:mm")}
                        {renderReadStatus()}
                    </span>
                </span>

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
