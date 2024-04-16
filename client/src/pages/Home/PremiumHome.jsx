import BarChart from "../Premium/BarChart";
import { BoxHeader, ColumnBoxContainer, BoxChartWrapper } from "./Home.styled";

const PremiumHome = ( {totals} ) => {
    return (
        <ColumnBoxContainer>
            <BoxHeader>Premium</BoxHeader>
            <BoxChartWrapper>
                <BarChart totals={totals} />
            </BoxChartWrapper>
        </ColumnBoxContainer>
    )
}

export default PremiumHome;