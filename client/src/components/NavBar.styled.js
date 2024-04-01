import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NavContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    height: 100vh;
`

export const Nav = styled.div`
    display: flex;
    position: fixed;
    width: 18%;
    height: 97%;
    border-radius: 20px;
    background-color: white;

`

export const NavItems = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 60%;
    height: 90%;
    margin: 20% auto;

    & a.active {
        color: var(--dime-green);
    }
    /* background-color: yellow; */
`

export const NavItem = styled(NavLink)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: 50%;
    color: var(--dark-grey);
    text-decoration: none;
    font-size: 22px;
    transition: 0.3s ease-in-out;

    &:hover {
        color: var(--dime-green);
    }

    span {
        font-size: 16px;
    }
`

export const NavIcon = styled(FontAwesomeIcon)`
`

