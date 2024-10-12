import React from 'react'

function Search() {
    return (
        <div>Redirecting...</div>
    )
}

export async function getServerSideProps({ params }) {
    return {
        redirect: {
            destination: `https://seller.soff.uz/account/register/${params?.pid}`,
            permanent: true,
        },
    };
}


export default Search
