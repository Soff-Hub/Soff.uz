import React, { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';

const DemoButton = ({ demo_link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (demo_link) {
      window.open(demo_link, '_blank'); // yangi tabda ochadi
    }
  };

  return (
    <div className="">
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="d-flex align-items-center justify-content-center mx-auto border rounded-pill px-4 py-2"
        style={{
          borderColor: isHovered ? 'green' : '#e0e0e0',
          backgroundColor: isHovered ? '#f6fff6' : '#fff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
          fontWeight: '500',
          fontSize: '16px',
          color: isHovered ? 'green' : 'black',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
      >
        <EyeOutlined
          style={{
            color: 'green',
            fontSize: '20px',
            marginRight: '8px',
          }}
        />
        <span>
          <span style={{ color: 'green', fontWeight: '600' }}>DEMO</span>{' '}
          versiyada ko‘rish
        </span>
      </button>
    </div>
  );
};

export default DemoButton;
