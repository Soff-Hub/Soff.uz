import React from 'react';
import Hero from './hero';
import dynamic from 'next/dynamic';

// const Bests = dynamic(() => import('./bests'), {
//     ssr: false,
//     loading: () => <div style={{ minHeight: '400px' }} />
// });
const LastProducts = dynamic(() => import('./last-products'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '400px' }} />
});
const Faqs = dynamic(() => import('./faqs'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '300px' }} />
});
const YoutubeVid = dynamic(() => import('./youtube-vid'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '250px', backgroundColor: '#f0f0f0' }} />
});
const Statistics = dynamic(() => import('./statistics'), { ssr: false });
const TwoCard = dynamic(() => import('./two-card'), { ssr: false });
const Freelance = dynamic(() => import('./freelance'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '500px' }} />
});
const LastServices = dynamic(() => import('./last-services'), {
    ssr: false,
    loading: () => <div style={{ minHeight: '400px' }} />
});
const Info = dynamic(() => import('./info'), { ssr: false });
const Title = dynamic(() => import('./title'), { ssr: false });

const Home = () => {
    return (
        <div>
            <div style={{ background: '#fbfbfc' }}>
                <div className="container">
                    <Hero />
                </div>
            </div>
            <YoutubeVid
                text={'Soff - Raqamli mahsulotlar va onlayn xizmatlar bozori'}
                videoId={'https://www.youtube.com/watch?v=hn55AZoxWes'}
            />
            <div className="container">
                <Freelance />
            </div>
            <div className="bg-white">
                <div className="container">
                    <LastServices />
                    <Info />
                </div>
            </div>
            <div className="bg-white py-1">
                <div className="container">
                    <LastProducts />
                    <Statistics />
                    {/* <Bests /> */}
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
