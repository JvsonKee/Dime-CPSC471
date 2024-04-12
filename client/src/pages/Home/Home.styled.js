import styled from "styled-components";

export const HomeContent = styled.div`
    display: flex;
    flex-direction: column;
    height: 95%;
    width: 95%;
`

export const CardBase = styled.div`
    display: flex;
    background-color: white;
    border-radius: 20px;
    padding: 2%;

    &:hover {
        cursor: pointer;
    }
`

export const SquareBox = styled(CardBase)`
    width: 28.1%;
`

export const RectangleBox = styled(CardBase)`
    height: 44%;
`

export const VerticalBox = styled(CardBase)`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28%;
`

export const Matrix = styled.div`
    display: flex;
    gap: 2%;
    width: 100%;
    height: 100%;
`

export const TopBottom = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4%;
    width: 66%;
`

export const Top = styled.div`
    display: flex;
    gap: 2%;
    width: 100%;
    height: 35%;
`

export const Bottom = styled.div`
    display: flex;
    width: 100%;
    height: 65%;
`

export const ColumnBoxContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5%;
    width: 95%;
    height: 95%;
`


export const BoxHeader = styled.h2`
`

export const BoxContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: scroll;
`

export const TransactionItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 15%;
    border-bottom: 1px solid var(--dark-grey);
`

export const TransactionTop = styled.div`
    display: flex;
    justify-content: space-between;
`   

export const TransactionTitle = styled.div`
    font-size: 20px;
`

export const TransactionAmount = styled.div`
    font-size: 20px;
    font-weight: bold;
`

export const TransactionDate = styled.div`
    font-size: 14px;
    color: var(--dark-grey);
`

export const IncomeItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 20%;
    border-bottom: 1px solid var(--dark-grey);
`

export const IncomeName = styled.div`
    font-size: 20px;
`

export const IncomeAmount = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: var(--dime-green);
`
