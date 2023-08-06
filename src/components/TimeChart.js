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
import { Line } from 'react-chartjs-2'

// components
import ChartContainer from './ChartContainer';

export default function ({ years, datasets }) {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    )

    return (
        <ChartContainer>
            <Line

                datasetIdKey='id'
                data={{
                    labels: years,
                    datasets: datasets,
                }}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                }}
            />
        </ChartContainer>
    )
}