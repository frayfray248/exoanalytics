'use client'

// modules
import styled from 'styled-components'

const StyledSelect = styled.select`
    margin: 10px;
`

const Select = ({ id, items, changeHandler }) => {

    return (
        <StyledSelect id={id} onChange={changeHandler}>
            {items.map((item, index) => <option key={index} value={item.value}>{item.text}</option>)}
        </StyledSelect>
    )
}

export default Select