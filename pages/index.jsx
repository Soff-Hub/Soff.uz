import Router from 'next/router';
import React, { useEffect } from 'react';

const HomepageDefaultPage = () => {

    useEffect(() => {
        Router.push('/main')
    }, [])

    return <></>
};




export default HomepageDefaultPage;
