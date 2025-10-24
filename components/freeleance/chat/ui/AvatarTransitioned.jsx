import { useEffect, useState } from 'react';
import { sleep } from '~/shared/utilities/sleep';
import { Spin } from 'antd';

const containerStyle = {
    position: 'relative',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    overflow: 'hidden',
};

const commonTransition = {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease',
};

function AvatarTransitioned({ msg }) {
    const isLoading = msg.status === 'sending' || msg.status === 'updating';
    const [showSpinner, setShowSpinner] = useState(false);
    console.log('isLoading avatar', isLoading);
    const spinnerContainerStyle = {
        ...commonTransition,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isLoading ? 1 : 0,
    };

    const imgStyle = {
        ...commonTransition,
        opacity: isLoading ? 0 : 1,
    };

    useEffect(() => {
        const handleSpinner = async () => {
            if (isLoading) {
                await sleep(300);
                setShowSpinner(true);
            }
        };
        handleSpinner();

        return () => {
            setShowSpinner(false);
        };
    }, [isLoading]);

    return (
        <div style={containerStyle}>
            {showSpinner && (
                <div style={spinnerContainerStyle}>
                    <Spin
                        style={{
                            marginBottom: '5px',
                        }}
                    />
                </div>
            )}
            <img
                className={imgStyle}
                src={msg.sender_photo || '/static/img/ozodbek.png'}
                alt="avatar"
            />
        </div>
    );
}

export default AvatarTransitioned;
