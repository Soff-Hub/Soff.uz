import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Drawer, Button, Select } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { AiOutlineApartment } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import useFreelancers from '../hooks/useFreelancers';
import useResponsive from '~/shared/utilities/useResponsive';
import { useDisableWindowScroll } from '~/shared/hooks/useDisableWindowScroll';

function FreelancerFilterCollide({ collapsed, toggleCollapsed }) {
    const { t } = useTranslation('freelancers');
    const [formVal, setFormVal] = useState({
        direction: null,
        positions: [],
    });
    const { isMobile } = useResponsive();
    const {
        directions,
        positions,
        handleClear,
        updateQuery,
        selectedPositions,
        selectedDirection,
    } = useFreelancers(collapsed);
    // Prevent body scroll when drawer is open
    useDisableWindowScroll(collapsed);

    const positionOptions = formVal.direction
        ? positions
              .filter((pos) => formVal.direction.includes(pos.direction))
              ?.map((el) => ({
                  label: el.title,
                  value: el.title,
              })) || []
        : [];

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
        setFormVal({
            direction: null,
            positions: [],
        });
    };

    const onChangeDirection = (value) => {
        setFormVal((prev) => ({
            ...prev,
            direction: value,
        }));
    };

    const onChangePositions = (value) => {
        setFormVal((prev) => ({
            ...prev,
            positions: value,
        }));
    };

    useEffect(() => {
        if (collapsed) {
            setFormVal({
                direction: selectedDirection,
                positions: selectedPositions,
            });
        }
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
                    <AiOutlineApartment /> {t('filter.direction')}
                </label>
                <Select
                    id="directions"
                    mode="multiple"
                    size={inputSizes}
                    placeholder={t('filter.selectDirection')}
                    value={formVal.direction}
                    onChange={onChangeDirection}
                    style={{
                        width: '100%',
                    }}
                    options={directions}
                />
            </div>

            <div
                style={{
                    marginTop: '20px',
                }}>
                <label
                    htmlFor="positions"
                    style={{
                        fontSize: isMobile ? '16px' : '18px',
                        marginBottom: '8px',
                    }}>
                    <BiCategory /> {t('filter.position')}
                </label>
                <Select
                    id="positions"
                    mode="multiple"
                    size={inputSizes}
                    placeholder={t('filter.selectPosition')}
                    value={formVal.positions}
                    onChange={onChangePositions}
                    style={{
                        width: '100%',
                    }}
                    options={positionOptions}
                />
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: 12,
                    marginTop: 24,
                }}>
                <Button block onClick={handleClearAll} size={inputSizes}>
                    {t('filter.clear')}
                </Button>

                <Button
                    type="primary"
                    block
                    onClick={handleSave}
                    size={inputSizes}>
                    {t('filter.apply')}
                </Button>
            </div>
        </Drawer>
    );
}

export default FreelancerFilterCollide;
