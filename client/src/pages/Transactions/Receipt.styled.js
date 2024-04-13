import styled from "styled-components";

export const ReceiptContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
`;

export const ReceiptItem = styled.div`
    width: calc(33.33% - 225px); /* Adjust the width as needed */
    border: 1px solid #ccc;
    border-radius: 15px;
    padding: 15px;
    margin: 20px 20px; /* Adjust the margin to control space between transaction bubbles */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    background-color: #f9f9f9;
`;

export const ReceiptButton = styled.button`
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
    &:hover {
        background-color: #00cc9f;
    }
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 20px; /* Adjust the distance from the bottom as needed */
    left: 0;
    right: 0;
`;

export const Title = styled.h1`
    text-align: center;
    width: 100%;
`;