import React from 'react';
import { Skeleton } from 'antd';
import HeaderLogo from './HeaderLogo';
import useResponsive from '~/shared/utilities/useResponsive';

function HeaderLoader() {
    const { isMobile } = useResponsive();

    return (
        <header
            style={{
                backgroundColor: '#fff',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
            }}>
            <div
                style={{
                    padding: '10px 0',
                    borderBottom: '1px solid #f0f0f0',
                }}>
                <div
                    className="container"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                    <HeaderLogo mode={'dark'} />
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                        }}>
                        {!isMobile ? (
                            <>
                                <Skeleton.Input
                                    style={{ width: 20, height: 30 }}
                                    active
                                />
                                <Skeleton.Input
                                    style={{ width: 20, height: 30 }}
                                    active
                                />
                            </>
                        ) : null}

                        <Skeleton.Image
                            style={{ width: 30, height: 30 }}
                            active
                        />
                        <Skeleton.Avatar size={30} active />
                    </div>
                </div>
            </div>
            <div
                style={{
                    height: '45px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid #f0f0f0',
                    marginTop: '5px',
                }}>
                <div
                    className="container"
                    style={{
                        display: 'flex',
                        height: '100%',
                        alignItems: 'center',
                        gap: '10px',
                    }}>
                    {isMobile ? (
                        <>
                            <Skeleton.Button
                                style={{ width: 50, height: 25 }}
                                active
                            />
                            <Skeleton.Button
                                style={{ width: 100, height: 25 }}
                                active
                            />
                            <Skeleton.Button
                                style={{ width: 150, height: 25 }}
                                active
                            />
                        </>
                    ) : (
                        <>
                            <Skeleton.Button
                                style={{ width: 250, height: 25 }}
                                active
                            />
                            <Skeleton.Button
                                style={{ width: 100, height: 25 }}
                                active
                            />
                            <Skeleton.Button
                                style={{ width: 150, height: 25 }}
                                active
                            />
                            <Skeleton.Button
                                style={{ width: 280, height: 25 }}
                                active
                            />
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}

export default HeaderLoader;
