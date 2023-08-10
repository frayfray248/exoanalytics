/* 
    Detecting when the canvas size changes can not be done 
    directly from the canvas element. Chart.js uses its 
    parent container to update the canvas render and display 
    sizes. However, this method requires the container to be 
    relatively positioned and dedicated to the chart canvas only. 
    Responsiveness can then be achieved by setting relative values 
    for the container size. 

    see: https://www.chartjs.org/docs/latest/configuration/responsive.html
*/


// modules
import styled from 'styled-components'

const StyledChartContainer = styled.div`
    /* positioning */
    position: relative;

    /* sizing */
    width: 100%;
    min-height: 50vh;
    box-sizing: border-box;
    
    /* colors */
    background-color: ${props => props.theme.colors.chartBackground};

    /* border */
    border: 2px solid ${props => props.theme.colors.border};

    padding: 0 1rem;
`

const ChartContainer = ({ children }) => {
    return (
        <StyledChartContainer>
            {children}
        </StyledChartContainer>
    )
}

export default ChartContainer