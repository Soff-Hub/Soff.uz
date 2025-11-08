import { useSwiper } from 'swiper/react';
import { useEffect } from 'react';

function SwiperController({ getMethods, setEnding, setBeginning }) {
    const swiper = useSwiper();

    useEffect(() => {
        getMethods(swiper);
        setEnding(swiper.isEnd);
        setBeginning(swiper.isBeginning);
    }, [swiper, getMethods, setEnding, setBeginning]);

    return (
        <>
            <button
                aria-label="previous"
                style={{ display: 'none' }}
                onClick={() => swiper.slidePrev()}>
                prev
            </button>
            <button
                aria-label="next"
                style={{ display: 'none' }}
                onClick={() => swiper.slideNext()}>
                next
            </button>
        </>
    );
}

export default SwiperController;
