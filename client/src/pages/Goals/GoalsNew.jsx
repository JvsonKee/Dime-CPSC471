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

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);

    return (
        <GoalForm>
            <Title>Enter New Goal Information</Title>

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
            <Label>Target Date *</Label>
                <div>
                    {invalidDay && <div>{invalidDay}</div>}
                    <Select onChange={handleChange} name="gDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    {invalidMonth && <div>{invalidMonth}</div>}
                    <Select onChange={handleChange} name="gMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    {invalidYear && <div>{invalidYear}</div>}
                    <Select onChange={handleChange} name="gYear">
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                </div>
            </FormGroup>
 
            <Button onClick = {handleClick}> Submit</Button>
        </GoalForm>
    )
}

export default GoalsNew