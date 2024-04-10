import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const PopUpWrapper = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: rgba(48, 48, 48, 0.5);
`

export const PopUpContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 500px;
    height: 400px;
    background-color: white;
    border-radius: 20px;
`

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8%;
    width: 80%;
    height: 80%;
    background-color: pink;
`

export const TextInput = styled.input`
    /* width: 100%; */
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

export const SubmitButton = styled.button`
    align-self: center;
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

export const CloseButton = styled(FontAwesomeIcon)`
    font-size: 20px;
    align-self: flex-end;
    padding-right: 50px;
    color: var(--dark-grey);
    transition: 0.3s ease-in-out;

    &:hover {
        color: var(--dime-dark-black);
        cursor: pointer;
    }
`

export const ConfirmButton = styled(SubmitButton)`
    width: 50%;
`