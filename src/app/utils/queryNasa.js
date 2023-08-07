async function queryNasa(query) {

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

export default queryNasa