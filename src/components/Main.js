"use client";

// modules
import styled from 'styled-components'

// components
import ChartContainer from './ChartContainer';
import PlanetDiscoveryLineChart from './PlanetDiscoveryLineChart';

const StyledMain = styled.main`
    /* positioning */
    display: block;

    /* sizing */
    width: 100%;

    /* color */
    background-color: ${props => props.theme.colors.secBackground};
`

const Main = ({ planets }) => {
    return (
        <StyledMain>
            <ChartContainer>
                <PlanetDiscoveryLineChart planets={planets} />
            </ChartContainer>
        </StyledMain>
    )
}

export default Main