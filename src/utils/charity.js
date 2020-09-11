const baseUrl = `https://api.data.charitynavigator.org/v2/Organizations?app_id=f00fff25&app_key=${process.env.REACT_APP_API_KEY}&searchType=NAME_ONLY&sort=RELEVANCE&pageSize=10&pageNum=`;

export function getCharities(search, page=1) {
    return fetch(`${baseUrl}${page}&search=${search}`, { mode: 'cors' })
    .then(res => res.json());
}