import StyledComponentsRegistry from './lib/registry'

export const metadata = {
    title: 'exoanalytics',
    description: 'A web app that offers data analytics and visualizations for exploring NASA\'s exoplanet database',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <StyledComponentsRegistry>
                    {children}
                </StyledComponentsRegistry>

            </body>
        </html>
    )
}
