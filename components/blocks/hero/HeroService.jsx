import React from 'react';
import HeroSearchInput from './HeroSearchInput';
import { useRouter } from 'next/router';

export default function HeroService () {
    const { query } = useRouter();

    return (
        <div className='container p-xl-0'>
            <div className='HeroService'>
                <div className='d-flex justify-content-between'>
                    <div className='HeroServiceLeft'>
                        <p className='hero_title '>
                            Soff.uz – raqamli xizmatlar bozori!
                        </p>
                        <p class='hero_description  fs-3 w-75  lh-base  custom-letter-spacing'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard.
                        </p>
                        <HeroSearchInput />
                        <div className='hero_top_category '>
                            <p className='hero_top_category_title'>Mashhur:</p>
                            <div className='hero_top_category_type'>
                                <a href=''>Kurs ishlari</a>
                            </div>
                        </div>
                    </div>

                    <div className='HeroServiceRight'>
                        <img src='/static/img/heroComponentsHero.png' alt='' />
                    </div>
                </div>
            </div>
        </div>
    );
}
