async function getPlanets(columns) {
    
    const res = await fetch(`/api/planets?query=select+${columns.join(',')}+from+ps`,
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

export default getPlanets