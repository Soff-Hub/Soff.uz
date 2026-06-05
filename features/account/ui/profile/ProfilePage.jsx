import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    Avatar,
    Button,
    Input,
    Skeleton,
    Tag,
    Alert,
    message,
} from 'antd';
import {
    FaRegUserCircle,
    FaPencilAlt,
    FaCheck,
    FaTimes,
} from 'react-icons/fa';
import { FaWallet, FaCalendarAlt, FaCode, FaUserTag } from 'react-icons/fa';
import {
    FaRegCalendarCheck,
    FaRegClock,
    FaMobileScreen,
} from 'react-icons/fa6';
import { IoShieldCheckmarkOutline, IoDocumentText } from 'react-icons/io5';
import {
    MdAdsClick,
    MdAutoAwesome,
    MdBarChart,
    MdBlock,
    MdVerified,
} from 'react-icons/md';
import { TbInfinity } from 'react-icons/tb';
import dayjs from 'dayjs';
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

function StatusTag({ active, label, truthy = true }) {
    if (active !== truthy) return null;
    return <Tag color={truthy ? 'green' : 'red'}>{label}</Tag>;
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
                    <Skeleton active avatar paragraph={{ rows: 8 }} />
                </div>
            </div>
        );
    }

    const fullName =
        `${profile?.first_name || ''} ${profile?.last_name || ''}`.trim() ||
        'Foydalanuvchi';

    const phoneDisplay = !profile?.email
        ? editingPhone
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
            )
        : null;

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
                    <p className={styles.userRole}>
                        {profile?.role === 'seller'
                            ? 'Sotuvchi'
                            : profile?.role === 'admin'
                              ? 'Admin'
                              : 'Mijoz'}
                    </p>
                </div>
            </div>
            {profile?.bio && <p className={styles.bio}>{profile.bio}</p>}
            {profile?.location && (
                <p className={styles.location}>{profile.location}</p>
            )}
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
                            {!profile?.email && (
                                <InfoRow
                                    label="Telefon"
                                    value={phoneDisplay}
                                    icon={<FaMobileScreen />}
                                />
                            )}
                            <InfoRow
                                label="Email"
                                value={profile?.email}
                            />
                            <InfoRow
                                label="Lavozim"
                                value={profile?.position}
                            />
                        </SectionCard>

                        <SectionCard title="Hisob ma'lumotlari">
                            <InfoRow
                                label="ID"
                                value={profile?.id}
                                icon={<FaCode />}
                            />
                            <InfoRow
                                label="Taklif kodi"
                                value={profile?.code}
                                icon={<FaCode />}
                            />
                            <InfoRow
                                label="Rol"
                                value={
                                    profile?.role === 'seller'
                                        ? 'Sotuvchi'
                                        : profile?.role === 'admin'
                                          ? 'Admin'
                                          : 'Mijoz'
                                }
                                icon={<FaUserTag />}
                            />
                            <InfoRow
                                label="Balans"
                                value={
                                    profile?.wallet != null
                                        ? `${Number(profile.wallet).toLocaleString()} so'm`
                                        : null
                                }
                                icon={<FaWallet />}
                            />
                            <InfoRow
                                label="Minimal summa"
                                value={
                                    profile?.min_sum != null
                                        ? `${Number(profile.min_sum).toLocaleString()} so'm`
                                        : null
                                }
                            />
                            <InfoRow
                                label="Kredit karta"
                                value={profile?.credit_card || null}
                            />
                            <InfoRow
                                label="Taklif qilganlar soni"
                                value={profile?.invited_users}
                            />
                            <InfoRow
                                label="Taklif foizi"
                                value={
                                    profile?.inviter_percentage != null
                                        ? `${profile.inviter_percentage}%`
                                        : null
                                }
                            />
                            <InfoRow
                                label="Taklif qiluvchi balansi"
                                value={
                                    profile?.inviter_wallet != null
                                        ? `${Number(profile.inviter_wallet).toLocaleString()} so'm`
                                        : null
                                }
                            />
                            <InfoRow
                                label="Ro'yxatdan o'tgan"
                                value={
                                    profile?.created_at
                                        ? dayjs(profile.created_at).format(
                                              'DD.MM.YYYY'
                                          )
                                        : null
                                }
                                icon={<FaRegCalendarCheck />}
                            />
                            <InfoRow
                                label="Oxirgi kirish"
                                value={
                                    profile?.last_login
                                        ? dayjs(profile.last_login).format(
                                              'DD.MM.YYYY HH:mm'
                                          )
                                        : null
                                }
                                icon={<FaRegClock />}
                            />
                        </SectionCard>

                        <SectionCard title="Imkoniyatlar va holat">
                            <InfoRow
                                label="Ilova orqali"
                                value={
                                    <StatusTag
                                        active={profile?.is_application}
                                        label="Ha"
                                    />
                                }
                                icon={<FaMobileScreen />}
                            />
                            <InfoRow
                                label="Reklama berish"
                                value={
                                    <StatusTag
                                        active={profile?.can_advertise}
                                        label="Ruxsat berilgan"
                                    />
                                }
                                icon={<MdAdsClick />}
                            />
                            <InfoRow
                                label="AI yaratish"
                                value={
                                    <StatusTag
                                        active={profile?.ai_generate_access}
                                        label="Mavjud"
                                    />
                                }
                                icon={<MdAutoAwesome />}
                            />
                            <InfoRow
                                label="Haftalik statistika"
                                value={
                                    <StatusTag
                                        active={profile?.weekly_stats_enabled}
                                        label="Yoqilgan"
                                    />
                                }
                                icon={<MdBarChart />}
                            />
                            <InfoRow
                                label="Imtiyoz"
                                value={
                                    <StatusTag
                                        active={profile?.has_privilege}
                                        label="Mavjud"
                                    />
                                }
                                icon={<MdVerified />}
                            />
                            <InfoRow
                                label="Hujjat"
                                value={
                                    <StatusTag
                                        active={profile?.have_document}
                                        label="Mavjud"
                                    />
                                }
                                icon={<IoDocumentText />}
                            />
                            <InfoRow
                                label="Shartnoma"
                                value={
                                    <StatusTag
                                        active={profile?.have_contract_file}
                                        label="Mavjud"
                                    />
                                }
                                icon={<IoDocumentText />}
                            />
                            <InfoRow
                                label="Sotuv mavjud"
                                value={
                                    <StatusTag
                                        active={profile?.have_sale}
                                        label="Ha"
                                    />
                                }
                            />
                            <InfoRow
                                label="Bloklangan"
                                value={
                                    <StatusTag
                                        active={profile?.is_blocked}
                                        label="Bloklangan"
                                        truthy={true}
                                    />
                                }
                                icon={<MdBlock />}
                            />
                            <InfoRow
                                label="Abadiy"
                                value={
                                    <StatusTag
                                        active={profile?.is_forever}
                                        label="Ha"
                                    />
                                }
                                icon={<TbInfinity />}
                            />
                        </SectionCard>

                        {profile?.is_superuser && (
                            <Alert
                                message="Superuser"
                                description="Siz tizim superuserisiz."
                                type="success"
                                showIcon
                            />
                        )}
                    </div>
                </SidebarLayout>
            </div>
        </div>
    );
}
