import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext } from 'react';
import {
    IncomeForm,
    Title,
    FormGroup,
    Label,
    Input,
    Button,
    InvalidFeedback,
} from './IncomeNew.styled';

const EditIncome = () => {
    const [user, setUser] = useContext(UserContext)
    const [invalidIncomeSource, setInvalidIncomeSource] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')
    const [invalidDay, setInvalidDay] = useState('')
    const [invalidMonth, setInvalidMonth] = useState('')
    const [invalidYear, setInvalidYear] = useState('')
    const [invalidFrequency, setInvalidFrequency] = useState('')

    const location = useLocation();
    // let user = location.state.account

    const[income,setIncome] = useState({
        incomeSource:"",
        incomeAmount:"",
        lastReceivedDay:"",
        lastReceivedMonth: "",
        lastReceivedYear: "",
        receiveEvery: ""
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (income.incomeSource === "") {
            setInvalidIncomeSource("Invalid income source")
            valid = false;
        }

        if (income.incomeAmount === "") {
            setInvalidAmount("Invalid income amount")
            valid = false;
        }

        if (income.lastReceivedDay === "") {
            setInvalidDay("Invalid day")
            valid = false;
        }

        if (income.lastReceivedMonth === "") {
            setInvalidMonth("Invalid month")
            valid = false;
        }

        if (income.lastReceivedYear === "") {
            setInvalidYear("Invalid year")
            valid = false;
        }

        if (income.receiveEvery === "") {
            setInvalidFrequency("Invalid frequency")
            valid = false;
        }

        return valid;
    }

    const handleChange = (e) =>{
        setIncome((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.put("http://localhost:8800/editincome/" + location.state.incomeID,income)
                navigate("/income")
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(income)

    return (
        <IncomeForm>
            <Title>Enter updated income source information.</Title>
    
            <FormGroup>
                <Label>Source *</Label>
                {invalidIncomeSource && <InvalidFeedback>{invalidIncomeSource}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="incomeSource" />
            </FormGroup>
    
            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <InvalidFeedback>{invalidAmount}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="incomeAmount" />
            </FormGroup>
    
            <FormGroup>
                <Label>Last received day *</Label>
                {invalidDay && <InvalidFeedback>{invalidDay}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="lastReceivedDay" />
            </FormGroup>
    
            <FormGroup>
                <Label>Last received month *</Label>
                {invalidMonth && <InvalidFeedback>{invalidMonth}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="lastReceivedMonth" />
            </FormGroup>
    
            <FormGroup>
                <Label>Last received year *</Label>
                {invalidYear && <InvalidFeedback>{invalidYear}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="lastReceivedYear" />
            </FormGroup>
    
            <FormGroup>
                <Label>Receive every *</Label>
                {invalidFrequency && <InvalidFeedback>{invalidFrequency}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="receiveEvery" />
            </FormGroup>
    
            <Button onClick={handleClick}>Submit</Button>
        </IncomeForm>
    );
}

export default EditIncome