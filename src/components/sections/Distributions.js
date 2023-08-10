'use client'

// modules
import { useEffect, useState } from 'react'

// utils
import { getPlanetAggregateRows } from '@/app/utils/api';

// components
import Container from '../Container';
import PieChart from '../charts/PieChart';
import DoughnutChart from '../charts/DoughnutChart';
import BarChart from '../charts/BarChart';
import Select from '../Select';

const Distributions = () => {

    // state
    const [selectedColumn, setSelectedColumn] = useState('sy_snum')
    const [planetData, setPlanetData] = useState([])
    const [labels, setLabels] = useState([])
    const [selectedChart, setSelectedChart] = useState('pie')

    useEffect(() => {
        (async () => {
            try {

                const data = await getPlanetAggregateRows(selectedColumn)

                setPlanetData(data.map(item => item.count))
                setLabels(data.map(item => item[selectedColumn]))

                
            }
            catch (error) {
                alert(error)
            }

        })()
    }, [selectedColumn])

    const handlePlanetDataSelectChange = (event) => {

        setSelectedColumn(event.target.value) 

    }

    const handleChartSelectChange = (event) => {

        setSelectedChart(event.target.value)
        
    }



    const columns = [
        { value: 'soltype', text: 'Solution Type' },
        { value: 'pl_letter', text: 'Planet Letter' },
        { value: 'sy_snum', text: 'Number of Stars' },
        { value: 'sy_pnum', text: 'Number of Planets' },
        { value: 'discoverymethod', text: 'Discovery Method' },
        { value: 'disc_locale', text: 'Discovery Locale' },
        { value: 'disc_facility', text: 'Discovery Facility' },
        { value: 'disc_telescope', text: 'Discovery Telescope' },
        { value: 'disc_instrument', text: 'Discovery Instrument' },

    ]

    return (
        <Container>
            <h1>Distributions</h1>
            <Container border="true">
                <b>Data:</b>
                <Select id="columns" items={columns} changeHandler={handlePlanetDataSelectChange} />
                <b>Chart:</b>
                <Select items={
                    [
                        { value: 'pie', text: 'Pie' },
                        { value: 'bar', text: 'Bar' },
                        { value: 'doughnut', text: 'Doughnut' },
                    ]
                }
                changeHandler={handleChartSelectChange}
                />
            </Container>
            {
                new Map([
                    ['pie', <PieChart dataArray={planetData} labels={labels}/>],
                    ['doughnut', <DoughnutChart dataArray={planetData} labels={labels}/>],
                    ['bar', <BarChart dataArray={planetData} labels={labels}/>]
                ]).get(selectedChart)
            }
        </Container>
    )
}

export default Distributions