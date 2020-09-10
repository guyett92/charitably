const baseUrl = `https://api.data.charitynavigator.org/v2/Organizations?app_id=f00fff25&app_key=${process.env.API_KEY}&pageSize=1`;

export function getCharities(search) {
    return fetch(`${baseUrl}&pageSize=1&search=${search}`, { mode: 'cors' })
    .then(res => res.json());
}