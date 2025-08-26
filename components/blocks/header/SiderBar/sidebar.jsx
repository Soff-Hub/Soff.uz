import React from 'react';
import styles from './style.module.scss';
import { useState } from 'react';
const SideBar = () => {
    const [check, setCheck] = useState(false);
    return (
        <div className=" d-lg-none position-relative">
            <button onClick={() => setCheck(true)} className={styles.barIcon}>
                <i className="fa-solid fa-bars-staggered"></i>
            </button>
            <div
                style={{
                    transform: check ? `translate(0%)` : `translate(-100%)`,
                }}
                className={styles.sideBar}>
                <span
                    onClick={() => setCheck(false)}
                    className={styles.sideBarIcon}>
                    <i class="fa-solid fa-xmark"></i>
                </span>
            </div>
        </div>
    );
};

export default SideBar;
