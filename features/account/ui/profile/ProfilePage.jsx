import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Input, Skeleton, message } from 'antd';
import {
    FaRegUserCircle,
    FaPencilAlt,
    FaCheck,
    FaTimes,
} from 'react-icons/fa';
import { FaMobileScreen } from 'react-icons/fa6';
import SidebarLayout from '~/widgets/sidebar/SidebarLayout';
import { apiSoffSlice } from '~/store/api/apiSlice';
import useUpdateProfile from './useUpdateProfile';
import styles from './profile.module.scss';

function formatPhoneDisplay(phone) {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('998')) {
        return `+998 ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
    }
    return phone;
}

function InfoRow({ label, value, icon }) {
    return (
        <div className={styles.infoRow}>
            <div className={styles.infoLabel}>
                {icon && <span className={styles.infoIcon}>{icon}</span>}
                <span>{label}</span>
            </div>
            <div className={styles.infoValue}>
                {value ?? <span className={styles.nullValue}>—</span>}
            </div>
        </div>
    );
}

function SectionCard({ title, children }) {
    return (
        <div className={styles.sectionCard}>
            <h3 className={styles.sectionTitle}>{title}</h3>
            <div className={styles.sectionBody}>{children}</div>
        </div>
    );
}

export default function ProfilePage() {
    const profile = useSelector((state) => state.profile.user);
    const dispatch = useDispatch();
    const { mutate: updateProfile, isPending } = useUpdateProfile();

    const [editingPhone, setEditingPhone] = useState(false);
    const [phoneInput, setPhoneInput] = useState('');

    const isLoading = !profile;

    const startEditingPhone = () => {
        const digits = profile?.phone?.replace(/\D/g, '') || '';
        setPhoneInput(digits.startsWith('998') ? digits.slice(3) : digits);
        setEditingPhone(true);
    };

    const cancelEditingPhone = () => {
        setEditingPhone(false);
        setPhoneInput('');
    };

    const savePhone = () => {
        const cleaned = phoneInput.replace(/\D/g, '');
        if (cleaned.length !== 9) {
            message.warning("Telefon raqam 9 ta raqamdan iborat bo'lishi kerak");
            return;
        }
        const fullPhone = `+998${cleaned}`;
        updateProfile(
            { phone: fullPhone },
            {
                onSuccess: () => {
                    dispatch(
                        apiSoffSlice.util.invalidateTags(['Profile'])
                    );
                    setEditingPhone(false);
                    message.success("Telefon raqam muvaffaqiyatli yangilandi");
                },
                onError: (err) => {
                    console.error(
                        '[Profile] Phone update error:',
                        err?.response || err
                    );
                    const res = err?.response?.data;
                    let msg = "Telefon raqamni yangilashda xatolik yuz berdi";

                    if (typeof res === 'string') {
                        msg = res;
                    } else if (res) {
                        msg =
                            res.detail ||
                            res.message ||
                            res.error ||
                            (Array.isArray(res.phone)
                                ? res.phone[0]
                                : res.phone) ||
                            msg;
                    } else if (err?.message) {
                        msg = err.message;
                    }

                    message.error(msg);
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="ps-whishlist">
                <div className="container mb-5">
                    <Skeleton active avatar paragraph={{ rows: 4 }} />
                </div>
            </div>
        );
    }

    const fullName =
        `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() ||
        'Foydalanuvchi';

    const phoneDisplay = editingPhone
        ? (
            <div className={styles.phoneEditGroup}>
                <Input
                    className={styles.phoneInput}
                    addonBefore="+998"
                    value={phoneInput}
                    onChange={(e) =>
                        setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 9))
                    }
                    maxLength={9}
                    autoFocus
                    onPressEnter={savePhone}
                />
                <Button
                    type="primary"
                    size="small"
                    icon={<FaCheck />}
                    loading={isPending}
                    onClick={savePhone}
                />
                <Button
                    size="small"
                    icon={<FaTimes />}
                    onClick={cancelEditingPhone}
                    disabled={isPending}
                />
            </div>
        )
        : (
            <div className={styles.phoneDisplay}>
                <span>{formatPhoneDisplay(profile?.phone) || '—'}</span>
                <button
                    type="button"
                    className={styles.editBtn}
                    onClick={startEditingPhone}
                    title="Telefon raqamni o'zgartirish">
                    <FaPencilAlt size={12} />
                </button>
            </div>
        );

    const profileHeader = (
        <div className={styles.profileHeader}>
            <div className={styles.avatarSection}>
                <Avatar
                    size={96}
                    src={profile?.image}
                    icon={<FaRegUserCircle />}
                    className={styles.avatar}
                />
                <div>
                    <h2 className={styles.fullName}>{fullName}</h2>
                </div>
            </div>
        </div>
    );

    return (
        <div className="ps-whishlist">
            <div className="container mb-5">
                <h1 className="page-title mt-5">Profil</h1>
                <SidebarLayout>
                    <div className={styles.pageContent}>
                        {profileHeader}

                        <SectionCard title="Asosiy ma'lumotlar">
                            <InfoRow
                                label="Ism"
                                value={profile?.first_name}
                            />
                            <InfoRow
                                label="Familiya"
                                value={profile?.last_name}
                            />
                            {profile?.email ? (
                                <InfoRow
                                    label="Email"
                                    value={profile?.email}
                                />
                            ) : (
                                <InfoRow
                                    label="Telefon"
                                    value={phoneDisplay}
                                    icon={<FaMobileScreen />}
                                />
                            )}
                        </SectionCard>
                    </div>
                </SidebarLayout>
            </div>
        </div>
    );
}
