// modules
import StyleWrapper from "./styles/StyleWrapper"

// components
import Nav from "../components/Nav"
import Main from "../components/Main"
import TimeChartView from "@/components/TimeChartView"

export default function Page() {

    return (
        <StyleWrapper>
            <Nav />
            <Main>
                <TimeChartView />
            </Main>
        </StyleWrapper>
    )
}