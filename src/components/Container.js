// modules
import styled from 'styled-components'


const Container = ({ children, className}) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

const StyledContainer = styled(Container)`
    
    /* padding & margin */
    padding: 10px;
    margin-bottom: 10px;

    /* border */
    border: ${props => props.border? `2px solid ${props.theme.colors.border}` : 'none'};
`


export default StyledContainer