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
    ArcElement
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import annotationPlugin from 'chartjs-plugin-annotation'

// components
import ChartContainer from './ChartContainer'

const DoughnutChart = ({ dataArray, labels }) => {

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend,
        annotationPlugin,
        ArcElement
    )

    const options = {

    }

    let data = dataArray ?
        {
            labels: labels,
            datasets: [{
                label: 'My First Dataset',
                data: dataArray,
                backgroundColor: dataArray.map((item, index) => `hsl(${index * 30}, 100%, 50%)`),
                borderWidth: 0,
                hoverOffset: 4
            }]
        }
        :
        {}

    return (
        <ChartContainer>
            <Doughnut data={data} options={options} />
        </ChartContainer>
    )
}

export default DoughnutChart