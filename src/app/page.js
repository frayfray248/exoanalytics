// modules
import StyleWrapper from "./styles/StyleWrapper"

// components
import Main from "../components/Main"

async function getData() {
    const res = await fetch('http://localhost:3000/api/getPlanets',
        {
            method: 'GET',
            redirect: 'follow',
            next: {
                revalidate: 3600
            }
        })

    if (!res.ok) {

        throw new Error('Failed to fetch data')
    }

    const data = await res.json()

    return data
}

export default async function Page() {



  return (
        <StyleWrapper>
        </StyleWrapper>
  )
}