'use client'

// modules
import { useEffect, useState } from 'react'

// components
import TimeChart from "./TimeChart";

const TimeChartView = () => {

    // const planetCountByYear = await getPlanetCountByYear()

    // const years = planetCountByYear.map(planet => planet.disc_year)
    // const planetCounts = planetCountByYear.map(planet => planet.planet_count)

    // const datasets = [
    //     {
    //         id: 1,
    //         label: 'Planets discovered',
    //         data: planetCounts,
    //     },
    // ]
    const [planetCountByYear, setPlanetCountByYear] = useState([])

    useEffect(() => {
        (async () => {
            try {

                const query = "SELECT+disc_year,+COUNT(*)+AS+planet_count+FROM+ps+WHERE+disc_year+IS+NOT+NULL+GROUP+BY+disc_year+ORDER+BY+disc_year+ASC"

                const res = await fetch(`/api/planets?query=${query}`,
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

                setPlanetCountByYear(data)


            } catch(error) {
                alert(error)
            }
        })()
    }, [])

    const years = planetCountByYear.map(planet => planet.disc_year)

    const planetCounts = planetCountByYear.map(planet => planet.planet_count)

    const datasets = [
        {
            id: 1,
            label: 'Planets discovered',
            data: planetCounts,
        },
    ]

    return (
        <TimeChart years={years} datasets={datasets}/>
    )
}

export default TimeChartView;