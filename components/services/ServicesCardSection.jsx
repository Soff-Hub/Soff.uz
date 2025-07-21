import React from 'react'
import ServiceCard from './ServiceCard';


const mockProduct = {
    file: 'https://via.placeholder.com/300x200.png?text=Product+Image', // xizmat rasmi
    title: 'Veb sayt yaratish (WordPress)', // xizmat nomi
    packages: [
        {
            price: 150000, // birinchi paket narxi
        },
    ],
    seller: {
        full_name: 'Abdumomin Developer', // sotuvchi ismi
        photo_url: 'https://via.placeholder.com/50.png?text=A', // avatar
    },
};
const ServicesCardSection = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
                <div className='col-6 col-md-4 col-lg-3 custom-col-5 mb-4'>
                    <ServiceCard product={mockProduct} />
                </div>
            </div>
        </div>
    )
}

export default ServicesCardSection