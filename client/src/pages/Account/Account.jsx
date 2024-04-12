import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import NavBar from '../../components/NavBar';
import { PageContainer, MainContainer } from '../../styles/Containers';
import { ProfileContentContainer, ProfileContainer, ProfileHeader, AccountContentContainer, Left, Right, AccountItem, AccountNav, LogoutLink, MainContent, Icon } from './Account.styled';
import AccountInformation from './AccountInformation';
import PopUp from '../../components/PopUp/PopUp';
import { UserContext } from '../../App';
import { faArrowRightFromBracket, faAddressCard, faCreditCard, faCircleDollarToSlot } from '@fortawesome/free-solid-svg-icons';


const Account = () => {

    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()


    const handleDelete = async() => {
        try{
            await axios.delete("http://localhost:8800/deleted/" + user.userID);
            navigate("/deleted")
        }catch(err) {
            console.log(err)
        }
    }

    const premiumToStandard = async e =>{
        e.preventDefault()
        user.premium = "n"
        await axios.put("http://localhost:8800/updatepremium/" + user.userID, {premium:"n"})
        navigate("/standardchange", {state: {account: user}})
    }

    const standardToPremium = async e => {
        e.preventDefault()
        user.premium = "y"
        await axios.put("http://localhost:8800/updatepremium/" + user.userID, {premium:"y"})
        navigate("/premiumchange", {state: {account: user}})
    }

    return (
        <PageContainer>
            <NavBar/>
            <MainContainer>
                <ProfileContentContainer>
                    <ProfileContainer>
                        <ProfileHeader>Hello, {user.fName.charAt(0).toUpperCase() + user.fName.slice(1)}</ProfileHeader>
                        <AccountContentContainer>
                            <Left>  
                                <AccountNav>
                                    <AccountItem><Icon icon={faCircleDollarToSlot}/><span>Income</span></AccountItem>
                                    <AccountItem><Icon icon={faCreditCard}/><span>Payment Methods</span></AccountItem>
                                    <AccountItem><Icon icon={faAddressCard}/><span>Account Information</span></AccountItem>
                                    <AccountItem><LogoutLink to="/"><Icon icon={faArrowRightFromBracket}/><span>Logout</span></LogoutLink></AccountItem>
                                </AccountNav>
                            </Left>
                            <Right>
                                <MainContent>
                                    <AccountInformation/>
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