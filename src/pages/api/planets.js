import axios from 'axios'

async function getPlanets(query) {

    const res = await axios.get(`https://exoplanetarchive.ipac.caltech.edu/TAP/sync/?query=${query}&format=json`,
        {
            method: 'GET',
            redirect: 'follow',
        })

    return res.data
}

export default async function (req, res) {

    const query = req.query.query

    const data = await getPlanets(query)
    res.status(200).json(data)

}