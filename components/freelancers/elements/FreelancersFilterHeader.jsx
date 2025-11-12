import React from 'react';
import { LuSettings2 } from 'react-icons/lu';
import styles from '../styles/freelancersFilterHeader.module.scss';
import { Button } from 'antd';

function FreelancersFilterHeader({ toggleCollapsed }) {
    return (
        <div>
            <Button
                icon={<LuSettings2 />}
                onClick={toggleCollapsed}
                size="large">
                Filterlar
            </Button>
        </div>
    );
}

export default FreelancersFilterHeader;
