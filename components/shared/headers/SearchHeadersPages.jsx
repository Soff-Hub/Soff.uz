import Router from 'next/router'
import React from 'react'

const SearchHeadersPages = () => {
    return (
        <>
            <div className='search_navbars'>
                <div className="container">
                    <div className='navbar_serach'>
                        <h4 className='text-white'>STARTUPYAR</h4>
                        <div className='d-flex align-items-center gap-5'>
                            <span className='text-white span_search'>Partner with us</span>
                            <button onClick={() => Router.push("/home")} className='search_button'>Get Featured</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchHeadersPages
