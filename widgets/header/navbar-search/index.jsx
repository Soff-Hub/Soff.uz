import { SearchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { Select, Input } from 'antd';
import styles from './style.module.scss';
import React, { useState, useEffect } from 'react';
import useResponsive from '~/shared/utilities/useResponsive';
import SearchModal from '~/shared/components/modals/search-modal/SearchModal';

const { Option } = Select;

const NavbarSearch = ({ isScrolledUp }) => {
    const location = useRouter().pathname;
    const { isMobile } = useResponsive();
    const [type, setType] = useState('mahsulotlar');
    const [openSearchModal, setOpenSearchModal] = useState(false);
    const [isSticky, setIsSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 70) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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

    const shouldKeepFixed = isSticky && !isScrolledUp;

    return (
        <>
            {shouldKeepFixed && <div style={{ height: '54px', width: '100%' }}></div>}
            <div className={shouldKeepFixed ? styles.stickyWrapper : ''}>
                <div className="container">
                    <div
                        className={styles.searchBox}
                        style={{ marginBottom: shouldKeepFixed ? '0px' : '10px' }}
                    >
                        <div className="d-flex w-100">
                            {!isMobile && (
                                <>
                                    <label htmlFor="search-type" style={{ display: 'none' }}>
                                        Turi
                                    </label>
                                    <Select
                                        id="search-type"
                                        aria-label="Turi"
                                        value={type}
                                        onChange={(val) => setType(val)}
                                        className={styles.select}
                                        bordered={false}>
                                        <Option value="mahsulotlar">Mahsulotlar</Option>
                                        <Option value="xizmatlar">Xizmatlar</Option>
                                        <Option value="mutaxasislar">Mutaxassislar</Option>
                                    </Select>
                                </>
                            )}

                            <Input
                                className={styles.input}
                                placeholder={'izlash...'}
                                onPressEnter={handleInputClick}
                                onClick={handleInputClick}
                                readOnly
                                bordered={false}
                            />
                        </div>

                        <button
                            type="button"
                            className={styles.searchIcon}
                            onClick={handleInputClick}
                            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                        >
                            <SearchOutlined />
                        </button>
                    </div>
                </div>
            </div>
            <SearchModal
                open={openSearchModal}
                defaultType={type}
                onClose={onCloseModal}
            />
        </>
    );
};

export default NavbarSearch;
