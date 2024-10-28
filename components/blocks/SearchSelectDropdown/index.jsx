import React, { useRef, useState } from 'react'

export default function SearchSelectDropdown({ value, setValue }) {
    const inputRef = useRef(null)

    const options = [
        {
            value: 'all',
            label: 'Barcha turdagi',
            icn: 'fa fa-list'
        },
        {
            value: 'video',
            label: 'Video',
            icn: 'fa fa-video'
        },
        {
            value: 'audio',
            label: 'Audio',
            icn: 'fa fa-music'
        },
        {
            value: 'template',
            label: 'Shablon',
            icn: 'fa fa-grip-vertical'
        },
        {
            value: 'file',
            label: 'Fayl',
            icn: 'fa fa-folder-open'
        }
    ]


    const handleClose = () => {
        if (inputRef.current) {
            inputRef.current.checked = false;
        }
    };

    const clickItem = (tab) => {
        setValue(tab)
        handleClose()
    }

    return (
        <div className="search-dropdown-box">
            <div className='search-dropdown'>
                <input id="toggle2" type="checkbox" ref={inputRef} />
                <label htmlFor="toggle2" className="animate">
                    <i className={value.icn}></i>
                    {value.label}
                </label>
                <ul className="animate dropdown-context" onMouseLeave={handleClose}>
                    {
                        options.filter(el => el.value !== value?.value).map(itm => (
                            <li className="animate" onClick={() => clickItem(itm)} key={itm.value}>
                                <i className={itm.icn}></i>
                                {itm.label}
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}
