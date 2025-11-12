import React, { useState } from 'react';
import { Radio, Button } from 'antd';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineApartment } from 'react-icons/ai';
import { MdOutlineClear } from 'react-icons/md';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import styles from '../styles/freelancersFilterMenu.module.scss';

function FreelancersFilterMenu({ collapsed, onChange }) {
    const { data: directions } = useGetDirectionsQuery();
    const router = useRouter();
    const { direction } = router.query;
    const [selectedDirection, setSelectedDirection] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

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


    console.log(selectedDirection);
    const handleClear = () => {
        setSelectedDirection('');
        setSelectedCategory('');
        if (onChange) onChange({ direction: '', category: '' });
    };

    return (
        <div className={styles.radioMenu}>
            <div className={styles.clearButton}>
                <Button type="link" danger onClick={handleClear} icon={<MdOutlineClear />}>
                    Filtrlarni tozalash
                </Button>
            </div>

            <div className={styles.filterGroup}>
                <h4><AiOutlineApartment /> Yo‘nalish</h4>
                <Radio.Group
                    value={selectedDirection}
                    onChange={(e) => {
                        setSelectedDirection(e.target.value);
                        if (onChange) onChange({ direction: e.target.value, category: selectedCategory });
                    }}
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
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            if (onChange) onChange({ direction: selectedDirection, category: e.target.value });
                        }}
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
