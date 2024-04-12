import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import axios from 'axios'
import { Link } from "react-router-dom"
import {useLocation} from 'react-router-dom';
import { useNavigate } from "react-router-dom"

const Categories = () => {
    const [category, setCategory] = useState([]);
    
    const navigate = useNavigate()
    const location = useLocation();
    let user = location.state.account;
    let budgets = location.state.budgets
    
    const handleDelete = async(category) => {
        try{
            for (let i = 0; i < budgets.length; i++) {
                if (parseInt(budgets[i].category) === category) {
                    await axios.delete("http://localhost:8800/deletebudget/" + budgets[i].budgetID);
                    budgets.splice(i,1)
                }
            }
            await axios.delete("http://localhost:8800/deletecategory/" + category);

            navigate("/categories", {state: {account: user, budgets: location.state.budgets}})
        }catch(err) {
            console.log(err)
        }
    }

    useEffect(() => {
        const fetchAllCategories = async () => {
            try{
                const res = await axios.get("http://localhost:8800/categoriesdrop/" + user.userID)
                setCategory(res.data)
                console.log(res)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllCategories()
    },[user.userID])


    return(
        <div>
            <h1>Categories</h1>
            <div className = "category">
                {category.map((category)=>(
                    <div className = "category" key={category.categoryID}>
                        <h2>Name: {category.categoryName}</h2>
                        <button>
                            <Link to="/updatecategory" state= {{account: user, budgets: location.state.budgets, categoryID: category.categoryID}}>Edit</Link>
                        </button>
                        <button onClick = {()=>handleDelete(category.categoryID)}>Delete</button>
                    </div>
                ))}
        </div>
        <button>
            <Link to="/createcategory" state= {{account:user, budgets: location.state.budgets}}>Create a new category</Link>
        </button>
        <button>
            <Link to="/budgets" state= {{account: user, budgets:location.state.budgets}}>Return to Budgets page</Link>
        </button>
    </div>
)}

export default Categories