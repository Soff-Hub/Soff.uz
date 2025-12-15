// This page redirects to the new scientific-resources page
// Old route: /category/[slug] -> New route: /scientific-resources/all

export async function getServerSideProps(ctx) {
    return {
        redirect: {
            destination: `/scientific-resources/all${
                ctx.resolvedUrl.includes('?')
                    ? ctx.resolvedUrl.substring(ctx.resolvedUrl.indexOf('?'))
                    : ''
            }`,
            permanent: false, // Use 302 redirect (temporary)
        },
    };
}

export default function CategoryPage() {
    return null;
}
