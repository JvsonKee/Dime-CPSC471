import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';
import { UserContext } from '../../App';
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

const IncomeNew = () => {
    const [user, setUser] = useContext(UserContext)
    const location = useLocation();

    const [invalidIncomeSource, setInvalidIncomeSource] = useState('')
    const [invalidAmount, setInvalidAmount] = useState('')
    const [invalidDay, setInvalidDay] = useState('')
    const [invalidMonth, setInvalidMonth] = useState('')
    const [invalidYear, setInvalidYear] = useState('')
    const [invalidFrequency, setInvalidFrequency] = useState('')

    const[income,setIncome] = useState({
        incomeSource:"",
        incomeAmount:"",
        lastReceivedDay:"",
        lastReceivedMonth: "",
        lastReceivedYear: "",
        receiveEvery: ""
    })

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);


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

        /*if (income.lastReceivedDay === "") {
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
        }*/

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
                await axios.post("http://localhost:8800/newincome/" + user.userID, income)
                navigate("/income")
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(income)

    return (
        <IncomeForm>
            <Title>Enter New Income Source Information</Title>
    
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
                <Label>Last Received Date *</Label>
                <div>
                    <Select onChange={handleChange} name="lastReceivedDay">
                        <option value="">Day</option>
                        {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="lastReceivedMonth">
                        <option value="">Month</option>
                        {months.map((month) => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </Select>
                    <Select onChange={handleChange} name="lastReceivedYear">
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
                <Input type="text" onChange={handleChange} name="receiveEvery" />
            </FormGroup>
    
            <Button onClick={handleClick}>Submit</Button>
        </IncomeForm>
    );    
};
export default IncomeNew