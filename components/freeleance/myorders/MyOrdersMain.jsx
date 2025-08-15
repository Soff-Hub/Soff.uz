import React from 'react';
import dynamic from 'next/dynamic';

// MyOrderTabs faqat client-side'da yuklanadi
const MyOrderTabs = dynamic(() => import('./myorder-details/MyOrderTabs'), {
  ssr: false,
  loading: () => <p>Yuklanmoqda...</p>, // ixtiyoriy: loading paytida ko‘rsatish uchun
});

const MyOrdersMain = () => {
  return (
    <div style={{ marginTop: '40px', maxWidth: '100%' }}>
      <h1 style={{ fontSize: '30px' }}>Mening buyurtmalarim</h1>
      <MyOrderTabs />
    </div>
  );
};

export default MyOrdersMain;