import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { UserContext } from '../../App';
import { useContext } from 'react';
import {
    Select,
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

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);


    const[income,setIncome] = useState({
        incomeSource: location.state.incomePass[0].incomeSource,
        incomeAmount: location.state.incomePass[0].incomeAmount,
        lastReceivedDay:location.state.incomePass[0].lastReceivedDay,
        lastReceivedMonth: location.state.incomePass[0].lastReceivedMonth,
        lastReceivedYear: location.state.incomePass[0].lastReceivedYear,
        receiveEvery: location.state.incomePass[0].receiveEvery
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
        /*

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
        */

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
            <Title>Enter Updated Income Source Information</Title>
    
            <FormGroup>
                <Label>Source *</Label>
                {invalidIncomeSource && <InvalidFeedback>{invalidIncomeSource}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="incomeSource" value = {income.incomeSource}/>
            </FormGroup>
    
            <FormGroup>
                <Label>Amount *</Label>
                {invalidAmount && <InvalidFeedback>{invalidAmount}</InvalidFeedback>}
                <Input type="number" onChange={handleChange} name="incomeAmount" value = {income.incomeAmount}/>
            </FormGroup>
    
            <FormGroup>
                <Label>Last Received Date *</Label>
                <div>
                    <Select onChange={handleChange} name="lastReceivedDay" value = {income.lastReceivedDay}>
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="lastReceivedMonth" value = {income.lastReceivedMonth}>
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="lastReceivedYear" value = {income.lastReceivedYear}>
                        <option value="">Year</option>
                        {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </Select>
                </div>
            </FormGroup>
    
            <FormGroup>
                <Label>Receive every *</Label>
                {invalidFrequency && <InvalidFeedback>{invalidFrequency}</InvalidFeedback>}
                <Input type="text" onChange={handleChange} name="receiveEvery" value = {income.receiveEvery}/>
            </FormGroup>
    
            <Button onClick={handleClick}>Submit</Button>
        </IncomeForm>
    );
}

export default EditIncome