import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const CreateCategory = () => {
    const location = useLocation();
    let user = location.state.account;

    const [invalidTitle, setInvalidTitle] = useState('')
 
    const[category,setCategory] = useState({
        categoryName: "",
    })

    const navigate = useNavigate()

    const validForm = () => {
        let valid = true;

        if (category.categoryName === "") {
            setInvalidTitle("Invalid title.")
            valid = false;
        }

        return valid
    }

    const handleChange = (e) =>{
        setCategory((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                await axios.post("http://localhost:8800/createcategory/"+ user.userID, category)
                navigate("/categories", {state: {account: user, budgets: location.state.budgets}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(category)

    return <div>
    <div className = 'categoryForm'>
        <h1>Enter title of new category</h1>

        {invalidTitle && <div>{invalidTitle}</div>}
        <input type = "text" onChange = {handleChange} name = "categoryName"/>

    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default CreateCategory