// modules
import styled from 'styled-components'

const StyledContainer = styled.div`
    
    padding: 10px;
`

const Container = ({ children }) => {
    return (
        <StyledContainer>
            {children}
        </StyledContainer>
    )
}

export default Container