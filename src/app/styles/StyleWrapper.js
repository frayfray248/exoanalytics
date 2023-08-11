'use client'

import GlobalStyles from "./GlobalStyles"
import { ThemeProvider } from "styled-components"

// theme
import { mainTheme } from './themes'

export default ({ children }) => {
    return (
        <ThemeProvider theme={mainTheme}>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    )
}