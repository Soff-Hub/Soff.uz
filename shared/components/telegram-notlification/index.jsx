import { useState, useEffect } from 'react';
import { message, Switch, Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useGet, usePatch } from '~/repositories/https';
import useResponsive from '~/shared/utilities/useResponsive';
import {
    AUTH_PROFILE,
    NEW_PROFILE,
    TELEGRAM_LINK,
} from '~/shared/api/end-points';
import { useTelegram } from '~/shared/hooks/useTelegram';
import { useSelector } from 'react-redux';
import { useTranslation } from 'next-i18next';

export default function TelegramNotification({ header, hideIfActivated }) {
    const { t } = useTranslation('common');
    const { isMobile } = useResponsive();
    const { user } = useSelector((state) => state.auth);
    const [checked, setChecked] = useState(false);

    const { data: tg_link } = useGet(
        'tg_link',
        `${process.env.NEXT_PUBLIC_BASE_URL}${TELEGRAM_LINK}`
    );

    const { data: newProfile } = useGet(
        'new-profile',
        `${process.env.NEXT_PUBLIC_BASE_URL}${NEW_PROFILE}`
    );

    const { mutate, isLoading } = usePatch('nimadir');

    const handleOff = () => {
        mutate(
            {
                url: `${process.env.NEXT_PUBLIC_BASE_URL}${AUTH_PROFILE}`,
                payload: { telegram_chat_id: null },
            },
            {
                onSuccess: () => {
                    message.success(
                        t('telegramNotification.notificationsDisabled')
                    );
                },
            }
        );
    };

    useEffect(() => {
        if (newProfile?.telegram_chat_id) {
            setChecked(true);
        } else {
            setChecked(false);
        }
    }, [newProfile]);

    const handleSwitchChange = (value) => {
        if (value) {
            if (tg_link?.link_code) {
                window.open(tg_link.link_code, '_blank');
            }
        } else {
            handleOff();
        }
        setChecked(value);
    };

    if (checked && hideIfActivated) {
        return null;
    }

    if (user?.telegramWebApp) {
        return null;
    }

    return (
        <div
            className={`alert alert-warning d-flex ${
                isMobile && ''
            } align-items-center justify-content-between`}
            style={{
                borderRadius: '8px',
            }}>
            {header || (
                <div className="d-flex align-items-center gap-2">
                    <span>{t('telegramNotification.continueViaTelegram')}</span>
                    <Tooltip title={t('telegramNotification.tooltip')}>
                        <InfoCircleOutlined style={{ color: '#faad14' }} />
                    </Tooltip>
                </div>
            )}
            <Switch
                loading={isLoading}
                checked={checked}
                onChange={handleSwitchChange}
            />
        </div>
    );
}
