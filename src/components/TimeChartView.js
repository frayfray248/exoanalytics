'use client'

// modules
import { useEffect, useState } from 'react'

// components
import Container from './Container';
import TimeChart from "./TimeChart";

const TimeChartView = () => {

    const [planetCountByYear, setPlanetCountByYear] = useState([])
    const [datasets, setDatasets] = useState([])

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


            } catch (error) {
                alert(error)
            }
        })()
    }, [])



    const planetsDiscoveredByYearOnChange = (event) => {

        if (event.target.checked) {

            const planetCounts = planetCountByYear.map(planet => planet.planet_count)



            setDatasets([...datasets,
            {
                id: 1,
                label: 'Planets discovered',
                data: planetCounts,
            },
            ])

        }
        else {

            setDatasets(datasets.filter(dataset => dataset.id !== 1))
        }

    }

    const cumulativePlanetsDiscoveredByYearOnChange = (event) => {

        if (event.target.checked) {

            const planetCounts = planetCountByYear.map(planet => planet.planet_count)

            const cumulativePlanetCounts = planetCounts.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], [])

            setDatasets([...datasets,
            {
                id: 2,
                label: 'Cumulative planets discovered',
                data: cumulativePlanetCounts,
            },
            ])

        }

        else {

            setDatasets(datasets.filter(dataset => dataset.id !== 2))
        }

    }

    const years = planetCountByYear.map(planet => planet.disc_year)

    return (
        <Container>
            <h1>Planets discovered by year</h1>

            <h2>Datasets:</h2>
            <input type="checkbox" id="planetsDiscoveredByYear" name="planetsDiscoveredByYear" value="planetsDiscoveredByYear" onChange={planetsDiscoveredByYearOnChange} />
            <label htmlFor="planetsDiscoveredByYear">Planets discovered by year</label>

            <input type="checkbox" id="cumulativePlanetsDiscoveredByYear" name="cumulativePlanetsDiscoveredByYear" value="cumulativePlanetsDiscoveredByYear" onChange={cumulativePlanetsDiscoveredByYearOnChange}/>
            <label htmlFor="cumulativePlanetsDiscoveredByYear">Cumulative planets discovered by year</label>

            <TimeChart years={years} datasets={datasets} />
        </Container>

    )
}

export default TimeChartView;