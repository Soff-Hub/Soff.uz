import React from 'react';
import HeroSearchInput from './HeroSearchInput';

export default function HeroService () {

    return (
        <div className='container p-0'>
            <div className='HeroService'>
                <div className='d-flex justify-content-between'>
                    <div className='HeroServiceLeft'>
                        <p className='hero-title fw-semibold'>
                            Soff.uz – raqamli xizmatlar bozori!
                        </p>
                        <p className='hero-description  fs-3 w-75  lh-base  custom-letter-spacing'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard.
                        </p>
                        <HeroSearchInput />
                        <div className='d-flex align-items-center gap-4 mt-5'>
                            <p className='fs-3 fw-normal  text-dark m-0'>
                                Mashhur:
                            </p>
                            <div className=''>
                                <a
                                    href=''
                                    className='fs-4 fw-normal p-2 border boder-1 border-success rounded-3'>
                                    Kurs ishlari
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='HeroImage'>
                        <img
                            src='/static/img/heroComponentsHero.png'
                            // style={{ width: '531px', height: '535px' }}
                            alt=''
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
