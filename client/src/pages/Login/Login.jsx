import React from 'react'
import { useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { PageContainer } from '../../styles/Containers'
import { Form, FormContainer, FormTextInput, LeftContainer, LoginHeader, RightContainer, LoginButton, CreateAccountLink } from './Login.styled'

const Login = () => {

    const errorMessage = "Email or password is incorrect. Please try again."

    const [invalidLogin, setInvalidLogin] = useState('');
    const[inputAccount,setInputAccount] = useState({
        email:"",
        password: "",
    })

    let stored_account = []
    let run_now = false
    
    const handleChange = (e) =>{
        setInputAccount((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const navigate = useNavigate()

    const run = () => {
        run_now = true
    }

    const check = (props) => {
        navigate("/home", {state: {account: props}})
    }
    
    const fetchEP = async () => {
        try {
            const res = await axios.get("http://localhost:8800/", {params: inputAccount});
            stored_account = res.data
            console.log(stored_account);
            // console.log(stored_account[0]);
            (run_now === true) ? ((stored_account[0] !== undefined) ? check(stored_account[0]) : setInvalidLogin(errorMessage)) : run_now = false;
        } catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetchEP()
    })
    
    return(
        <PageContainer>
            <LeftContainer>
                <FormContainer>
                    <LoginHeader>Welcome</LoginHeader>
                    <Form>
                        <FormTextInput type = "text" onChange = {handleChange} name = "email" placeholder='Email'/>
                        <FormTextInput type = "password" onChange = {handleChange} name = "password" placeholder='Password'/>
                        {invalidLogin && <div>{invalidLogin}</div>}
                    
                        <LoginButton onClick = {() => {
                            run();
                            fetchEP();
                            }}>
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

        </PageContainer>
    )
}

export default Login