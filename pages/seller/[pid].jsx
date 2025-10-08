import UserProfile from "~/features/user-profile";
import { d_base_url } from "~/shared/api/base-url";
import fetchJson from "~/shared/api/fetch-json";
import PageContainer from "~/widgets/layouts/PageContainer";

const SellerPage = ({ seller }) => {
    return (
        <PageContainer>
            <div className="container">
                <UserProfile seller={seller} />
            </div>
        </PageContainer>
    )
}

export default SellerPage


export async function getServerSideProps(context) {
    const { pid } = context.params

    try {
        const url = `${d_base_url}/auth/freelance-profile/${pid}/`
        const res = await fetchJson(url)
        return {
            props: {
                seller: res || null
            }
        }
    } catch (error) {
        return {
            notFound: true
        }
    }
}