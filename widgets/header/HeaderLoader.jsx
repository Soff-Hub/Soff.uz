import React from 'react';
import { Skeleton } from 'antd';
import HeaderLogo from './HeaderLogo';
import useResponsive from '~/shared/utilities/useResponsive';
import styles from './header.module.scss';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';

function HeaderLoader() {
    const { isMobile } = useResponsive();
    
    // Senior approach: Only show skeleton if we have a probable session
    const [hasToken, setHasToken] = React.useState(false);
    
    React.useEffect(() => {
        const storedUser = safeLocalStorage.getItem('user');
        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);
                if (user && user.access) setHasToken(true);
            } catch (e) {
                setHasToken(false);
            }
        }
    }, []);

    return (
        <header
            style={{
                backgroundColor: '#fff',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                overflow: 'hidden',
            }}>
            {hasToken && (
                <div className={styles.skeletonBanner}>
                    <Skeleton.Input active size="small" style={{ width: 250 }} />
                </div>
            )}
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
                                />
                                <Skeleton.Input
                                    style={{ width: 20, height: 30 }}
                                />
                            </>
                        ) : null}

                        <Skeleton.Image style={{ width: 30, height: 30 }} />
                        <Skeleton.Avatar size={30} />
                    </div>
                </div>
            </div>
            <HeaderDirectionsLoader />
        </header>
    );
}

export const HeaderDirectionsLoader = () => {
    const { isMobile } = useResponsive();
    return (
        <div
            style={{
                height: '45.6px',
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
                        <Skeleton.Button style={{ width: 50, height: 25 }} />
                        <Skeleton.Button style={{ width: 100, height: 25 }} />
                        <Skeleton.Button style={{ width: 150, height: 25 }} />
                    </>
                ) : (
                    <>
                        <Skeleton.Button style={{ width: 250, height: 25 }} />
                        <Skeleton.Button style={{ width: 100, height: 25 }} />
                        <Skeleton.Button style={{ width: 150, height: 25 }} />
                        <Skeleton.Button style={{ width: 280, height: 25 }} />
                    </>
                )}
            </div>
        </div>
    );
};

export default HeaderLoader;
