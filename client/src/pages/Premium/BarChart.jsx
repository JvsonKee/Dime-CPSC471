import { useState } from "react"
import { MONTHS } from "../../util";
import { Chart as ChartJS } from 'chart.js/auto'; 
import { Bar } from 'react-chartjs-2';  
import { ChartContainer } from "./BarChart.styled";

ChartJS.register();

const BarChart = ( {totals} ) => {

    const currentMonth = new Date().getMonth() + 1;
    const months = [];
    for (let i = 0; i < currentMonth; i++) {
        months.push(MONTHS[i]);
    }

    let monthlySpending = Array.from( {length: currentMonth}, () => 0);

    for (let i = 0; i < totals.length; i++) {
        if (totals[i].tMonth > currentMonth) {
            continue;
        }
        monthlySpending[totals[i].tMonth - 1] = totals[i].total;
    }


    console.log(monthlySpending);
    const [chartData, setChartData] = useState ({
        labels: months,
        datasets: [
            {   
                label: "Spent",
                data: monthlySpending,
                backgroundColor: 'rgba(99, 255, 133, 0.3)',
                borderColor: 'rgb(99, 255, 133)',
                borderWidth: 1,
                barPercentage: 0.5
            }
        ]
    });

    return (
            <Bar 
                data={chartData}
            />
    )
}

export default BarChart;