'use client'

// modules
import { useEffect, useState } from 'react'

// components
import ScatterChart from '../charts/ScatterChart'
import Select from '../Select'

// utils
import { getPlanetColumnNames, getPlanetColumnValues } from '@/app/utils/api'
import { removeOutliersFromObjectArray } from '@/app/utils/statistics'

import Container from '../Container';

const Relationships = () => {

    // state
    const [dataset, setDataset] = useState([])
    const [columns, setColumns] = useState([])
    const [numNullsRemoved, setNumNullsRemoved] = useState(0)
    const [numOutliersRemoved, setNumOutliersRemoved] = useState(0)
    const [includeOutliersChecked, setIncludeOutliersChecked] = useState(false)
    const [totalRemoved, setTotalRemoved] = useState(0)
    const [numPlanetsIncluded, setNumPlanetsIncluded] = useState(0)
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

                const nullFilteredData = data.filter(planet => planet[selectedX] && planet[selectedY])

                if (includeOutliersChecked) {
                    setNumNullsRemoved(data.length - nullFilteredData.length)
                    setNumOutliersRemoved(0)
                    setTotalRemoved(data.length - nullFilteredData.length)
                    setNumPlanetsIncluded(nullFilteredData.length)
                    setDataset(nullFilteredData.map(
                        planet => (
                            {
                                x: planet[selectedX],
                                y: planet[selectedY]
                            })
                    ))
                }
                else {
                    const outlierFilteredData = removeOutliersFromObjectArray(nullFilteredData, 3)

                    setNumNullsRemoved(data.length - nullFilteredData.length)
                    setNumOutliersRemoved(nullFilteredData.length - outlierFilteredData.length)
                    setTotalRemoved(data.length - outlierFilteredData.length)
                    setNumPlanetsIncluded(outlierFilteredData.length)

                    setDataset(outlierFilteredData.map(
                        planet => (
                            {
                                x: planet[selectedX],
                                y: planet[selectedY]
                            })
                    ))
                }


            }
            catch (error) {
                alert(error)
            }

        })()
    }, [selectedX, selectedY, includeOutliersChecked])

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

    const handleIncludeOutliersChange = (event) => {

        setIncludeOutliersChecked(event.target.checked)

    }


    return (
        <Container>
            <h1>Relationships</h1>
            <Container border="true">
                <b>X Axis:</b>
                <Select
                    id="scatterChartSelectX"
                    items={columns.map((column) => ({ value: column.column_name, text: column.description }))}
                    changeHandler={handleAxisSelectChange} />
                <b>Y Axis:</b>
                <Select
                    id="scatterChartSelectY"
                    items={columns.map((column) => ({ value: column.column_name, text: column.description }))}
                    changeHandler={handleAxisSelectChange} />

                <input type="checkbox" id="includeOutliers" name="includeOutliers" value="includeOutliers" onChange={handleIncludeOutliersChange} />
                <label htmlFor="includeOutliers">Include Outliers</label>

                <table>
                    <tbody>
                        <tr>
                            <th>Nulls Removed:</th>
                            <td>{numNullsRemoved}</td>
                        </tr>
                        <tr>
                            <th>Outliers Removed:</th>
                            <td>{numOutliersRemoved}</td>
                        </tr>
                        <tr>
                            <th>Total Removed:</th>
                            <td>{totalRemoved}</td>
                        </tr>
                        <tr>
                            <th>Planets Included:</th>
                            <td>{numPlanetsIncluded}</td>
                        </tr>
                    </tbody>
                </table>
            </Container>

            <ScatterChart dataset={dataset} xAxisLabel={xAxisLabel} yAxisLabel={yAxisLabel} />
        </Container>
    )
}

export default Relationships