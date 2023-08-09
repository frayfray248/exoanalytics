'use client'

// modules
import { useEffect, useState } from 'react'

import ScatterChart from '../charts/ScatterChart'

// utils
import { getPlanetColumnNames, getPlanetColumnValues } from '@/app/utils/api'

import Container from '../Container';

const Relationships = () => {

    // state
    const [dataset, setDataset] = useState([])
    const [columns, setColumns] = useState([])
    const [xAxisLabel, setXAxisLabel] = useState('')
    const [yAxisLabel, setYAxisLabel] = useState('')
    const [selectedX, setSelectedX] = useState('')
    const [selectedY, setSelectedY] = useState('')

    useEffect(() => {
        (async () => {
            try {

                const data = await getPlanetColumnNames()

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

                const data = await getPlanetColumnValues([selectedX, selectedY])

                setDataset(data.filter(planet => planet[selectedX] && planet[selectedY]).map(planet => ({ x: planet[selectedX], y: planet[selectedY] })))

            }
            catch (error) {
                alert(error)
            }

        })()
    }, [selectedX, selectedY])

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
            <h1>Relationships</h1>
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

            <ScatterChart dataset={dataset} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} />
        </Container>
    )
}

export default Relationships