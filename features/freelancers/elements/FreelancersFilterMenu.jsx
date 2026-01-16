import React from 'react';
import { useTranslation } from 'next-i18next';
import { Checkbox, Radio, Button } from 'antd';
import { AiOutlineApartment } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import styles from '../styles/freelancersFilterMenu.module.scss';
import useFreelancers from '../hooks/useFreelancers';

function FreelancersFilterMenu({ collapsed }) {
    const { t } = useTranslation('freelancers');
    const {
        directionsGroup,
        positionsGroup,
        handleClear,
        handlePositionsChange,
        handleDirectionChange,
        selectedPositions,
        selectedDirection,
    } = useFreelancers();

    return (
        <div
            className={`${styles.radioMenu} ${
                collapsed ? styles.visible : ''
            }`}>
            {selectedPositions?.length || selectedDirection?.length ? (
                <div className={styles.clearButton}>
                    <Button
                        style={{
                            marginRight: 'auto',
                            marginBottom: '15px',
                            width: '100%',
                            border: '1px solid red',
                        }}
                        type="text"
                        danger
                        onClick={handleClear}
                        icon={<MdOutlineClear />}>
                        {t('filter.clear')}
                    </Button>
                </div>
            ) : null}

            {/* Yo'nalish */}
            <div className={styles.filterGroup}>
                <h4>
                    <AiOutlineApartment /> {t('filter.direction')}
                </h4>
                <Checkbox.Group
                    value={selectedDirection}
                    onChange={handleDirectionChange}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    }}>
                    {directionsGroup}
                </Checkbox.Group>
            </div>

            {/* Kasb */}
            <div className={styles.filterGroup}>
                <h4>
                    <BiCategory /> {t('filter.position')}
                </h4>
                <Checkbox.Group
                    value={selectedPositions}
                    onChange={handlePositionsChange}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    }}>
                    {positionsGroup}
                </Checkbox.Group>
            </div>
        </div>
    );
}

export default FreelancersFilterMenu;
