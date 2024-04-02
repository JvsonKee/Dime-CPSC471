import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: rgba(30, 216, 171, 0.50);
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    padding: 20px;
    background-color: white;
    border-radius: 20px;
`;

export const Title = styled.h1`
    text-align: center;
    margin-bottom: 20px;
`;

export const InputField = styled.input`
    width: 100%;
    max-width: 300px; /* Less wide horizontally */
    height: 40px;
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
    box-sizing: border-box;
`;

export const Button = styled.button`
    width: 100%;
    max-width: 300px; /* Less wide horizontally */
    height: 40px;
    background-color: #1DC79E;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #15a883;
    }
`;

export const LinkToLogin = styled(Link)`
    margin-top: 20px;
    font-size: 14px;
    color: #6F6C6C;
    text-decoration: none;
`;
