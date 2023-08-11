

// fetch function to get data from the API. It takes a query string as a parameter that is an ADQL query for NASA's TAP service.
async function fetchPlanetData(query) {

    const res = await fetch(`/api/planets?query=${query}`,
        {
            method: 'GET',
            redirect: 'follow'
        })

    if (!res.ok) {

        throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return data
}

// ADQL queries for NASA's TAP service. Some are functions that take in column names as parameters and return a dynamic query string.
const QUERIES = {
    // get the count of planets discovered by year
    PLANET_COUNT_BY_YEAR : "SELECT+disc_year,+COUNT(*)+AS+planet_count+FROM+ps+WHERE+disc_year+IS+NOT+NULL+GROUP+BY+disc_year+ORDER+BY+disc_year+ASC",
    // get the column names and descriptions for the ps table
    PLANET_COLUMN_NAMES : "SELECT+column_name,description,datatype+FROM+tap_schema.columns+WHERE+TABLE_NAME+like+%27ps%27",
    // get the values for the specified columns
    PLANET_COLUMN_VALUES : (columns) =>  `SELECT+${columns.join(',')}+FROM+ps`,
    // get the aggregate rows for the specified column
    PLANET_AGGREGATE_ROWS : (column) => `SELECT+${column},+COUNT(*)+AS+count+FROM+ps+GROUP+BY+${column}`
}

// export functions that call the fetch function with the appropriate query string
export const getPlanetCountByYear = async () => await fetchPlanetData(QUERIES.PLANET_COUNT_BY_YEAR)
export const getPlanetColumnNames = async () => await fetchPlanetData(QUERIES.PLANET_COLUMN_NAMES)
export const getPlanetColumnValues = async (columns) => await fetchPlanetData(QUERIES.PLANET_COLUMN_VALUES(columns))
export const getPlanetAggregateRows = async (column) => await fetchPlanetData(QUERIES.PLANET_AGGREGATE_ROWS(column))
