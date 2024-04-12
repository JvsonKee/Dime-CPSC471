import styled from "styled-components";

export const PaymentMethodsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

export const AddPaymentButton = styled.button`
    width: 50px;
    height: 50px;
    border-radius: 100px;
    border: none;
    background-color: var(--dime-green);
    font-size: 16px;
    color: white;
    transition: 0.3s ease-in-out;
    
    &:hover {
        cursor: pointer;
        background-color: #1DC79E;
    }
`

export const CardsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`
