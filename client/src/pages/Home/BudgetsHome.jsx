import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../App"
import axios from "axios"
import { BoxContentWrapper, BoxHeader, ColumnBoxContainer, IncomeAmount, IncomeItem, IncomeName } from "./Home.styled"

const BudgetsHome = () => {
    const [user, setUser] = useContext(UserContext)
    const [budgets, setBudgets] = useState([])

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const res = await axios.get("http://localhost:8800/budgetswithcategoryname/" + user.userID);
                setBudgets(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchBudgets()
    }, [user.userID])

    return (
        <ColumnBoxContainer>
            <BoxHeader>Budgets</BoxHeader>
            <BoxContentWrapper>
                {
                    budgets.map((budget, key) => (
                        <IncomeItem key={key}>
                            <IncomeName>{budget.categoryName}</IncomeName>
                            <IncomeAmount style={{color: "#9868FF"}}>${budget.amount}</IncomeAmount>
                        </IncomeItem>
                    ))
                }
            </BoxContentWrapper>
        </ColumnBoxContainer>
    )
}
export default BudgetsHome