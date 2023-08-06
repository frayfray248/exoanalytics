import axios from 'axios'

async function getPlanets() {

    const planets = await axios.get('https://exoplanetarchive.ipac.caltech.edu/TAP/sync/?query=select+pl_name,disc_year+from+ps&format=json',
        {
            method: 'GET',
            redirect: 'follow',
        })

    return planets.data
}

export default async function (req, res) {

    const planets = await getPlanets()
    res.status(200).json(planets)

}