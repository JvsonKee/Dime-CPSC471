import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ContentContainer } from '../../styles/Containers'

export const ProfileContentContainer = styled(ContentContainer)`
    justify-content: center;
    background-color: white;
`

export const ProfileContainer = styled.div`
    display: flex;
    align-self: center;
    flex-direction: column;
    width: 90%;
    height: 90%;
    background-color: blue;
`

export const ProfileHeader = styled.h1`

`

export const AccountContentContainer = styled.div`
    display: flex;
    gap: 2%;
    width: 100%;
    height: 100%;
    padding-top: 2%;
    background-color: pink;
`

export const Left = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30%;
    background-color: green;
`

export const Right = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    background-color: green;
`

export const AccountNav = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 80%;
    height: 70%;
    background-color: blue;
`

export const AccountItem = styled.div`
    font-size: 16px;

    &:hover {
        cursor: pointer;
    }
`

export const LogoutLink = styled(Link)`
    text-decoration: none;
`

export const MainContent = styled.div`
    width: 90%;
    height: 90%;
    background-color: blue;
`