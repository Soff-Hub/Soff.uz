import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Dropdown } from 'antd';
import styles from './language-switcher.module.scss';
import { setUserLocale } from '~/shared/utilities/locale-detection';

const languages = [
    { code: 'uz', name: "O'zbek", flag: '/static/img/uz.png' },
    // { code: 'en', name: 'English', flag: '/static/img/en.png' },
    { code: 'ru', name: 'Русский', flag: '/static/img/ru.png' },
];

const LanguageSwitcher = () => {
    const router = useRouter();
    const { locale, asPath } = router;
    const currentLanguage =
        languages.find((lang) => lang.code === locale) || languages[0];

    // Antd 5.x uses items prop
    const menuItems = languages.map((lang) => ({
        key: lang.code,
        label: (
            <div className={styles.menuItem}>
                <Image
                    src={lang.flag}
                    alt={lang.name}
                    width={24}
                    height={18}
                    className={styles.flagIcon}
                />
                <span>{lang.name}</span>
                {locale === lang.code && (
                    <i className="fa-solid fa-check ms-2 text-success"></i>
                )}
            </div>
        ),
        onClick: () => setUserLocale(lang.code, router),
        className: locale === lang.code ? styles.active : '',
    }));

    return (
        <Dropdown
            menu={{ items: menuItems }}
            placement="bottomRight"
            trigger={['click']}>
            <div className={styles.languageSwitcher} role="button" tabIndex={0}>
                <Image
                    src={currentLanguage.flag}
                    alt={currentLanguage.name}
                    width={28}
                    height={21}
                    className={styles.currentFlag}
                />
            </div>
        </Dropdown>
    );
};

export default LanguageSwitcher;
