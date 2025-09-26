import { useState, useEffect } from "react";
import { message, Switch, Tooltip, ConfigProvider } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useGet, usePatch } from "~/repositories/https";
import useResponsive from "~/shared/utilities/useResponsive";
import useGetProfile from "~/components/freeleance/api/useGetProfile";

export default function TelegramNotification() {
    const { isMobile } = useResponsive();
    const { data: tg_link } = useGet(
        "tg_link",
        `${process.env.NEXT_PUBLIC_BASE_URL}/auth/get-telegram-link/`
    );
    const { data: newProfile } = useGetProfile();
    const { mutate, isLoading } = usePatch("nimadir");

    const handleOff = () => {
        mutate(
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/profile/`,
                payload: { telegram_chat_id: null },
            },
            {
                onSuccess: () => {
                    message.success("Bildirishnomalar o‘chirildi!");
                },
            }
        );
    };

    const [checked, setChecked] = useState(false);

    useEffect(() => {
        if (newProfile?.telegram_chat_id) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [newProfile]);

    const handleSwitchChange = (value) => {
        if (value) {
            if (!newProfile?.telegram_chat_id && tg_link?.link_code) {
                window.open(tg_link.link_code, "_blank");
            }
        } else {
            handleOff();
        }
        setChecked(value);
    };

    return (
        <div
            className={`alert alert-warning d-flex ${
                isMobile && ""
            } align-items-center justify-content-between`}
        >
            <div className="d-flex align-items-center gap-2">
                <span>Telegram bildirishnomalarini yoqish</span>
                <Tooltip title="Agar yoqsangiz, yangi buyurtma va xabarnomalar Telegram orqali yuboriladi">
                    <InfoCircleOutlined style={{ color: "#faad14" }} />
                </Tooltip>
            </div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#00a651", // switch rangini yashil qilib qo‘yamiz
                    },
                }}
            >
                <Switch
                    loading={isLoading}
                    checked={checked}
                    onChange={handleSwitchChange}
                />
            </ConfigProvider>
        </div>
    );
}
