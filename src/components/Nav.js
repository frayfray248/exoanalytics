'use client'

import styled from 'styled-components'


const StyledNavList = styled.ul`
    /* positioning */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.5rem;

    /* reset */
    list-style-type: none;

    margin: 1rem;
    padding: 0;
`

const StyledNavItem = styled.li`

    /* border */
    border: 2px solid ${props => props.theme.colors.border};

    /* sizing */
    flex: 1;

    /* typography */
    font-size: 1.5rem;
    font-weight: 700;

    padding: 0 0.5rem;

    cursor: pointer;
    
`

const Nav = () => {

    return (

        <StyledNavList>
            <StyledNavItem>
                Times
            </StyledNavItem>
            <StyledNavItem>
                Relationships
            </StyledNavItem>
            <StyledNavItem>
                Distributions
            </StyledNavItem>
            <StyledNavItem>
                Averages
            </StyledNavItem>
            <StyledNavItem>
                Individuals
            </StyledNavItem>
        </StyledNavList>
    )
}

export default Nav