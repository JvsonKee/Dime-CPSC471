import { Link } from "react-router-dom";
import styled from "styled-components";


export const TransactionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2%;
    width: 100%;
    padding: 2%;
    background-color: white;
    border-radius: 20px;
`;

export const ItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    gap: 2%;
    height: 100%;
    overflow: scroll;
`

export const TransactionItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 45%;
    border-radius: 20px;
    height: 120px;
    padding: 15px;
    background-color: var(--light-grey);
`;

export const TransactionButton = styled.button`
    border: none;
    border-radius: 20px;
    padding: 10px;
    background-color: var(--dime-green);
    color: white;
    font-weight: bold;
    cursor: pointer;
    text-decoration: none;
    font-size: 13px; /* Adjust the font size as needed */
    transition: 0.3s ease-in-out;
    &:hover {
        background-color: #00cc9f;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
    align-self: center;
`;

export const Title = styled.h1`
    width: 100%;
`;

export const Top = styled.div`
    display: flex;
    justify-content: space-between;
`

export const TName = styled.div`
    font-size: 24px;
`

export const TPrice = styled.div`
    font-weight: bold;
    font-size: 24px;
`

export const Mid = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 14px;
    color: var(--dark-grey);
`

export const Bottom = styled.div`
    display: flex;
    gap: 5px;
`

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    font-weight: bold;
`