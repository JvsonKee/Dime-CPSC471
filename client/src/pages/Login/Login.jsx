import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import axios from 'axios'
import { LoginContainer, Form, FormContainer, FormTextInput, LeftContainer, LoginHeader, RightContainer, LoginButton, CreateAccountLink } from './Login.styled'
import { UserContext } from '../../App'

const Login = () => {

    const [user, setUser] = useContext(UserContext)
    const errorMessage = "Email or password is incorrect. Please try again."

    const [invalidLogin, setInvalidLogin] = useState('');
    const[inputAccount,setInputAccount] = useState({
        email:"",
        password: "",
    })
    
    const handleChange = (e) =>{
        setInputAccount((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const navigate = useNavigate()

    const check = () => {
        navigate("/home")
    }
    
    const fetchEP = async () => {
        try {
            const res = await axios.get("http://localhost:8800/", {params: inputAccount});
            console.log(res.data)
            if (res.data.length !== 0) {
                setUser(res.data[0])
                check(user)
            } else {
                setInvalidLogin(errorMessage);
            }
        } catch(err){
            console.log(err)
        }
    }

    return(
        <LoginContainer>
            <LeftContainer>
                <FormContainer>
                    <LoginHeader>Welcome</LoginHeader>
                    <Form>
                        <FormTextInput type = "text" onChange = {handleChange} name = "email" placeholder='Email'/>
                        <FormTextInput type = "password" onChange = {handleChange} name = "password" placeholder='Password'/>
                        {invalidLogin && <div>{invalidLogin}</div>}
                    
                        <LoginButton onClick = {fetchEP}>
                            Sign in
                        </LoginButton>
                        <CreateAccountLink to ="/createAccount">Not a member? Create an account</CreateAccountLink>
                    </Form>
                </FormContainer>
            </LeftContainer>
            <RightContainer>
                <h1>DIME</h1>
            </RightContainer>

        </LoginContainer>
    )
}

export default Login