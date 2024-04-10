import styled from "styled-components";

export const InformationContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5%;
    background-color: pink;
    height: 100%;
`

export const InfoMatrix = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 2%;
    font-size: 16px;
    height: 10%;
    padding-left: 15px;
    border-radius: 20px;
    background-color: var(--light-grey);
`

export const InfoHeader = styled.div`
`

export const Info = styled.div`
    display: flex;
    align-items: center;
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
        background-color: var(--dark-grey);
    }
`