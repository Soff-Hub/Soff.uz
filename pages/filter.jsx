import React from 'react'

function Filter() {
    return (
        <div>Search</div>
    )
}

export async function getServerSideProps({ query }) {
    return {
        redirect: {
            destination: `/search-page?keyword=${query?.keyword}`,
            permanent: true,
        },
    };
}


export default Filter
