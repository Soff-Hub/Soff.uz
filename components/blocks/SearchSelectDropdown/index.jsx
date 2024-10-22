import React, { useRef } from 'react'

export default function SearchSelectDropdown() {
    const inputRef = useRef(null)


    const handleClose = () => {
        if (inputRef.current) {
            inputRef.current.checked = false;
        }
    };

    const clickItem = (tab) => {
        handleClose()
    }

    return (
        <div className="search-dropdown-box">
            <div className='search-dropdown'>
                <input id="toggle2" type="checkbox" ref={inputRef} />
                <label for="toggle2" className="animate">
                    <i className="fa fa-list"></i>
                    Barcha turdagi
                </label>
                <ul className="animate dropdown-context" onMouseLeave={handleClose}>
                    <li className="animate" onClick={() => clickItem('video')}>
                        <i className="fa fa-video"></i>
                        Video
                    </li>
                    <li className="animate" onClick={() => clickItem('audio')}>
                        <i className="fa fa-music"></i>
                        Audio
                    </li>
                    <li className="animate" onClick={() => clickItem('template')}>
                        <i className="fa fa-grip-vertical"></i>
                        Shablon
                    </li>
                    <li className="animate" onClick={() => clickItem('file')}>
                        <i class="fa fa-folder-open"></i>
                        Fayl
                    </li>
                </ul>
            </div>
        </div>
    )
}
