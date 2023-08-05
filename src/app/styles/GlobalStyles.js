'use client'

import { createGlobalStyle } from 'styled-components'
import variables from './variables'

const GlobalStyles = createGlobalStyle`
    ${variables};

    html {
        width: 100%;
        height: 100%;
    }

    body {
        /* positioning */
        display: block;
        margin: 0;

        /* sizing */
        width: 100%;

        /* colors */
        background-color: ${props => props.theme.colors.mainBackground};
    }

`

export default GlobalStyles