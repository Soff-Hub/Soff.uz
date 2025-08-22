import React from 'react'
import Hero from './widgets/Hero'
import FreelanceSection from './widgets/FreelanceSection'
import StepsSection from './widgets/StepsSection'
import SoffTypes from './widgets/SoffTypes'
import TwoCard from './widgets/TwoCard'
import FaqSection from './widgets/FaqSection'
import SoffStats from './widgets/SoffStats'
import CatalogsSection from '~/components/blocks/catalogsSection'
import HomeCategoryHighlights from '~/components/blocks/categoryHighlights'

const HomePage = () => {
    return (
        <div>
            <div className='bg-white '>
                <div className='container'>
                    <Hero />
                    <FreelanceSection />
                    <StepsSection />
                </div>
            </div>
            <CatalogsSection />
            <HomeCategoryHighlights />
            <div className='bg-white py-1'>
                <div className='container'>
                    {/* <TwoCard/> */}
                    <SoffStats/>
                    {/* <FaqSection/> */}
                </div>
            </div>
        </div>
    )
}

export default HomePage