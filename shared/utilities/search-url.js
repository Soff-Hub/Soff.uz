// Tab 1 (products, type=all) is the search page default, so it is left off the
// URL: that keeps links on the single canonical "?keyword=<term>" address
// instead of spawning "&tab=1&type=all" duplicates for crawlers.
export function getSearchPageUrl(keyword, tab = 1) {
    const base = `/search-page?keyword=${encodeURIComponent(keyword || '')}`;
    return Number(tab) === 1 ? base : `${base}&tab=${tab}&type=all`;
}
