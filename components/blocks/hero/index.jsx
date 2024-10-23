import React from 'react'
import { Select } from 'antd'
import HeroSearchInput from './HeroSearchInput';
const Option = Select.Option;

export default function HeroMain() {
    return (
        <div className='hero'>
            <div className="hero-bg">
                <div className="container">
                    <div className="hero-inner">
                        <div className="hero-search-form">
                            <div className="hero-content">
                                <h1 className='hero-title'>Soff.uz - <span>qidiruv tizimi</span></h1>
                                <p className='hero-text'>O‘zbek tilida saralanib borilayotgan sifatli ma’lumotlar jamlanmasini, fayllar, tasvirlar, videolar, audiolar ko‘rinishida qidirib topish imkonini beradi.</p>
                            </div>

                            <form className="hero-search-form">
                                <HeroSearchInput />

                                {/* <Select
                                value={'all'}
                                className='hero-search-select'
                            >
                                <Option key={'all'}>
                                    <i className="fa-solid fa-list mr-2"></i> Barchasi
                                </Option>

                                <Option key={"file"}>
                                    <i className='text-success fa-solid fa-file mr-2 '></i> Fayl
                                </Option>

                                <Option key={"audio"}>
                                    <i className='mr-2 fa-solid fa-music text-success'></i> Audio
                                </Option>

                                <Option key={"template"}>
                                    <i className='fa-solid text-success fa-file-lines mr-2'></i> Shablon
                                </Option>

                                <Option key={"video"}>
                                    <i className='fa-solid text-success fa-video mr-2'></i> Video
                                </Option>

                                <Option key={"playlist"}>
                                    <i className='fa-solid text-success fa-video mr-2'></i> Playlist
                                </Option>
                            </Select> */}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
