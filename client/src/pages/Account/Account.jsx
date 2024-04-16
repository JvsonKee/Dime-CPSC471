import NavBar from '../../components/NavBar';
import { PageContainer, MainContainer } from '../../styles/Containers';
import { ProfileContentContainer, ProfileContainer, AccountContentContainer, Left, Right, AccountItem, AccountNav, LogoutLink, MainContent, Icon } from './Account.styled';
import AccountInformation from './AccountInformation';
import { faArrowRightFromBracket, faAddressCard, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import PaymentMethods from './PaymentMethods';
import { useState } from 'react';

const Account = () => {
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
                    </ProfileContainer>
                </ProfileContentContainer>
            </MainContainer>
        </PageContainer>
    )
}

export default Account