import React from 'react';
import Hero from './hero';
import Catalog from './catalog';
import Freelance from './freelance';
import LastServices from './last-services';
import Info from './info';
// import LastProducts from './last-products';
import Statistics from './statistics';
import Bests from './bests';
import Title from './title';
import TwoCard from './two-card';
import Faqs from './faqs';
import dynamic from 'next/dynamic';

const LastProducts = dynamic(() => import('./last-products'), { ssr: false });

const Home = () => {
    return (
        <div>
            <div className="bg-white ">
                <div className="container">
                    <Hero />
                </div>
            </div>
            <Catalog />
            <div className="bg-white ">
                <div className="container">
                    <Freelance />
                    <LastServices />
                    <Info />
                </div>
            </div>
            <div className="bg-white py-1">
                <div className="container">
                    <LastProducts />
                    <Statistics />
                    <Bests />
                </div>
            </div>
            <div style={{ background: '#24282B' }}>
                <div className="container">
                    <Title />
                </div>
            </div>
            <div className="bg-white py-1">
                <div className="container">
                    <TwoCard />
                    <Faqs />
                </div>
            </div>
        </div>
    );
};

export default Home;
