import styled from 'styled-components';

export const IncomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2%;
    width: 100%;
    padding: 2%;
    background-color: white;
    border-radius: 20px;
`;

export const IncomeItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 45%;
    border-radius: 20px;
    height: 120px;
    padding: 15px;
    background-color: var(--light-grey);
`;

export const IncomeButton = styled.button`
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 10px;
    margin: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background-color: rgba(30, 216, 171, 0.50);
    color: #333;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px; /* Adjust the font size as needed */
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const Title = styled.h1`
    width: 100%;
`;
