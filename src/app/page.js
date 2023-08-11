// modules
import StyleWrapper from "./styles/StyleWrapper"

// components
import Nav from "../components/Nav"
import Main from "../components/Main"
import TimeChartView from "@/components/sections/Time"
import Relationships from "@/components/sections/Relationships"
import Distributions from "@/components/sections/Distributions"

export default function Page() {

    return (
        <StyleWrapper>
            <Nav />
            <Main>
                <TimeChartView />
                <Relationships />
                <Distributions />
            </Main>
        </StyleWrapper>
    )
}