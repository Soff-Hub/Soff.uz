export default function ScientificResourcesIndex() {
    return null;
}

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
