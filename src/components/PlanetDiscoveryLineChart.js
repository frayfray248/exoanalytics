"use client";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

export default function ({ planets }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    let planetYearDiscoveries = {}

    for (const planet of planets) {
    
            if (planetYearDiscoveries[planet.disc_year]) {
    
                planetYearDiscoveries[planet.disc_year] += 1
            } else {
    
                planetYearDiscoveries[planet.disc_year] = 1
            }
    }

    return (
        <Line

            datasetIdKey='id'
            data={{
                labels: Object.keys(planetYearDiscoveries),
                datasets: [
                    {
                        id: 1,
                        label: 'Planets discovered',
                        data: Object.values(planetYearDiscoveries),
                    },
                ]
            }}
            options={{
                responsive: true,
                maintainAspectRatio: false,
            }}
        />
    )
}