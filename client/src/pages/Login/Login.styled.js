import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const LoginContainer = styled.div`
    display: flex;
`

export const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40%;
    height: 100vh;
    background-color: white;
`

export const RightContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 100vh;
    background-color: rgba(30, 216, 171, 0.50);
`

export const LoginHeader = styled.h1`
    color: var(--dime-dark-black);
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40%;
    width: 80%;

`

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 80%;
    width: 90%;
`

export const FormTextInput = styled.input`
    width: 90%;
    height: 50px;
    outline: none;
    background-color: #F1F1FB;
    border: 0px;
    border-radius: 20px;
    padding-left: 20px;
    font-size: 14px;
    transition: 0.3s ease-in-out;
    color: var(--dime-dark-black);

    &:hover {
        transform: translateY(-3px);
        cursor: text;
    }

    &::placeholder {
        color: #404040;
    }
`

export const LoginButton = styled.button`
    width: 100px;
    height: 50px;
    border: none;
    border-radius: 20px;
    color: white;
    font-size: 16px;
    font-weight: bold;
    background-color: var(--dime-green);
    transition: 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #1DC79E;
    }
`

export const CreateAccountLink = styled(Link)`
    color: var(--dark-grey);
    border: none;
    background: none;
    text-decoration: none;
    transition: 0.3s ease-in-out;

    &:hover {
        color: var(--dime-dark-black);
    }
`