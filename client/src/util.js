export const cardTypes = ["VISA", "MasterCard", "Debit"]
export const months = [1,2,3,4,5,6,7,8,9,10,11,12]
const currentYear = new Date().getFullYear()
export let years = []

for (let i = currentYear; i < currentYear + 10; i++) {
    years.push(i)
}


export const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]