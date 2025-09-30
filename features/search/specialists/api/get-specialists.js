import { f_base_url } from "~/shared/api/base-url";
import { SEARCH_SPECIALISTS } from "~/shared/api/end-points";
import fetchJson from "~/shared/api/fetch-json";

export async function GetSpecialists({ keyword, limit, offset }) {
    const url = `${f_base_url}/api/v1/${SEARCH_SPECIALISTS}`
    return fetchJson(url)
}