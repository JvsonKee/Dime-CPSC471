import { BoxContentWrapper, BoxHeader, ColumnBoxContainer, IncomeAmount, IncomeItem, IncomeName } from "./Home.styled"

const Incoming = ({incomes})  => {

    console.log({incomes})
    return (
        <ColumnBoxContainer>
            <BoxHeader>Incoming</BoxHeader>
            <BoxContentWrapper>
                {
                    incomes.map((income, key) => (
                        <IncomeItem key={key}>
                            <IncomeName>{income.incomeSource}</IncomeName>
                            <IncomeAmount>${income.incomeAmount}</IncomeAmount>
                        </IncomeItem>
                    ))
                }
            </BoxContentWrapper>
        </ColumnBoxContainer>
    )
}

export default Incoming