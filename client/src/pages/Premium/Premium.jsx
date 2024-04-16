import { useContext, useEffect, useState } from "react";
import NavBar from "../../components/NavBar"
import { ContentContainer, MainContainer, PageContainer } from "../../styles/Containers"
import { UserContext } from "../../App";
import axios from "axios";
import { ChartWrapper, PremiumContainer, PremiumHeader } from "./Premium.styled";
import BarChart from "./BarChart";

const Premium = () => {

    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const [user, setUser] = useContext(UserContext);
    const [monthlyTotals, setMonthlyTotals] = useState(null);
    const [load, setLoad]  = useState(false);

    useEffect(() => {
        const getMonthlyTransactionsTotals = async () => {
            try {
                const res = await axios.get("http://localhost:8800/monthlytransactiontotals/" + user.userID, {params: {year: currentYear}})
                setMonthlyTotals(res.data);
                setLoad(true);
            } catch (err) {
                console.log(err)
            }
        }
        getMonthlyTransactionsTotals();
    }, [user.userID, currentMonth, currentYear]);

    return (
        <PageContainer>
            <NavBar />
            <MainContainer>
                <ContentContainer>
                    <PremiumContainer>
                        <PremiumHeader>Monthly Spending</PremiumHeader>
                        <ChartWrapper>
                            {
                                load && <BarChart totals={monthlyTotals}/>
                            }
                        </ChartWrapper>
                    </PremiumContainer>
                </ContentContainer>
            </MainContainer>
        </PageContainer>
    )
}

export default Premium