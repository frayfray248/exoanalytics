'use client'

// modules
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
import { Scatter } from 'react-chartjs-2'
import annotationPlugin from 'chartjs-plugin-annotation'

// components
import ChartContainer from './ChartContainer'

export default function ({ dataset, xAxisLabel, yAxisLabel }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        annotationPlugin
    )

    const options = {
        scales: {
            y: {
                title: {
                    text: yAxisLabel,
                    display: true
                },
                beginAtZero: true
            },
            x: {
                title: {
                    text: xAxisLabel,
                    display: true
                },
                beginAtZero: true
            }
        }
    }

    const data = {
        datasets: [
            {
                label: 'Planets',
                data: dataset,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ]
    }

    return (

        <ChartContainer>
            <Scatter
                options={options}
                data={data}
            />
        </ChartContainer>
    )
}