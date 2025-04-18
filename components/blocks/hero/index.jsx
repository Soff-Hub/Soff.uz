import React from 'react'
import HeroSearchInput from './HeroSearchInput';
import { useRouter } from 'next/router';

export default function HeroMain() {
    const { query } = useRouter()

    return (
        <div className={`container mt-4 hero ${query?.tab}`}>
            <div className="hero-inner">
                <div className="hero-search-form">
                    <div className="hero-content">
                        <h1 className='hero-title'>Soff.uz – raqamli xizmatlar bozori! </h1>
                        {/* <p className='hero-text'>Malakali mutaxassislar yordamida jamoangizni kengaytiring va biznesingizni rivojlantiring!</p> */}
                    </div>

                    <div className="hero-search-form">
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
                    </div>
                </div>
            </div>
        </div>
    )
}
