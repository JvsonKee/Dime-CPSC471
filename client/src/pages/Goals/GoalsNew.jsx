import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { GoalForm, Title, FormGroup, Label, Input, Select, Button, InvalidFeedback } from './GoalsNew.styled';

const GoalsNew = () => {
    const location = useLocation();
    let user = location.state.account;

    const [invalidTitle, setInvalidTitle] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')
    const [invalidDay, setInvalidDay] = useState('')
    const [invalidMonth, setInvalidMonth] = useState('')
    const [invalidYear, setInvalidYear] = useState('')
 
    const[goal,setGoal] = useState({
        title:"",
        description:null,
        amount:"",
        gDay: "",
        gMonth:"",
        gYear:""
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (goal.title === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }

        if (goal.amount === "") {
            setInvalidAmount("Invalid amount.")
            valid = false;
        }

        if (goal.gDay === "") {
            setInvalidDay("Invalid day.")
            valid = false;
        }

        if (goal.gMonth === "") {
            setInvalidMonth("Invalid month.")
            valid = false;
        }

        if (goal.gYear === "") {
            setInvalidYear("Invalid year.")
            valid = false;
        }

        return valid
    }

    const handleChange = (e) =>{
        setGoal((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.post("http://localhost:8800/newgoal/"+ user.userID, goal)
                navigate("/goals", {state: {account: user}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(goal)

    return (
        <GoalForm>
            <Title>Enter new savings goal information.</Title>

            <FormGroup>
                <Label>Title *</Label>
                {invalidTitle && <div>{invalidTitle}</div>}
                <Input type = "text" onChange = {handleChange} name = "title"/>
            </FormGroup>

            <FormGroup>
                <Label>Description</Label>
                <Input type = "text" onChange = {handleChange} name = "description"/>
            </FormGroup>
            
            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <div>{invalidAmount}</div>}
                <Input type = "number" onChange = {handleChange} name = "amount"/>
            </FormGroup>

            <FormGroup>
                <Label>Target day *</Label>
                {invalidDay && <div>{invalidDay}</div>}
                <Input type = "number" onChange = {handleChange} name = "gDay"/>
            </FormGroup>

            <FormGroup>
                <Label>Target month *</Label>
                {invalidMonth && <div>{invalidMonth}</div>}
                <Input type = "number" onChange = {handleChange} name = "gMonth"/>
            </FormGroup>

            <FormGroup>
                <Label>Target year *</Label>
                {invalidYear && <div>{invalidYear}</div>}
                <Input type = "number" onChange = {handleChange} name = "gYear"/>
            </FormGroup>
 
            <Button onClick = {handleClick}> Submit</Button>
        </GoalForm>
    )
}

export default GoalsNew