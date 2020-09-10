const baseUrl = `https://api.data.charitynavigator.org/v2/Organizations?app_id=f00fff25&app_key=${process.env.REACT_APP_API_KEY}`;

export function getCharities(search) {
    return fetch(`${baseUrl}&search=${search}`, { mode: 'cors' })
    .then(res => res.json());
}