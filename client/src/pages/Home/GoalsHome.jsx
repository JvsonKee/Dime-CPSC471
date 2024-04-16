import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import { BoxContentWrapper, BoxHeader, ColumnBoxContainer, IncomeAmount, IncomeItem, IncomeName } from "./Home.styled"
import axios from "axios"

const GoalsHome = () => {
    const [user, setUser] = useContext(UserContext)
    const [goals, setGoals] = useState([])

    useEffect(() => {
        const fetchAllGoals = async () => {
            try{
                const res = await axios.get("http://localhost:8800/goals/" + user.userID)
                setGoals(res.data)
            }catch(err){
                console.log(err)
            }
        }
        fetchAllGoals()
    },[user.userID])

    return (
        <ColumnBoxContainer>
            <BoxHeader>Goals</BoxHeader>
            <BoxContentWrapper>
                {
                    goals.map((goal, key) => (
                        <IncomeItem key={key}>
                            <IncomeName>{goal.title}</IncomeName>
                            <IncomeAmount style={{color: '#FFA723'}}>${goal.amount}</IncomeAmount>
                        </IncomeItem>
                    ))
                }
            </BoxContentWrapper>
        </ColumnBoxContainer>
    )
}

export default GoalsHome;