import Link from 'next/link'
import Router from 'next/router'
import React from 'react'
import NextImageCard from '~/components/nextImagecard'


const SearchHeadersPages = () => {
    return (
        <>
            <div className='search_navbars'>
                <div className="container">
                    <div className='navbar_serach'>
                        <Link href="/">
                            <a className="ps-logo">
                                <NextImageCard
                                    url="/static/img/soff/logo-1.png"
                                    clasS="logoo"
                                    width="150px"
                                    height="50px"
                                />
                            </a>
                        </Link>
                        <div className='d-flex align-items-center gap-5'>
                            <Link href="/account/selection">
                                <a> <span className='text-white span_search'>Bizga qo'shiling</span></a>
                            </Link>

                            <button onClick={() => Router.push("/soff-market")} className='search_button'>Soff Market</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchHeadersPages
