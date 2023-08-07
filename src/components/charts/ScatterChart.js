'use client'

// modules
import { useEffect, useState } from 'react'
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

// utils
import getPlanets from '@/app/utils/getPlanets';
import queryNasa from '@/app/utils/queryNasa'

// constants
import { PLANET_COLUMN_NAMES } from '@/app/constants/nasaArchiveQueries'

// components
import ChartContainer from './ChartContainer';
import Container from '../Container';

export default function () {

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

    const [dataset, setDataset] = useState([])
    const [columns, setColumns] = useState([])
    const [xAxisLabel, setXAxisLabel] = useState('')
    const [yAxisLabel, setYAxisLabel] = useState('')
    const [selectedX, setSelectedX] = useState('')
    const [selectedY, setSelectedY] = useState('')

    useEffect(() => {
        (async () => {
            try {

                const data = await queryNasa(PLANET_COLUMN_NAMES)

                setColumns(data.filter(column => column.datatype === 'double' || column.data_type === 'int'))

                setSelectedX(data[0].column_name)
                setSelectedY(data[0].column_name)
                setXAxisLabel(data[0].description)
                setYAxisLabel(data[0].description)
            }
            catch (error) {
                alert(error)
            }

        })()
    }, [])

    useEffect(() => {
        (async () => {
            try {

                if (!selectedX || !selectedY) {
                    return
                }

                const data = await getPlanets([selectedX, selectedY])

                setDataset(data.filter(planet => planet[selectedX] && planet[selectedY]).map(planet => ({ x: planet[selectedX], y: planet[selectedY] })))

            }
            catch (error) {
                alert(error)
            }

        })()
    }, [selectedX, selectedY])


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

    const handleAxisSelectChange = (event) => {

        if (event.target.id === 'scatterChartSelectX') {

            setSelectedX(event.target.value)
            setXAxisLabel(event.target.options[event.target.selectedIndex].text)

        }
        else if (event.target.id === 'scatterChartSelectY') {

            setSelectedY(event.target.value)
            setYAxisLabel(event.target.options[event.target.selectedIndex].text)

        }

    }


    return (
        <Container>
            <h1>Scatter Chart</h1>
            <Container border="true">
                
                <b>X Axis:</b>
                <select id="scatterChartSelectX" onChange={handleAxisSelectChange}>
                    {columns.map((column, index) => (<option key={index} value={column.column_name}>{column.description}</option>))}
                </select>
                <b>Y Axis:</b>
                <select id="scatterChartSelectY" onChange={handleAxisSelectChange}>
                    {columns.map((column, index) => (<option key={index} value={column.column_name}>{column.description}</option>))}
                </select>

            </Container>
            <ChartContainer>
                <Scatter
                    options={options}
                    data={data}
                />
            </ChartContainer>
        </Container>
    )
}