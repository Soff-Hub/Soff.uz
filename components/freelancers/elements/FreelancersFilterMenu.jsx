import React from 'react';
import { Radio, Menu } from 'antd';
import { BiCategory } from 'react-icons/bi';
import { AiOutlineApartment } from 'react-icons/ai';
import { useGetDirectionsQuery } from '~/store/profile/slice';
import styles from '../styles/freelancersFilterMenu.module.scss';
import { MdOutlineClear } from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';

const overallMenuItemStyle = {
    paddingLeft: '15px',
    marginBottom: '15px',
};

function FreelancersFilterMenu({ collapsed }) {
    const { data } = useGetDirectionsQuery();
    const router = useRouter();
    const { direction } = router.query;

    const { data: parentData } = useQuery({
        queryKey: ['service-parent', direction],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/categories?direction=${direction}`
            );

            return await res.json();
        },
        enabled: !!direction,
    });

    const items = [
        {
            key: 'clear',
            label: 'Filtrlarni tozalash',
            icon: <MdOutlineClear />,
            danger: true,
            style: {
                backgroundColor: '#ffecec',
                ...overallMenuItemStyle,
            },
        },
        {
            key: 'direction',
            label: 'Yo‘nalish',
            icon: <AiOutlineApartment />,
            // style: overallMenuItemStyle,
            children:
                data?.map((dir) => ({ key: dir.value, label: dir.label })) ||
                [],
        },
        {
            key: 'service_parent',
            label: 'Kategoriya',
            icon: <BiCategory />,
            // style: overallMenuItemStyle,
            children: [
                { key: '9', label: 'Option 9' },
                { key: '10', label: 'Option 10' },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        { key: '11', label: 'Option 11' },
                        { key: '12', label: 'Option 12' },
                    ],
                },
            ],
        },
    ];

    return (
        <>
            <Menu
                className={styles.freelancersFilterMenu}
                mode="inline"
                // theme="dark"
                inlineCollapsed={collapsed}
                items={items}
            />
        </>
    );
}

export default FreelancersFilterMenu;
