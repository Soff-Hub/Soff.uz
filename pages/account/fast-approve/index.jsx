import { parseCookies } from 'nookies'
import React from 'react'
import { orginalUrl } from '~/reositoriy-admin/Repository'

function FastApprove() {
    return (
        <div>
            <PageContainer>
                <div className="ps-container">
                    <div
                        className="ps-product--detail ps-product--fullwidth"
                        style={{
                            height: '690px',
                            display: 'grid',
                            placeContent: 'center',
                        }}>
                        <div
                            className="spinner-border "
                            role="status"
                            style={{
                                width: '150px',
                                height: '150px',
                            }}>
                            <span className="visually-hidden">
                                Loading...
                            </span>
                        </div>
                    </div>
                </div>
            </PageContainer>
        </div>
    )
}

export async function getServerSideProps(context) {
    const cookies = parseCookies(context);
    const { query } = context
    const token = cookies.token || null;
    const paramsString = new URLSearchParams(query).toString();
    const resquest = await fetch(orginalUrl + `seller/moderation-change/?` + paramsString, {
        headers: { Authorization: `Bearer ${token}` },
    });
    const defaultProducts = await resquest.json();

    if (!defaultProducts?.id) {
        return {
            redirect: {
                destination: `/account/fast-approve/${query?.pk}?end=true`,
                permanent: true,
            },
        };
    }

    return {
        redirect: {
            destination: `/account/fast-approve/${defaultProducts?.id}`,
            permanent: true,
        },
    };
}



export default FastApprove