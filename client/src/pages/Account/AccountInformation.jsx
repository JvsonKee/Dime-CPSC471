import { useContext, useState } from "react";
import { InfoHeader, InfoMatrix, InformationContainer, Info, AccountInfoButton, ButtonContainer } from "./AccountInformation.styled"
import PopUp from "../../components/PopUp/PopUp";
import { UserContext } from "../../App";

const AccountInformation = () => {
    const [user, setUser] = useContext(UserContext)

    const [popUp, setPopUp] = useState(false);
    const [mode, setMode] = useState('');
    const [status, setStatus] = useState(user.premium)


    let statusString = ""
    if (status === 'y') {
        statusString = "Unsubscribe from premium"
    } else if (status === 'n') {
        statusString = "Upgrade to premium"
    }

    const showPopUp = (m) => {
        setMode(m)
        setPopUp(true)
    }

    const handlePopUp = () => {
        setPopUp(false)
    }

    return (
        <InformationContainer>
            {popUp ? <PopUp mode={mode} popUp={handlePopUp}/> : null}
            <InfoMatrix>
                <InfoHeader>Name</InfoHeader>
                <Info>{user.fName} {user.lName}</Info>
            </InfoMatrix>
            <InfoMatrix>
                <InfoHeader>Email</InfoHeader>
                <Info>{user.email}</Info>
            </InfoMatrix>
            <ButtonContainer>
                <AccountInfoButton onClick={() => showPopUp('upgrade')} style={{borderRadius: '20px 20px 0 0'}}>{statusString}</AccountInfoButton>
                <AccountInfoButton onClick={() => showPopUp('email')}>Change Email</AccountInfoButton>
                <AccountInfoButton onClick={() => showPopUp('password')}>Change Password</AccountInfoButton>
                <AccountInfoButton onClick={() => showPopUp('delete')} style={{borderRadius: '0 0 20px 20px', borderBottom: 'none'}}>Delete Account</AccountInfoButton>
            </ButtonContainer>
        </InformationContainer>
    )
}

export default AccountInformation