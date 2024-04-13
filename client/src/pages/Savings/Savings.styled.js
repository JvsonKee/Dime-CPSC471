import styled from "styled-components";

export const SavingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2%;
    border-radius: 20px;
    padding: 2%;
    width: 100%;
    background-color: white;
`;

export const SavingsItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 45%; /* Adjust the width as needed */
    height: 120px;
    border: none;
    border-radius: 20px;
    padding: 15px;
    background-color: var(--light-grey);
`;

export const SavingsButton = styled.button`
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

export const Button = styled(SavingsButton)`
background-color: rgba(30, 216, 171, 0.50);
    color: #fff;
    margin-left: 10px;

    &:hover {
        background-color: #00cc9f;
    }
`;

export const Title = styled.h1`
    width: 100%;
`;

export const TotalSavings = styled.div`
    font-size: 25px;
    
    span {
        font-weight: bold;
        color: #5E94FF;
    }
`