import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { GoalsForm, Title, FormGroup, Label, Input, Select, Button, InvalidFeedback } from './GoalsUpdate.styled';

const UpdateGoals = () => {
    const location = useLocation();
    let user = location.state.account;


    const [invalidTitle, setInvalidTitle] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')
    const [invalidDay, setInvalidDay] = useState('')
    const [invalidMonth, setInvalidMonth] = useState('')
    const [invalidYear, setInvalidYear] = useState('')

    const[goal,setGoal] = useState({
        title: location.state.goalPass[0].title,
        description: location.state.goalPass[0].description,
        amount:location.state.goalPass[0].amount,
        gDay: location.state.goalPass[0].gDay,
        gMonth:location.state.goalPass[0].gMonth,
        gYear:location.state.goalPass[0].gYear
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

        /*
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
        */

        return valid
    }

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);


    const handleChange = (e) =>{
        setGoal((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.put("http://localhost:8800/updategoal/"+ location.state.goalID, goal)
                navigate("/goals", {state: {account: user}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(goal)

    return (
        <GoalsForm>
            <Title>Enter Updated Goal Information</Title>

            <FormGroup>
                <Label>Title *</Label>
                {invalidTitle && <div>{invalidTitle}</div>}
                <Input type = "text" onChange = {handleChange} name = "title" value = {goal.title}/>
            </FormGroup>

            <FormGroup>
                <Label>Description</Label>
                <Input type = "text" onChange = {handleChange} name = "description" value = {goal.description}/>
            </FormGroup>

            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <div>{invalidAmount}</div>}
                <Input type = "number" onChange = {handleChange} name = "amount" value = {goal.amount}/>
            </FormGroup>

            <FormGroup>
            <Label>Target Date *</Label>
                <div>
                    <Select onChange={handleChange} name="gDay" value = {goal.gDay}>
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="gMonth" value = {goal.gMonth}>
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="gYear" value = {goal.gYear}>
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                </div>
            </FormGroup>

            <Button onClick = {handleClick}>
                Submit
            </Button>
        </GoalsForm>
    )
}

export default UpdateGoals