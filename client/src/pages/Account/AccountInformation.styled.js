import styled from "styled-components";

export const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5%;
    height: 100%;
    margin-top: 10%;
`

export const NameEmailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 20%;
    border-radius: 20px;
    background-color: var(--light-grey);

`

export const InfoMatrix = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 16px;
    height: 100%;
    padding-left: 15px;
`   

export const StatusHeader = styled.div`
    font-size: 20px;
    font-style: italic;
`

export const InfoHeader = styled.div`

`

export const Info = styled.div`
    display: flex;
    align-items: center;
    color: var(--dark-grey);
`

export const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: var(--light-grey);
    border-radius: 20px;
`

export const AccountInfoButton = styled.button`
    height: 50px;
    border: none;
    text-align: left;
    padding-left: 15px;
    background-color: var(--light-grey);
    border-bottom: 1px solid var(--dark-grey);
    transition: 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        background-color: #D4D9F0;
    }
`