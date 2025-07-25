// ~/components/shared/telegramLink.jsx
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function TelegramLink () {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 576);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isMobile) return null; // mobilda ko‘rinmasin

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1000,
      }}
    >
      <Link href="https://t.me/soff_uz" passHref>
        <a
          target="_blank"
          className="rounded-circle d-flex align-items-center justify-content-center"
          style={{
            width: 48,
            height: 48,
            backgroundColor: '#ffffff',
            color: '#0088cc',
            border: '2px solid #0088cc',
            borderRadius: '50%',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            fontSize: 20,
          }}
        >
          <i className="fa-regular fa-paper-plane" />
        </a>
      </Link>
    </div>
  );
}
