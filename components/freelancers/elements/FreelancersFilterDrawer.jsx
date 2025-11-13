import React, { useEffect, useRef, useState } from 'react';
import { Drawer, Button, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AiOutlineApartment } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import useFreelancers from '../hooks/useFreelancers';
import useResponsive from '~/shared/utilities/useResponsive';

function FreelancerFilterCollide({ collapsed, toggleCollapsed }) {
    const onfirstLoad = useRef(true);
    const [formVal, setFormVal] = useState({ direction: null, positions: [] });
    const { isMobile } = useResponsive();
    const {
        directions,
        positions,
        handleClear,
        updateQuery,
        selectedPositions,
        selectedDirection,
    } = useFreelancers();

    const positionOptions =
        positions?.map(el => ({ label: el.title, value: el.title })) || [];

    const inputSizes = isMobile ? 'middle' : 'large';

    const handleSave = () => {
        updateQuery({
            direction: formVal.direction,
            position: formVal.positions,
        });
        toggleCollapsed();
    };

    const handleClearAll = () => {
        handleClear();
        toggleCollapsed();
        setFormVal({ direction: null, positions: [] });
    };

    const onChangeDirection = value => {
        setFormVal(prev => ({ ...prev, direction: value }));
    };

    const onChangePositions = value => {
        setFormVal(prev => ({ ...prev, positions: value }));
    };

    useEffect(() => {
        if (onfirstLoad.current) {
            onfirstLoad.current = false;
            setFormVal({
                direction: selectedDirection,
                positions: selectedPositions,
            });
        }
    }, []);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (collapsed) {
            // Store current scroll position and disable scroll
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${window.scrollY}px`;
        } else {
            // Re-enable scroll and restore position
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        // Cleanup function to restore scroll when component unmounts
        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.top = '';
        };
    }, [collapsed]);

    return (
        <Drawer
            style={{
                borderRadius: '20px 20px 0 0',
            }}
            placement="bottom"
            onClose={toggleCollapsed}
            open={collapsed}
            height="75%"
            closeIcon={
                <Button
                    type="text"
                    shape="circle"
                    icon={
                        <CloseOutlined
                            style={{
                                fontSize: 20,
                                color: '#00a44f',
                            }}
                        />
                    }
                />
            }
            headerStyle={{
                flexDirection: 'column-reverse',
                alignItems: 'flex-end',
            }}>
            <div>
                <label
                    htmlFor="directions"
                    style={{
                        fontSize: isMobile ? '16px' : '18px',
                        marginBottom: '8px',
                    }}>
                    <AiOutlineApartment /> Yo‘nalish
                </label>
                <Select
                    id="directions"
                    size={inputSizes}
                    placeholder="Yo'nalishni tanlang"
                    value={formVal.direction}
                    onChange={onChangeDirection}
                    style={{ width: '100%' }}
                    options={directions}
                />
            </div>

            <div style={{ marginTop: '20px' }}>
                <label
                    htmlFor="positions"
                    style={{
                        fontSize: isMobile ? '16px' : '18px',
                        marginBottom: '8px',
                    }}>
                    <BiCategory /> Kasb
                </label>
                <Select
                    id="positions"
                    mode="multiple"
                    size={inputSizes}
                    placeholder="Kasblarni tanlang"
                    defaultValue={formVal.positions}
                    onChange={onChangePositions}
                    style={{ width: '100%' }}
                    options={positionOptions}
                />
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <Button block onClick={handleClearAll} size={inputSizes}>
                    Filtrni tozalash
                </Button>

                <Button
                    type="primary"
                    block
                    onClick={handleSave}
                    size={inputSizes}>
                    Filtrni qo‘llash
                </Button>
            </div>
        </Drawer>
    );
}

export default FreelancerFilterCollide;
