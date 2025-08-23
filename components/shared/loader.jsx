import { Spin } from 'antd';
import React from 'react';

const Loader = () => {
    return (
        <div
            className="d-flex align-items-center justify-content-center"
            style={{ height: '100vh' }}>
            <Spin size='large'/>
        </div>
    );
};

export default Loader;
