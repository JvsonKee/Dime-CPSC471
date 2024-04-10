import { useContext, useState } from "react";
import { FormContainer, SubmitButton, TextInput } from "./PopUp.styled"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../App";

const TextForm = ( {mode, popUp} ) => {
    const [user, setUser] = useContext(UserContext)
    console.log(user.userID)
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const [isOpen, setIsOpen] = useState(true)

    let newString = ""
    let confirmString = ""

    if (mode === "email") {
        newString = "Enter new email";
        confirmString = "Confirm new email"
    } else if (mode === "password") {
        newString = "Enter new password"
        confirmString = "Confirm new password"
    }

    const closePopUp = () => {
        setIsOpen(false)
        popUp(isOpen)
    }

    const [input, setInput] = useState({
        first: "", 
        second: ""
    })

    const handleChange = (e) => {
        setInput((prev)=>({...prev, [e.target.name]: e.target.value}));
        console.log(input.first)
        console.log(input.second)
    }

    const submitForm = async (e) => {
        e.preventDefault();
        if (mode === "email") {
            if (input.first === "" || input.second === "") {
                setError("Invalid email.")
            } else {
                if (input.first === input.second) {
                    try{
                        await axios.put("http://localhost:8800/updateemail/" + user.userID, input)
                        navigate("/account")
                        closePopUp()
                    }catch(err) {
                        console.log(err)
                    }
                }
                else {
                    setError("Emails do not match. Please try again.")
                }
            }
        } 
        
        if (mode === "password") {
            e.preventDefault()

            if (input.first === "" || input.second === "") {
                setError("Invalid password.")
            } else {
                if (input.first === input.second) {
                    try{
                        await axios.put("http://localhost:8800/changepassword/" + user.userID, input)
                        navigate("/account")
                        closePopUp()
                    }catch(err) {
                        console.log(err)
                    }
                }
                else {
                    setError("Passwords do not match. Please try again")
                }
            }
        }
    }

    const checkValidEmail = async (e) => {

        if (mode !== "email") {
            submitForm(e)
            return;
        }
        try {
            const res =  await axios.get("http://localhost:8800/users");
            let emails = res.data;

            console.log({res})
            
            let existingEmail = false;

            for (let i = 0; i < emails.length; i++) {
                
                if (emails[i].email === input.first) {
                    existingEmail = true;
                    setError("Account already exists with this email.")
                    break;
                }
            }

            if (existingEmail === false) {
                submitForm(e);
            }

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <FormContainer>
            <TextInput onChange={handleChange} placeholder={newString} name="first"/>
            <TextInput onChange={handleChange} placeholder={confirmString} name="second"/>
            {error ? <div>{error}</div> : null}
            <SubmitButton onClick={checkValidEmail}>Submit</SubmitButton>
        </FormContainer>
    )
}

export default TextForm;