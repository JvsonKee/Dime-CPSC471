import React from 'react'
import { useNavigate } from "react-router-dom"
import {useState} from 'react'
import axios from 'axios'
import {useLocation} from 'react-router-dom';

const UpdateCategory = () => {

    const [invalidTitle, setInvalidTitle] = useState('')

    const location = useLocation();
    let user = location.state.account
    let budgets = location.state.budgets

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
        return valid;
    }

    const handleChange = (e) =>{
        setCategory((prev)=>({...prev, [e.target.name]:e.target.value}))
    }

    const handleClick = async e =>{
        e.preventDefault()
        if (validForm()) {
            try{
                for (let i = 0; i < budgets.length; i++) {
                    if (parseInt(budgets[i].category) === location.state.categoryID) {
                        budgets[i].category_name = category.categoryName
                    }
                }
                await axios.put("http://localhost:8800/updatecategory/" + location.state.categoryID,category)
                navigate("/categories", {state: {account: user, budgets: location.state.budgets}})
            }catch (err) {
                console.log(err)
            }
        }
    }
    console.log(category)

    return <div>
    <div className = 'categoryForm'>
        <h1>Enter new title of category</h1>

        {invalidTitle && <div>{invalidTitle}</div>}
        <input type = "text" onChange = {handleChange} name = "categoryName"/>

    </div>
    <button onClick = {handleClick}>
        Submit
    </button>
    </div>
}

export default UpdateCategory