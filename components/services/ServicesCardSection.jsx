import React from 'react'
import ServiceCard from './ServiceCard';


const ServicesCardSection = ({services}) => {
    return (
        <div className='container'>
            <div className='row'>
                {services?.results?.map(service => (
                    <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                        <ServiceCard product={service} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ServicesCardSection