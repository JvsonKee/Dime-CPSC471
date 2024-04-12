import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
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

    let stored_account;
    let run_now = false
    
    const handleChange = (e) =>{
        setInputAccount((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const navigate = useNavigate()

    const run = () => {
        run_now = true
    }

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
            // stored_account = res.data
            // console.log(stored_account);
            // console.log(stored_account[0]);
            // setUser(res.data)
            // (run_now === true) ? ((stored_account[0] !== undefined) ? check(stored_account[0]) : setInvalidLogin(errorMessage)) : run_now = false;
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        console.log(user)
    }, [user])
    
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
                <div>some-type-of-graphic</div>
            </RightContainer>

        </LoginContainer>
    )
}

export default Login