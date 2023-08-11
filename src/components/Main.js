'use client'

// modules
import styled from 'styled-components'

const StyledMain = styled.main`
    /* positioning */
    display: block;

    /* sizing */
    width: 100%;

    /* color */
    background-color: ${props => props.theme.colors.secBackground};
`

const Main = ({ children }) => {
    return (
        <StyledMain>
                { children }
        </StyledMain>
    )
}

export default Main