import React from 'react';
import { Checkbox, Radio, Button } from 'antd';
import { AiOutlineApartment } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import styles from '../styles/freelancersFilterMenu.module.scss';
import useFreelancers from '../hooks/useFreelancers';

function FreelancersFilterMenu({ collapsed }) {
    const {
        directions,
        positions,
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
            {(selectedPositions?.length > 0 || selectedDirection) && (
                <div className={styles.clearButton}>
                    <Button
                        style={{ padding: 0, marginBottom: '10px' }}
                        type="link"
                        danger
                        onClick={handleClear}
                        icon={<MdOutlineClear />}>
                        Filtrlarni tozalash
                    </Button>
                </div>
            )}

            {/* Yo‘nalish */}
            <div className={styles.filterGroup}>
                <h4>
                    <AiOutlineApartment /> Yo‘nalish
                </h4>
                <Radio.Group
                    value={selectedDirection}
                    onChange={e => handleDirectionChange(e.target.value)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    }}>
                    {directions?.map(dir => (
                        <Radio key={dir.value} value={dir.value}>
                            {dir.label}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>

            {/* Kasb */}
            <div className={styles.filterGroup}>
                <h4>
                    <BiCategory /> Kasb
                </h4>
                <Checkbox.Group
                    value={selectedPositions}
                    onChange={handlePositionsChange}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                    }}>
                    {positions?.map(pos => (
                        <Checkbox key={pos.title} value={pos.title}>
                            {pos.title}
                        </Checkbox>
                    ))}
                </Checkbox.Group>
            </div>
        </div>
    );
}

export default FreelancersFilterMenu;
