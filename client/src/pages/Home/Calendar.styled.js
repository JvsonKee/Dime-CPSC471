import styled from "styled-components";

export const CalendarContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    width: 100%;
`

export const CalendarHeader = styled.h3`
    align-self: center;
    
`

export const CalendarGrid = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`

export const HeaderContainer = styled.div`
    display: flex;
    width: 100%;
`

export const DayHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
    width: 14%;
    height: 70%;
`

export const DaysContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    height: 100%;
`

export const Day = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--dark-grey);
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    padding-top: 5px;
    width: 14%;
    height: 15%;

    &:hover {
        background-color: var(--light-grey);
    }
`

export const DayNumber = styled.div`
    font-size: 13px;
`

export const Dot = styled.div`
    margin-top: 5px;
    width: 5px;
    height: 5px;
    border-radius: 100px;
`