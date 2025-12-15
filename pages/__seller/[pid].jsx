export async function getServerSideProps(ctx) {
    const { pid } = ctx.params;
    const queryString = ctx.resolvedUrl.includes('?')
        ? ctx.resolvedUrl.substring(ctx.resolvedUrl.indexOf('?'))
        : '';

    return {
        redirect: {
            destination: `/seller/${pid}${queryString}`,
            permanent: false, // Use 302 redirect (temporary)
        },
    };
}

export default function SellerPage() {
    return null;
}
