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
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 2px;
    height: 100%;
`

export const DayHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: beige; */
    height: 70%;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
`

export const Day = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--dark-grey);
    border-radius: 10px;
    transition: 0.3s ease-in-out;
    padding-top: 5px;
    height: 35px;

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