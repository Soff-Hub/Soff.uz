import React from 'react'

const ServicePackages = ({openModal}) => {
    return (
        <div className='row'>
            <div className='col-12 col-sm-6 col-lg-4 mb-3'>
                <div className='service_package'>
                    <div>
                        <h2>Standart</h2>
                        <div className='d-flex flex-column gap-5' style={{ borderBottom: "2px dashed black", padding: '40px 0' }}>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div >
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                        </div>
                        <h2 className='mt-5'>20,000 so'm</h2>
                    </div>
                    <button onClick={openModal}>Buyurtma berish</button>
                </div>
            </div>
            <div className='col-12 col-sm-6 col-lg-4 mb-3'>
                <div className='service_package'>
                    <div>
                        <h2>Standart</h2>
                        <div className='d-flex flex-column gap-5' style={{ borderBottom: "2px dashed black", padding: '40px 0' }}>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div >
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                        </div>
                        <h2 className='mt-5'>20,000 so'm</h2>
                    </div>
                    <button>Buyurtma berish</button>
                </div>
            </div>
            <div className='col-12 col-sm-6 col-lg-4 mb-3'>
                <div className='service_package'>
                    <div>
                        <h2>Standart</h2>
                        <div className='d-flex flex-column gap-5' style={{ borderBottom: "2px dashed black", padding: '40px 0' }}>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div >
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                            <div className='d-flex align-items-center gap-3'>
                                <img src="/static/img/services_images/Vector.png" alt="" />
                                <p>2ta logo</p>
                            </div>
                        </div>
                        <h2 className='mt-5'>20,000 so'm</h2>
                    </div>
                    <button>Buyurtma berish</button>
                </div>
            </div>
        </div>
    )
}

export default ServicePackages