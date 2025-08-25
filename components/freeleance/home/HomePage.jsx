import React from 'react';
import Hero from './widgets/Hero';
import FreelanceSection from './widgets/FreelanceSection';
import SoffTypes from './widgets/SoffTypes';
import TwoCard from './widgets/TwoCard';
import FaqSection from './widgets/FaqSection';
import SoffStats from './widgets/SoffStats';
import CatalogsSection from '~/components/blocks/catalogsSection';
import HomeCategoryHighlights from '~/components/blocks/categoryHighlights';
import InfoSection from './_components/InfoSection';
import LastOpened from './_components/LastOpened';
import Bests from './widgets/Bests';
import SoffTittle from './widgets/SoffTittle';
import NavbarMenu from '~/components/freeleance/home/widgets/NavbarMenu';

const HomePage = () => {
    return (
        <div>
            <div className="bg-white ">
                <div className="container">
                    <Hero />
                    <FreelanceSection />
                    <InfoSection />
                    <LastOpened />
                </div>
            </div>
            <CatalogsSection />
            <HomeCategoryHighlights />
            <div className="bg-white py-1">
                <div className="container">
                    <SoffStats />
                    <Bests />
                </div>
            </div>
            <div style={{ background: '#24282B' }}>
                <div className="container">
                    <SoffTittle />
                </div>
            </div>
            <div className="bg-white py-1">
                <div className="container">
                    <TwoCard />
                    <FaqSection />
                </div>
            </div>
        </div>
    );
};

export default HomePage;
