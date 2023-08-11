import axios from 'axios'

async function getPlanets(query) {

    const res = await fetch(`https://exoplanetarchive.ipac.caltech.edu/TAP/sync/?query=${query}&format=json`,
        {
            method: 'GET',
            redirect: 'follow',
            cache: 'force-cache',
            revalidate: 3600
        })

        const data = await res.json()

    return data
}

export default async function (req, res) {

    const query = req.query.query

    console.log(query)

    const data = await getPlanets(query)
    res.status(200).json(data)

}