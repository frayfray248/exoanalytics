// modules
import styled, { css } from 'styled-components'

// components
import BarLoader from "react-spinners/BarLoader"


const Loader = ({ loading, height, width, theme }) => {

    return (
        <BarLoader
            speedMultiplier={0.5}
            loading={loading}
            height={height}
            width={width}
            color='gray'
            cssOverride={{
                textAlign: 'center'
            }}
        />

    )
}



export default Loader

