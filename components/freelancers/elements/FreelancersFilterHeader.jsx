import React from 'react';
import { LuSettings2 } from 'react-icons/lu';
import styles from '../styles/freelancersFilterHeader.module.scss';
import { Button, Select } from 'antd';
import { useRouter } from 'next/router';

const options = [
    {
        value: "rating",
        label: "Rating bo'yicha"
    },
    {
        value: "activity",
        label: "Faollik bo'yicha"
    }
]

function FreelancersFilterHeader({ toggleCollapsed, collapsed }) {
    const router = useRouter();

    const handleSortChange = (value) => {
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                sort_by: value
            }
        });
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        }}>
            <Button
                icon={<LuSettings2 />}
                onClick={toggleCollapsed}
                type={collapsed ? 'primary' : 'default'}
            >
                Filterlar
            </Button>
            {/* <Select
                value={router.query.sort_by || "rating"}
                onChange={handleSortChange}
                options={options}
                style={{ width: 150 }}
                placeholder={"Saralash"}
            /> */}
        </div>
    );
}

export default FreelancersFilterHeader;
