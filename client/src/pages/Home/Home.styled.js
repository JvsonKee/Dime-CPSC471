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