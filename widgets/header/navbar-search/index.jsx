import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Select, Input } from 'antd';
import styles from './style.module.scss';
import { useState } from 'react';
import SearchModal from '~/shared/components/modals/search-modal/SearchModal';
import { useTranslation } from 'react-i18next';

const { Option } = Select;

const NavbarSearch = () => {
    const location = useRouter().pathname;
    const [type, setType] = useState('mahsulotlar');
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const { t } = useTranslation('header');

    if (location === '/') {
        return null;
    }

    const handleInputClick = (e) => {
        e.stopPropagation();
        setOpenSearchModal(true);
    };

    const onCloseModal = () => {
        setOpenSearchModal(false);
    };

    return (
        <div className="container">
            <div className={styles.searchBox}>
                <div className="d-flex w-100">
                    <label htmlFor="search-type" style={{ display: 'none' }}>
                        {t('searchType')}
                    </label>
                    <Select
                        id="search-type"
                        aria-label={t('searchType')}
                        value={type}
                        onChange={(val) => setType(val)}
                        className={styles.select}
                        bordered={false}>
                        <Option value="mahsulotlar">{t('products')}</Option>
                        <Option value="xizmatlar">{t('services')}</Option>
                        <Option value="mutaxasislar">{t('specialties')}</Option>
                    </Select>

                    <Input
                        className={styles.input}
                        placeholder={t('searchPlaceholderMobile')}
                        onPressEnter={handleInputClick}
                        onClick={handleInputClick}
                        readOnly
                        bordered={false}
                    />
                </div>

                <span className={styles.searchIcon} onClick={handleInputClick}>
                    <SearchOutlined />
                </span>
            </div>
            <SearchModal
                open={openSearchModal}
                defaultType={type}
                onClose={onCloseModal}
            />
        </div>
    );
};

export default NavbarSearch;
