'use client'

// modules
import { useEffect, useState } from 'react'

// utils
import getPlanetAggregateRows from '@/app/utils/getPlanetAggregateRows';


import Container from '../Container';
import PieChart from '../charts/PieChart';

const Distributions = () => {

    // state
    const [selectedColumn, setSelectedColumn] = useState('disc_locale')
    const [planetData, setPlanetData] = useState([])
    const [labels, setLabels] = useState([])

    useEffect(() => {
        (async () => {
            try {

                const data = await getPlanetAggregateRows(selectedColumn)

                setPlanetData(data.map(item => item.count))
                setLabels(data.map(item => item[selectedColumn]))

                console.log(data.map(item => item.count))

                
            }
            catch (error) {
                alert(error)
            }

        })()
    }, [])

    return (
        <Container>
            <h1>Distributions</h1>
            <Container border="true">
                <PieChart dataArray={planetData} labels={labels}/>
            </Container>
        </Container>
    )
}

export default Distributions