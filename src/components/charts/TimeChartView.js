'use client'

// modules
import { useEffect, useState } from 'react'
import getPlanetCountByYear from '@/app/utils/getPlanetCountByYear';

// components
import Container from '../Container';
import TimeChart from "./TimeChart";

const TimeChartView = () => {

    // state
    const [years, setYears] = useState([])
    const [datasets, setDatasets] = useState([])

    // effects
    useEffect(() => {
        (async () => {
            try {

                // fetching exoplanet data
                const data = await getPlanetCountByYear()

                // making chart datasets from fetched data
                setDatasets([
                    {
                        // dataset for planets discovered each year
                        label: 'Planets discovered',
                        data: data.map(planet => planet.planet_count)
                    },
                    {
                        // dataset for cumulative planets discovered
                        label: 'Cumulative planets discovered',
                        data: data.map(planet => planet.planet_count).reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], [])
                    },
                ])

                // making chart horizontal axis labels from fetched data
                setYears(data.map(planet => planet.disc_year))

            } catch (error) {
                alert(error)
            }
        })()
    }, [])

    const events = [
        {
            year: 1995,
            label: 'First exoplanet documented'
        },
        {
            year: 2009,
            label: 'Kepler launched'
        },
        {
            year: 2021,
            label: 'JWST launched'
        }
    ]

    return (
        <Container>
            <h1>Exoplanets discovered over time</h1>
            <TimeChart years={years} datasets={datasets} events={events} />
        </Container>
    )
}

export default TimeChartView;