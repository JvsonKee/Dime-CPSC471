import { NavContainer, Nav, NavItem, NavItems, NavIcon } from "./NavBar.styled";
import { faArrowRightArrowLeft, faChartSimple, faPiggyBank, faUser} from '@fortawesome/free-solid-svg-icons'

const NavBar = ({account}) => {

    console.log({account})
    return(
        <NavContainer>
            <Nav>
                <NavItems>
                    <NavItem to="/home" state={{account: account}}>
                        DIME
                    </NavItem>
                    <NavItem to="/transactions" state={{account: account}}>
                        <NavIcon icon={faArrowRightArrowLeft}/>
                        <span>Transactions</span>
                    </NavItem>
                    <NavItem to="/budgets">
                        <NavIcon icon={faChartSimple}/>
                        <span>Budgets</span>
                    </NavItem>
                    <NavItem to="/savings" state={{account: account}}>
                        <NavIcon icon={faPiggyBank}/>
                        <span>Savings</span>
                    </NavItem>
                    <NavItem to="/account" state={{account: account}}>
                        <NavIcon icon={faUser}/>
                        <span>Account</span>
                    </NavItem>
                </NavItems>
            </Nav>
        </NavContainer>
    )
}

export default NavBar;