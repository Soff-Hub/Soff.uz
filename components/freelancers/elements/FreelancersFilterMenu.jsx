import React, { useEffect } from 'react';
import { Radio, Button } from 'antd';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineApartment } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import styles from '../styles/freelancersFilterMenu.module.scss';
import { useFGet } from '~/shared/hooks/useFApi';

function FreelancersFilterMenu({ collapsed, onChange }) {
    const { data: directions } = useGetDirectionsQuery();
    const router = useRouter();

    const selectedDirection = router.query.direction || '';
    const selectedCategory = router.query.category || '';

    const { data: parentData } = useQuery({
        queryKey: ['service-parent', selectedDirection],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/categories?direction=${selectedDirection}`
            );
            return await res.json();
        },
        enabled: !!selectedDirection,
    });

    const { data: positions } = useFGet("positions", "users/positions")

    const handleClear = () => {
        router.push(
            {
                pathname: router.pathname,
                query: {},
            },
            undefined,
            // { shallow: true }
        );
        if (onChange) onChange({ direction: '', category: '' });
    };

    const handleDirectionChange = (value) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, direction: value, category: '' },
            },
            undefined,
            // { shallow: true }
        );
        if (onChange) onChange({ direction: value, category: '' });
    };

    const handleCategoryChange = (value) => {
        router.push(
            {
                pathname: router.pathname,
                query: { ...router.query, category: value },
            },
            undefined,
            // { shallow: true }
        );
        if (onChange) onChange({ direction: selectedDirection, category: value });
    };

    return (
        <div className={`${styles.radioMenu} ${collapsed ? styles.visible : ''}`}>
            <div className={styles.clearButton}>
                <Button style={{padding: 0, marginBottom: "10px"}} type="link" danger onClick={handleClear} icon={<MdOutlineClear />}>
                    Filtrlarni tozalash
                </Button>
            </div>

            <div className={styles.filterGroup}>
                <h4>Kasb</h4>
                <Radio.Group
                    value={Number(selectedCategory)}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                    {positions?.map((pos) => (
                        <Radio key={pos.id} value={pos.id}>
                            {pos.title}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>

            <div className={styles.filterGroup}>
                <h4><AiOutlineApartment /> Yo‘nalish</h4>
                <Radio.Group
                    value={selectedDirection}
                    onChange={(e) => handleDirectionChange(e.target.value)}
                    style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                    {directions?.map((dir) => (
                        <Radio key={dir.value} value={dir.value}>
                            {dir.label}
                        </Radio>
                    ))}
                </Radio.Group>
            </div>
            
            {selectedDirection &&
                <div className={styles.filterGroup}>
                    <h4><BiCategory /> Kategoriya</h4>
                    <Radio.Group
                        value={Number(selectedCategory)}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}
                    >
                        {parentData?.map((cat) => (
                            <Radio key={cat.id} value={cat.id}>
                                {cat.title}
                            </Radio>
                        ))}
                    </Radio.Group>
                </div>
            }
        </div>
    );
}

export default FreelancersFilterMenu;
