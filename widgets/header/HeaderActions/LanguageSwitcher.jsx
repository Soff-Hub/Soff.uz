import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Dropdown } from 'antd';
import styles from './language-switcher.module.scss';

const languages = [
    { code: 'uz', name: "O'zbek", flag: '/static/img/uz.png' },
    { code: 'en', name: 'English', flag: '/static/img/en.png' },
    { code: 'ru', name: 'Русский', flag: '/static/img/ru.png' },
];

const LanguageSwitcher = () => {
    const router = useRouter();
    const { locale, asPath } = router;
    const currentLanguage =
        languages.find((lang) => lang.code === locale) || languages[0];

    const changeLanguage = (newLocale) => {
        // Save user's manual choice
        if (typeof window !== 'undefined') {
            localStorage.setItem('user_locale', newLocale);
        }

        // Remove current locale from path (if exists)
        let pathWithoutLocale = asPath.replace(/^\/(uz|en|ru)/, '');

        // If path is empty or just '/', set to empty string
        if (!pathWithoutLocale || pathWithoutLocale === '/') {
            pathWithoutLocale = '';
        }

        // Ensure path starts with /
        if (pathWithoutLocale && !pathWithoutLocale.startsWith('/')) {
            pathWithoutLocale = '/' + pathWithoutLocale;
        }

        // Navigate to new locale path
        const newPath = `/${newLocale}${pathWithoutLocale || '/'}`;
        router.push(newPath, undefined, {
            locale: newLocale,
            shallow: false,
        });
    };

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
        onClick: () => changeLanguage(lang.code),
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
