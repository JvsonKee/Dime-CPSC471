import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { UserContext } from '../../App';

const UpdateSavings = () => {
    const [user, setUser] = useContext(UserContext)
    const location = useLocation();
   
    const [invalidTitle, setInvalidTitle] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')
    const[savings,setSavings] = useState({
        title:"",
        description:null,
        amount:""
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (savings.title === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }

        if (savings.amount === "") {
            setInvalidAmount("Invalid amount.")
            valid = false;
        }

        return valid
    }

    const handleChange = (e) =>{
        setSavings((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.put("http://localhost:8800/updatesavings/"+ location.state.savingsID, savings)
                navigate("/savings")
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(savings)

    return <div>
    <div className = 'savingsForm'>
        <h1>Enter updated savings information.</h1>

        <h1>Title *</h1>
        {invalidTitle && <div>{invalidTitle}</div>}
        <input type = "text" onChange = {handleChange} name = "title"/>

        <h1>Description</h1>
        <input type = "text" onChange = {handleChange} name = "description"/>

        <h1>Amount *</h1>
        {invalidAmount && <div>{invalidAmount}</div>}
        <input type = "number" onChange = {handleChange} name = "amount"/>
    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default UpdateSavings