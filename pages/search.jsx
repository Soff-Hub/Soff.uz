import React from 'react'


function Search() {
    return (
        <div>Search</div>
    )
}


export async function getServerSideProps({ query }) {
    console.log(query);


    return {
        redirect: {
            destination: `/search-page?keyword=${query?.keyword}`,
            permanent: true, // triggers 308,
        },
    };
}


export default Search
