import { useContext, useState } from "react";
import { InfoHeader, InfoMatrix, InformationContainer, Info, AccountInfoButton, ButtonContainer, StatusHeader, NameEmailWrapper } from "./AccountInformation.styled"
import PopUp from "../../components/PopUp/PopUp";
import { UserContext } from "../../App";
import { ProfileHeader } from "./Account.styled";

const AccountInformation = () => {
    const [user, setUser] = useContext(UserContext)

    const [popUp, setPopUp] = useState(false);
    const [mode, setMode] = useState('');
    const [status, setStatus] = useState(user.premium)
    const [statusString, setStatusString] = useState("")


    // if (status === 'y') {
    //     setStatusString("Unsubscribe from premium")
    // } else if (status === 'n') {
    //     setStatusString("Upgrade to premium")
    // }

    // const getStatusString = () => {
    //     if (status === 'y') {
    //         setStatusString("Unsubscribe from premium")
    //     } else if (status === 'n') {
    //         setStatusString("Upgrade to premium")
    //     }
    //     return statusString
    // }

    const showPopUp = (m) => {
        setMode(m)
        setPopUp(true)
    }

    const handlePopUp = () => {
        setPopUp(false)
    }

    return (
        <InformationContainer>
            <ProfileHeader>Hello, {user.fName.charAt(0).toUpperCase() + user.fName.slice(1)}</ProfileHeader>

            {popUp ? <PopUp mode={mode} popUp={handlePopUp}/> : null}
            {user.premium === "y" ? <StatusHeader style={{color: "var(--dime-green)"}}>Premium</StatusHeader> : user.premium === "n" ? <StatusHeader style={{color: "#5C5959"}}>Standard</StatusHeader> : null}
           
            <NameEmailWrapper>
                <InfoMatrix>
                    <InfoHeader>Name</InfoHeader>
                    <Info>{user.fName} {user.lName}</Info>
                </InfoMatrix>
                <InfoMatrix style={{borderTop: '1px solid var(--dark-grey)'}}>
                    <InfoHeader>Email</InfoHeader>
                    <Info>{user.email}</Info>
                </InfoMatrix> 
            </NameEmailWrapper>
            <ButtonContainer>
                <AccountInfoButton onClick={() => showPopUp('upgrade')} style={{borderRadius: '20px 20px 0 0'}}>Manage Subscription</AccountInfoButton>
                <AccountInfoButton onClick={() => showPopUp('email')}>Change Email</AccountInfoButton>
                <AccountInfoButton onClick={() => showPopUp('password')}>Change Password</AccountInfoButton>
                <AccountInfoButton onClick={() => showPopUp('delete')} style={{borderRadius: '0 0 20px 20px', borderBottom: 'none'}}>Delete Account</AccountInfoButton>
            </ButtonContainer>
        </InformationContainer>
    )
}

export default AccountInformation