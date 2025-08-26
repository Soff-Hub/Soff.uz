import React, { useEffect } from 'react';
import styles from './style.module.scss';
import {
    CaretRightOutlined,
    CloseOutlined,
    MenuOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import useNavCategories from '~/components/freeleance/chat/api/useNavCatergories';
import SideBarItem from './sidebarItem';
import { Collapse, Drawer } from 'antd';
const datas = [
    {
        direction: 'Web Dasturlash',
        freelance_categories: [
            { title: 'Frontend', id: 1 },
            { title: 'Backend', id: 2 },
            { title: 'Fullstack', id: 3 },
        ],
        soff_categories: [
            { title: 'React', id: 1 },
            { title: 'Node.js', id: 2 },
            { title: 'Django', id: 3 },
        ],
    },
    {
        direction: 'Mobil Dasturlash',
        freelance_categories: [
            { title: 'Android', id: 4 },
            { title: 'iOS', id: 5 },
            { title: 'Cross-platform', id: 6 },
        ],
        soff_categories: [
            { title: 'React Native', id: 4 },
            { title: 'Flutter', id: 5 },
            { title: 'Swift', id: 6 },
        ],
    },
    {
        direction: 'UI/UX Dizayn',
        freelance_categories: [
            { title: 'Figma', id: 7 },
            { title: 'Adobe XD', id: 8 },
            { title: 'Sketch', id: 9 },
        ],
        soff_categories: [
            { title: 'Wireframe', id: 7 },
            { title: 'Prototyping', id: 8 },
            { title: 'Mockup', id: 9 },
        ],
    },
    {
        direction: 'Grafik Dizayn',
        freelance_categories: [
            { title: 'Logo Dizayn', id: 10 },
            { title: 'Brandbook', id: 11 },
            { title: 'Banner', id: 12 },
        ],
        soff_categories: [
            { title: 'Photoshop', id: 10 },
            { title: 'Illustrator', id: 11 },
            { title: 'CorelDRAW', id: 12 },
        ],
    },
    {
        direction: 'Video/Motion',
        freelance_categories: [
            { title: 'Video Montaj', id: 13 },
            { title: '3D Animation', id: 14 },
            { title: 'Motion Graphic', id: 15 },
        ],
        soff_categories: [
            { title: 'After Effects', id: 13 },
            { title: 'Premiere Pro', id: 14 },
            { title: 'Blender', id: 15 },
        ],
    },
    {
        direction: 'Marketing',
        freelance_categories: [
            { title: 'SMM', id: 16 },
            { title: 'SEO', id: 17 },
            { title: 'Content Marketing', id: 18 },
        ],
        soff_categories: [
            { title: 'Facebook Ads', id: 16 },
            { title: 'Google Ads', id: 17 },
            { title: 'Email Marketing', id: 18 },
        ],
    },
    {
        direction: 'Kiberxavfsizlik',
        freelance_categories: [
            { title: 'Pentesting', id: 19 },
            { title: 'Bug Bounty', id: 20 },
            { title: 'Network Security', id: 21 },
        ],
        soff_categories: [
            { title: 'Wireshark', id: 19 },
            { title: 'Burp Suite', id: 20 },
            { title: 'Nmap', id: 21 },
        ],
    },
    {
        direction: "Ma'lumotlar Bazasi",
        freelance_categories: [
            { title: 'SQL', id: 22 },
            { title: 'NoSQL', id: 23 },
            { title: 'Data Modeling', id: 24 },
        ],
        soff_categories: [
            { title: 'MySQL', id: 22 },
            { title: 'MongoDB', id: 23 },
            { title: 'PostgreSQL', id: 24 },
        ],
    },
    {
        direction: "Sun'iy Intellekt",
        freelance_categories: [
            { title: 'ML Models', id: 25 },
            { title: 'DL Models', id: 26 },
            { title: 'NLP', id: 27 },
        ],
        soff_categories: [
            { title: 'TensorFlow', id: 25 },
            { title: 'PyTorch', id: 26 },
            { title: 'OpenAI', id: 27 },
        ],
    },
    {
        direction: 'Cloud va DevOps',
        freelance_categories: [
            { title: 'AWS', id: 28 },
            { title: 'Azure', id: 29 },
            { title: 'CI/CD', id: 30 },
        ],
        soff_categories: [
            { title: 'Docker', id: 28 },
            { title: 'Kubernetes', id: 29 },
            { title: 'Jenkins', id: 30 },
        ],
    },
];

const option = {
    scientific_work: 'Ilmiy va Akademik Xizmatlar',
    three_d: '3D Dizayn va Vizualizatsiya',
    web: 'Dasturlash xizmatlari',
    dizayn: 'Dizayn',
    document: 'Shablonlar',
};

const SideBar = () => {
    const [open, setOpen] = useState(false);
    const { data, isLoading } = useNavCategories();
    const panelStyle = {
        background: '#fff',
        padding: '0px',
    };
    const getItems = (items, onClick) =>
        items &&
        items.map(item => ({
            key: item.id,
            label: option[item.direction],
            children: (
                <SideBarItem
                    products={item.freelance_categories}
                    templates={item.soff_categories}
                    direction={item.direction}
                    onClick={onClick}
                />
            ),
            style: panelStyle,
        }));

    return (
        <div className=" d-lg-none position-relative">
            <button onClick={() => setOpen(true)} className={styles.barIcon}>
                <MenuOutlined />
            </button>
            <Drawer
                style={panelStyle}
                placement="left"
                closeIcon={
                    <>
                        <div className="d-flex justify-content-between">
                            <span>&nbsp;</span>
                            <CloseOutlined className=" align-self-end" />
                        </div>
                    </>
                }
                onClose={() => setOpen(false)}
                open={open}>
                <div className="  overflow-auto p-0">
                    <Collapse
                        style={{ backgroundColor: '#fff' }}
                        bordered={false}
                        defaultActiveKey={['1']}
                        expandIcon={({ isActive }) => (
                            <CaretRightOutlined rotate={isActive ? 90 : 0} />
                        )}
                        items={getItems(data, () => setOpen(false))}
                    />
                </div>
            </Drawer>
        </div>
    );
};
// <SideBarItem
//     products={item.freelance_categories}
//     templates={item.soff_categories}
//     label={item.direction}
// />

export default SideBar;
