import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { ContentContainer } from '../../styles/Containers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
`

export const ProfileHeader = styled.h1`
    /* align-self: flex-start;/ */
`

export const AccountContentContainer = styled.div`
    display: flex;
    gap: 2%;
    width: 100%;
    height: 100%;
    padding-top: 2%;
`

export const Left = styled.div`
    display: flex;
    align-items: center;
    width: 22%;
    border-right: 1px solid var(--dark-grey);
`

export const Right = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    width: 78%;
    overflow: scroll;
    /* background-color: green; */
`

export const AccountNav = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 70%;
`

export const AccountItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    color: var(--dark-grey);
    transition: 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        color: var(--text-black);
    }
`

export const LogoutLink = styled(Link)`
    display: flex;
    align-items: center;
    gap: 10px;
    color: var(--dark-grey);
    text-decoration: none;
    transition: 0.3s ease-in-out;

    &:hover {
        color: var(--text-black);
    }
`

export const MainContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8%;
    width: 90%;
    height: 90%;
    /* background-color: pink; */
`

export const Icon = styled(FontAwesomeIcon)`

`