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
import annotationPlugin from 'chartjs-plugin-annotation'

// components
import ChartContainer from './ChartContainer';

export default function ({ years, datasets, events }) {

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

    const annotations = {}

    if (events) {

        for (let index = 0; index < events.length; index++) {

            annotations[`line${index}`] = {
                adjustScaleRange: true,
                drawTime: 'afterDatasetsDraw',
                type: 'line',
                scaleID: 'x',
                value: years.indexOf(events[index].year),
                backgroundColor: 'rgba(255, 99, 132, 0.25)',
                label: {
                    content: events[index].label,
                    display: true,
                    position: 'center',
                    rotation: 90,
                }
            }
        }

    }


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            autocolors: false,
            annotation: {
                annotations: annotations
            }
        },
        scales: {
            x: { stacked: false },
            y: { stacked: false }
        }
    }

    const data = {
        labels: years,
        datasets: datasets.map((dataset, index) => (
            {
                ...dataset,
                id: index,
                borderColor: `hsl(${index * 360 / datasets.length}, 100%, 50%)`,
            })),
    }

    console.log(data)

    return (
        <ChartContainer>
            <Line

                datasetIdKey='id'
                data={data}
                options={options}
            />
        </ChartContainer>
    )
}