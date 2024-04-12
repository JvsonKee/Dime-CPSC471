import NavBar from '../../components/NavBar';
import { PageContainer, MainContainer } from '../../styles/Containers';
import { ProfileContentContainer, ProfileContainer, AccountContentContainer, Left, Right, AccountItem, AccountNav, LogoutLink, MainContent, Icon } from './Account.styled';
import AccountInformation from './AccountInformation';
import { faArrowRightFromBracket, faAddressCard, faCreditCard, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';
import PaymentMethods from './PaymentMethods';
import { useState } from 'react';

const Account = () => {

    // const [user, setUser] = useContext(UserContext)
    const [active, setActive] = useState("account")

    const handleClick = (page) => {
        setActive(page)
    }

    return (
        <PageContainer>
            <NavBar/>
            <MainContainer>
                <ProfileContentContainer>
                    <ProfileContainer>
                        <AccountContentContainer>
                            <Left>  
                                <AccountNav>
                                    <AccountItem onClick={() => handleClick("income")}><Icon icon={faCircleDollarToSlot}/><span>Income</span></AccountItem>
                                    <AccountItem onClick={() => handleClick("payment")}><Icon icon={faCreditCard}/><span>Payment Methods</span></AccountItem>
                                    <AccountItem onClick={() => handleClick("account")}><Icon icon={faAddressCard}/><span>Account Information</span></AccountItem>
                                    <AccountItem><LogoutLink to="/"><Icon icon={faArrowRightFromBracket}/><span>Logout</span></LogoutLink></AccountItem>
                                </AccountNav>
                            </Left>
                            <Right>
                                <MainContent> 
                                    { 
                                        active === "income" ? null : 
                                        active === "payment" ? <PaymentMethods /> :
                                        active === "account" ? <AccountInformation /> :
                                        null
                                    }
                                </MainContent>
                            </Right>
                        </AccountContentContainer>
                        {/* <BoxContainer>
                            <button>
                            <Link to="/home" state= {{account: user}}>Return to homepage</Link>
                            </button>
                            <Box>
                                Change Email
                            </Box>
                            <Box>
                                Change Password
                            </Box>
                            <Box>
                                Incomes
                            </Box>
                            <Box>
                                Payment Methods
                            </Box>
                            <Box>
                                Delete Account
                            </Box>
                            
                            {
                                user.premium === "y" ? <Box onClick={premiumToStandard}>Become a Standard User</Box> :
                                user.premium === "n" ? <Box onClick={standardToPremium}>Become a Premium User</Box> : null
                            }
                            <Box>
                                Logout
                            </Box>
                            <button>
                                <Link to="/updateemail" state= {{account: user}}>Update my email</Link>
                            </button>
                            <button>
                                <Link to="/changepassword" state= {{account: user}}>Change my password</Link>
                            </button>
                            <button>
                                <Link to="/income" state= {{account: user}}>View income</Link>
                            </button>
                            <button>
                                <Link to="/paymentmethods" state= {{account: user}}>View payment methods</Link>
                            </button>
                            <button onClick = {()=>handleDelete()}>Delete my account</button>
                            {
                                user.premium === "y" ? <button onClick={premiumToStandard}>Become a Standard User</button> : 
                                user.premium === "n" ? <button onClick={standardToPremium}>Become a Premium User</button> : null
                            }
                            <button>
                                <Link to="/">Log out</Link>
                            </button>
                        </BoxContainer> */}
                    </ProfileContainer>
                </ProfileContentContainer>
            </MainContainer>
        </PageContainer>
    )
}

export default Account