import { NavContainer, Nav, NavItem, NavItems, NavIcon } from "./NavBar.styled";
import { faArrowRightArrowLeft, faChartSimple, faPiggyBank, faUser} from '@fortawesome/free-solid-svg-icons'

const NavBar = () => {
    return(
        <NavContainer>
            <Nav>
                <NavItems>
                    <NavItem to="/home">
                        DIME
                    </NavItem>
                    <NavItem to="/transactions">
                        <NavIcon icon={faArrowRightArrowLeft}/>
                        <span>Transactions</span>
                    </NavItem>
                    <NavItem to="/budgets">
                        <NavIcon icon={faChartSimple}/>
                        <span>Budgets</span>
                    </NavItem>
                    <NavItem to="/savings">
                        <NavIcon icon={faPiggyBank}/>
                        <span>Savings</span>
                    </NavItem>
                    <NavItem to="/account">
                        <NavIcon icon={faUser}/>
                        <span>Account</span>
                    </NavItem>
                </NavItems>
            </Nav>
        </NavContainer>
    )
}

export default NavBar;