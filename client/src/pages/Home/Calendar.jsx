import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, getMonth, getYear } from "date-fns"
import { CalendarContainer, CalendarGrid, CalendarHeader, Day, DayHeader, DayNumber, DaysContainer, Dot, HeaderContainer } from "./Calendar.styled";
import { WEEKDAYS } from "../../util";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../App";

const Calendar = () => {
    const [user, setUser] = useContext(UserContext)
    const [transactions, setTransactions] = useState([])

    const currentDate = new Date();
    const firstDay = startOfMonth(currentDate)
    const lastDay = endOfMonth(currentDate)
    const currentMonth = getMonth(currentDate) + 1
    const currentYear = getYear(currentDate)

    const daysInMonth = eachDayOfInterval({
        start: firstDay,
        end: lastDay
    })

    const startDayIndex = getDay(firstDay)

    useEffect(() => {
        const fetchMonthlyTransactions = async () => {
            try {
                const res = await axios.get("http://localhost:8800/monthlytransactions/" + user.userID, {params: {month: currentMonth, year: currentYear}})
                setTransactions(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        fetchMonthlyTransactions()
    }, [user.userID, currentMonth, currentYear])

    let transactionDays = []

    const getTransactionDays = () => {
        for (let i = 0; i < transactions.length; i++) {
            transactionDays.push(transactions[i].tDay)
        }
    }

    if (transactions) {
        getTransactionDays()
    }

    return (
       <CalendarContainer>
            <CalendarHeader>{format(currentDate, "MMMM yyyy")}</CalendarHeader>
            <CalendarGrid>
                <HeaderContainer>
                    {
                        WEEKDAYS.map((day, index) => (
                        <DayHeader key={index}>{day}</DayHeader>
                    ))}
                </HeaderContainer>
                <DaysContainer>
                    {
                        Array.from({length: startDayIndex}).map((_, index) => (
                            <div key={`empty-${index}`}></div>
                        ))
                    }
                    {
                        daysInMonth.map((day, index) => (
                            <Day key={index}>
                                <DayNumber>{format(day, "d")}</DayNumber>
                                {transactionDays.includes(index + 1) ? <Dot style={{backgroundColor: "#FF7175"}}></Dot> : null}
                            </Day>
                        ))
                    }
                </DaysContainer>
            </CalendarGrid>
       </CalendarContainer>
    )
}

export default Calendar