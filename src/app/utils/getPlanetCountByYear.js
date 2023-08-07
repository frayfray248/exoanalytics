async function getPlanetCountByYear() {

    const query = "SELECT+disc_year,+COUNT(*)+AS+planet_count+FROM+ps+WHERE+disc_year+IS+NOT+NULL+GROUP+BY+disc_year+ORDER+BY+disc_year+ASC"

    const res = await fetch(`/api/planets?query=${query}`,
        {
            method: 'GET',
            redirect: 'follow'
        })

    if (!res.ok) {

        throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return data
}

export default getPlanetCountByYear