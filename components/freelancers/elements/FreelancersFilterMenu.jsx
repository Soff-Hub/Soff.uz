import React from 'react';
import { Checkbox, Radio, Button } from 'antd';
import { AiOutlineApartment } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useRouter } from 'next/router';
import styles from '../styles/freelancersFilterMenu.module.scss';
import { useFGet } from '~/shared/hooks/useFApi';

function FreelancersFilterMenu({ collapsed }) {
    const { data: directions } = useGetDirectionsQuery();
    const { data: positions } = useFGet("positions", "users/positions");
    const router = useRouter();

    // querylardan qiymatlar olish
    const selectedPositions = Array.isArray(router.query.position)
        ? router.query.position.map((v) => Number(v))
        : router.query.position
        ? [Number(router.query.position)]
        : [];

    const selectedDirection = router.query.direction || '';

    // query yangilovchi funksiya
    const updateQuery = (updates) => {
        const newQuery = { ...router.query };

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === null || value.length === 0) {
                delete newQuery[key];
            } else {
                newQuery[key] = value;
            }
        });

        router.push(
            {
                pathname: router.pathname,
                query: newQuery,
            },
        );
    };

    // Tozalash
    const handleClear = () => {
        router.push({ pathname: router.pathname, query: {} });
    };

    // Position (checkbox)
    const handlePositionsChange = (vals) => {
        updateQuery({ position: vals });
    };

    // Direction (radio)
    const handleDirectionChange = (value) => {
        updateQuery({ direction: value });
    };

    return (
        <div className={`${styles.radioMenu} ${collapsed ? styles.visible : ''}`}>
            <div className={styles.clearButton}>
                <Button
                    style={{ padding: 0, marginBottom: "10px" }}
                    type="link"
                    danger
                    onClick={handleClear}
                    icon={<MdOutlineClear />}
                >
                    Filtrlarni tozalash
                </Button>
            </div>

            {/* Yo‘nalish */}
            <div className={styles.filterGroup}>
                <h4>
                    <AiOutlineApartment /> Yo‘nalish
                </h4>
                <Radio.Group
                    value={selectedDirection}
                    onChange={(e) => handleDirectionChange(e.target.value)}
                    style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
                >
                    {directions?.map((dir) => (
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
                    style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}
                >
                    {positions?.map((pos) => (
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
