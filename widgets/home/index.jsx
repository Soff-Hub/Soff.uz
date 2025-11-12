import React from 'react';
import Hero from './hero';
import Catalog from './catalog';
import Freelance from './freelance';
import LastServices from './last-services';
import Info from './info';
import Statistics from './statistics';
import Title from './title';
import TwoCard from './two-card';
import dynamic from 'next/dynamic';

const Bests = dynamic(() => import('./bests'), { ssr: false });
const LastProducts = dynamic(() => import('./last-products'), { ssr: false });
const Faqs = dynamic(() => import('./faqs'), { ssr: false });

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
