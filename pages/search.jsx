const SearchPage = () => {
    return null;
};

export default SearchPage;

// Legacy /search?keyword=... URLs are no longer a real page. Answering 410 Gone
// (instead of a redirect) tells Google to drop them, rather than following
// hundreds of thousands of keyword variants into /search-page.
export async function getServerSideProps({ res }) {
    res.statusCode = 410;
    res.setHeader('X-Robots-Tag', 'noindex');
    return { props: {} };
}
