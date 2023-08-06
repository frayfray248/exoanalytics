async function getPlanets(columns) {

    const res = await fetch(`/api/planets?columns=${columns}`,
        {
            method: 'GET',
            redirect: 'follow',
            next: {
                revalidate: 3600
            }
        })

    if (!res.ok) {

        throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return data
}

export default getPlanets