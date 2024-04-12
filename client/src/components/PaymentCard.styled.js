import styled from "styled-components";

export const CardContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    height: 250px;
    border-radius: 30px;
    /* background-color: blue; */
    border: 1px solid black;

    &:hover {
        cursor: pointer;
    }
`

export const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 90%;
    height: 80%;
    font-size: 18px;
`

export const TypeHeader = styled.h2`
    font-size: 30px;
`

export const CardHolder = styled.div`
`

export const CardNumber = styled.div`
`

export const Expiry = styled.div`
    display: flex;
`