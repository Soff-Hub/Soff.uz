import React from 'react';
import HeroSearchInput from './HeroSearchInput';
import { useRouter } from 'next/router';

export default function HeroService () {
    const { query } = useRouter();

    return (
        <div className={'container-xxl'}>
            <div className='HeroService'>
                <div className='d-flex '>
                    <div className='HeroService-title'>
                        <p className='hero-title'>
                            Soff.uz – raqamli xizmatlar bozori!
                        </p>
                        <p className='fs-3 w-75 text-dark fw-normal '>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard.
                        </p>
                        <HeroSearchInput />
                        <div className='d-flex align-items-center'>
                            <p className='fs-7 fw-normal p-3 text-dark m-0'>
                                Mashhur:
                            </p>
                            <div>
                                <a
                                    href=''
                                    className='fs-7 fw-normal p-3 border boder-1 border-success rounded-3'>
                                    Kurs ishlari
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <img src='/static/img/heroComponentsHero.svg' width={'531px'} alt='' />
                    </div>
                </div>
            </div>
        </div>
    );
}
