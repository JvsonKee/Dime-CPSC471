import styled from 'styled-components';

export const TransactionForm = styled.div`
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

export const FormGroup = styled.div`
    margin-bottom: 20px;
`;

export const Label = styled.h2`
    margin-bottom: 5px;
`;

export const Input = styled.input`
    width: calc(100% - 20px); /* Adjust the width minus padding */
    padding: 10px; /* Add padding */
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

export const Select = styled.select`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

export const Button = styled.button`
    display: block;
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    border: none;
    border-radius: 5px;
    background-color: rgba(30, 216, 171, 0.50);
    color: #000; /* Black text color */
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #00cc9f;
    }
`;

export const InvalidFeedback = styled.div`
    color: red;
    font-size: 14px;
    margin-top: 5px;
`;