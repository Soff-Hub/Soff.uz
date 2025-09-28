import { f_base_url } from "~/shared/api/base-url";
import { CUSTOMER_SERVICES } from "~/shared/api/end-points";
import fetchJson from "~/shared/api/fetch-json";

export async function GetServices({ keyword, limit, offset }) {
    const url = `${f_base_url}/api/v1/${CUSTOMER_SERVICES}/`
    return fetchJson(url)
}