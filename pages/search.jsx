const SearchPage = () => {
    return null;
};

export default SearchPage;

export async function getServerSideProps(ctx) {
    return {
        redirect: {
            destination: `/search-page${
                ctx.resolvedUrl.includes('?')
                    ? ctx.resolvedUrl.substring(ctx.resolvedUrl.indexOf('?'))
                    : ''
            }`,
            permanent: true,
        },
    };
}
